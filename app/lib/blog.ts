export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
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

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
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
      const readTime = calculateReadingTime(content);
      const coverImage = (frontmatter.coverImage as string) || undefined;
      const lang = (frontmatter.lang as string) || "en";
      const author = (frontmatter.author as string) || "Célio Vieira";
      const canonicalUrl = (frontmatter.canonicalUrl as string) || undefined;

      posts.push({
        slug,
        title,
        description,
        date,
        tags,
        readTime,
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
