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
}

function deriveTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set<string>();

  if (/aws|ec2|glue|sqs|cloud|eks/.test(text)) {
    tags.add("AWS");
    tags.add("Cloud");
  }
  if (/data|lakehouse|spark|iceberg|dbt|etl|streaming|pipeline/.test(text)) {
    tags.add("Data Engineering");
  }
  if (/ai|llm|prompt|agent|gpt|openai|rag|inference|foundation model/.test(text)) {
    tags.add("AI");
    tags.add("LLMs");
  }
  if (/algorithm|data structure|complexity|np-hard|graph|computation/.test(text)) {
    tags.add("Algorithms");
  }
  if (/quantum/.test(text)) {
    tags.add("Quantum Computing");
  }
  if (/storytelling|author|creator|publishing/.test(text)) {
    tags.add("Creator Economy");
  }
  if (/leadership|leader|management/.test(text)) {
    tags.add("Leadership");
  }
  if (/open source|github/.test(text)) {
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
  ]);

  let createdCount = 0;

  for (const post of posts) {
    if (protectedSlugs.has(post.slug)) {
      console.log(`Skipping protected native article: ${post.slug}`);
      continue;
    }

    const title = post.title.trim().replace(/"/g, '\\"');
    const description = (post.subtitle || post.description || "")
      .trim()
      .replace(/"/g, '\\"')
      .replace(/\n+/g, " ");
    const date = post.post_date ? post.post_date.slice(0, 10) : new Date().toISOString().slice(0, 10);
    const tags = deriveTags(post.title, description);
    const canonicalUrl = post.canonical_url;

    const fileContent = `---
title: "${title}"
slug: "${post.slug}"
description: "${description}"
date: "${date}"
tags: ${JSON.stringify(tags)}
lang: "en"
author: "Célio Vieira"
canonicalUrl: "${canonicalUrl}"
---

> **Originally published on Substack.**  
> [Read this full technical dispatch on Substack ↗](${canonicalUrl})

## Dispatch Brief

${description}

### Architectural Context & Focus

In this publication dispatch, Célio explores technical frontiers, system engineering trade-offs, and practical lessons:

- Deep dive into architectural trade-offs, resilience patterns, and scalability bottlenecks.
- Applying first-principles engineering to eliminate complexity and optimize real-world throughput.
- Exploring state-of-the-art developments across AI, data platforms, and distributed systems.

---

### Continue Reading on Substack

The full dispatch, code references, and ongoing engineering conversation are hosted on Substack:

👉 **[Read Full Article on Substack](${canonicalUrl})**
`;

    const filePath = path.join(outputDir, `${post.slug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf-8");
    createdCount++;
  }

  console.log(`Successfully synced ${createdCount} Substack articles into ${outputDir}!`);
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
