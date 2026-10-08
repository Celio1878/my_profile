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
- **Dot-Matrix Vector Grid:** Canvas background in `app/components/interactive-background.tsx` uses 28px grid spacing, responsive resize listeners, and mouse radial light cones.

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
