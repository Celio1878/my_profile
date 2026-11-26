/**
 * Content integrity audit — run against the raw markdown corpus (EN + pt-BR)
 * and the compiled index. Exits non-zero on any violation.
 *
 *   bun run audit:content
 */
import fs from "node:fs";
import path from "node:path";
import { extractHeadings, parseFrontmatter, splitFences } from "./lib/markdown";

const CONTENT_DIR = path.resolve(process.cwd(), "app/content/blog");
const PT_CONTENT_DIR = path.resolve(CONTENT_DIR, "pt-BR");
const GENERATED_DIR = path.resolve(process.cwd(), "app/content/generated");
const INDEX_PATH = path.resolve(GENERATED_DIR, "index.json");
const PT_GENERATED_DIR = path.resolve(GENERATED_DIR, "pt-BR");

const errors: string[] = [];
const RAW_HTML = /<(p|div|span|strong|em|h[1-6]|ul|ol|li|br|img|script|iframe|a)\b[^>]*>/i;

function auditMarkdownFile(filePath: string, label: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  if (typeof data.title !== "string" || !data.title) errors.push(`${label}: missing title`);
  if (typeof data.date !== "string" || Number.isNaN(Date.parse(data.date))) {
    errors.push(`${label}: missing/invalid date`);
  }
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${label}: missing tags`);
  }

  for (const segment of splitFences(content)) {
    if (segment.type === "text" && RAW_HTML.test(segment.text)) {
      errors.push(`${label}: raw HTML tag outside code fence`);
      break;
    }
  }

  const ids = new Set<string>();
  for (const heading of extractHeadings(content)) {
    if (ids.has(heading.id)) {
      errors.push(`${label}: duplicate heading id "${heading.id}"`);
    }
    ids.add(heading.id);
  }

  return { data, content };
}

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const slugs = new Map<string, string>();
  const nativeSlugs = new Set<string>();

  for (const file of files) {
    const { data } = auditMarkdownFile(path.join(CONTENT_DIR, file), file);
    const slug = typeof data.slug === "string" && data.slug ? data.slug : file.replace(/\.md$/, "");
    if (slugs.has(slug)) {
      errors.push(`${file}: duplicate slug "${slug}" (also in ${slugs.get(slug)})`);
    }
    slugs.set(slug, file);
    if (!data.canonicalUrl) {
      nativeSlugs.add(slug);
    }
  }

  // Audit pt-BR translations and enforce 100% coverage for native blueprints.
  const ptFiles = fs.existsSync(PT_CONTENT_DIR)
    ? fs.readdirSync(PT_CONTENT_DIR).filter((f) => f.endsWith(".md"))
    : [];
  const ptSlugs = new Set<string>();

  for (const file of ptFiles) {
    const label = `pt-BR/${file}`;
    const { data } = auditMarkdownFile(path.join(PT_CONTENT_DIR, file), label);
    const slug = typeof data.slug === "string" && data.slug ? data.slug : file.replace(/\.md$/, "");
    if (data.lang !== "pt-BR") {
      errors.push(`${label}: expected lang="pt-BR", got "${String(data.lang ?? "")}"`);
    }
    if (!slugs.has(slug)) {
      errors.push(`${label}: orphaned translation — no EN blueprint matches slug "${slug}"`);
    }
    if (ptSlugs.has(slug)) {
      errors.push(`${label}: duplicate pt-BR slug "${slug}"`);
    }
    ptSlugs.add(slug);
  }

  for (const slug of nativeSlugs) {
    if (!ptSlugs.has(slug)) {
      errors.push(`native blueprint "${slug}" is missing app/content/blog/pt-BR/${slug}.md`);
    }
    if (!fs.existsSync(path.join(PT_GENERATED_DIR, `${slug}.json`))) {
      errors.push(`native blueprint "${slug}" is missing generated/pt-BR/${slug}.json`);
    }
  }

  // Compiled index must match the corpus and pt-BR translations.
  if (!fs.existsSync(INDEX_PATH)) {
    errors.push("generated/index.json missing — run bun run content:build");
  } else {
    const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8")) as Array<{
      slug: string;
      source: string;
      availableLocales?: string[];
      translations?: { "pt-BR"?: { title?: string } };
    }>;
    const compiled = new Map(index.map((p) => [p.slug, p]));
    for (const slug of slugs.keys()) {
      const entry = compiled.get(slug);
      if (!entry) {
        errors.push(`slug "${slug}" missing from compiled index`);
        continue;
      }
      if (nativeSlugs.has(slug)) {
        if (!entry.availableLocales?.includes("pt-BR") || !entry.translations?.["pt-BR"]?.title) {
          errors.push(`native blueprint "${slug}" missing pt-BR metadata in generated/index.json`);
        }
      }
    }
    for (const slug of compiled.keys()) {
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
  console.log(
    `✓ Content audit passed: ${files.length} articles (${ptFiles.length} pt-BR translations), no integrity issues.`,
  );
}

main();
