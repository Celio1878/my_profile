/**
 * Build-time blog content compiler.
 *
 * Reads app/content/blog/*.md and companion app/content/blog/pt-BR/*.md → emits:
 *   - app/content/generated/index.json          (metadata + translations — small, eager)
 *   - app/content/generated/<slug>.json         (sanitized EN HTML — lazy)
 *   - app/content/generated/pt-BR/<slug>.json   (sanitized pt-BR HTML — lazy)
 *
 * Keeps the full article corpus out of the shared client bundle: pages
 * load metadata eagerly and each article's HTML on demand via dynamic import.
 */
import fs from "node:fs";
import path from "node:path";
import { createHighlighter } from "shiki";
import {
  countWords,
  extractExcerpt,
  extractHeadings,
  parseFrontmatter,
  renderMarkdown,
  type ParsedHeading,
} from "./lib/markdown";

export interface PostLocaleMeta {
  title: string;
  description: string;
  excerpt: string;
  headings: ParsedHeading[];
  wordCount: number;
  readTimeMinutes: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTimeMinutes: number;
  wordCount: number;
  headings: ParsedHeading[];
  source: "native" | "substack";
  coverImage?: string;
  lang: string;
  author: string;
  canonicalUrl?: string;
  availableLocales: Array<"en" | "pt-BR">;
  translations?: {
    "pt-BR"?: PostLocaleMeta;
  };
}

const CONTENT_DIR = path.resolve(process.cwd(), "app/content/blog");
const PT_CONTENT_DIR = path.resolve(CONTENT_DIR, "pt-BR");
const OUTPUT_DIR = path.resolve(process.cwd(), "app/content/generated");
const PT_OUTPUT_DIR = path.resolve(OUTPUT_DIR, "pt-BR");

const LANGS = [
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
  "toml",
  "dockerfile",
  "graphql",
  "rust",
] as const;

async function main() {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [...LANGS],
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(PT_OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts: PostMeta[] = [];
  const postsBySlug = new Map<string, PostMeta>();
  const htmlBySlug = new Map<string, string>();
  const ptHtmlBySlug = new Map<string, string>();
  const seenSlugs = new Set<string>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);

    const fallbackSlug = file.replace(/\.md$/, "");
    const slug = typeof data.slug === "string" && data.slug ? data.slug : fallbackSlug;
    if (seenSlugs.has(slug)) {
      console.warn(`⚠ Duplicate slug "${slug}" (${file}) — skipping duplicate.`);
      continue;
    }
    seenSlugs.add(slug);

    const title = typeof data.title === "string" && data.title ? data.title : "Untitled Article";
    const description = typeof data.description === "string" ? data.description : "";
    const date = typeof data.date === "string" && data.date ? data.date : "2026-01-01";
    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
    const canonicalUrl =
      typeof data.canonicalUrl === "string" && data.canonicalUrl ? data.canonicalUrl : undefined;

    const wordCount =
      typeof data.wordCount === "number" && data.wordCount > 0
        ? data.wordCount
        : countWords(content);
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const headings = extractHeadings(content);
    const excerpt =
      typeof data.excerpt === "string" && data.excerpt
        ? data.excerpt
        : extractExcerpt(content, description);

    const html = renderMarkdown(content, highlighter);
    htmlBySlug.set(slug, html);

    const meta: PostMeta = {
      slug,
      title,
      description,
      excerpt,
      date,
      tags,
      readTimeMinutes,
      wordCount,
      headings,
      source: canonicalUrl ? "substack" : "native",
      coverImage:
        typeof data.coverImage === "string" && data.coverImage ? data.coverImage : undefined,
      lang: typeof data.lang === "string" && data.lang ? data.lang : "en",
      author: typeof data.author === "string" && data.author ? data.author : "Célio Vieira",
      canonicalUrl,
      availableLocales: ["en"],
    };

    posts.push(meta);
    postsBySlug.set(slug, meta);
  }

  // Compile companion pt-BR translations (if present).
  if (fs.existsSync(PT_CONTENT_DIR)) {
    const ptFiles = fs.readdirSync(PT_CONTENT_DIR).filter((f) => f.endsWith(".md"));
    for (const file of ptFiles) {
      const raw = fs.readFileSync(path.join(PT_CONTENT_DIR, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      const fallbackSlug = file.replace(/\.md$/, "");
      const slug = typeof data.slug === "string" && data.slug ? data.slug : fallbackSlug;
      const target = postsBySlug.get(slug);
      if (!target) {
        console.warn(`⚠ PT-BR translation "${file}" has no matching EN slug "${slug}" — skipping.`);
        continue;
      }

      const ptWordCount =
        typeof data.wordCount === "number" && data.wordCount > 0
          ? data.wordCount
          : countWords(content);
      const ptReadTimeMinutes = Math.max(1, Math.ceil(ptWordCount / 200));
      const ptHeadings = extractHeadings(content);
      const ptDescription =
        typeof data.description === "string" && data.description
          ? data.description
          : target.description;
      const ptExcerpt =
        typeof data.excerpt === "string" && data.excerpt
          ? data.excerpt
          : extractExcerpt(content, ptDescription);
      const ptTitle = typeof data.title === "string" && data.title ? data.title : target.title;

      const ptHtml = renderMarkdown(content, highlighter);
      ptHtmlBySlug.set(slug, ptHtml);

      target.availableLocales = ["en", "pt-BR"];
      target.translations = {
        "pt-BR": {
          title: ptTitle,
          description: ptDescription,
          excerpt: ptExcerpt,
          headings: ptHeadings,
          wordCount: ptWordCount,
          readTimeMinutes: ptReadTimeMinutes,
        },
      };
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Prune stale generated files (deleted/renamed articles).
  const expected = new Set(["index.json", ...posts.map((p) => `${p.slug}.json`)]);
  for (const existing of fs.readdirSync(OUTPUT_DIR)) {
    if (existing.endsWith(".json") && !expected.has(existing)) {
      fs.rmSync(path.join(OUTPUT_DIR, existing));
    }
  }
  const expectedPt = new Set(Array.from(ptHtmlBySlug.keys()).map((s) => `${s}.json`));
  for (const existing of fs.readdirSync(PT_OUTPUT_DIR)) {
    if (existing.endsWith(".json") && !expectedPt.has(existing)) {
      fs.rmSync(path.join(PT_OUTPUT_DIR, existing));
    }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "index.json"), JSON.stringify(posts, null, 2) + "\n");
  for (const post of posts) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${post.slug}.json`),
      JSON.stringify({ slug: post.slug, html: htmlBySlug.get(post.slug) }) + "\n",
    );
    const ptHtml = ptHtmlBySlug.get(post.slug);
    if (ptHtml) {
      fs.writeFileSync(
        path.join(PT_OUTPUT_DIR, `${post.slug}.json`),
        JSON.stringify({ slug: post.slug, lang: "pt-BR", html: ptHtml }) + "\n",
      );
    }
  }

  highlighter.dispose();
  const native = posts.filter((p) => p.source === "native").length;
  console.log(
    `✓ Compiled ${posts.length} articles (${native} native / ${posts.length - native} Substack; ${ptHtmlBySlug.size} pt-BR translations) → app/content/generated/`,
  );
}

main().catch((err) => {
  console.error("Blog content build failed:", err);
  process.exit(1);
});
