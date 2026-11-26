---
title: "The Aldeon Architecture: Orchestrating an Autonomous 8-Product Multi-Cloud Ecosystem"
slug: "aldeon-unified-edge-ssr-multi-cloud-ecosystem"
description: "Architectural blueprint of the Aldeon platform: Consolidating 8 autonomous applications under domain-sliced React Router 7 Edge SSR (TypeScript 7 + Biome), zero-backend portal isolation, AST-verified i18n, and multi-cloud infrastructure."
date: "2026-10-16"
tags: ["Architecture", "Vercel SSR", "Multi-Cloud", "DevOps", "Terraform", "FinOps"]
lang: "en"
author: "Célio Vieira"
---

## The Venture Studio Challenge: Multi-Product Synergy Without Monolithic Bloat

As an engineering founder operating multiple consumer, fintech, developer, and B2B products—**SwanGo**, **RagOn**, **MemOn**, **HandSpeak**, **Be Your Stories**, **Pack**, **TATU Design**, and **PostHub**—traditional architecture choices present a false dichotomy:

1. **Independent Disjointed Websites**: Building 8 distinct landing pages, domains, and legal compliance routes leads to operational chaos, divergent design languages, and fragmented branding.
2. **Monolithic Backend Integration**: Unifying databases, backend APIs, and authentication into a single central server introduces tight coupling, catastrophic blast radiuses, and massive compliance headaches across Apple, Google, financial data workflows, and privacy regulators (GDPR/LGPD).

To overcome this dilemma, we designed the **Aldeon Ecosystem Architecture** (`aldeon.app`). Aldeon acts as the central unified web platform and orchestration layer, while child applications maintain **absolute autonomy and data isolation** across their respective mobile clients and cloud backends.

```text
                     ┌──────────────────────────────────────────────────┐
                     │          Aldeon Web Portal (Vercel)              │
                     │          React Router 7 Edge SSR (gru1)          │
                     │    Domain-Sliced `src/shared/` + `features/`     │
                     │  s-maxage=300, SWR=86400, Vary: Accept-Language  │
                     └───────┬──────────────────────────┬───────────────┘
                             │                          │
        ┌────────────────────┴──────────┐               │
        ▼                               ▼               ▼
[/swango & /learn]            [/mem-on & /rag-on]  [/handspeak & /learn]
[/bys Web Suite]              [/pack Showcase]     [/tatu & /postshub]
        │                               │               │
════════╪═══════════════════════════════╪═══════════════╪════ [Zero Cross-Talk Boundary]
        │                               │               │
        ▼                               ▼               ▼
┌───────────────────────┐ ┌──────────────────────┐ ┌───────────────────────┐
│ SwanGo Services       │ │ BYS & Pack Services  │ │ TATU, Posts & HandSpk │
│ GCP Cloud Run FastAPI │ │ Supabase + Meilisrch │ │ GCP Cloud Run / AWS   │
│ BigQuery dbt Medallion│ │ AWS Lambda, DynamoDB │ │ Step Functions + KMS  │
│ Dedicated Supabase RLS│ │ EventBridge + Firebs │ │ Firestore + Storage   │
└───────────────────────┘ └──────────────────────┘ └───────────────────────┘
```

---

## 1. The Zero-Backend Invariant & Domain-Sliced Portal

A foundational architectural invariant enforced across `aldeon/app` is the **Zero-Backend Footprint Rule**:
- The web platform hosted on Vercel contains **zero** persistent databases (no Postgres or DynamoDB instances), **zero** ORMs (no Prisma or Drizzle), and **zero** stateful Redis connections.
- It operates strictly as a presentation, edge routing, marketing showcase, interactive simulator, and legal compliance surface.
- Internally, the portal follows a **domain-sliced module architecture** (`src/shared/` for UI primitives, unified `radix-ui`, i18n, and Stripe/Resend server helpers + `src/features/<product>/` for isolated product domains), with thin route entrypoints in `src/routes/` covering `/swango`, `/rag-on`, `/mem-on`, `/bys`, `/pack`, `/tatu`, `/postshub`, `/handspeak`, and `/support` via `@vercel/react-router/vite`.

When the portal needs to interact with services (such as dispatching support tickets, running SwanGo Edge API proxies, or verifying deletion requests), it executes lightweight, isolated serverless actions communicating via secure REST APIs or transactional email via **Resend** (`noreply@aldeon.app`, `support@aldeon.app`).

---

## 2. Pinned Edge SSR in São Paulo (`gru1`) & Caching Invariants

Because our cloud infrastructure primarily resides in the South America East region (`sa-east-1` for AWS and `southamerica-east1` for Google Cloud), deploying Edge SSR functions to default North American or European regions would incur a 140ms cross-Atlantic roundtrip penalty on every server-rendered page request.

To maximize performance, Aldeon pins Vercel Edge SSR execution to **`gru1` (São Paulo, Brazil)**, keeping compute proximate to cloud data stores.

### Edge Caching Policy
Public marketing routes and legal notices apply an aggressive stale-while-revalidate caching header:

