import { data } from "react-router";
import type { Route } from "./+types/not-found";

export function loader() {
  throw data("Page not found", { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page Not Found — Célio Vieira" }, { name: "robots", content: "noindex" }];
}
