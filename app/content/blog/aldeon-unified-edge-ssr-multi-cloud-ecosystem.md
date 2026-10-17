---
title: "The Aldeon Architecture: Orchestrating an Autonomous 5-Product Multi-Cloud Ecosystem"
slug: "aldeon-unified-edge-ssr-multi-cloud-ecosystem"
description: "Architectural blueprint of the Aldeon platform: Consolidating 5 autonomous applications under React Router 7 Edge SSR, zero-backend portal isolation, and multi-cloud infrastructure."
date: "2026-10-16"
tags: ["Architecture", "Vercel SSR", "Multi-Cloud", "DevOps", "Terraform", "FinOps"]
lang: "en"
author: "Célio Vieira"
---

## The Venture Studio Challenge: Multi-Product Synergy Without Monolithic Bloat

As an engineering founder operating multiple consumer and B2B products—**Be Your Stories**, **Pack**, **TATU Design**, **PostHub**, and **HandSpeak**—traditional architecture choices present a false dichotomy:

1. **Independent Disjointed Websites**: Building 5 distinct landing pages, domains, and legal compliance routes leads to operational chaos, divergent design languages, and fragmented branding.
2. **Monolithic Backend Integration**: Unifying databases, backend APIs, and authentication into a single central server introduces tight coupling, catastrophic blast radiuses, and massive compliance headaches across Apple, Google, and privacy regulators (GDPR/LGPD).

To overcome this dilemma, we designed the **Aldeon Ecosystem Architecture** (`aldeon.app`). Aldeon acts as the central unified web platform and orchestration layer, while child applications maintain **absolute autonomy and data isolation** across their respective mobile clients and cloud backends.

```
                     ┌───────────────────────────────────────────────┐
                     │          Aldeon Web Portal (Vercel)           │
                     │          React Router 7 Edge SSR (gru1)       │
                     │  s-maxage=300, SWR=86400, Vary: Accept-Lang   │
                     └───────┬───────────────────────────────┬───────┘
                             │                               │
            ┌────────────────┴───────────────┐               │
            ▼                                ▼               ▼
   [/bys Web Suite]                  [/pack Showcase]   [/tatu Studio]
   [/postshub Console]               [/handspeak Studio][/support Hub]
            │                                │               │
════════════╪════════════════════════════════╪═══════════════╪═══════════ [Zero Cross-Talk Boundary]
            │                                │               │
            ▼                                ▼               ▼
┌───────────────────────┐        ┌───────────────────────┐  ┌───────────────────────┐
│ BYS Services & Data   │        │ Pack Services & Data  │  │ TATU Services & Data  │
│ Supabase Postgres/Auth│        │ AWS Lambda, DynamoDB  │  │ GCP / Cloud Firestore │
│ Railway Meilisearch   │        │ Firebase Auth, EventBr│  │ Firebase AI / Storage │
│ AWS Polly S3 Narrator │        │ Terraform (sa-east-1) │  │ Terraform (sa-east-1) │
└───────────────────────┘        └───────────────────────┘  └───────────────────────┘
```

---

## 1. The Zero-Backend Invariant in the Web Platform

A foundational architectural invariant enforced across `aldeon/app` is the **Zero-Backend Footprint Rule**:
- The web platform hosted on Vercel contains **zero** persistent databases (no Postgres or DynamoDB instances), **zero** ORMs (no Prisma or Drizzle), and **zero** stateful Redis connections.
- It operates strictly as a presentation, edge routing, marketing showcase, interactive simulator, and legal compliance surface.
- Sub-path routing (`/bys`, `/pack`, `/tatu`, `/postshub`, `/handspeak`, `/support`) is consolidated inside a single React Router 7 application deployed with `@vercel/react-router/vite`.

When the portal needs to interact with services (such as dispatching support tickets or verifying deletion requests), it executes lightweight, isolated serverless actions communicating via secure REST APIs or transactional email via **Resend** (`noreply@aldeon.app`, `support@aldeon.app`).

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

## 3. Core Web Vitals Optimization: 5 Disciplines

Achieving Lighthouse 95+ performance scores across desktop and low-powered mobile devices required five strict architectural decisions:

1. **Self-Hosted Variable Fonts**: All typography uses self-hosted `@fontsource-variable` packages, completely eliminating render-blocking third-party Google Fonts DNS handshakes.
2. **Pure CSS Hero Entrance (`.anim-rise`)**: Initial hero content avoids `motion.div` with `initial={{ opacity: 0 }}`. Statically rendered HTML includes full text opacity, allowing pure CSS animations to handle the visual lift and ensuring sub-second Largest Contentful Paint (LCP).
3. **LazyMotion Architecture**: Framework-heavy Framer Motion imports are consolidated into `LazyMotion` with `domAnimation`, using `m.*` primitives to minimize main-thread execution time.
4. **Deferred Client SDKs**: Heavy SDKs (such as Firebase Auth and Supabase) are dynamically imported only upon user interaction or via `requestIdleCallback`, preventing Total Blocking Time (TBT) regressions on landing routes.
5. **Route Bundle Budgets in CI**: Automated CI scripts (`bun run perf:budget:strict`) analyze build artifacts, failing PRs if any route exceeds strict gzip thresholds.

---

## 4. Multi-Cloud Tenant Isolation & Credentials Registry

Each child application operates within its own dedicated cloud project:
- **BYS**: Relational persistence and Auth in Supabase, full-text book indexing in Railway Meilisearch, and Python Lambda narrators on AWS S3.
- **Pack**: Dual-cloud architecture with Cloud Firestore for real-time mobile feeds and Amazon DynamoDB for audit trails, orchestrated via AWS EventBridge.
- **TATU Design**: Google Cloud and Firebase infrastructure (`southamerica-east1`) with Firebase AI Logic and secure Cloud Storage.
- **PostHub**: Serverless microservices on AWS Step Functions, DynamoDB single-table repositories, and EventBridge cron dispatchers.
- **HandSpeak**: High-throughput FastAPI microservices containerized on GCP Cloud Run.

### Security Guarantees
No child application may read from or write to a sibling application's database. Secret keys (`AWS_SECRET_ACCESS_KEY`, Firebase service account credentials, Supabase service keys) are strictly injected at runtime via environment variables and never baked into web or mobile client bundles.

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

By enforcing a strict Zero-Backend web perimeter, regional edge proximity in `gru1`, and absolute multi-cloud tenant isolation, the Aldeon platform demonstrates how an agile venture studio can operate 5 sophisticated commercial products with minimal overhead and rock-solid architectural rigor.

*Explore the ecosystem live at [aldeon.app](https://aldeon.app).*
