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
  readTime: string;
  wordCount: number;
  headings: BlogPostHeading[];
  source: "native" | "substack";
  coverImage?: string;
  lang: string;
  author: string;
  content: string;
  canonicalUrl?: string;
}

/**
 * Safely parse frontmatter from raw markdown content without external dependencies.
 */
function parseMarkdownWithFrontmatter(raw: string): {
  frontmatter: Record<string, unknown>;
  content: string;
} {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("---")) {
    return { frontmatter: {}, content: raw };
  }

  const endMarkerIndex = trimmed.indexOf("\n---", 3);
  if (endMarkerIndex === -1) {
    return { frontmatter: {}, content: raw };
  }

  const rawYaml = trimmed.slice(3, endMarkerIndex).trim();
  const content = trimmed.slice(endMarkerIndex + 4).trim();
  const frontmatter: Record<string, unknown> = {};

  for (const line of rawYaml.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    // Check for JSON-style array: ["tag1", "tag2"]
    if (val.startsWith("[") && val.endsWith("]")) {
      try {
        frontmatter[key] = JSON.parse(val);
        continue;
      } catch {
        // Fallback: split by commas
        frontmatter[key] = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
        continue;
      }
    }

    // Number parsing
    if (/^\d+$/.test(val)) {
      frontmatter[key] = Number.parseInt(val, 10);
      continue;
    }

    // Strip outer quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    frontmatter[key] = val;
  }

  return { frontmatter, content };
}

function extractHeadingsFromContent(content: string): BlogPostHeading[] {
  const headings: BlogPostHeading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/<[^>]*>/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function extractExcerptFromContent(content: string, fallbackDesc: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith(">") &&
      !trimmed.startsWith("```") &&
      !trimmed.startsWith("-") &&
      !trimmed.startsWith("👉") &&
      !trimmed.startsWith("[") &&
      trimmed.length > 25
    ) {
      return trimmed.length > 260 ? `${trimmed.slice(0, 255).trim()}…` : trimmed;
    }
  }
  return fallbackDesc;
}

// In Vite, import.meta.glob with eager loads all markdown files at build time
const rawPosts = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const posts: BlogPost[] = [];

  for (const [path, rawContent] of Object.entries(rawPosts)) {
    try {
      const { frontmatter, content } = parseMarkdownWithFrontmatter(rawContent);

      // Extract filename slug as fallback
      const filenameMatch = path.match(/\/([^/]+)\.md$/);
      const fallbackSlug = filenameMatch ? filenameMatch[1] : "post";

      const slug = (frontmatter.slug as string) || fallbackSlug;
      const title = (frontmatter.title as string) || "Untitled Article";
      const description = (frontmatter.description as string) || "";
      const date = (frontmatter.date as string) || "2026-01-01";
      const tags = Array.isArray(frontmatter.tags)
        ? (frontmatter.tags as string[])
        : [];

      // Accurate word count and read time
      const bodyWords = content.trim().split(/\s+/).length;
      const wordCount = typeof frontmatter.wordCount === "number"
        ? frontmatter.wordCount
        : bodyWords;
      const readTime = (frontmatter.readTime as string) ||
        `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      const coverImage = (frontmatter.coverImage as string) || undefined;
      const lang = (frontmatter.lang as string) || "en";
      const author = (frontmatter.author as string) || "Célio Vieira";
      const canonicalUrl = (frontmatter.canonicalUrl as string) || undefined;
      const source: "native" | "substack" = canonicalUrl ? "substack" : "native";

      // Headings & excerpt
      const contentHeadings = extractHeadingsFromContent(content);
      const headings = contentHeadings.length > 0
        ? contentHeadings
        : Array.isArray(frontmatter.headings)
          ? (frontmatter.headings as string[]).map((h) => ({
              id: h.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
              text: h,
              level: 2 as const,
            }))
          : [];

      const excerpt = (frontmatter.excerpt as string) ||
        extractExcerptFromContent(content, description);

      posts.push({
        slug,
        title,
        description,
        excerpt,
        date,
        tags,
        readTime,
        wordCount,
        headings,
        source,
        coverImage,
        lang,
        author,
        content,
        canonicalUrl,
      });
    } catch (err) {
      console.error(`Failed to parse blog post at ${path}:`, err);
    }
  }

  // Sort descending by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = posts;
  return cachedPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const all = getAllPosts();
  const set = new Set<string>();
  all.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  const all = getAllPosts();
  return all.filter((p) => p.tags.includes(tag));
}
