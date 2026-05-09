# CONTEXT.md — Project Context

## What This Project Is
A single-page application (SPA) serving as Célio Vieira's professional profile/portfolio website. It is publicly accessible and intended to showcase professional experience, skills, projects, certifications, education, and contact information to recruiters, collaborators, and the tech community.

## Owner
- **Name:** Célio Vieira
- **Location:** Minas Gerais, Brazil
- **Current Role:** Data Engineer & Tech Lead at Itaú Unibanco (Banco Itaú)
- **LinkedIn:** https://www.linkedin.com/in/celio-vieira
- **GitHub (personal):** https://github.com/Celio1878
- **GitHub (BYS project):** https://github.com/BeYourStories
- **YouTube:** (linked in hero section)
- **Email:** contato@celiovieira.com

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 19 + React Router 7 (SPA mode, SSR enabled in config for build) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui-style (Card, Badge, Separator) |
| Icons | lucide-react |
| i18n | Custom context in `app/i18n.tsx` |
| Build | Vite (via React Router) |
| Package Manager | Bun |
| Deployment | Vercel (Analytics + SpeedInsights integrated) |
| Containerization | Docker (Dockerfile present) |

## Key Files
| File | Purpose |
|---|---|
| `app/routes/home.tsx` | Main page — all sections rendered here |
| `app/i18n.tsx` | All text content + locale detection (en, de, pt-BR, es) |
| `app/app.css` | Global styles, Tailwind config, dark mode, animations |
| `app/root.tsx` | App shell — HTML structure, providers, analytics |
| `app/components/nav.tsx` | Sticky nav with active section highlighting |
| `app/components/reveal.tsx` | Scroll-into-view animation wrapper |
| `public/resume.pdf` | Celio's CV — embedded and downloadable |
| `public/working.JPEG` | Profile photo |
| `public/*.png` | Project screenshots (BYS, App Builder, CDK Factory) |

## Sections on the Page
1. **Hero** — Name, subtitle (roles), LinkedIn + YouTube CTAs, profile photo
2. **About** — Bio paragraph with tech focus and personal interests
3. **Experience** — Work history with role, company, period, bullet points
4. **Education** — Degrees and institutions
5. **Certifications** — AWS, Udemy, and other certs with skills tags
6. **Skills** — Categorized skill badges
7. **Hobbies** — Personal interests list
8. **Projects** — BYS, NodeJS App Builder, CDK Factory with descriptions and links
9. **BYS Showcase** — Screenshots of Be Your Stories app
10. **NodeJS App Builder** — Screenshots
11. **CDK Factory** — Screenshots
12. **Resume** — Embedded PDF viewer + download link
13. **Contact** — LinkedIn link and email

## Internationalization
- Auto-detects browser language on load
- Supported locales: `en` (default), `de`, `pt-BR`, `es`
- All strings in `app/i18n.tsx` — no external i18n library

## Theme
- System-based dark/light mode via CSS `@media (prefers-color-scheme: dark)`
- No manual theme toggle — removed by design
- Dark mode CSS variables defined in `app/app.css`

## Celio's Professional Identity (for content decisions)
- **Primary roles:** FullStack Engineer, Data Engineer, AI Engineer, Tech Lead
- **Key technologies:** AWS (Glue, EMR, Athena, Redshift, Kinesis), Apache Spark/PySpark, Kafka, Airflow, Iceberg, Node.js, Python, Go, TypeScript, React, React Native
- **AI focus:** LLMs, RAG pipelines, Ollama, HuggingFace, ComfyUI, fine-tuning
- **Side projects:** Be Your Stories (BYS), NodeJS App Builder, cdk-factory
- **Soft skills:** Team leadership, mentoring, requirements gathering, TDD/SOLID/DDD advocate
