import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-post.tsx"),
  route("academy", "routes/academy.tsx"),
  route("academy/:slug", "routes/academy-lesson.tsx"),
  route("about", "routes/about.tsx"),
  route("sitemap.xml", "routes/sitemap.tsx"),
  route("rss.xml", "routes/rss.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
