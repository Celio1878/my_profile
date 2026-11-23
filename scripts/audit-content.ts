/**
 * Content integrity audit — run against the raw markdown corpus and the
 * compiled index. Exits non-zero on any violation.
 *
 *   bun run audit:content
 */
import fs from "node:fs";
import path from "node:path";
import { extractHeadings, parseFrontmatter, splitFences } from "./lib/markdown";

const CONTENT_DIR = path.resolve(process.cwd(), "app/content/blog");
const INDEX_PATH = path.resolve(process.cwd(), "app/content/generated/index.json");

const errors: string[] = [];
const RAW_HTML = /<(p|div|span|strong|em|h[1-6]|ul|ol|li|br|img|script|iframe|a)\b[^>]*>/i;

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const slugs = new Map<string, string>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);

    const slug = typeof data.slug === "string" && data.slug ? data.slug : file.replace(/\.md$/, "");
    if (slugs.has(slug)) {
      errors.push(`${file}: duplicate slug "${slug}" (also in ${slugs.get(slug)})`);
    }
    slugs.set(slug, file);

    if (typeof data.title !== "string" || !data.title) errors.push(`${file}: missing title`);
    if (typeof data.date !== "string" || Number.isNaN(Date.parse(data.date))) {
      errors.push(`${file}: missing/invalid date`);
    }
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      errors.push(`${file}: missing tags`);
    }

    // Raw HTML is only legitimate inside code fences.
    for (const segment of splitFences(content)) {
      if (segment.type === "text" && RAW_HTML.test(segment.text)) {
        errors.push(`${file}: raw HTML tag outside code fence`);
        break;
      }
    }

    // Duplicate heading ids break TOC anchors and React keys.
    const ids = new Set<string>();
    for (const heading of extractHeadings(content)) {
      if (ids.has(heading.id)) {
        errors.push(`${file}: duplicate heading id "${heading.id}"`);
      }
      ids.add(heading.id);
    }
  }

  // Compiled index must match the corpus exactly.
  if (!fs.existsSync(INDEX_PATH)) {
    errors.push("generated/index.json missing — run bun run content:build");
  } else {
    const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8")) as Array<{ slug: string }>;
    const compiled = new Set(index.map((p) => p.slug));
    for (const slug of slugs.keys()) {
      if (!compiled.has(slug)) errors.push(`slug "${slug}" missing from compiled index`);
    }
    for (const slug of compiled) {
      if (!slugs.has(slug)) errors.push(`compiled index has stale slug "${slug}"`);
    }
    if (index.length !== files.length) {
      errors.push(`index count ${index.length} != corpus count ${files.length}`);
    }
  }

  if (errors.length > 0) {
    console.error(`✗ Content audit failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  console.log(`✓ Content audit passed: ${files.length} articles, no integrity issues.`);
}

main();
