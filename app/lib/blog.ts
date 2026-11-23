/**
 * Runtime blog data access.
 *
 * Metadata for all articles is compiled at build time (scripts/build-blog.ts)
 * into a single small JSON index. Full rendered HTML lives in per-slug JSON
 * modules loaded on demand, so the shared client bundle never carries the
 * whole article corpus.
 */
import postsIndex from "../content/generated/index.json";

export interface BlogPostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTimeMinutes: number;
  wordCount: number;
  headings: BlogPostHeading[];
  source: "native" | "substack";
  coverImage?: string;
  lang: string;
  author: string;
  canonicalUrl?: string;
}

const posts: BlogPost[] = postsIndex as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) set.add(tag);
  }
  return Array.from(set).sort();
}

/* Lazy per-article HTML modules (one chunk per slug, fetched on demand). */
const contentModules = import.meta.glob<{ slug: string; html: string }>(
  ["../content/generated/*.json", "!../content/generated/index.json"],
  { import: "default" },
);

export async function loadPostHtml(slug: string): Promise<string | undefined> {
  const loader = contentModules[`../content/generated/${slug}.json`];
  if (!loader) return undefined;
  const mod = await loader();
  return mod?.html;
}