```http
Cache-Control: s-maxage=300, stale-while-revalidate=86400
Vary: Accept-Language
```

This ensures instantaneous worldwide edge CDN delivery while respecting language negotiation without polluting the cache with authorization cookies.

---

## 3. Core Web Vitals, AST i18n Parity & SSR Safety Gates

Achieving Lighthouse 95+ performance scores and zero-regression SSR reliability across 8 distinct product surfaces requires strict automated verification:

1. **Self-Hosted Variable Fonts**: All typography uses self-hosted `@fontsource-variable` packages, completely eliminating render-blocking third-party Google Fonts DNS handshakes.
2. **Pure CSS Hero Entrance (`.anim-rise`)**: Initial hero content avoids `motion.div` with `initial={{ opacity: 0 }}`. Statically rendered HTML includes full text opacity, allowing pure CSS animations to handle the visual lift and ensuring sub-second Largest Contentful Paint (LCP).
3. **LazyMotion & Scoped Language Dictionaries**: Framework-heavy Framer Motion imports are consolidated into `LazyMotion` (`domAnimation`), while root `LanguageContext` remains state-only (`createProductLanguageHook()` scopes locale payloads per product route, holding `HomePage` under `200 KB gz`).
4. **TypeScript 7, Biome & AST Zero-Hardcode Bilingual i18n Parity (`oxc-parser`)**: Automated `bun:test` suites (`0` explicit `any`, Biome lint, `oxc-parser` AST scans) forbid hardcoded copy or unlocalized validation schemas across both `EN` and `PT-BR`.
5. **SSR Bundle Safety & Strict Route Budgets (`verify:ssr` & `perf:budget:strict`)**: Every production build runs `ssr-bundle-safety.test.ts` and `bun run verify:ssr` across all product routes—verifying lazy SSR-safe client initialization and failing CI if any route exceeds gzip JS/CSS thresholds.

---

## 4. Multi-Cloud Tenant Isolation & Credentials Registry

Each child application operates within its own dedicated cloud project:
- **SwanGo**: Dedicated Supabase PostgreSQL (RLS in `sa-east-1`), BigQuery `swango_market` (`dbt-core` 20-table Medallion warehouse), and Python 3.12 FastAPI microservices on GCP Cloud Run (`southamerica-east1`).
- **MemOn (`mem-on`, formerly OnMemory)**: Air-gapped compile-time datasets (`onMemoryData.ts`) powering the client-side `<20KB` memory linter and interactive stack composer, verified by zero-leak CI regex tests (`on-memory-security.test.ts`).
- **RagOn (`rag-on`)**: Free air-gapped RAG studio powering the live 6-stage BM25 + 3-gram X-Ray playground, client-side corpus auditor, and 7-file starter kit, protected by FNV-1a hashed client guardrails and `rag-on-security.test.ts`.
- **BYS**: Relational persistence and Auth in Supabase, full-text book indexing in Railway Meilisearch, and Python Lambda narrators on AWS S3.
- **Pack**: Dual-cloud architecture with Cloud Firestore for real-time mobile feeds and Amazon DynamoDB for audit trails, orchestrated via AWS EventBridge.
- **TATU Design**: Google Cloud and Firebase infrastructure (`southamerica-east1`) with Firebase AI Logic and secure Cloud Storage.
- **PostHub**: Serverless microservices on AWS Step Functions, DynamoDB single-table repositories, KMS cryptographic encryption context (`user_id`), and EventBridge cron dispatchers.
- **HandSpeak**: High-throughput FastAPI microservices containerized on GCP Cloud Run paired with local client WebAssembly hand tracking and a 5-track Bilingual Libras Academy.

### Security Guarantees
No child application may read from or write to a sibling application's database. Secret keys (`AWS_SECRET_ACCESS_KEY`, Firebase service account credentials, Supabase service roles, RevenueCat secret keys) are strictly injected at runtime via environment variables and never baked into web or mobile client bundles.

---

## 5. Dual-Runner Mobile CI/CD (`eas-deploy.yml`)

With four active mobile clients distributing through Expo Application Services (EAS), pooling the 15 free monthly cloud builds across an organization quickly leads to quota exhaustion.

To eliminate build bottlenecks while capping cloud spending under $5.00/month, we implemented a **Dual-Runner CI/CD Strategy** in `.github/workflows/eas-deploy.yml`:
1. The pipeline attempts an EAS Cloud Build first.
2. If the cloud build limit is reached, it seamlessly falls back to a GitHub Actions `macos-latest` runner executing local builds:
   ```bash
   eas build --platform ios --local
   eas submit --platform ios --profile production
   ```
3. Derived CocoaPods caches and Gradle caches on physical NVMe storage keep local build times under 12 minutes.

---

## Conclusion

By enforcing a strict Zero-Backend web perimeter, regional edge proximity in `gru1`, AST-verified i18n and SSR CI gates, and absolute multi-cloud tenant isolation, the Aldeon platform demonstrates how an agile venture studio can operate **8 sophisticated commercial products** with minimal overhead and rock-solid architectural rigor.

*Explore the ecosystem live at [aldeon.app](https://aldeon.app).*
