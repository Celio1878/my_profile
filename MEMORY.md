# MEMORY.md — Lessons Learned & Problem Resolutions

This file logs hard-won debugging insights, breaking changes, and operational patterns to ensure errors are never repeated.

---

## 1. Tooling & Dependencies

### TypeScript & ESLint Compatibility
- **Issue:** Upgrading TypeScript to 7.0 broke `@typescript-eslint/parser` with `Error: typescript-eslint does not support TS 7.0`.
- **Fix:** Keep `typescript` pinned to `~6.0.3` until `typescript-eslint` releases support for TypeScript >= 7.0.
- **`baseUrl` Deprecation:** In `tsconfig.json`, `baseUrl` is deprecated in TS 6 and removed in TS 7. **DO NOT** add `"baseUrl": "."`. Use `"paths": { "~/*": ["./app/*"] }` with `"moduleResolution": "bundler"`.

### React Hooks & Cascading Renders (`react-hooks/set-state-in-effect`)
- **Issue:** ESLint 9 flags synchronous `setState(...)` inside `useEffect(...)` with rule `react-hooks/set-state-in-effect`.
- **Fix:** Wrap the state setter in `queueMicrotask(() => setState(...))` or derive state during rendering.

### Package Manager
- **Rule:** Always use **Bun** (`bun install`, `bun add`, `bun run build`).
- `npm` and `yarn` are not configured in this environment.

---

## 2. Framework & Routing

### React Router 8 Multi-Route Architecture
- Multi-page configuration in `app/routes.ts`:
  ```typescript
  import { index, route, type RouteConfig } from "@react-router/dev/routes";

  export default [
    index("routes/home.tsx"),
    route("blog", "routes/blog.tsx"),
    route("blog/:slug", "routes/blog-post.tsx"),
    route("about", "routes/about.tsx"),
  ] satisfies RouteConfig;
  ```
- **SSR Setting:** `react-router.config.ts` keeps `ssr: true` so the build generates the server-side entry point for Vite static site generation and initial render.

---

## 3. Visual Design & Asset Integrity

### Deleted Screenshot PNGs & Vector-First Design
- **Issue:** User removed all screenshots from `/public` (`bys-banner.png`, `bys-home-mobile.png`, `cdk-factory-items.png`, etc.). Referencing them resulted in broken image placeholders.
- **Solution:** Replaced screenshot-dependent cards with **Terminal & Vector Minimalist** cards featuring custom icons, technical badges, live status tags, and direct outbound links.
- **Brand Avatar & Logo:** Canonical image is strictly `/me.jpeg`. Linux filesystems are case-sensitive; never use `/me.JPEG`.
- **Favicon & Manifest:** Configured `favicon` in `root.tsx` and `manifest.json` icons to reference `/me.jpeg`.

### Terminal & Vector Minimalist Palette
- **Palette:** Carbon black background (`#090b10`), titanium gray borders (`#212836`), emerald primary (`#10b981`), amber accent (`#f59e0b`).
- **Dot-Matrix Vector Grid:** Canvas background in `app/components/interactive-background.tsx` uses 36px grid spacing, cached `matchMedia` scheme detection, pointer-only mouse listeners, visibility pause, and reduced-motion resize redraws.

---

## 4. Internationalization & Channels

### Streamlined Locales (EN & PT-BR Only)
- User explicitly requested removing German (`de`) and Spanish (`es`).
- `SupportedLocale` type is strictly `"en" | "pt-BR"`.
- Navigation and drawer use a compact binary toggle `EN / PT`.
- Dictionary keys in `app/lib/profile-translations.ts` maintain complete 1:1 parity between `en` and `pt-BR`.

### Contact Channels & Socials
- Primary email: `contact@celiovieira.com`.
- Added **Substack** (`https://substack.com/@celio1878`) with dedicated callout banner on `/blog`.
- Added **X (Twitter)** (`https://x.com/celio1878`).
- Added **Twitch** (`https://www.twitch.tv/celio1878`) and **Medium** (`https://medium.com/@celio.vieira1878`) across Footer, Contact (`4×2` grid), About (`4×2` grid), Home JSON-LD `sameAs`, and `/blog` (Medium CTA).
- Maintained LinkedIn, GitHub (personal & BYS), and YouTube.

---

## 5. UI, Icons & Positioning

### Missing Icons in `lucide-react`
- `Github`, `Linkedin`, and `Youtube` **do not exist** in `lucide-react`.
- Importing them causes runtime/build errors. Always use clean inline SVGs with standard 24x24 viewBox.

### Elimination of Legacy CV/Resume UI & Job-Seeking Tone
- Removed `experience.tsx`, `education.tsx`, `certifications.tsx`, `resume.tsx` (embedded PDF viewer), and `skills.tsx`.
- The site positioning is strictly **Founder, AI & Data Engineer** showcasing the **Aldeon** venture studio and child products.
- **Zero Job-Seeking Tone:** Removed hero status badge ("Available for Advisory..."), avatar "ONLINE" badge, and location notes ("Minas Gerais, Brazil...").

