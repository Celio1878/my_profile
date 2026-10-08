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
   - Articles from Substack are synchronized via `scripts/sync-substack.ts` into `app/content/blog/*.md`.
   - All Substack articles maintain canonical SEO links to Substack and are tagged with `Substack`.
4. **Zero Missing Images / Vector-First Cards:**
   - Use `/me.jpeg` as brand logo, favicon, and author avatar.
   - Do NOT reference deleted PNG screenshots from `/public`.
   - All venture cards use styled vector cards, badge indicators, and inline SVG logos.
5. **No External Runtime CMS:**
   - Content is stored locally in `app/content/blog/*.md`.
   - Loaded at build time via Vite's `import.meta.glob`.

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
3. **Safe Hydration:**
   - Server rendering defaults to `"en"`.
   - Client detection runs post-mount with user override stored in `preferred-locale` in `localStorage`.

---

## 4. Coding & Tooling Rules

1. **Strict TypeScript:**
   - Avoid `any` types. Zero typecheck errors (`bun run typecheck`).
   - Do not use `"baseUrl": "."` in `tsconfig.json`. Use `"paths": { "~/*": ["./app/*"] }`.
2. **Bun Only:**
   - Always run commands with `bun`. Never use `npm`, `npx`, or `yarn`.
3. **Icons:**
   - `Github`, `Linkedin`, and `Youtube` do NOT exist in `lucide-react`. Use standard inline SVGs.
4. **Mandatory Verification Gates:**
   - `bun run lint` must exit code 0 (`--max-warnings=0`).
   - `bun run typecheck` must exit code 0.
   - `bun run build` must build client and server bundles with exit code 0.
