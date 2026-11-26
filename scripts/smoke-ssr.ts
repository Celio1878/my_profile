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
    includes: [
      "<h1",
      "skip-link",
      "Célio Vieira",
      "twitch.tv/celio1878",
      "medium.com/@celio.vieira1878",
      "/academy",
      "aldeon.app/rag-on",
      "aldeon.app/mem-on",
      "aldeon.app/postshub",
      "apps.apple.com/app/pack/id6797659977",
      "apps.apple.com/us/app/postshub/id6813979346",
    ],
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
    name: "academy hub renders with YouTube link and no Twitch CTA",
    path: "/academy",
    status: 200,
    includes: ["<h1", "Academy", "youtube.com/@celio_vieira"],
    excludes: ["Live Coding on Twitch"],
    custom: (body) => {
      const main = body.split("<main")[1]?.split("</main>")[0] ?? "";
      return main.includes("twitch.tv/celio1878")
        ? "unexpected twitch.tv/celio1878 inside /academy <main>"
        : null;
    },
  },
  {
    name: "academy inaugural lesson renders with JSON-LD",
    path: "/academy/local-ai-coding-ollama-opencode-qwen3",
    status: 200,
    includes: ["application/ld+json", "RTX 3070", "Ollama", "OpenCode"],
  },
  {
    name: "missing academy lesson returns real 404",
    path: "/academy/definitely-missing-lesson",
    status: 404,
  },
  {
    name: "RagOn blueprint renders Shiki code + JSON-LD + parsed markdown",
    path: "/blog/ragon-air-gapped-zero-leak-rag-studio",
    status: 200,
    includes: ["shiki", "application/ld+json", "BM25", "FNV-1a", "init-rag-on.mjs"],
    excludes: ["**Unbounded Vector-DB"],
  },
  {
    name: "local AI blueprint renders Shiki code + JSON-LD + parsed markdown",
    path: "/blog/local-ai-coding-stack-ollama-opencode-qwen3",
    status: 200,
    includes: [
      "shiki",
      "application/ld+json",
      "RTX 3070",
      "OpenCode",
      "Qwen3-Coder",
      "qwen3.5-fast:9b",
      "OLLAMA_NUM_PARALLEL=1",
    ],
    excludes: ["**Zero Data Leakage", "**NVIDIA RTX 3070"],
  },
  {
    name: "Antigravity + Gemini blueprint renders Shiki code + JSON-LD + parsed markdown",
    path: "/blog/mastering-gemini-models-in-antigravity-agy",
    status: 200,
    includes: [
      "shiki",
      "application/ld+json",
      "Antigravity",
      "Hydrogen",
      "Neon",
      "Carbon",
      "hooks.json",
    ],
    excludes: ["**Gemini 4 Hydrogen", "**Deny"],
  },
  {
    name: "Antigravity slash commands blueprint renders Shiki code + JSON-LD + parsed markdown",
    path: "/blog/antigravity-agy-slash-commands-complete-guide",
    status: 200,
    includes: [
      "shiki",
      "application/ld+json",
      "/grill-me",
      "/swarm",
      "/compact",
      "/rollback",
      "/skills reload",
    ],
    excludes: ["**/plan**", "**Planning & Execution**"],
  },
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
  {
    name: "about renders with Twitch and Medium links",
    path: "/about",
    status: 200,
    includes: ["About Célio Vieira", "twitch.tv/celio1878", "medium.com/@celio.vieira1878"],
  },
  {
    name: "sitemap.xml serves valid XML with Academy and Local AI blueprint",
    path: "/sitemap.xml",
    status: 200,
    includes: [
      "<urlset",
      "<loc>",
      "/academy",
      "/blog/local-ai-coding-stack-ollama-opencode-qwen3",
      "/blog/ragon-air-gapped-zero-leak-rag-studio",
      "/blog/mastering-gemini-models-in-antigravity-agy",
      "/blog/antigravity-agy-slash-commands-complete-guide",
    ],
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