---

## 6. Substack Ingestion & Blog Engine

### Synchronizing Substack API to Build-Time Markdown
- **Pattern:** `scripts/sync-substack.ts` queries `https://celio1878.substack.com/api/v1/posts` and creates static `.md` files in `app/content/blog/`.
- **Filtering:** Automatically filters out test/automated newsletter update items (`automated newsletter update`).
- **Hybrid Navigation:** Blog index renders internal `/blog/:slug` reader pages with canonical SEO headers to the original Substack URL, plus direct external links to Substack (`Substack ↗`).
- **Tagging:** Automatically derives relevant tags (`AI`, `Cloud`, `Algorithms`, `Data Engineering`, `Substack`) based on title and subtitle content.

---

## 7. Profile Narrative & Technical Depth

### Expanding Founder Profile Without Corporate History
- **Principle:** Convey senior engineering depth without reverting to an employee CV or job-seeking resume tone.
- **Pattern:** Frame experience strictly around architectural domain mastery (formal Computer Engineering & Cloud Computing postgraduate specialization, event-driven hexagonal microservices on AWS serverless, petabyte Apache Spark & Iceberg lakehouses, and self-hosted private AI inference with Ollama, HuggingFace, and ComfyUI). Strictly omit employer corporate names, job titles, or employment date ranges.
- **Multi-Paragraph Typography:** Modeled as `missionParagraphs: string[]` in `Dictionary.about`, rendered with `space-y-4 max-w-3xl leading-relaxed` and top-aligned alongside the author avatar (`items-center md:items-start md:pt-2`).

---

## 8. Aldeon Venture Ecosystem, SwanGo, MemOn, RagOn & HandSpeak Integration

### 8-Product Symmetrical 4×2 Showcase Pattern
- **Grid Architecture:** Child ventures showcase features all **8 active products** under `aldeon.app` in a symmetrical 4×2 grid: Row 1 `(SwanGo + RagOn)`, Row 2 `(MemOn + HandSpeak)`, Row 3 `(Be Your Stories + Pack)`, and Row 4 `(TATU Design + PostHub)`.
- **Developer Tooling Grid:** Open-source npm packages (`NodeJS App Builder` and `AWS CDK Factory`) remain in the 2-column grid below the 8 active ventures.

### Link Hierarchy & Store Verification
- **Web Portals:** Standardized on `https://aldeon.app/<product>` (`swango`, `rag-on`, `mem-on`, `handspeak`, `bys`, `pack`, `tatu`, canonical `postshub`) plus direct secondary deep-links for **SwanGo** (`/swango/simulator`, `/swango/learn`) and **HandSpeak** (`/handspeak/learn`).
- **App Store Production Links:** Live production apps on Apple App Store for all 4 mobile apps: Be Your Stories (`bys-be-your-stories/id6812739940`), Pack (`id6797659977`), TATU Design (`id6812737660`), and PostHub (`id6813979346`).
- **Google Play Closed Beta Links:** Linked to `https://play.google.com/apps/testing/com.aldeon.*` accompanied by an emerald "(Beta)" badge.
- **Technical Deep-Dive Routing:** Each venture card links directly to its native architectural analysis post in `/blog/:slug`.

### Protected Native Deep-Dive Articles (14 Total — Bilingual EN & `pt-BR`)
- `scripts/sync-substack.ts` protects **14** native long-form articles in `protectedSlugs` (and never touches `app/content/blog/pt-BR/`), all compiled in both EN and `pt-BR` (`app/content/generated/pt-BR/<slug>.json`) and enforced 100% by `scripts/audit-content.ts`:
  - `building-be-your-stories`
  - `enterprise-rag-with-local-llms`
  - `scaling-lakehouses-spark-iceberg`
  - `engineering-handspeak-3d-libras-ai`
  - `aldeon-unified-edge-ssr-multi-cloud-ecosystem`
  - `architecting-pack-multimodal-ocr-logistics`
  - `building-tatu-design-ai-stencil-ar-studio`
  - `autonomous-publishing-posthub-step-functions`
  - `architecting-swango-dbt-bigquery-medallion-b3-finance`
  - `on-memory-deterministic-ai-engineering-governance`
  - `local-ai-coding-stack-ollama-opencode-qwen3`
  - `ragon-air-gapped-zero-leak-rag-studio`
  - `mastering-gemini-models-in-antigravity-agy`
  - `antigravity-agy-slash-commands-complete-guide`

