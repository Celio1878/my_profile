# CONTEXT.md — Project Context

## What This Project Is
A high-performance web platform serving as **Célio Vieira's** commercial showcase, venture portfolio, and knowledge hub. Designed with a **Terminal & Vector Minimalist** aesthetic, the platform highlights the **Aldeon** umbrella venture studio (`aldeon.app`), 8 live products (SwanGo, RagOn, MemOn, HandSpeak, Be Your Stories on Web/iOS/Android, Pack, TATU Design, PostHub), developer tooling (NodeJS App Builder, AWS CDK Factory), commercial capabilities, and deep technical blueprints (AI, Lakehouses, Distributed Cloud Systems).

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
- **Twitch:** https://www.twitch.tv/celio1878
- **Medium:** https://medium.com/@celio.vieira1878

## Umbrella Ecosystem & Ventures
- **Aldeon (aldeon.app):** Central venture studio, multi-tenant edge routing (`gru1`), domain-sliced React Router 7 SSR portal (`TypeScript 7 + Biome`), and multi-cloud technology ecosystem orchestrating 8 active products.
- **SwanGo (aldeon.app/swango):** Zero-mock B3-first financial control & market intelligence platform powered by a `$0.00/mo` 20-table `dbt-core` + BigQuery Medallion warehouse (49/49 dbt tests, 9/9 freshness SLAs) indexing 1,076+ B3/CVM/BCB/Crypto/SEC EDGAR assets, deterministic "Can I Buy?" CDI NPV, Risk/Stress & DARF 6015 engines, SHA-256 shared workspaces, 6-Stage Interactive Simulator (`/swango/simulator`), and 4-track Financial Academy (`/swango/learn`).
- **RagOn (aldeon.app/rag-on):** 100% free open developer product sharing Aldeon's air-gapped RAG architecture: live 6-stage BM25 + 3-gram X-Ray playground (`<2ms`, `$0`), client-side Zero-Leak JSON corpus auditor with 1-click Auto-Sanitize, 7-file cross-stack starter kit (`init-rag-on.mjs`), FNV-1a hashed guardrails, and `AP-RAG-01..08` registry.
- **MemOn (aldeon.app/mem-on, formerly OnMemory):** Reusable AI engineering memory governance protocol (`mem-on`), Interactive Stack Composer, client-side `<20KB` memory linter (`-83.6%` token savings), 5-field anti-pattern registry, zero-leak CI auditor, and portable CLI bootstrapper (`init-mem-on.mjs`).
- **HandSpeak (aldeon.app/handspeak):** 60 FPS 3D computer vision Libras sign language translation, MediaPipe WASM tracking, A–Z & 0–10 Three.js WebGL anatomical tutor, Practice Mode scoring, Gemini 3.8 Flash contextual translation, persistent conversation history, 5-track Bilingual Libras Academy (`/handspeak/learn`), and encrypted PeerJS WebRTC video calls.
- **Be Your Stories (BYS):** Cross-platform offline-first digital reading, built-in chapter translation, sub-15ms Meilisearch discovery, instant PIX Pro checkout, and AWS Polly audiobook platform live on [Web Portal](https://aldeon.app/bys), [Apple App Store](https://apps.apple.com/app/bys-be-your-stories/id6812739940), and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.bys).
- **Pack (aldeon.app/pack):** Smart residential parcel reception locker management with sub-1.2s Gemini 3.8 Flash multimodal OCR, Legend-State v3 local-first state, EventBridge dwell schedulers, and QR + PIN pickup verification live on [Apple App Store](https://apps.apple.com/app/pack/id6797659977) and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.pack).
- **TATU Design (aldeon.app/tatu):** High-precision edge tattoo stencil decimation (Sobel/Bayer + Gemini 3.8 Flash), 60 FPS AR Skin-Lock, and 4K thermal printing live on [Apple App Store](https://apps.apple.com/app/tatu-design/id6812737660) and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.tatu).
- **PostHub (aldeon.app/postshub):** Autonomous 5-platform social content distribution engine (8-topic curation, 3x/day waves, 1-click Publish Now & live credential health checks) driven by AWS Step Functions task tokens, KMS isolation, and DynamoDB Streams WebSocket sync live on [Apple App Store](https://apps.apple.com/us/app/postshub/id6813979346) and [Google Play Closed Beta](https://play.google.com/apps/testing/com.aldeon.posthub).
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
| Icons | `lucide-react` + inline SVGs for brand logos (X, Substack, Medium, LinkedIn, GitHub, YouTube, Twitch) |
| Markdown Engine | **Build-time pipeline**: `marked` v18 + Shiki (dual themes) + `sanitize-html` compile `app/content/blog/*.md` and `app/content/blog/pt-BR/*.md` → `app/content/generated/index.json` (metadata + `pt-BR` translations, eager) + per-slug EN and `pt-BR` HTML JSONs (lazy). Zero runtime markdown parsing. |
| i18n | Custom context in `app/i18n.tsx` + `app/lib/profile-translations.ts` + `app/lib/tags.ts` + `app/hooks/use-localized-meta.ts` (complete EN/pt-BR parity across UI, chips, tags, dynamic `<title>`/`<meta>`, Academy, and all 14 native blueprints; EN-only notice on external Substack dispatches; localized dates/numbers via `app/utils/dates.ts`) |
| Build Tool | Vite 8 (via React Router) |
| Package Manager | Bun |
| Deployment | Vercel (Analytics + SpeedInsights + custom outbound events); Bun-based Dockerfile; GitHub Actions CI (`.github/workflows/ci.yml`) |
| Brand Assets | `/me.jpeg` (avatar/logo/favicon), `/og.png` (1200×630 OG card), `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png` — generated by `scripts/build-assets.ts` (sharp). `private/resume.pdf` is kept locally but never served. |

## Route Architecture
| Route | Component | Purpose |
|---|---|---|
| `/` | `app/routes/home.tsx` | Flagship showcase: identity eyebrow + h1 value proposition, Aldeon Ecosystem (7 products + 2 npm tools), Capabilities, Latest Discoveries preview, Academy preview, and Contact CTA. Zero job-seeking or availability indicators. |
| `/blog` | `app/routes/blog.tsx` | Knowledge Hub index: 82 technical articles (14 bilingual EN/pt-BR native blueprints + 68 Substack dispatches) with URL-synced filters (`?q=&tag=&source=`), localized topic tags, bilingual search, localized metadata bars, and clean outline section chips (`§ Heading`). |
| `/blog/:slug` | `app/routes/blog-post.tsx` | Enhanced reader: loader-driven (real 404 for missing slugs), rAF reading progress bar, TOC with IntersectionObserver scroll spy, Shiki-highlighted code with guarded copy buttons, BlogPosting JSON-LD, X/LinkedIn/Web Share/copy actions, and tag-ranked related posts. |
| `/academy` | `app/routes/academy.tsx` | YouTube Video Academy hub: 4 curriculum tracks, URL-synced filters (`?q=&track=&level=`), and 8 bilingual video lessons paired with native Engineering Blueprints. |
| `/academy/:slug` | `app/routes/academy-lesson.tsx` | Lesson detail & player: loader-driven (real 404 for missing slugs), privacy-first click-to-play `youtube-nocookie.com` facade (or terminal Upcoming stage), learning outcomes, chapters, companion blueprints, and `VideoObject` / `LearningResource` JSON-LD. |
| `/about` | `app/routes/about.tsx` | Streamlined founder profile: Mission, What I'm Building Now (8-card 4x2 grid), operating principles, and direct contact/social channels (4x2 grid incl. Twitch & Medium) with canonical brand icons. |
| `/sitemap.xml` | `app/routes/sitemap.tsx` | Resource route: XML sitemap (static routes, Academy lessons, and all articles). Referenced by `public/robots.txt`. |
| `/rss.xml` | `app/routes/rss.tsx` | Resource route: RSS 2.0 feed (latest 50 articles), linked via `rel="alternate"` in root. |
| `*` | `app/routes/not-found.tsx` | Catch-all: throws a real 404 rendered by the branded root ErrorBoundary (no stack traces in production). |

## Internationalization (i18n)
- Streamlined to strictly **English (`en` as default)** and **Brazilian Portuguese (`pt-BR`)**.
- German (`de`) and Spanish (`es`) have been eliminated.
- Persistent user preference in `localStorage` (`preferred-locale`).
- Binary `EN / PT` toggle in Navigation and Mobile drawer.
- **Zero hardcoded user-facing strings** (including aria-labels and code-copy buttons); article counts interpolated into `searchPlaceholder`; dates/numbers formatted per app locale (`formatDate`/`formatNumber`).

## Quality Gates (all must exit 0)
`bun run lint` · `bun run typecheck` · `bun run format:check` · `bun run test` (Vitest, 29 tests) · `bun run audit:content` · `bun run build` · `bun run smoke` (SSR smoke suite, 17 checks). CI runs the full chain on push/PR.
