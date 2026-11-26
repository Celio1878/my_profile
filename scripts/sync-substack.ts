/**
 * Substack → build-time markdown synchronization.
 *
 *   bun run sync-substack
 *
 * Fetches the full publication archive (paginated, validated), sanitizes the
 * HTML into clean GitHub-flavored markdown, derives word-boundary tags, and
 * prunes local files for posts deleted on Substack. Native blueprints are
 * protected and never overwritten.
 */
import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./lib/markdown";

interface SubstackPost {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  canonical_url: string;
  post_date: string;
  truncated_body_text?: string;
  wordcount?: number;
  body_html?: string;
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  let s = str;
  for (let i = 0; i < 3; i++) {
    const prev = s;
    s = s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .replace(/&#8230;/g, "…")
      .replace(/&nbsp;/g, " ");
    if (s === prev) break;
  }
  return s;
}

export function unwrapSubstackEscapedHtml(rawHtml: string): string {
  if (!rawHtml) return "";
  let s = rawHtml.trim();
  if (s.includes("&lt;") || s.includes("&gt;")) {
    s = s.replace(/<\/p>\s*<p>/gi, "\n\n");
    if (s.startsWith("<p>")) s = s.slice(3);
    if (s.endsWith("</p>")) s = s.slice(0, -4);
    s = decodeHtmlEntities(s);
  }
  return s.trim();
}

export function htmlToCleanMarkdown(rawHtml: string, postId?: number): string {
  if (!rawHtml) return "";
  let text = unwrapSubstackEscapedHtml(rawHtml);
  text = decodeHtmlEntities(text);

  // Headings
  text = text.replace(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi, (_, inner) => {
    const cleanInner = inner.replace(/<[^>]+>/g, "").trim();
    return cleanInner ? `\n\n## ${cleanInner}\n\n` : "\n\n";
  });
  text = text.replace(/<h[3456][^>]*>([\s\S]*?)<\/h[3456]>/gi, (_, inner) => {
    const cleanInner = inner.replace(/<[^>]+>/g, "").trim();
    return cleanInner ? `\n\n### ${cleanInner}\n\n` : "\n\n";
  });

  // Unclosed trailing heading tag at the very end
  text = text.replace(/<h[1-6][^>]*>[^<]*$/gi, "");

  // Bold, italic, inline code
  text = text.replace(
    /<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi,
    (_, __, inner) => `**${inner.trim()}**`,
  );
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => `*${inner.trim()}*`);
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => `\`${inner.trim()}\``);

  // Links
  text = text.replace(
    /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, inner) => `[${inner.replace(/<[^>]+>/g, "").trim()}](${href})`,
  );

  // List items (including nested <p> inside <li>)
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => {
    const cleanedLi = inner
      .replace(/<\/?p[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return cleanedLi ? `\n- ${cleanedLi}` : "";
  });
  text = text.replace(/<li[^>]*>([\s\S]*?)$/gi, (_, inner) => {
    const cleanedLi = inner
      .replace(/<\/?p[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return cleanedLi ? `\n- ${cleanedLi}` : "";
  });
  text = text.replace(/<\/?(ul|ol)[^>]*>/gi, "\n\n");

  // Paragraphs and breaks
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => `\n\n${inner.trim()}\n\n`);
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Strip any remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Special cleanup for post 200012832 duplicate markdown title line
  if (postId === 200012832) {
    text = text.replace(/^#\s+Deep Dive:[^\n]+\n+/i, "");
  }

  // Normalize multiple newlines
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  // Trim incomplete trailing sentences — never drop code fences or whole lists.
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  while (blocks.length > 0) {
    const last = blocks[blocks.length - 1];
    // Code fences are legitimate terminal content: keep them.
    if (/^(```|~~~)/.test(last)) break;
    // Drop dangling heading at the very end
    if (/^#{1,6}\s+/.test(last)) {
      blocks.pop();
      continue;
    }
    if (last.startsWith("- ")) {
      const items = last
        .split(/\n(?=- )/)
        .map((item) => item.trim())
        .filter(Boolean);
      while (items.length > 0) {
        const lastItem = items[items.length - 1];
        if (/[.!?)"'”’:]$/.test(lastItem)) break;
        const match = lastItem.match(/^([\s\S]*[.!?]["')”’]?)(?:\s+[^\n]*)$/);
        if (match && match[1].replace(/^- /, "").trim().length > 10) {
          items[items.length - 1] = match[1].trim();
          break;
        } else {
          items.pop();
        }
      }
      if (items.length === 0) {
        blocks.pop();
        continue;
      }
      blocks[blocks.length - 1] = items.join("\n");
      break;
    }

    // Standard paragraph block (colon endings are legitimate, e.g. lead-ins)
    if (/[.!?)"'”’:]$/.test(last)) break;
    const sentenceMatch = last.match(/^([\s\S]*[.!?]["')”’]?)(?:\s+[\s\S]*)$/);
    if (sentenceMatch && sentenceMatch[1].trim().length > 15) {
      blocks[blocks.length - 1] = sentenceMatch[1].trim();
      break;
    } else {
      blocks.pop();
    }
  }

  return blocks.join("\n\n").trim();
}

export function extractMarkdownHeadings(markdown: string): string[] {
  const headings: string[] = [];
  const regex = /^#{2,3}\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    const clean = match[1].replace(/\*\*|\*|`/g, "").trim();
    if (clean && !headings.includes(clean)) {
      headings.push(clean);
    }
  }
  return headings;
}

export function cleanExcerpt(markdown: string, fallbackDesc: string): string {
  const paragraphs = markdown
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(
      (b) => b.length > 30 && !b.startsWith("#") && !b.startsWith("- ") && !b.startsWith(">"),
    );

  const base = paragraphs[0] || fallbackDesc;
  const plain = base
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= 240) return plain;
  const sliced = plain.slice(0, 237);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 160 ? sliced.slice(0, lastSpace) : sliced).replace(/[,;:\s]+$/, "") + "…";
}

/**
 * Word-boundary tag derivation. Substring matching previously mis-tagged
 * articles ("renaissance"/"domain" contain "ai"; "paragraph" contains "graph").
 */
export function deriveTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set<string>();

  if (/\b(aws|ec2|glue|sqs|cloud|eks|serverless|lambda|dynamodb|gcp|azure)\b/.test(text)) {
    tags.add("AWS");
    tags.add("Cloud");
  }
  if (
    /\b(data|database|databases|metadata|lakehouse|lakehouses|spark|iceberg|dbt|etl|streaming|pipeline|pipelines|analytics|finops|warehouse)\b/.test(
      text,
    )
  ) {
    tags.add("Data Engineering");
  }
  if (
    /\b(ai|llm|llms|prompt|prompts|agent|agents|agentic|gpt|openai|rag|inference|vision|ml)\b/.test(
      text,
    )
  ) {
    tags.add("AI");
    tags.add("LLMs");
  }
  if (/\b(algorithm|algorithms|graph|graphs|complexity|np-hard|sorting|computation)\b/.test(text)) {
    tags.add("Algorithms");
  }
  if (/\b(quantum|qubit|qubits)\b/.test(text)) {
    tags.add("Quantum Computing");
  }
  if (/\b(storytelling|author|authors|creator|publishing|literature)\b/.test(text)) {
    tags.add("Creator Economy");
  }
  if (/\b(leadership|leader|management|culture|executive)\b/.test(text)) {
    tags.add("Leadership");
  }
  if (/\b(open source|github|foss)\b/.test(text)) {
    tags.add("Open Source");
  }

  if (tags.size === 0) {
    tags.add("Architecture");
  }

  tags.add("Substack");
  return Array.from(tags);
}

