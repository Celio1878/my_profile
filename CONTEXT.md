# CONTEXT.md — Project Context

## What This Project Is
A high-performance web platform serving as **Célio Vieira's** commercial showcase, venture portfolio, and knowledge hub. Designed with a **Terminal & Vector Minimalist** aesthetic, the platform highlights the **Aldeon** umbrella venture studio (`aldeon.app`), 7 live products (SwanGo, OnMemory, HandSpeak, Be Your Stories on Web/iOS/Android, Pack, TATU Design, PostHub), developer tooling (NodeJS App Builder, AWS CDK Factory), commercial capabilities, and deep technical blueprints (AI, Lakehouses, Distributed Cloud Systems).

## Owner & Identity
- **Name:** Célio Vieira
- **Identity & Role:** Founder, AI & Data Engineer
- **Core Value Proposition:** Engineering high-precision applied AI pipelines, agents project architecture, and lakehouse architectures — powered by deep foundations in Distributed System Architecture and FullStack Product Engineering.
- **Email:** contact@celiovieira.com
- **Substack:** https://substack.com/@celio1878
- **X (Twitter):** https://x.com/celio1878
- **LinkedIn:** https://www.linkedin.com/in/celio-vieira
- **GitHub (Personal):** https://github.com/Celio1878
- **GitHub (BYS Organization):** https://github.com/BeYourStories
- **YouTube:** https://www.youtube.com/@celio_vieira

