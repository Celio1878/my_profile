# MEMORY.md — Information Fixes & Issues

## Theme System
- **DO NOT** use `react-router-theme` cookie-based theme — it was removed.
- Theme is now driven purely by CSS `@media (prefers-color-scheme: dark)`.
- The `ThemeContext` and `ThemeToggle` components and related files were **deleted** to reduce project size.
- `@custom-variant dark` in `app.css` uses `@media (prefers-color-scheme: dark)`, not `.dark` class selector.

## Icons (lucide-react)
- `Github`, `Linkedin`, `Youtube` do **not** exist in lucide-react — caused build errors.
- Use `Github` → not available; use an SVG or `ExternalLink` instead.
- Safe icons confirmed working: `Mail`, `MapPin`, `Briefcase`, `GraduationCap`, `Award`, `Code2`, `FolderOpen`, `FileText`, `Sparkles`, `Brain`, `Cloud`, `Layers`, `SquareArrowOutUpRight`, `Menu`, `X`.

## Build
- Use `bun run build` (not `npm run build` — npm is not installed).
- The `vite-tsconfig-paths` plugin was removed in favor of Vite 6+ native `resolve.tsconfigPaths: true` in `vite.config.ts`.
- If module resolution errors like "Cannot find module '~/...'" occur, prefer using relative paths in entry files (`root.tsx`, `home.tsx`) for maximum compatibility.
- Always verify build passes after changes to `home.tsx` or `app.css`.

## Content Sources
- All text content lives in `app/i18n.tsx` dictionaries (en, de, pt-BR, es).
- The unused `app/lib/translations.ts` (from the BYS project) was **deleted** to reduce project size.
- CV data is in `public/resume.pdf`.

## Images
- All images are in `/public/`: `working.JPEG`, `bys-banner.png`, `bys-home-mobile.png`, `book-bys-search-mobile.png`, `bys-ipad-search.png`, `bys-ipad-user.png`, `cdk-factory-items.png`, `express-app-builder-pkgs.png`, `express-app-builder-tests.png`.
- Images are already referenced in `home.tsx` showcase sections.

## i18n Locales
- Supported: `en`, `de`, `pt-BR`, `es`.
- When adding new content to EN, mirror it to the other 3 locales to avoid missing keys.
- The `de` and `es` skill lists were not fully updated with AI/data tools — they may be out of sync with EN.

## Routing
- This is a SPA, but `react-router.config.ts` must keep `ssr: true` for the build tool to correctly generate the server-side entry point used for static generation/initial serve.
- No server-side loader/action exports needed in `root.tsx`.
