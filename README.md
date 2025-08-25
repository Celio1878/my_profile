# Celio Vieira — About Me SPA

A single‑page application that showcases Celio Vieira’s professional profile. It is built with React Router 7 in SPA
mode, features automatic browser language detection (English, German, Brazilian Portuguese, Spanish), a11y‑friendly
animations, light/dark theme toggle, and a consistent UI using shadcn/ui‑style primitives.

## Objectives

- Present a clear, multilingual “About Me” site for Celio Vieira.
- Share work Experience, Education, Certifications, Skills, Hobbies, Projects, and Contact info.
- Embed the resume (PDF) for inline viewing and download.
- Provide a fast, accessible, smooth single‑page navigation experience with theme support.

## Features

- 🧭 React Router 7 SPA (SSR disabled)
- 🌍 Automatic language detection (en, de, pt‑BR, es) with English fallback
- 🎨 Tailwind CSS v4 styling with light/dark theme toggle
- 🧩 shadcn/ui‑style primitives (Button, Card, Badge, Separator) for consistent UI
- ✨ Smooth section transitions with a Reveal component; active in‑view nav highlighting
- ♿ Accessible by default: skip‑to‑content link, landmarks, aria‑current on active nav, reduced‑motion friendly
- 📄 Embedded Resume (public/resume.pdf) with view/download actions
- 🔗 LinkedIn profile link‑outs

## Architecture Overview

- React Router v7 app running in SPA mode (no SSR). See react-router.config.ts.
- Single main route at app/routes/home.tsx renders all sections:
    - About, Experience, Education, Certifications, Skills, Hobbies, Projects, Resume, Contact
- Internationalization: app/i18n.tsx
    - Detects browser language each visit (en, de, pt‑BR, es), sets <html lang> accordingly
    - English is the default fallback for unsupported locales
    - All content strings live in locale dictionaries
- Theming: react-router-theme + ThemeContext, toggled via app/components/theme-toggle.tsx
- UI primitives (shadcn/ui‑style): app/components/ui/* (Button, Card, Badge, Separator)
- Animations: app/components/reveal.tsx (scroll‑into‑view fade/slide), respecting prefers‑reduced‑motion
- Accessibility: skip link in app/root.tsx, main/section landmarks, aria‑labelledby headings, nav aria‑current

## Content Sources

- Resume: public/resume.pdf (embedded and downloadable)
- Experience/Education/Certifications/Projects/Skills/Hobbies/About: app/i18n.tsx dictionaries (localized)
- Contact: LinkedIn link and professional email (contato@celiovieira.com) rendered in the Contact section

## Tech Stack

- React 19 + React Router 7
- TypeScript
- Tailwind CSS v4, tw-animate-css, tailwind-merge (cn helper)
- lucide-react (icons)
- react-intersection-observer (Reveal + active nav)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/bun)

### Installation

```bash
npm install
```

### Development

Start the dev server with HMR:

```bash
npm run dev
```

Open http://localhost:5173

Language is auto‑detected from your browser on each visit (English fallback). There is no language selector.

### Type checking & linting

```bash
npm run typecheck
npm run lint
```

## Building for Production

Create a production build:

```bash
npm run build
```

Artifacts are emitted to build/client and build/server.

## Deployment

### Docker

Build and run with Docker:

```bash
docker build -t my-profile .
docker run -p 3000:3000 my-profile
```

Deploy the container to any platform supporting Docker (ECS, Cloud Run, Azure Container Apps, DigitalOcean, Fly.io,
Railway, etc.).

### DIY / Node host

Use the built‑in app server. Deploy the output of `npm run build` along with package.json and lockfile.

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server bundle
```

## Project Structure (high level)

```
app/
  components/
    nav.tsx                 # Navbar with active section highlighting and ThemeToggle
    theme-toggle.tsx        # Light/dark toggle (shadcn Button + lucide icons)
    reveal.tsx              # In‑view animation component
    ui/                     # shadcn/ui‑style primitives (Button, Card, Badge, Separator)
  i18n.tsx                  # Locale detection + dictionaries (en, de, pt‑BR, es)
  root.tsx                  # App shell, skip link, theme/i18n providers
  routes/
    home.tsx                # Main page rendering all sections
public/
  resume.pdf                # Embedded resume
react-router.config.ts      # SPA mode configuration (ssr: false)
```

## Configuration & Customization

- Update resume: replace public/resume.pdf with your latest CV.
- Edit text content: app/i18n.tsx per locale. Keys exist for all sections; English is the fallback.
- Add/remove skills/projects/certifications: modify the respective arrays in app/i18n.tsx.
- Theme default: defaultTheme is set in app/root.tsx via react-router-theme loader; ThemeToggle switches at runtime.
- SEO/meta: update meta() in app/routes/home.tsx.

## Accessibility & UX Notes

- Keyboard users get a visible “Skip to content” focusable link.
- Active section is reflected with aria-current="page" on the corresponding nav link while scrolling.
- Animations are disabled automatically under prefers‑reduced‑motion.
- The html lang attribute is synced with the detected locale for screen readers.

## FAQ

- Why no language selector? The requirement is to follow the browser language automatically; unsupported ones fall back
  to English.
- Can I add more locales? Yes—extend SupportedLocale and add a new dictionary in app/i18n.tsx.
- PDF not rendering inline? Some browsers block inline PDFs—users can use the provided View/Download links.

## License

This project is provided under the MIT License. See LICENSE for details.

## Author & Contact

- Author: Celio Vieira
- Website: https://celiovieira.com
- LinkedIn: https://www.linkedin.com/in/celio-vieira
- Email: contato@celiovieira.com
