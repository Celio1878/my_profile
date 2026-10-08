# CONTEXT.md — Project Context

## What This Project Is
A high-performance web platform serving as **Célio Vieira's** commercial showcase, venture portfolio, and knowledge hub. Designed with a **Terminal & Vector Minimalist** aesthetic, the platform highlights the **Aldeon** umbrella venture studio (`aldeon.app`), live child products (Be Your Stories on Web/iOS/Android, Pack, TATU Design, PostHub), developer tooling (NodeJS App Builder, AWS CDK Factory), commercial capabilities, and deep technical blueprints (AI, Lakehouses, Distributed Cloud Systems).

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
- **Aldeon (aldeon.app):** Central venture studio & multi-product technology ecosystem.
- **Be Your Stories (BYS):** Cross-platform offline-first digital reading and storytelling platform live on [Web](https://beyourstories.com), [Apple App Store](https://apps.apple.com/app/be-your-stories/id6748356526), and [Google Play](https://play.google.com/store/apps/details?id=com.celio1878.beyourstories).
- **Pack:** Autonomous condo mailroom automation and delivery notification system.
- **TATU Design (T3O2):** AI-powered custom tattoo studio and generative artwork engine.
- **PostHub:** Multi-platform programmatic social content distribution pipeline.
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
| Markdown Engine | `marked` (v18) + Vite eager raw glob (71 bundled articles) |
| i18n | Custom context in `app/i18n.tsx` + `app/lib/profile-translations.ts` |
| Build Tool | Vite 8 (via React Router) |
| Package Manager | Bun |
| Deployment | Vercel (Analytics + SpeedInsights integrated) |

## Route Architecture
| Route | Component | Purpose |
|---|---|---|
| `/` | `app/routes/home.tsx` | Flagship showcase: Hero value proposition, Aldeon Ecosystem, Capabilities, Latest Discoveries preview, and Contact CTA. Zero job-seeking or availability indicators. |
| `/blog` | `app/routes/blog.tsx` | Knowledge Hub index: 71 technical articles and Substack dispatches, live search, tag filtering, and hybrid reader navigation. |
| `/blog/:slug` | `app/routes/blog-post.tsx` | Article reader: Markdown rendering, canonical SEO URLs, Substack dispatches callout, and author bio. |
| `/about` | `app/routes/about.tsx` | Streamlined founder profile: Mission, What I'm Building Now (Aldeon ecosystem), operating principles, and direct contact/social channels. |

## Internationalization (i18n)
- Streamlined to strictly **English (`en` as default)** and **Brazilian Portuguese (`pt-BR`)**.
- German (`de`) and Spanish (`es`) have been eliminated.
- Persistent user preference in `localStorage` (`preferred-locale`).
- Binary `EN / PT` toggle in Navigation and Mobile drawer.
