/**
 * SSR smoke test — boots the production server and verifies critical
 * rendering, SEO and routing behavior. Run after `bun run build`:
 *
 *   bun run smoke
 *
 * Exits non-zero on any failed assertion.
 */
import { spawn } from "node:child_process";

const PORT = Number(process.env.SMOKE_PORT || 3100);
const BASE = `http://localhost:${PORT}`;

interface Check {
  name: string;
  path: string;
  status: number;
  includes?: string[];
  excludes?: string[];
  custom?: (body: string) => string | null;
}

const checks: Check[] = [
  {
    name: "home renders with a single title and an h1",
    path: "/",
    status: 200,
    includes: ["<h1", "skip-link", "Célio Vieira"],
    custom: (body) => {
      const titles = body.match(/<title>/g) || [];
      return titles.length === 1 ? null : `expected 1 <title>, found ${titles.length}`;
    },
  },
  {
    name: "home SSR content is visible (no opacity:0 gating)",
    path: "/",
    status: 200,
    excludes: ["opacity:0"],
  },
  { name: "blog index renders", path: "/blog", status: 200, includes: ["Knowledge Hub"] },
  {
    name: "article renders parsed inline markdown + highlighting",
    path: "/blog/enterprise-rag-with-local-llms",
    status: 200,
    includes: ["<strong>self-hosted", "shiki", "application/ld+json", 'rel="canonical"'],
    excludes: ["**self-hosted"],
  },
  {
    name: "blueprint headings render clean (no raw backticks)",
    path: "/blog/architecting-swango-dbt-bigquery-medallion-b3-finance",
    status: 200,
    excludes: ["<span>1. The 20-Table `"],
  },
  {
    name: "missing article returns real 404",
    path: "/blog/definitely-missing-article",
    status: 404,
  },
  { name: "unknown route returns real 404", path: "/no-such-page", status: 404 },
  { name: "about renders", path: "/about", status: 200, includes: ["About Célio Vieira"] },
  {
    name: "sitemap.xml serves valid XML",
    path: "/sitemap.xml",
    status: 200,
    includes: ["<urlset", "<loc>"],
  },
  {
    name: "rss.xml serves valid RSS",
    path: "/rss.xml",
    status: 200,
    includes: ["<rss", "<channel>"],
  },
];

async function waitForServer(timeoutMs = 20000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.status > 0) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return false;
}

async function main() {
  const server = spawn("bun", ["run", "start"], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: "ignore",
  });

  let failures = 0;
  try {
    if (!(await waitForServer())) {
      console.error("✗ Server did not become ready in time");
      process.exit(1);
    }

    for (const check of checks) {
      const res = await fetch(`${BASE}${check.path}`);
      const body = await res.text();
      const problems: string[] = [];

      if (res.status !== check.status) {
        problems.push(`status ${res.status}, expected ${check.status}`);
      }
      for (const needle of check.includes || []) {
        if (!body.includes(needle)) problems.push(`missing "${needle}"`);
      }
      for (const needle of check.excludes || []) {
        if (body.includes(needle)) problems.push(`unexpected "${needle}"`);
      }
      if (check.custom) {
        const problem = check.custom(body);
        if (problem) problems.push(problem);
      }

      if (problems.length > 0) {
        failures++;
        console.error(`✗ ${check.name}\n    ${problems.join("\n    ")}`);
      } else {
        console.log(`✓ ${check.name}`);
      }
    }
  } finally {
    server.kill("SIGTERM");
  }

  if (failures > 0) {
    console.error(`\n${failures} smoke check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll SSR smoke checks passed.");
}

main().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});