### Academy Privacy-First YouTube Facade (`app/lib/academy.ts` + `app/components/youtube-player.tsx`)
- `/academy` and `/academy/:slug` are driven by a strongly-typed bilingual catalog (`ACADEMY_TRACKS`, `ACADEMY_LESSONS`).
- Lessons support `status: "upcoming"` (Terminal production stage with YouTube Subscribe CTA) and `status: "published"` (click-to-play `youtube-nocookie.com` facade loading zero third-party iframe JS until click).
- Publishing a new video requires updating only `status`, `youtubeId`, and `publishedAt` in `app/lib/academy.ts`.

---

## 9. Substack Publishing & Content Ingestion Pipeline

### Substack ProseMirror Format vs Raw HTML
- **Root Cause:** When publishing drafts to Substack's private API (`/api/v1/drafts`), Substack expects a ProseMirror document object (`{"type": "doc", "content": [...]}`) in `draft_body`. If a raw HTML string is provided, Substack wraps it in `<p>escaped string</p>`, transforming tags like `<p>`, `<strong>`, `<h2>` into literal text entities (`&lt;p&gt;`, `&lt;strong&gt;`).
- **PostHub Fix (`aldeon/posts/services/src/common/substack_api.py`):** Implemented `html_to_prosemirror(html_str)` with `HTMLParser` converting HTML tags into ProseMirror block and mark nodes (`paragraph`, `heading`, `bullet_list`, `list_item`, `bold`, `italic`, `code`, `link`). Also set `"audience": "everyone"` and `"write_comment_permissions": "everyone"` so posts are public rather than paid-truncated.
- **Sync Ingestion Sanitizer (`scripts/sync-substack.ts`):** Decodes nested HTML entities (`&lt;`, `&gt;`, `&amp;`, `&#39;`, `&quot;`), trims incomplete trailing fragments, extracts real `<h2>`/`<h3>` section headings into `headings`, and parses the full `body_html` into multi-section GitHub-flavored Markdown.
- **Substack Live Post Sanitization & Step-Up Authentication:**
  - Updating an already-published post on Substack requires two steps: `PUT /api/v1/drafts/{id}` (which updates `draft_body` and `audience`) followed by `POST /api/v1/drafts/{id}/publish` with `{"send": False, "share_automatically": False}` (which promotes `draft_body` to the live `body` without emailing subscribers).
  - Calling `/api/v1/drafts/{id}/publish` requires an active `confirmedLogin` step-up session obtained via `POST https://substack.com/api/v1/email-login` + `POST https://substack.com/api/v1/email-otp-login/complete` using a persistent `MozillaCookieJar` (preserving `substack.sid`, `cookie_storage_key`, `visit_id`, and `AWSALBTG`).
  - All 19 fallback `"Automated Newsletter Update"` posts were deleted from Substack, and all 68 substantive articles were sanitized and republished live with `audience: "everyone"`.

### Modern Web Typography Standards
- **`text-wrap: balance` (`text-balance`):** Applied exclusively to headlines and titles (`h1`, `h2`, `h3`) to ensure balanced, symmetrical line breaking without manual line breaks.
- **`text-wrap: pretty` (`text-pretty`):** Applied to body copy, excerpts, and descriptions to prevent single-word orphan lines at the end of paragraphs.
- **Line Length (`max-w-[75ch]`):** Applied to article prose containers to maintain the 45–75 character optimal readability range.

### SSR-Safe Reading Progress & TOC Scroll Tracking
- **Scroll Handlers:** In `app/routes/blog-post.tsx`, `window.addEventListener('scroll', ...)` is guarded with `typeof window !== "undefined"` and cleaned up on unmount.
- **Headings IDs:** IDs on `<h2>` and `<h3>` tags are assigned both in marked renderer and extracted into `headings: BlogPostHeading[]` in `app/lib/blog.ts` so the interactive Table of Contents can seamlessly scroll without hydration mismatches.

---

## 10. Full-Application Audit Remediation (Phase 14)

### marked v18 Renderer API — Literal Markdown Bug (Critical)
- **Issue:** Custom `renderer.paragraph`/`renderer.heading` used raw `token.text`, but marked v18 defaults call `this.parser.parseInline(tokens)`. Result: every paragraph rendered literal `**bold**`, `` `code` `` and `[link](url)`; `renderer.link` was dead code for paragraph links.
- **Fix:** Markdown is now compiled **at build time** (`scripts/lib/markdown.ts` + `scripts/build-blog.ts`) with correct `parseInline(tokens)` usage. Runtime never parses markdown.

