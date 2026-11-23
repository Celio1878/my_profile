import { getAllPosts } from "~/lib/blog";
import type { Route } from "./+types/sitemap";

const SITE_URL = "https://celiovieira.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function loader({}: Route.LoaderArgs) {
  const posts = getAllPosts();
  const staticUrls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    { loc: `${SITE_URL}/blog`, priority: "0.9" },
    { loc: `${SITE_URL}/about`, priority: "0.7" },
  ];

  const urls = [
    ...staticUrls.map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <priority>${entry.priority}</priority>\n  </url>`,
    ),
    ...posts.map(
      (post) =>
        `  <url>\n    <loc>${escapeXml(`${SITE_URL}/blog/${post.slug}`)}</loc>\n    <lastmod>${escapeXml(post.date)}</lastmod>\n    <priority>0.6</priority>\n  </url>`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
