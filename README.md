# Celio Vieira — Professional Profile SPA

A single-page application showcasing Celio Vieira's professional profile as a FullStack, Data & AI Engineer. Built with React Router 7, featuring automatic browser language detection (English, German, Brazilian Portuguese, Spanish), system-based dark/light theme, smooth animations, and a consistent UI using shadcn/ui-style primitives.

## Objectives

- Present a clear, multilingual "About Me" site for Celio Vieira.
- Share work Experience, Education, Certifications, Skills, Hobbies, Projects, and Contact info.
- Embed the resume (PDF) for inline viewing and download.
- Provide a fast, accessible, smooth single-page navigation experience.

## Features

- 🧭 React Router 7 SPA (SSR disabled)
- 🌍 Automatic language detection (en, de, pt-BR, es) with English fallback
- 🎨 Tailwind CSS v4 — system-based dark/light theme via `prefers-color-scheme`
- 🧩 shadcn/ui-style primitives (Card, Badge, Separator)
- ✨ Smooth animations: fade-in-up, slide-in-left, scale-in, card hover lift, skill badge hover
- 🔍 Active section highlighting in nav via IntersectionObserver
- ♿ Accessible: skip-to-content link, landmarks, aria-current on active nav, reduced-motion friendly
- 📄 Embedded Resume (public/resume.pdf) with view/download actions
- 🖼️ Project screenshots for BYS, NodeJS App Builder, and CDK Factory
- 📊 Vercel Analytics + SpeedInsights integrated

## Architecture Overview

- React Router v7 app running in SPA mode (no SSR). See `react-router.config.ts`.
- Single main route at `app/routes/home.tsx` renders all sections:
  - Hero, About, Experience, Education, Certifications, Skills, Hobbies, Projects, Showcases, Resume, Contact
- Internationalization: `app/i18n.tsx`
  - Detects browser language each visit (en, de, pt-BR, es), sets `<html lang>` accordingly
  - English is the default fallback for unsupported locales
  - All content strings live in locale dictionaries
- Theming: CSS `@media (prefers-color-scheme: dark)` — no manual toggle, no cookies
- UI primitives (shadcn/ui-style): `app/components/ui/*` (Card, Badge, Separator)
- Animations: `app/components/reveal.tsx` (scroll-into-view fade/slide), respecting `prefers-reduced-motion`
- Accessibility: skip link in `app/root.tsx`, main/section landmarks, aria-labelledby headings, nav aria-current

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + React Router 7 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui-style components |
| Icons | lucide-react |
| i18n | Custom context (`app/i18n.tsx`) |
| Build | Vite (via React Router) |
| Package Manager | Bun |
| Deployment | Vercel |
| Containerization | Docker |

## Project Structure

```
app/
  components/
    nav.tsx              # Sticky navbar with active section highlighting
    reveal.tsx           # Scroll-into-view animation wrapper
    loader.tsx           # Navigation loading indicator
    ui/                  # shadcn/ui-style primitives (Card, Badge, Separator)
  lib/
    utils.ts             # cn() helper
  i18n.tsx               # Locale detection + dictionaries (en, de, pt-BR, es)
  root.tsx               # App shell, skip link, i18n provider, analytics
  routes/
    home.tsx             # Main page — all sections
public/
  resume.pdf             # Embedded resume (view + download)
  me.jpeg                # Profile photo
  bys-banner.png         # Be Your Stories banner
  bys-*.png              # BYS mobile/tablet screenshots
  express-app-builder-*.png  # NodeJS App Builder screenshots
  cdk-factory-items.png  # CDK Factory screenshot
react-router.config.ts   # SPA mode (ssr: false)
MEMORY.md                # Known issues and gotchas
CONTEXT.md               # Project context and owner info
SUMMARY.md               # Learnings and implemented tasks log
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open http://localhost:5173. Language is auto-detected from your browser (English fallback).

### Type checking & linting

```bash
bun run typecheck
bun run lint
```

## Building for Production

```bash
bun run build
```

Artifacts are emitted to `build/client` and `build/server`.

## Deployment

### Vercel (recommended)

Connect the repository to Vercel. It auto-detects the React Router config and deploys as a static SPA.

### Docker

```bash
docker build -t my-profile .
docker run -p 3000:3000 my-profile
```

Deploy to any Docker-compatible platform (ECS, Cloud Run, Railway, Fly.io, etc.).

## Configuration & Customization

- **Resume:** Replace `public/resume.pdf` with your latest CV.
- **Content:** Edit `app/i18n.tsx` per locale. All sections (experience, skills, certs, etc.) are defined there.
- **Profile photo:** Replace `public/me.jpeg`.
- **Project screenshots:** Replace/add images in `public/` and update references in `app/routes/home.tsx`.
- **SEO/meta:** Update `meta()` in `app/routes/home.tsx`.
- **Theme:** Automatically follows the user's OS preference — no configuration needed.

## Accessibility & UX Notes

- Keyboard users get a visible "Skip to content" focusable link.
- Active section is reflected with `aria-current="page"` on the nav link while scrolling.
- Animations are disabled automatically under `prefers-reduced-motion`.
- The `html lang` attribute is synced with the detected locale for screen readers.

## FAQ

- **Why no theme toggle?** Theme follows the user's OS preference automatically via `prefers-color-scheme`.
- **Why no language selector?** Browser language is auto-detected; unsupported locales fall back to English.
- **Can I add more locales?** Yes — extend `SupportedLocale` and add a new dictionary in `app/i18n.tsx`.
- **PDF not rendering inline?** Some browsers block inline PDFs — users can use the provided View/Download links.

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Author & Contact

- **Author:** Celio Vieira
- **Website:** https://celiovieira.com
- **LinkedIn:** https://www.linkedin.com/in/celio-vieira
- **Email:** contato@celiovieira.com
