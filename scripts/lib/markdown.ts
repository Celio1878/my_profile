/**
 * Build-time markdown pipeline (pure Node/Bun — no Vite imports).
 *
 * Parses frontmatter, extracts fence-aware headings/excerpts, renders GitHub
 * flavored markdown with marked v18 (correct inline parsing), highlights code
 * with Shiki (dual light/dark themes) and sanitizes the final HTML.
 *
 * Used by scripts/build-blog.ts and covered by unit tests.
 */
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Highlighter } from "shiki";

export interface ParsedHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface FrontmatterResult {
  data: Record<string, unknown>;
  content: string;
}

/* ── Escaping helpers ─────────────────────────────────────────────────────── */

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Block dangerous URL schemes; allow http(s), mailto, anchors and relatives. */
export function sanitizeUrl(href: string): string {
  const trimmed = (href || "").trim();
  // Strip control characters/whitespace that browsers ignore inside schemes.
  const collapsed = trimmed.replace(/[\u0000-\u001f\u007f\s]+/g, "").toLowerCase();
  if (/^(javascript|data|vbscript|file):/i.test(collapsed)) return "#";
  return trimmed;
}

/* ── Frontmatter ──────────────────────────────────────────────────────────── */

/** Unescape a double-quoted YAML-style scalar written by the sync pipeline. */
function unescapeScalar(value: string): string {
  return value.replace(/\\(["\\])/g, "$1").replace(/\\n/g, "\n");
}

/**
 * Robust frontmatter parser: the closing marker must be a full `---` line
 * (so `----` rules inside values never terminate it), quoted scalars are
 * unescaped, JSON arrays and numbers are typed.
 */
export function parseFrontmatter(raw: string): FrontmatterResult {
  const trimmed = raw.replace(/^\uFEFF/, "").trim();
  if (!trimmed.startsWith("---")) return { data: {}, content: raw };

  const lines = trimmed.split("\n");
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) {
      end = i;
      break;
    }
  }
  if (end === -1) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  for (const line of lines.slice(1, end)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    if (!key) continue;
    let val = line.slice(colonIndex + 1).trim();

    if (val.startsWith("[") && val.endsWith("]")) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
      }
      continue;
    }
    if (/^-?\d+$/.test(val)) {
      data[key] = Number.parseInt(val, 10);
      continue;
    }
    if (val === "true" || val === "false") {
      data[key] = val === "true";
      continue;
    }
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = unescapeScalar(val.slice(1, -1));
    }
    data[key] = val;
  }

  return {
    data,
    content: lines
      .slice(end + 1)
      .join("\n")
      .trim(),
  };
}

/* ── Fence-aware helpers ──────────────────────────────────────────────────── */