const PROTECTED_SLUGS = new Set([
  "building-be-your-stories",
  "enterprise-rag-with-local-llms",
  "scaling-lakehouses-spark-iceberg",
  "engineering-handspeak-3d-libras-ai",
  "aldeon-unified-edge-ssr-multi-cloud-ecosystem",
  "architecting-pack-multimodal-ocr-logistics",
  "building-tatu-design-ai-stencil-ar-studio",
  "autonomous-publishing-posthub-step-functions",
  "architecting-swango-dbt-bigquery-medallion-b3-finance",
  "on-memory-deterministic-ai-engineering-governance",
  "local-ai-coding-stack-ollama-opencode-qwen3",
  "ragon-air-gapped-zero-leak-rag-studio",
  "mastering-gemini-models-in-antigravity-agy",
  "antigravity-agy-commands-complete-guide",
]);

async function fetchAllSubstackPosts(): Promise<SubstackPost[]> {
  console.log("Fetching Substack posts from API (paginated)...");
  const all: SubstackPost[] = [];
  const limit = 50;
  for (let offset = 0; offset < 1000; offset += limit) {
    const res = await fetch(
      `https://celio1878.substack.com/api/v1/posts?limit=${limit}&offset=${offset}`,
    );
    if (!res.ok) {
      throw new Error(`Substack API returned ${res.status} at offset ${offset}`);
    }
    const page: unknown = await res.json();
    if (!Array.isArray(page)) {
      throw new Error("Unexpected Substack API response shape (expected an array)");
    }
    all.push(...(page as SubstackPost[]));
    if (page.length < limit) break;
  }
  console.log(`Fetched ${all.length} total posts from Substack.`);

  const substantive = all.filter(
    (p) => !p.title.toLowerCase().includes("automated newsletter update"),
  );
  console.log(`Filtered to ${substantive.length} substantive technical dispatches.`);
  return substantive;
}

