# RULES.md — Architecture & Engineering Standards

This file establishes the non-negotiable coding, architectural, and design rules for this codebase.

---

## 1. Architectural & Positioning Rules

1. **Multi-Page Routing (React Router 8):**
   - Routes are defined centrally in `app/routes.ts`.
   - Route components live in `app/routes/*.tsx`.
   - Reusable layout elements and sections live in `app/components/`.
   - Dynamic data/articles live in `app/content/` and `app/lib/`.
2. **Founder & Commercial Vision (Zero Job-Seeking Tone):**
   - Identity is strictly **Founder, AI & Data Engineer**.
   - Emphasize Applied AI and Lakehouses/Data, backed by Distributed Architecture and Full-Stack Product Engineering.
   - Umbrella project is **Aldeon** (`aldeon.app`) and its child apps (Be Your Stories, Pack, TATU Design, PostHub).
   - **DO NOT** convert this project into an employee CV or resume site. Do not re-add job history, certifications, or degree lists.
   - **DO NOT** add job-seeking badges or availability indicators (e.g., "Available for Hire", "Available for Advisory", "Online for Hire").
   - Do not display personal location metadata ("Minas Gerais, Brazil...").
3. **Substack Articles Ingestion:**
   - Articles from Substack are synchronized via `scripts/sync-substack.ts` into `app/content/blog/*.md` (paginated fetch, word-boundary tag derivation, stale-file pruning).
   - All Substack articles maintain canonical SEO links to Substack and are tagged with `Substack`.
4. **Build-Time Content Pipeline (no runtime markdown):**
   - `scripts/build-blog.ts` compiles `app/content/blog/*.md` into `app/content/generated/index.json` (metadata only) + per-slug sanitized HTML JSON (lazy-loaded). It runs automatically before `dev` and `build`.
   - Markdown is rendered with marked v18 using `this.parser.parseInline(tokens)` (never raw `token.text`), highlighted with Shiki dual themes, and sanitized with `sanitize-html`. **Never** render unsanitized HTML or parse markdown at runtime.
   - Generated JSON is committed so `typecheck` works on fresh clones; never edit generated files by hand.
5. **Zero Missing Images / Vector-First Cards:**
   - Use `/me.jpeg` as brand logo, favicon, and author avatar; `/og.png` for Open Graph/Twitter cards; `/icon-192.png` & `/icon-512.png` for the manifest (regenerate via `scripts/build-assets.ts`).
   - Do NOT reference deleted PNG screenshots from `/public`. Orphan/legacy files (`favicon.png`, `working.JPEG`) are removed; `resume.pdf` lives in gitignored `private/` and is never served.
   - All venture cards use styled vector cards, badge indicators, and the canonical `app/components/brand-icons.tsx` SVGs (single source of truth for X/Substack/LinkedIn/GitHub/YouTube).
6. **No External Runtime CMS:**
   - Content is stored locally in `app/content/blog/*.md`.
   - Compiled at build time; metadata imported eagerly, article HTML via lazy `import.meta.glob`.

---

## 2. Component & UI Rules

1. **Design System & Palette:**
   - Terminal & Vector Minimalist aesthetic.
   - Dark mode: Carbon background (`#090b10`), titanium gray borders (`#212836`), emerald primary (`#10b981`), amber accent (`#f59e0b`).
   - Interactive dot-matrix vector grid canvas (`app/components/interactive-background.tsx`).
2. **Accessibility (a11y):**
   - Interactive elements must include descriptive `aria-label` or visible text.
   - Decorative icons must include `aria-hidden="true"`.
   - Use semantic landmarks (`<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`).
3. **Theme System:**
   - System-driven via `@media (prefers-color-scheme: dark)`. No manual theme toggle.
4. **React Hooks & Cascading Renders:**
   - ESLint 9 strictly enforces avoiding synchronous `setState` in effect bodies (`react-hooks/set-state-in-effect`).
   - Wrap state updates in `queueMicrotask(() => setState(...))`.

---

## 3. Internationalization (i18n) Rules

1. **Strictly 2 Locales:**
   - Supported locales: **`en` (English, default)** and **`pt-BR` (Brazilian Portuguese)**.
   - German (`de`) and Spanish (`es`) are permanently removed.
2. **Dictionary Parity:**
   - All translations live in `app/lib/profile-translations.ts`.
   - Every key added to `en` **must** also be added to `pt-BR`.
   - **Zero hardcoded user-facing strings** in components — including aria-labels, titles, badges, and code-copy buttons. Article counts are interpolated (`{count}`), never baked into translations.
   - Dates and numbers render through `formatDate`/`formatNumber` (`app/utils/dates.ts`) using the app locale (deterministic between SSR and hydration). Read time renders as `readTimeMinutes` + `dict.blog.readTime`.
3. **Safe Hydration:**
   - Server rendering defaults to `"en"`.
   - Client detection runs post-mount with user override stored in `preferred-locale` in `localStorage`.
   - Client-only capabilities (e.g. `navigator.share`) are revealed post-mount, never during the first render.

---

## 4. Coding & Tooling Rules

1. **Strict TypeScript:**
   - Avoid `any` types. Zero typecheck errors (`bun run typecheck`).
   - Do not use `"baseUrl": "."` in `tsconfig.json`. Use `"paths": { "~/*": ["./app/*"] }`.
2. **Bun Only:**
   - Always run commands with `bun`. Never use `npm`, `npx`, or `yarn`.
3. **Icons:**
   - `Github`, `Linkedin`, and `Youtube` do NOT exist in `lucide-react`. Use `app/components/brand-icons.tsx` (canonical 24×24 SVGs) for all brand marks.
4. **Mandatory Verification Gates:**
   - `bun run lint` must exit code 0 (`--max-warnings=0`).
   - `bun run typecheck` must exit code 0.
   - `bun run format:check` must exit code 0 (Prettier config in `.prettierrc.json`).
   - `bun run test` (Vitest content-pipeline suite) must exit code 0.
   - `bun run audit:content` must exit code 0 (corpus + compiled index integrity).
   - `bun run build` must build client and server bundles with exit code 0.
   - `bun run smoke` must pass all SSR smoke checks after a build.
5. **SEO & Errors:**
   - Every page route defines a unique `<title>` via `meta` (no static title in `root.tsx`), canonical link, and Twitter card.
   - Missing articles/routes must return real HTTP 404 (`throw data(..., { status: 404 })`), never soft-200.
   - Production error pages never expose stack traces (`import.meta.env.DEV` only).