/** Split content into code-fence and prose segments (fences kept verbatim). */
export function splitFences(content: string): Array<{ type: "code" | "text"; text: string }> {
  const segments: Array<{ type: "code" | "text"; text: string }> = [];
  let inFence = false;
  let buffer: string[] = [];
  let currentType: "code" | "text" = "text";

  const flush = () => {
    if (buffer.length > 0) {
      segments.push({ type: currentType, text: buffer.join("\n") });
      buffer = [];
    }
  };

  for (const line of content.split("\n")) {
    const isFenceMarker = /^(```|~~~)/.test(line.trim());
    if (isFenceMarker) {
      if (!inFence) {
        flush();
        currentType = "code";
        inFence = true;
        buffer.push(line);
      } else {
        buffer.push(line);
        flush();
        currentType = "text";
        inFence = false;
      }
      continue;
    }
    buffer.push(line);
  }
  flush();
  return segments;
}

/** Remove inline markdown syntax so TOC/excerpts show clean prose. */
export function cleanInlineText(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}

export function slugifyHeading(text: string): string {
  return cleanInlineText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extract h2/h3 headings, ignoring anything inside code fences. */
export function extractHeadings(content: string): ParsedHeading[] {
  const headings: ParsedHeading[] = [];
  for (const segment of splitFences(content)) {
    if (segment.type === "code") continue;
    for (const line of segment.text.split("\n")) {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) continue;
      const text = cleanInlineText(match[2]);
      if (!text) continue;
      headings.push({
        id: slugifyHeading(match[2]),
        text,
        level: match[1].length as 2 | 3,
      });
    }
  }
  return headings;
}

/** First real prose paragraph (fence-aware), cleaned of markdown syntax. */
export function extractExcerpt(content: string, fallback: string): string {
  for (const segment of splitFences(content)) {
    if (segment.type === "code") continue;
    for (const line of segment.text.split("\n")) {
      const trimmed = line.trim();
      if (
        trimmed &&
        !trimmed.startsWith("#") &&
        !trimmed.startsWith(">") &&
        !trimmed.startsWith("-") &&
        !trimmed.startsWith("*") &&
        !trimmed.startsWith("|") &&
        !trimmed.startsWith("👉") &&
        !trimmed.startsWith("[") &&
        !/^---+\s*$/.test(trimmed) &&
        trimmed.length > 25
      ) {
        const clean = cleanInlineText(trimmed);
        return clean.length > 260 ? `${clean.slice(0, 255).trim()}…` : clean;
      }
    }
  }
  return fallback;
}

/** Word count of prose only (code fences excluded). */
export function countWords(content: string): number {
  const prose = splitFences(content)
    .filter((s) => s.type === "text")
    .map((s) => s.text)
    .join("\n");
  return prose.trim().split(/\s+/).filter(Boolean).length;
}

/* ── Rendering ────────────────────────────────────────────────────────────── */

const COPY_ICON_SVG =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

const SHIKI_LANGS = new Set([
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "python",
  "bash",
  "shell",
  "json",
  "yaml",
  "sql",
  "go",
  "hcl",
  "terraform",
  "html",
  "css",
  "markdown",
  "diff",
  "text",
  "toml",
  "dockerfile",
  "graphql",
  "rust",
]);

/**
 * Decode stray escaped HTML entities in PROSE ONLY (never inside code fences,
 * where `&lt;p&gt;` is legitimate literal content).
 */
function decodeStrayEntities(content: string): string {
  return splitFences(content)
    .map((segment) => {
      if (segment.type === "code") return segment.text;
      return segment.text.replace(
        /&lt;(\/?(?:p|h[1-6]|strong|em|b|i|ul|ol|li|code|blockquote|br))\b(.*?)&gt;/gi,
        "<$1$2>",
      );
    })
    .join("\n");
}

export function renderMarkdown(content: string, highlighter: Highlighter): string {
  const renderer = new marked.Renderer();

  renderer.link = function ({ href, title, tokens }) {
    const safeHref = sanitizeUrl(href);
    const inner = this.parser.parseInline(tokens);
    const isExternal = /^https?:\/\//i.test(safeHref);
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeAttr(safeHref)}"${titleAttr}${targetAttr} class="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">${inner}</a>`;
  };

  renderer.heading = function ({ tokens, depth, text }) {
    const id = slugifyHeading(text);
    const inner = this.parser.parseInline(tokens);
    return `<h${depth} id="${escapeAttr(id)}" class="group flex items-center gap-2 text-balance scroll-mt-24"><span>${inner}</span><a href="#${escapeAttr(id)}" class="heading-anchor text-gray-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-sm no-underline" data-i18n-aria="linkToSection" aria-label="Link to section">#</a></h${depth}>`;
  };

  renderer.paragraph = function ({ tokens }) {
    return `<p class="text-pretty">${this.parser.parseInline(tokens)}</p>`;
  };

  renderer.blockquote = function ({ tokens }) {
    return `<blockquote class="text-pretty">${this.parser.parse(tokens)}</blockquote>`;
  };

  renderer.image = ({ href, title, text }) => {
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    return `<img src="${escapeAttr(sanitizeUrl(href))}" alt="${escapeAttr(text || "")}"${titleAttr} loading="lazy" class="max-w-full h-auto rounded-xl" />`;
  };

  renderer.code = ({ text, lang }) => {
    const language = (lang || "text").trim().split(/\s+/)[0].toLowerCase();
    const shikiLang = SHIKI_LANGS.has(language) ? language : "text";
    let highlighted: string;
    try {
      highlighted = highlighter.codeToHtml(text, {
        lang: shikiLang,
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
        transformers: [
          {
            pre(node) {
              this.addClassToHast(node, "shiki-pre");
            },
          },
        ],
      });
    } catch {
      highlighted = `<pre class="shiki shiki-pre"><code>${escapeHtml(text)}</code></pre>`;
    }
    return `<div class="code-block relative my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 shadow-sm group">
<div class="code-block-header flex items-center justify-between px-4 py-1.5 text-xs font-mono">
<span class="font-medium">${escapeHtml(language)}</span>
<button type="button" class="copy-code-btn inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded transition-colors" data-code="${encodeURIComponent(text)}" data-i18n-aria="copyCode" aria-label="Copy code">${COPY_ICON_SVG}<span data-copy-label>Copy</span></button>
</div>
${highlighted}
</div>`;
  };

  const normalized = decodeStrayEntities(content);
  const parsed = marked.parse(normalized, {
    renderer,
    gfm: true,
    breaks: true,
    async: false,
  }) as string;

  return sanitizeHtml(parsed, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "span",
      "div",
      "button",
      "strong",
      "em",
      "del",
      "s",
      "br",
      "hr",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "input",
      "svg",
      "path",
      "rect",
      "circle",
      "line",
      "polyline",
      "polygon",
      "sup",
      "sub",
      "kbd",
      "mark",
      "details",
      "summary",
    ],
    allowedAttributes: {
      "*": ["class", "id", "style", "title", "role", "aria-*", "data-*"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "loading", "width", "height"],
      input: ["type", "checked", "disabled"],
      button: ["type"],
      svg: [
        "width",
        "height",
        "viewBox",
        "fill",
        "stroke",
        "stroke-width",
        "stroke-linecap",
        "stroke-linejoin",
      ],
      path: ["d"],
      rect: ["width", "height", "x", "y", "rx", "ry"],
      circle: ["cx", "cy", "r"],
      td: ["colspan", "rowspan", "align"],
      th: ["colspan", "rowspan", "align"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    allowedStyles: {
      "*": {
        color: [/^.*$/],
        "background-color": [/^.*$/],
        "--shiki-light": [/^.*$/],
        "--shiki-dark": [/^.*$/],
        "--shiki-light-bg": [/^.*$/],
        "--shiki-dark-bg": [/^.*$/],
      },
    },
    disallowedTagsMode: "completelyDiscard",
  });
}
