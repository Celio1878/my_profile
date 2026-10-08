# Célio Vieira — Founder, AI & Data Engineer

A modern, high-performance web platform showcasing Célio Vieira's commercial ventures, digital products, applied AI infrastructure, and engineering knowledge. Designed with a **Terminal & Vector Minimalist** aesthetic and built with React Router 8, React 19, Vite, and Tailwind CSS v4.

---

## 🚀 Vision & Objectives

- **The Aldeon Ecosystem:** Showcase **Aldeon** (`aldeon.app`) as the umbrella venture studio alongside active child products:
  - **Be Your Stories (BYS):** Cross-platform storytelling platform on [Web](https://beyourstories.com), [Apple App Store](https://apps.apple.com/app/be-your-stories/id6748356526), and [Google Play](https://play.google.com/store/apps/details?id=com.celio1878.beyourstories).
  - **Pack:** Autonomous condo mailroom automation.
  - **TATU Design (T3O2):** Generative tattoo design studio.
  - **PostHub:** Multi-platform social content distribution.
  - **NodeJS App Builder & AWS CDK Factory:** Modular developer tooling on npm.
- **Knowledge Hub (`/blog`):** In-depth technical blueprints and architectural retrospectives on AI, Lakehouses, Cloud, and Product Engineering, plus Substack dispatches.
- **Founder Profile (`/about`):** Personal mission, what is currently being built, operating principles, and direct collaboration channels.
- **Bilingual Reach:** English (`en`, default) and Brazilian Portuguese (`pt-BR`) with automatic browser language detection and instant `EN / PT` toggle.

---

## 🧭 Route Architecture

- `/` — **Flagship Showcase:** Value proposition hero, Aldeon Ecosystem vector cards, core capabilities, and latest insights preview.
- `/blog` — **Knowledge Hub Index:** Substack publication banner, search bar, topic tags, and architectural article cards.
- `/blog/:slug` — **Article Reader:** Dynamic Markdown post reader with code syntax styling, copy-to-clipboard buttons, reading time estimates, author bio, and social sharing.
- `/about` — **Streamlined Founder Profile:** Personal mission, current builds across the Aldeon ecosystem, operating principles, and direct contact channels.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + React Router 8 (with SSR build) |
| **Language** | TypeScript 6.0.3 (Strict mode) |
| **Styling** | Tailwind CSS v4 (Terminal & Vector Minimalist palette) |
| **Interactive Canvas** | HTML5 dot-matrix vector grid with mouse flashlight illumination |
| **Markdown Engine** | `marked` (v18) + Vite eager raw glob |
| **UI Primitives** | Custom Radix/Tailwind components (`Card`, `Badge`, `Separator`) |
| **Icons** | `lucide-react` + inline SVG brand logos (X, Substack, LinkedIn, GitHub, YouTube) |
| **Internationalization** | Custom Context (`app/i18n.tsx` + `app/lib/profile-translations.ts`), `en` & `pt-BR` |
| **Package Manager** | Bun |
| **Hosting & Analytics** | Vercel (Analytics + SpeedInsights) |

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
# Sync latest technical dispatches from Substack
bun run sync-substack

# Typecheck
bun run typecheck

# Lint with zero warnings
bun run lint

# Production build
bun run build
```

---

## 🤖 Governance & Guidelines

- [AGENTS.md](./AGENTS.md) — Autonomous agent operating manual, execution workflows, and error prevention checklists.
- [RULES.md](./RULES.md) — Project architecture, coding standards, and UI invariants.
- [CONTEXT.md](./CONTEXT.md) — Full project context and system architecture.
- [MEMORY.md](./MEMORY.md) — Solved problems, framework quirks, and lessons learned.
- [TASKS.md](./TASKS.md) — Completed milestones and future roadmap.
- [SUMMARY.md](./SUMMARY.md) — Session-by-session learning and change log.
