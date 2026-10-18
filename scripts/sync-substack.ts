import fs from "node:fs";
import path from "node:path";

interface SubstackPost {
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
  // Decode &amp; first to avoid double decoding
  s = s.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&#x27;/g, "'");
  s = s.replace(/&#8211;/g, "–");
  s = s.replace(/&#8212;/g, "—");
  s = s.replace(/&#8230;/g, "…");
  s = s.replace(/&nbsp;/g, " ");
  return s;
}

export function htmlToCleanMarkdown(html: string): string {
  if (!html) return "";
  let text = decodeHtmlEntities(html);
  text = decodeHtmlEntities(text); // Unescape secondary layers if any

  // Headings
  text = text.replace(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi, (_, inner) => "\n\n## " + inner.trim() + "\n\n");
  text = text.replace(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/gi, (_, inner) => "\n\n### " + inner.trim() + "\n\n");

  // Bold & italic
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => "**" + inner.trim() + "**");
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => "*" + inner.trim() + "*");
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => "`" + inner.trim() + "`");

  // Links
  text = text.replace(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => "[" + inner.trim() + "](" + href + ")");

  // List items
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => "\n- " + inner.trim());
  text = text.replace(/<\/?(ul|ol)[^>]*>/gi, "\n");

  // Paragraphs
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => "\n\n" + inner.trim() + "\n\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Normalize multiple newlines
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text;
}

export function cleanExcerpt(text: string): string {
  let cleaned = htmlToCleanMarkdown(text);
  // Remove markdown headings from excerpt
  cleaned = cleaned.replace(/^##+\s+.*$/gm, "").trim();
  // Strip partial word before ellipsis like "remarkable lo…" -> "remarkable…"
  cleaned = cleaned.replace(/\s+\w+…$/, "…");
  cleaned = cleaned.replace(/\s+…$/, "…");
  return cleaned.trim();
}

function deriveTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set<string>();

  if (/aws|ec2|glue|sqs|cloud|eks|serverless|lambda|dynamodb/.test(text)) {
    tags.add("AWS");
    tags.add("Cloud");
  }
  if (/data|lakehouse|spark|iceberg|dbt|etl|streaming|pipeline|analytics|finops/.test(text)) {
    tags.add("Data Engineering");
  }
  if (/ai|llm|prompt|agent|gpt|openai|rag|inference|foundation model|deep learning|vision/.test(text)) {
    tags.add("AI");
    tags.add("LLMs");
  }
  if (/algorithm|data structure|complexity|np-hard|graph|computation|sorting/.test(text)) {
    tags.add("Algorithms");
  }
  if (/quantum|qubit/.test(text)) {
    tags.add("Quantum Computing");
  }
  if (/storytelling|author|creator|publishing|literature/.test(text)) {
    tags.add("Creator Economy");
  }
  if (/leadership|leader|management|culture|executive/.test(text)) {
    tags.add("Leadership");
  }
  if (/open source|github|foss/.test(text)) {
    tags.add("Open Source");
  }

  // Fallbacks if nothing matched
  if (tags.size === 0) {
    tags.add("Architecture");
  }

  tags.add("Substack");
  return Array.from(tags);
}

async function fetchAllSubstackPosts(): Promise<SubstackPost[]> {
  console.log("Fetching Substack posts from API...");
  const p1: SubstackPost[] = await fetch("https://celio1878.substack.com/api/v1/posts?limit=50").then((r) => r.json());
  const p2: SubstackPost[] = await fetch("https://celio1878.substack.com/api/v1/posts?limit=50&offset=50").then((r) => r.json());
  const all = [...p1, ...p2];
  console.log(`Fetched ${all.length} total posts from Substack.`);

  // Filter out automated newsletter updates
  const substantive = all.filter((p) => !p.title.toLowerCase().includes("automated newsletter update"));
  console.log(`Filtered to ${substantive.length} substantive technical dispatches.`);
  return substantive;
}

async function sync() {
  const posts = await fetchAllSubstackPosts();
  const outputDir = path.resolve(process.cwd(), "app/content/blog");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Manual core articles to preserve
  const protectedSlugs = new Set([
    "building-be-your-stories",
    "enterprise-rag-with-local-llms",
    "scaling-lakehouses-spark-iceberg",
    "engineering-handspeak-3d-libras-ai",
    "aldeon-unified-edge-ssr-multi-cloud-ecosystem",
    "architecting-pack-multimodal-ocr-logistics",
    "building-tatu-design-ai-stencil-ar-studio",
    "autonomous-publishing-posthub-step-functions",
  ]);

  let createdCount = 0;

  for (const post of posts) {
    if (protectedSlugs.has(post.slug)) {
      console.log(`Skipping protected native article: ${post.slug}`);
      continue;
    }

    const title = decodeHtmlEntities(post.title).trim().replace(/"/g, '\\"');
    const rawDesc = (post.subtitle || post.description || "").trim();
    const cleanDesc = decodeHtmlEntities(rawDesc).replace(/"/g, '\\"').replace(/\n+/g, " ").trim();

    // Word count and reading time
    const wordCount = post.wordcount && post.wordcount > 0 ? post.wordcount : 1100;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readTime = `${readTimeMinutes} min read`;

    // Process excerpt and opening content
    const rawBodySnippet = post.truncated_body_text || post.body_html || "";
    let openingMarkdown = htmlToCleanMarkdown(rawBodySnippet);
    openingMarkdown = openingMarkdown.replace(/\s+\w+…$/, "…").replace(/\s+…$/, "…");
    const excerpt = cleanExcerpt(rawBodySnippet || cleanDesc).replace(/"/g, '\\"');

    const date = post.post_date ? post.post_date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    const tags = deriveTags(post.title, cleanDesc);
    const canonicalUrl = post.canonical_url;

    // Derived architectural outline headings
    const headings = [
      "Executive Summary & Strategic Context",
      "Technical Analysis & Field Perspective",
      "Architectural Trade-offs & Scalability",
      "Continue Reading on Substack",
    ];

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
headings: ${JSON.stringify(headings)}
---

> **Originally published on Substack Publication.**  
> [Read this full technical dispatch on Substack ↗](${canonicalUrl})

## Executive Summary & Strategic Context

${cleanDesc}

## Technical Analysis & Field Perspective

${openingMarkdown || cleanDesc}

## Architectural Trade-offs & Scalability

In this technical dispatch, Célio analyzes the architectural trade-offs, engineering bottlenecks, and production practices essential for high-throughput modern systems:

- **First-Principles Evaluation**: Dissecting real-world constraints across latency, cost efficiency, and developer productivity.
- **Resilience & Fault Isolation**: Mitigating single points of failure, cold starts, and cascading operational degradation.
- **Enterprise Execution**: Moving beyond theoretical prototypes to robust, monitored production infrastructure.

---

## Continue Reading on Substack

The full unedited publication dispatch, community discussions, and ongoing engineering follow-ups are hosted on Substack:

👉 **[Read Full Article on Substack](${canonicalUrl})**
`;

    const filePath = path.join(outputDir, `${post.slug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf-8");
    createdCount++;
  }

  console.log(`Successfully synced and sanitized ${createdCount} Substack articles into ${outputDir}!`);
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
