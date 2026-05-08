# MEMORY.md — Information Fixes & Issues

## Theme System
- **DO NOT** use `react-router-theme` cookie-based theme — it was removed.
- Theme is now driven purely by CSS `@media (prefers-color-scheme: dark)`.
- The `ThemeContext` and `ThemeToggle` components still exist in the codebase but are **not used** — do not re-add them to nav or root.
- `@custom-variant dark` in `app.css` uses `@media (prefers-color-scheme: dark)`, not `.dark` class selector.

## Icons (lucide-react)
- `Github`, `Linkedin`, `Youtube` do **not** exist in lucide-react — caused build errors.
- Use `Github` → not available; use an SVG or `ExternalLink` instead.
- Safe icons confirmed working: `Mail`, `MapPin`, `Briefcase`, `GraduationCap`, `Award`, `Code2`, `FolderOpen`, `FileText`, `Sparkles`, `Brain`, `Cloud`, `Layers`, `SquareArrowOutUpRight`, `Menu`, `X`.

## Build
- Use `bun run build` (not `npm run build` — npm is not installed).
- There is a recurring warning about `vite-tsconfig-paths` plugin — this is harmless and can be ignored.
- Always verify build passes after changes to `home.tsx` or `app.css`.

## Content Sources
- All text content lives in `app/i18n.tsx` dictionaries (en, de, pt-BR, es).
- The `app/lib/translations.ts` file is for a **different project** (BeYourStories) — do not confuse it with the profile i18n.
- CV data is in `public/resume.pdf`.

## Images
- All images are in `/public/`: `me.jpeg`, `bys-banner.png`, `bys-home-mobile.png`, `book-bys-search-mobile.png`, `bys-ipad-search.png`, `bys-ipad-user.png`, `cdk-factory-items.png`, `express-app-builder-pkgs.png`, `express-app-builder-tests.png`.
- Images are already referenced in `home.tsx` showcase sections.

## i18n Locales
- Supported: `en`, `de`, `pt-BR`, `es`.
- When adding new content to EN, mirror it to the other 3 locales to avoid missing keys.
- The `de` and `es` skill lists were not fully updated with AI/data tools — they may be out of sync with EN.

## Routing
- This is a SPA (SSR disabled in `react-router.config.ts`).
- No server-side loader/action exports needed in `root.tsx`.
