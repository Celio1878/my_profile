# TASKS.md — Project Roadmap & Progress

## Completed Tasks

### Phase 1: Entrepreneurial Pivot & Route Architecture
- [x] Redefined project vision from job resume/CV to commercial venture showcase and knowledge hub.
- [x] Redefined application architecture to multi-page structure in `app/routes.ts`:
  - [x] `/`: Flagship showcase (Hero, Aldeon Ecosystem, Capabilities, Insights preview, Contact)
  - [x] `/blog`: Knowledge Hub index with Substack banner, search, and topic tags
  - [x] `/blog/:slug`: Dynamic blog post reader with Markdown rendering
  - [x] `/about`: Streamlined founder profile (Mission, Current builds, Principles, Socials)
- [x] Completely removed legacy corporate employment history, education lists, certifications, and embedded PDF viewer.

### Phase 2: Dependency Upgrades
- [x] Upgraded `react-router`, `@react-router/node`, `@react-router/serve`, and `@react-router/dev` to `8.4.0`.
- [x] Installed `marked@18.1.0` for in-repository Markdown parsing.
- [x] Upgraded `react-intersection-observer` to `11.0.1`.
- [x] Upgraded `@types/node` to `26.6.4`.
- [x] Fixed `tsconfig.json` compiler options (`baseUrl` removal and path resolution).

### Phase 3: Terminal & Vector Minimalist Redesign
- [x] Redesigned visual palette in `app/app.css` (carbon `#090b10`, titanium `#212836`, emerald `#10b981`, amber `#f59e0b`).
- [x] Implemented interactive dot-matrix canvas vector grid in `app/components/interactive-background.tsx`.
- [x] Set canonical brand logo, favicon, and author avatar to `/me.jpeg`.
- [x] Removed all references to deleted PNG screenshots (`public/*.png`).
- [x] Updated title and metadata across all pages to `Célio Vieira — Founder, AI & Data Engineer`.

### Phase 4: Aldeon Ecosystem & Child Ventures
- [x] Featured **Aldeon** (`aldeon.app`) as the umbrella venture studio.
- [x] Built vector showcase cards for child apps:
  - [x] **Be Your Stories (BYS)** (Web, iOS App Store, Android Google Play)
  - [x] **Pack** (Autonomous condo mailroom notifications)
  - [x] **TATU Design (T3O2)** (AI tattoo studio & generative art)
  - [x] **PostHub** (Multi-platform social content distribution)
  - [x] **NodeJS App Builder** & **AWS CDK Factory** (Developer infrastructure on npm)

### Phase 5: Streamlined Internationalization (EN / PT-BR)
- [x] Permanently eliminated German (`de`) and Spanish (`es`).
- [x] Retained strictly English (`en`, default) and Brazilian Portuguese (`pt-BR`).
- [x] Added binary `EN / PT` toggle in desktop navigation and mobile drawer.
- [x] Fully translated and synchronized all dictionaries in `app/lib/profile-translations.ts`.

### Phase 6: Channels, Substack & Contact Overhaul
- [x] Updated primary contact email to `contact@celiovieira.com`.
- [x] Integrated X (Twitter) (`https://x.com/celio1878`).
- [x] Integrated Substack (`https://substack.com/@celio1878`) with dedicated callout banner on `/blog`.
- [x] Maintained LinkedIn, GitHub (personal & BYS), and YouTube.

### Phase 7: Governance & Verification
- [x] Created & updated `AGENTS.md`, `RULES.md`, `CONTEXT.md`, `MEMORY.md`, `SUMMARY.md`, `TASKS.md`, `README.md`.
- [x] Passed `bun run lint` with exit code 0 (`--max-warnings=0`).
- [x] Passed `bun run typecheck` with exit code 0.
- [x] Passed `bun run build` with exit code 0.

### Phase 8: Job-Seeking Tone Elimination & Substack Articles Sync
- [x] Simplified main route hero bio to exact copy: "Engineering high-precision applied AI pipelines, agents project architecture, and lakehouse architectures — powered by deep foundations in Distributed System Architecture and FullStack Product Engineering."
- [x] Removed hero top status badge and avatar "ONLINE" badge.
- [x] Removed location note ("Minas Gerais, Brazil • Available for Global Remote Advisory & Collaboration") from both `/` and `/about`.
- [x] Created `scripts/sync-substack.ts` and synced 68 technical essays from Substack into `app/content/blog/`.
- [x] Enhanced `app/lib/blog.ts` to parse `canonicalUrl`.
- [x] Enhanced `app/routes/blog.tsx` with Substack badges and direct external links.
- [x] Enhanced `app/routes/blog-post.tsx` with canonical SEO link and dedicated Substack dispatch banner.
- [x] Added `sync-substack` script to `package.json`.

### Phase 9: Profile Narrative Expansion & Deep Technical Profile
- [x] Analyzed `public/resume.pdf` for engineering competencies, cloud architecture specialization, petabyte lakehouses, and self-hosted AI inference.
- [x] Expanded `{dict.about.missionParagraphs}` into 4 structured, technically rich paragraphs in `app/lib/profile-translations.ts` in both `en` and `pt-BR`.
- [x] Updated `app/routes/about.tsx` with responsive multi-paragraph layout (`space-y-4 max-w-3xl`) and top-aligned avatar (`items-center md:items-start`).
- [x] Strictly avoided corporate employer names, job titles, or date ranges.
- [x] Passed all quality gates (`bun run lint`, `bun run typecheck`, `bun run build`).

---

## Future Roadmap & Backlog

- [ ] **RSS Feed**: Generate static `public/rss.xml` for blog articles.
- [ ] **Interactive Canvas Architecture Diagrams**: Canvas/Mermaid visualizations for complex lakehouse and RAG pipelines in blog articles.
- [ ] **Custom Vercel Analytics Events**: Track clicks to Apple App Store, Google Play, Aldeon, and Substack subscriptions.