### Build-Time Content Pipeline & Bundle Splitting
- **Architecture:** `app/content/generated/index.json` (metadata, ~163KB client chunk vs previous 752KB) + per-slug `<slug>.json` (sanitized Shiki-highlighted HTML) loaded via lazy `import.meta.glob` (negative pattern excludes `index.json` to avoid `INEFFECTIVE_DYNAMIC_IMPORT`).
- **Generated files are committed** so `typecheck` works on fresh clones. `build`/`dev` scripts regenerate automatically; `bun run content:build` for manual runs. After `sync-substack`, recompile content.
- **Sanitization:** `sanitize-html` with `disallowedTagsMode: "completelyDiscard"` (the typed union is `"discard" | "escape" | "recursiveEscape" | "completelyDiscard"` — `"drop"` is a runtime alias that fails typecheck). Link `href`/`title` escaped; `javascript:`/`data:`/`vbscript:` schemes neutralized; entity decoding is **fence-aware** (code samples keep literal `&lt;p&gt;`).

### Tailwind v4 Gotchas
- `prose` classes require `@plugin "@tailwindcss/typography"` — without it, article lists/tables render unstyled (preflight resets them).
- `py-0.2` is NOT generated (spacing bare values must be multiples of 0.25); it silently produced no CSS.
- Shiki dual themes use `defaultColor: false` + CSS vars (`--shiki-light/dark`), toggled via the media-based dark variant in `app.css`.

### SSR / SEO Fixes
- **Duplicate `<title>`:** static `<title>` in `root.tsx` Layout + route `meta` produced two title tags. Removed the static one; every route (incl. catch-all 404) owns its title via `meta`.
- **Soft-404:** `/blog/<missing>` returned 200. Now `loader` throws `data(..., { status: 404 })`; catch-all `route("*")` does the same; branded ErrorBoundary renders it (stack traces only in `import.meta.env.DEV`).
- **Hidden SSR content:** `Reveal` rendered `opacity:0` server-side. Fixed with `initialInView: true` — SSR/no-JS sees everything; below-fold elements hide only after the observer reports them out of view.
- **Home had no `<h1>`:** hero tagline is now the `h1`, with a name/role eyebrow above it.
- **Hydration-safe formatting:** `formatDate`/`formatNumber` take the app locale (starts `"en"` on server AND first client render); `navigator.share` button revealed post-mount only.

### Substack Sync Hardening
- **Tag pollution:** substring regexes matched "ren**ai**ssance"/"dom**ai**n" → AI and "para**graph**" → Algorithms. Now word-boundary regexes (`deriveTags`), covered by unit tests.
- Pagination loop (was hardcoded 2 pages/100 posts), response validation, stale-file pruning (Substack-sourced only, protected slugs untouched), no fabricated `wordCount: 1100`, trailing-trim never drops code fences, `sync()` guarded by `process.argv[1]` so imports don't trigger network calls.

### Assets & Brand Integrity
- **X logo SVG was corrupted** in footer/contact (`L4.99 21.75` vs canonical `24.75`). All brand marks now live in `app/components/brand-icons.tsx` (single source of truth).
- `me.jpeg` is 200×200 — manifest previously claimed 400×400. Generated `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, and a 1200×630 `og.png` via `scripts/build-assets.ts` (sharp + SVG text; Lato/DejaVu fonts available on this machine).
- Removed orphans `public/favicon.png`, `public/working.JPEG`; moved `resume.pdf` → gitignored `private/` (never served; keeps zero-CV positioning).

### UX & Performance Patterns
- Full-page `<Loader/>` swap on navigation unmounted every page (and was off-palette purple `#400d7a`). Replaced with a thin animated top bar (`.nav-loading-bar`); children never unmount.
- One reading-progress bar (article route); nav's duplicate gradient bar removed. Scroll handlers are rAF-throttled.
- `HashLink` component: plain anchor on `/`, client-side `Link to="/#section"` elsewhere (no full reloads). Contact CTA consistent everywhere.
- Blog filters live in URL search params (`?q=&tag=&source=`) — shareable, back/forward works.
- Canvas: cached `matchMedia` (was called per frame), pointer-only mouse listeners, reduced-motion resize redraw, visibility pause.
- Mobile drawer: focus trap + body scroll lock + `aria-controls`; skip link implemented (`ui.skipToMain`); `CardTitle` renders `h3`.

### Tooling & QA
- **Dockerfile was broken:** `npm ci` + `COPY package-lock.json` (file never existed; Bun-only repo). Rewritten on `oven/bun:1` with `bun.lock`.
- Prettier config added (`.prettierrc.json`, 2 spaces/double quotes/100 cols); `format:check` is now a gate; `app/content`, `public`, `*.md` ignored.
- QA chain: Vitest (`tests/content-pipeline.test.ts`, 20 tests) + `scripts/audit-content.ts` (corpus/index integrity) + `scripts/smoke-ssr.ts` (boots prod server, asserts titles/h1/404s/sitemap/rss/parsed markdown) + GitHub Actions CI on `develop`/`main`.
- Removed dead code: `Section`, `Separator`, `loader.tsx`, `getPostsByTag`, `yearsExperience`/`firstYear`, `isbot` dep, ~25 unused dictionary keys.


