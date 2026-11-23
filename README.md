# Célio Vieira — Founder, AI & Data Engineer

A modern, high-performance web platform showcasing Célio Vieira's commercial ventures, digital products, applied AI infrastructure, and engineering knowledge. Designed with a **Terminal & Vector Minimalist** aesthetic and built with React Router 8, React 19, Vite, and Tailwind CSS v4.

---

## 🚀 Vision & Objectives

- **The Aldeon Ecosystem:** Showcase **Aldeon** (`aldeon.app`) as the umbrella venture studio alongside 7 active child products:
  - **SwanGo:** B3-first financial control & market intelligence ([aldeon.app/swango](https://aldeon.app/swango)).
  - **OnMemory:** AI engineering memory governance protocol ([aldeon.app/on-memory](https://aldeon.app/on-memory)).
  - **HandSpeak:** Real-time 3D Libras translation & accessibility ([aldeon.app/handspeak](https://aldeon.app/handspeak)).
  - **Be Your Stories (BYS):** Cross-platform storytelling platform on [Web](https://aldeon.app/bys), [Apple App Store](https://apps.apple.com/app/be-your-stories/id6812739940), and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.bys).
  - **Pack:** Autonomous condo mailroom automation.
  - **TATU Design (T3O2):** AI tattoo stencil studio & AR skin projection.
  - **PostHub:** Multi-platform social content distribution.
  - **NodeJS App Builder & AWS CDK Factory:** Modular developer tooling on npm.
- **Knowledge Hub (`/blog`):** In-depth technical blueprints and architectural retrospectives on AI, Lakehouses, Cloud, and Product Engineering, plus Substack dispatches.
- **Founder Profile (`/about`):** Personal mission, what is currently being built, operating principles, and direct collaboration channels.
- **Bilingual Reach:** English (`en`, default) and Brazilian Portuguese (`pt-BR`) with automatic browser language detection and instant `EN / PT` toggle.

---

## 🧭 Route Architecture

- `/` — **Flagship Showcase:** Value proposition hero, Aldeon Ecosystem vector cards, core capabilities, and latest insights preview.
- `/blog` — **Knowledge Hub Index:** Substack publication banner, URL-synced search/filters (`?q=&tag=&source=`), topic tags, and architectural article cards.
- `/blog/:slug` — **Article Reader:** Build-time rendered & sanitized Markdown with Shiki syntax highlighting, guarded copy buttons, TOC scroll spy, reading progress, BlogPosting JSON-LD, and X/LinkedIn/Web Share actions. Real 404 for missing slugs.
- `/about` — **Streamlined Founder Profile:** Personal mission, current builds across the Aldeon ecosystem, operating principles, and direct contact channels.
- `/sitemap.xml` & `/rss.xml` — SEO sitemap and RSS 2.0 feed (resource routes).
- `*` — Branded 404/error page (no stack traces in production).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + React Router 8 (with SSR build) |
| **Language** | TypeScript 6.0.3 (Strict mode) |
| **Styling** | Tailwind CSS v4 (Terminal & Vector Minimalist palette) |
| **Interactive Canvas** | HTML5 dot-matrix vector grid with mouse flashlight illumination |
| **Markdown Engine** | Build-time pipeline: `marked` v18 + Shiki (dual themes) + `sanitize-html` → metadata index + lazy per-article HTML |
| **UI Primitives** | Custom Radix/Tailwind components (`Card`, `Badge`) + `@tailwindcss/typography` |
| **Icons** | `lucide-react` + canonical brand SVGs (`app/components/brand-icons.tsx`) |
| **Internationalization** | Custom Context (`app/i18n.tsx` + `app/lib/profile-translations.ts`), `en` & `pt-BR`, full parity |
| **Package Manager** | Bun |
| **Hosting & Analytics** | Vercel (Analytics + SpeedInsights + custom outbound events); Bun Dockerfile; GitHub Actions CI |

---

## 📦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.3 or later) installed locally.

### Development
```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

### Validation & Build
```bash
# Sync latest technical dispatches from Substack, then recompile content
bun run sync-substack
bun run content:build

# Full quality gate chain (also runs in CI)
bun run lint          # ESLint, zero warnings
bun run typecheck     # React Router typegen + tsc
bun run format:check  # Prettier
bun run test          # Vitest content-pipeline suite
bun run audit:content # Corpus + compiled index integrity
bun run build         # Production client + SSR bundles
bun run smoke         # SSR smoke tests against the production server

# Regenerate brand assets (OG card + PWA icons) after changing public/me.jpeg
bun run scripts/build-assets.ts
```

---

## 🤖 Governance & Guidelines

- [AGENTS.md](./AGENTS.md) — Autonomous agent operating manual, execution workflows, and error prevention checklists.
- [RULES.md](./RULES.md) — Project architecture, coding standards, and UI invariants.
- [CONTEXT.md](./CONTEXT.md) — Full project context and system architecture.
- [MEMORY.md](./MEMORY.md) — Solved problems, framework quirks, and lessons learned.
- [TASKS.md](./TASKS.md) — Completed milestones and future roadmap.
- [SUMMARY.md](./SUMMARY.md) — Session-by-session learning and change log.
