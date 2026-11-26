/**
 * Runtime blog data access.
 *
 * Metadata for all articles (including localized pt-BR blueprint metadata)
 * is compiled at build time (scripts/build-blog.ts) into a small JSON index.
 * Full rendered HTML lives in per-slug JSON modules loaded on demand per locale,
 * so the shared client bundle never carries the whole article corpus.
 */
import type { SupportedLocale } from "~/i18n";
import postsIndex from "../content/generated/index.json";

export interface BlogPostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPostLocaleMeta {
  title: string;
  description: string;
  excerpt: string;
  headings: BlogPostHeading[];
  wordCount: number;
  readTimeMinutes: number;
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
  availableLocales?: SupportedLocale[];
  translations?: Partial<Record<SupportedLocale, BlogPostLocaleMeta>>;
}

export interface ResolvedBlogPost extends BlogPost {
  resolvedLocale: SupportedLocale;
  isFallback: boolean;
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

export function resolvePostForLocale(post: BlogPost, locale: SupportedLocale): ResolvedBlogPost {
  if (locale === "pt-BR" && post.translations?.["pt-BR"]) {
    const pt = post.translations["pt-BR"];
    return {
      ...post,
      title: pt.title,
      description: pt.description,
      excerpt: pt.excerpt,
      headings: pt.headings,
      wordCount: pt.wordCount,
      readTimeMinutes: pt.readTimeMinutes,
      resolvedLocale: "pt-BR",
      isFallback: false,
    };
  }
  return {
    ...post,
    resolvedLocale: "en",
    isFallback: locale !== "en",
  };
}

/* Lazy per-article HTML modules (one chunk per slug + locale, fetched on demand). */
const contentModules = import.meta.glob<{ slug: string; html: string }>(
  ["../content/generated/*.json", "!../content/generated/index.json"],
  { import: "default" },
);

const ptContentModules = import.meta.glob<{ slug: string; lang: string; html: string }>(
  "../content/generated/pt-BR/*.json",
  { import: "default" },
);

export async function loadPostHtml(
  slug: string,
  locale: SupportedLocale = "en",
): Promise<string | undefined> {
  if (locale === "pt-BR") {
    const ptLoader = ptContentModules[`../content/generated/pt-BR/${slug}.json`];
    if (ptLoader) {
      const ptMod = await ptLoader();
      if (ptMod?.html) return ptMod.html;
    }
  }
  const loader = contentModules[`../content/generated/${slug}.json`];
  if (!loader) return undefined;
  const mod = await loader();
  return mod?.html;
}