## Umbrella Ecosystem & Ventures
- **Aldeon (aldeon.app):** Central venture studio, multi-tenant edge routing (`gru1`), domain-sliced React Router 7 SSR portal, and multi-cloud technology ecosystem orchestrating 7 active products.
- **SwanGo (aldeon.app/swango):** Zero-mock B3-first financial control & market intelligence platform powered by a `$0.00/mo` 20-table `dbt-core` + BigQuery Medallion warehouse indexing 1,076+ B3/CVM/BCB/Crypto/SEC EDGAR assets, deterministic "Can I Buy?" CDI NPV & DARF 6015 calculators, 5 quantitative trade engines, SHA-256 shared workspaces, 6-Stage Interactive Simulator (`/swango/simulator`), and 4-track Financial Academy (`/swango/learn`).
- **OnMemory (aldeon.app/on-memory):** Reusable AI engineering memory governance protocol (`on-memory`), Interactive Stack Composer, client-side `<20KB` memory linter (`-83.6%` token savings), 5-field anti-pattern registry, zero-leak CI auditor, and portable CLI bootstrapper (`init-on-memory.mjs`).
- **HandSpeak (aldeon.app/handspeak):** 60 FPS 3D computer vision Libras sign language translation, MediaPipe WASM tracking, 57+ pose Three.js WebGL anatomical hand tutor, Camera Practice Mode with 100% on-device local execution (`$0` AI cost), 5-track Bilingual Libras & Accessibility Academy (`/handspeak/learn`), and encrypted PeerJS WebRTC accessible video calls.
- **Be Your Stories (BYS):** Cross-platform offline-first digital reading, sub-15ms Meilisearch discovery, and neural audiobook platform live on [Web Portal](https://aldeon.app/bys), [Apple App Store](https://apps.apple.com/app/id6812739940), and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.bys).
- **Pack (aldeon.app/pack):** Smart residential parcel reception locker management with sub-1.2s Gemini multimodal OCR, Legend-State v3 local-first state, EventBridge dwell schedulers, and dynamic QR + PIN pickup verification.
- **TATU Design (aldeon.app/tatu):** High-precision edge tattoo stencil decimation (Sobel/Bayer), 60 FPS AR Skin-Lock (solving 3D clipping via 2D Cylindrical Projection), and 150ms 300 DPI thermal printing live on [Apple App Store](https://apps.apple.com/app/tatu-design/id6812737660) and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.tatu).
- **PostHub (aldeon.app/posthub):** Autonomous 5-platform social content distribution engine driven by AWS Step Functions task tokens, KMS cryptographic isolation, dynamic x509 JWT caching, and DynamoDB Streams WebSocket synchronization.
- **NodeJS App Builder:** Production-ready microservices CLI generator on npm (`@celio1878/express-app-builder`).
- **AWS CDK Factory:** Modular Infrastructure-as-Code construct library on npm (`@celio1878/cdk-factory`).

## Aesthetic & Palette
- **Design System:** Terminal & Vector Minimalist.
- **Dark Theme Palette:** Carbon black (`#090b10`), titanium gray borders (`#212836`), emerald primary (`#10b981`), amber accent (`#f59e0b`).
- **Interactive Canvas:** Dot-matrix vector grid background with mouse hover illumination (`app/components/interactive-background.tsx`).
- **Brand Imagery:** Pure vector icons and `/me.jpeg` as brand logo, favicon, and author avatar. Zero external screenshot image dependencies.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 19 + React Router 8 (SSR build enabled) |
| Language | TypeScript 6.0.3 (Strict mode, `"paths": { "~/*": ["./app/*"] }`) |
| Styling | Tailwind CSS v4 (with CSS variables in `app/app.css`) |
| UI Primitives | Custom Tailwind/Radix components (`Card`, `Badge`, `Separator`) |
| Icons | `lucide-react` + inline SVGs for brand logos (X, Substack, LinkedIn, GitHub, YouTube) |
| Markdown Engine | **Build-time pipeline**: `marked` v18 + Shiki (dual themes) + `sanitize-html` compile `app/content/blog/*.md` → `app/content/generated/index.json` (metadata, eager) + per-slug HTML JSON (lazy). Zero runtime markdown parsing. |
| i18n | Custom context in `app/i18n.tsx` + `app/lib/profile-translations.ts` (151 keys, full EN/PT-BR parity incl. aria-labels; localized dates/numbers via `app/utils/dates.ts`) |
| Build Tool | Vite 8 (via React Router) |
| Package Manager | Bun |
| Deployment | Vercel (Analytics + SpeedInsights + custom outbound events); Bun-based Dockerfile; GitHub Actions CI (`.github/workflows/ci.yml`) |
| Brand Assets | `/me.jpeg` (avatar/logo/favicon), `/og.png` (1200×630 OG card), `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png` — generated by `scripts/build-assets.ts` (sharp). `private/resume.pdf` is kept locally but never served. |

## Route Architecture
| Route | Component | Purpose |
|---|---|---|
| `/` | `app/routes/home.tsx` | Flagship showcase: identity eyebrow + h1 value proposition, Aldeon Ecosystem (7 products + 2 npm tools), Capabilities, Latest Discoveries preview, and Contact CTA. Zero job-seeking or availability indicators. |
| `/blog` | `app/routes/blog.tsx` | Knowledge Hub index: 78 technical articles with URL-synced filters (`?q=&tag=&source=`), source segmented tabs, live search, tag pill counts, localized metadata bars, and clean outline section chips (`§ Heading`). |
| `/blog/:slug` | `app/routes/blog-post.tsx` | Enhanced reader: loader-driven (real 404 for missing slugs), rAF reading progress bar, TOC with IntersectionObserver scroll spy, Shiki-highlighted code with guarded copy buttons, BlogPosting JSON-LD, X/LinkedIn/Web Share/copy actions, and tag-ranked related posts. |
| `/about` | `app/routes/about.tsx` | Streamlined founder profile: Mission, What I'm Building Now (8-card 4x2 grid), operating principles, and direct contact/social channels with canonical brand icons. |
| `/sitemap.xml` | `app/routes/sitemap.tsx` | Resource route: XML sitemap (static routes + all articles). Referenced by `public/robots.txt`. |
| `/rss.xml` | `app/routes/rss.tsx` | Resource route: RSS 2.0 feed (latest 50 articles), linked via `rel="alternate"` in root. |
| `*` | `app/routes/not-found.tsx` | Catch-all: throws a real 404 rendered by the branded root ErrorBoundary (no stack traces in production). |

## Internationalization (i18n)
- Streamlined to strictly **English (`en` as default)** and **Brazilian Portuguese (`pt-BR`)**.
- German (`de`) and Spanish (`es`) have been eliminated.
- Persistent user preference in `localStorage` (`preferred-locale`).
- Binary `EN / PT` toggle in Navigation and Mobile drawer.
- **Zero hardcoded user-facing strings** (including aria-labels and code-copy buttons); article counts interpolated into `searchPlaceholder`; dates/numbers formatted per app locale (`formatDate`/`formatNumber`).

## Quality Gates (all must exit 0)
`bun run lint` · `bun run typecheck` · `bun run format:check` · `bun run test` (Vitest, 20 pipeline tests) · `bun run audit:content` · `bun run build` · `bun run smoke` (SSR smoke suite). CI runs the full chain on push/PR.