async function sync() {
  const posts = await fetchAllSubstackPosts();
  const outputDir = path.resolve(process.cwd(), "app/content/blog");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let createdCount = 0;
  const syncedSlugs = new Set<string>();

  for (const post of posts) {
    if (PROTECTED_SLUGS.has(post.slug)) {
      console.log(`Skipping protected native article: ${post.slug}`);
      continue;
    }
    syncedSlugs.add(post.slug);

    let rawTitle = decodeHtmlEntities(post.title).trim();
    if (post.id === 200012832 || rawTitle.startsWith("# Deep Dive:")) {
      rawTitle = "Deep Dive: Transforming Ideas into Modular Architecture";
    }
    const title = rawTitle.replace(/"/g, '\\"');

    const rawDesc = (post.subtitle || post.description || "").trim();
    const cleanDesc = decodeHtmlEntities(rawDesc).replace(/"/g, '\\"').replace(/\n+/g, " ").trim();

    const rawBody = post.body_html || post.truncated_body_text || "";
    const fullMarkdown = htmlToCleanMarkdown(rawBody, post.id);

    const computedWords = fullMarkdown.split(/\s+/).filter(Boolean).length;
    const wordCount = computedWords > 0 ? computedWords : (post.wordcount ?? 0);
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readTime = `${readTimeMinutes} min read`;

    const excerpt = cleanExcerpt(fullMarkdown, cleanDesc).replace(/"/g, '\\"');
    const date = post.post_date
      ? post.post_date.slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    const tags = deriveTags(rawTitle, cleanDesc);
    const canonicalUrl = post.canonical_url;

    const hasOwnHeadings = extractMarkdownHeadings(fullMarkdown).length > 0;
    const bodySection = hasOwnHeadings
      ? fullMarkdown
      : `## Executive Summary & Strategic Context\n\n${cleanDesc}\n\n## Technical Analysis & Field Perspective\n\n${fullMarkdown || cleanDesc}`;

    const fileContent = `---
title: "${title}"
slug: "${post.slug}"
description: "${cleanDesc}"
excerpt: "${excerpt}"
date: "${date}"
tags: ${JSON.stringify(tags)}
wordCount: ${wordCount}
readTime: "${readTime}"
source: "substack"
lang: "en"
author: "Célio Vieira"
canonicalUrl: "${canonicalUrl}"
---

> **Originally published on Substack Publication.**  
> [Read this full technical dispatch on Substack ↗](${canonicalUrl})

${bodySection}

---

## Continue Reading on Substack

The full publication dispatch, community discussions, and ongoing engineering follow-ups are hosted on Substack:

👉 **[Read Full Article on Substack](${canonicalUrl})**
`;

    const filePath = path.join(outputDir, `${post.slug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf-8");
    createdCount++;
  }

  // Prune local Substack-sourced files whose posts no longer exist remotely.
  let prunedCount = 0;
  for (const file of fs.readdirSync(outputDir).filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    if (PROTECTED_SLUGS.has(slug) || syncedSlugs.has(slug)) continue;
    const raw = fs.readFileSync(path.join(outputDir, file), "utf-8");
    const { data } = parseFrontmatter(raw);
    if (typeof data.canonicalUrl === "string" && data.canonicalUrl) {
      fs.rmSync(path.join(outputDir, file));
      prunedCount++;
      console.log(`Pruned stale Substack article: ${slug}`);
    }
  }

  console.log(
    `✓ Synced ${createdCount} Substack articles (pruned ${prunedCount} stale) into app/content/blog/. Run "bun run content:build" to recompile.`,
  );
}

const isDirectRun =
  typeof process.argv[1] === "string" && process.argv[1].includes("sync-substack");
if (isDirectRun) {
  sync().catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
  });
}
