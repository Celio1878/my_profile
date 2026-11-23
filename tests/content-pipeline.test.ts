import { beforeAll, describe, expect, it } from "vitest";
import { createHighlighter, type Highlighter } from "shiki";
import {
  countWords,
  extractExcerpt,
  extractHeadings,
  parseFrontmatter,
  renderMarkdown,
  sanitizeUrl,
  slugifyHeading,
} from "../scripts/lib/markdown";
import { deriveTags, htmlToCleanMarkdown } from "../scripts/sync-substack";

let highlighter: Highlighter;

beforeAll(async () => {
  highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["python", "text"],
  });
});

describe("parseFrontmatter", () => {
  it("parses scalars, arrays and numbers", () => {
    const { data, content } = parseFrontmatter(
      '---\ntitle: "Hello"\ntags: ["AI", "Cloud"]\nwordCount: 42\n---\n\nBody text',
    );
    expect(data.title).toBe("Hello");
    expect(data.tags).toEqual(["AI", "Cloud"]);
    expect(data.wordCount).toBe(42);
    expect(content).toBe("Body text");
  });

  it("unescapes quoted scalars written by the sync pipeline", () => {
    const { data } = parseFrontmatter('---\ntitle: "The \\"Story\\" So Far"\n---\nbody');
    expect(data.title).toBe('The "Story" So Far');
  });

  it("does not terminate on ---- rules inside values", () => {
    const { data, content } = parseFrontmatter('---\ntitle: "A ---- B"\n---\n\nReal body');
    expect(data.title).toBe("A ---- B");
    expect(content).toBe("Real body");
  });

  it("returns raw content when frontmatter is absent", () => {
    const { data, content } = parseFrontmatter("Just prose");
    expect(data).toEqual({});
    expect(content).toBe("Just prose");
  });
});

describe("headings & excerpts", () => {
  const sample = [
    "## Real Heading",
    "",
    "```python",
    "## not a heading",
    "```",
    "",
    "### With `code` and **bold**",
    "",
    "A sufficiently long prose paragraph that should become the excerpt.",
  ].join("\n");

  it("ignores headings inside code fences", () => {
    const headings = extractHeadings(sample);
    expect(headings.map((h) => h.text)).toEqual(["Real Heading", "With code and bold"]);
  });

  it("produces ids matching the renderer slug", () => {
    const headings = extractHeadings(sample);
    expect(headings[1].id).toBe(slugifyHeading("With `code` and **bold**"));
    expect(headings[1].id).toBe("with-code-and-bold");
  });

  it("extracts clean prose excerpts", () => {
    expect(extractExcerpt(sample, "fallback")).toBe(
      "A sufficiently long prose paragraph that should become the excerpt.",
    );
  });

  it("counts prose words only", () => {
    // 3 ("## Real Heading") + 5 ("### With `code` and **bold**") + 10 (prose)
    expect(countWords(sample)).toBe(18);
  });
});

describe("sanitizeUrl", () => {
  it("blocks dangerous schemes", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("#");
    expect(sanitizeUrl("JaVaScRiPt:alert(1)")).toBe("#");
    expect(sanitizeUrl("java\tscript:alert(1)")).toBe("#");
    expect(sanitizeUrl("data:text/html;base64,xx")).toBe("#");
    expect(sanitizeUrl("vbscript:msgbox")).toBe("#");
  });

  it("allows safe URLs", () => {
    expect(sanitizeUrl("https://aldeon.app")).toBe("https://aldeon.app");
    expect(sanitizeUrl("mailto:contact@celiovieira.com")).toBe("mailto:contact@celiovieira.com");
    expect(sanitizeUrl("#section")).toBe("#section");
    expect(sanitizeUrl("/blog")).toBe("/blog");
  });
});

describe("renderMarkdown", () => {
  it("parses inline markdown in paragraphs (marked v18 regression)", () => {
    const html = renderMarkdown("Hello **bold** and `code` and *italic*.", highlighter);
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<code>code</code>");
    expect(html).toContain("<em>italic</em>");
    expect(html).not.toContain("**bold**");
  });

  it("parses inline markdown in headings and links in paragraphs", () => {
    const html = renderMarkdown(
      "## Heading with `code`\n\nSee [Aldeon](https://aldeon.app) for details.",
      highlighter,
    );
    expect(html).toContain("<h2");
    expect(html).toContain("<code>code</code>");
    expect(html).toContain('href="https://aldeon.app"');
    expect(html).toContain('target="_blank"');
    expect(html).not.toContain("[Aldeon]");
  });

  it("neutralizes javascript: links and escapes link titles", () => {
    const html = renderMarkdown(
      '[x](javascript:alert(1)) and [y](https://a.com "title \\" quoted")',
      highlighter,
    );
    expect(html).toContain('href="#"');
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain('" quoted');
  });

  it("strips script tags and event handlers", () => {
    const html = renderMarkdown(
      '<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\nSafe paragraph.',
      highlighter,
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).toContain("Safe paragraph.");
  });

  it("keeps escaped entities inside code fences literal", () => {
    const html = renderMarkdown("```\n&lt;p&gt;literal&lt;/p&gt;\n```", highlighter);
    // Entities stay double-escaped so the browser displays them as text,
    // never as real markup.
    expect(html).toContain("&amp;lt;p&amp;gt;literal&amp;lt;/p&amp;gt;");
    expect(html).not.toContain("<p>literal");
  });

  it("highlights code with dual themes and copy buttons", () => {
    const html = renderMarkdown("```python\nprint('hi')\n```", highlighter);
    expect(html).toContain("--shiki-light");
    expect(html).toContain("--shiki-dark");
    expect(html).toContain("copy-code-btn");
    expect(html).toContain("data-code=");
  });
});

describe("deriveTags (word boundaries)", () => {
  it("does not mis-tag substring false positives", () => {
    expect(deriveTags("The Great Data Engineering Renaissance", "Modern data stack")).not.toContain(
      "AI",
    );
    expect(deriveTags("Domain-Driven Design", "A paragraph about architecture")).not.toContain(
      "AI",
    );
    expect(deriveTags("Domain-Driven Design", "A paragraph about architecture")).not.toContain(
      "Algorithms",
    );
  });

  it("tags genuine keywords including hyphenated forms", () => {
    const tags = deriveTags("AI-Powered Agents", "Practical RAG pipelines");
    expect(tags).toContain("AI");
    expect(tags).toContain("LLMs");
    expect(tags).toContain("Substack");
  });
});

describe("htmlToCleanMarkdown", () => {
  it("preserves trailing code fences", () => {
    const md = htmlToCleanMarkdown("<p>Intro sentence.</p><pre><code>final block</code></pre>");
    expect(md).toContain("Intro sentence.");
  });

  it("converts basic HTML to markdown", () => {
    const md = htmlToCleanMarkdown(
      "<h2>Title</h2><p>Hello <strong>world</strong> with <a href='https://a.com'>link</a>.</p><ul><li>item one.</li></ul>",
    );
    expect(md).toContain("## Title");
    expect(md).toContain("**world**");
    expect(md).toContain("[link](https://a.com)");
    expect(md).toContain("- item one.");
  });
});
