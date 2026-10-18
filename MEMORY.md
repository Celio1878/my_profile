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

---

## 8. Aldeon Venture Ecosystem & HandSpeak Integration

### 5-Product Showcase Pattern
- **Grid Architecture:** Child ventures showcase features all 5 products under `aldeon.app`: Be Your Stories, Pack, TATU Design, PostHub, and HandSpeak.
- **HandSpeak Highlight:** Rendered with full-width prominence (`md:col-span-2`) emphasizing 60 FPS 3D MediaPipe tracking, Three.js WebGL anatomical hand tutor, and PeerJS WebRTC encrypted video calls.

### Link Hierarchy & Store Verification
- **Web Portals:** Standardized on `https://aldeon.app/<product>`.
- **App Store Production Links:** Live production apps on Apple App Store (Be Your Stories `id6812739940`, TATU Design `id6742352840`).
- **Google Play Closed Beta Links:** Linked to `https://play.google.com/apps/testing/com.aldeon.*` accompanied by an emerald "(Beta)" badge.
- **Technical Deep-Dive Routing:** Each venture card links directly to its native architectural analysis post in `/blog/:slug`.

### Protected Native Deep-Dive Articles
- `scripts/sync-substack.ts` protects 8 native long-form articles in `protectedSlugs`:
  - `building-be-your-stories`
  - `enterprise-rag-with-local-llms`
  - `scaling-lakehouses-spark-iceberg`
  - `engineering-handspeak-3d-libras-ai`
  - `aldeon-unified-edge-ssr-multi-cloud-ecosystem`
  - `architecting-pack-multimodal-ocr-logistics`
  - `building-tatu-design-ai-stencil-ar-studio`
  - `autonomous-publishing-posthub-step-functions`

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


