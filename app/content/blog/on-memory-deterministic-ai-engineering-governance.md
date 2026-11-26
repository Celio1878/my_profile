---
title: "MemOn (formerly OnMemory): Deterministic AI Engineering Memory & Zero-Leak Governance"
slug: "on-memory-deterministic-ai-engineering-governance"
description: "Inside MemOn (aldeon.app/mem-on): A 3-phase AI agent context protocol, 5-field anti-pattern registry, client-side <20KB memory linter (-83.6% token savings), and portable zero-dependency CLI bootstrapper."
date: "2026-11-18"
tags: ["AI", "Agents", "Architecture", "DevOps", "Developer Tooling", "Security"]
lang: "en"
author: "Célio Vieira"
---

## The Multi-Repo AI Engineering Bottleneck: Context Bloat & Drift

When operating an autonomous venture ecosystem spanning multiple web surfaces, Expo React Native clients, Terraform stacks, and AWS/GCP serverless backends, autonomous coding agents encounter two compounding failure modes:

1. **Architectural Drift Across Sessions**: Without a compact, canonical record of locked stack decisions, an agent on day 30 may re-introduce a deprecated library, break SSR bundle rules, or wire cross-tenant credentials between isolated applications.
2. **Unbounded Context Bloat**: Appending every debugging note into massive `MEMORY.md` or `CLAUDE.md` files degrades retrieval accuracy, triggers mid-session context truncation, and wastes over **80% of prompt token budgets** on stale history.

To standardize how autonomous agents bootstrap, debug, and maintain all **8 Aldeon products**—and make that workflow portable to external repositories—we built **MemOn (`mem-on`, formerly OnMemory)** at [`aldeon.app/mem-on`](https://aldeon.app/mem-on) (with permanent `308` redirects preserved from `/on-memory`).

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                     Phase 1: Pre-Flight Check                              │
│  Read target `MEMORY.md` (<20KB) ──► Load Locked Decisions & Stack Caps    │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                Phase 2: Execution & 5-Field Error Guardrail                │
│  Match Error Signature ──► Apply Verified Solution (Zero Trial-and-Error)  │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                 Phase 3: Post-Task Compaction & Security Gate              │
│  Rotate Last-5 Executions • Offload Old ADRs • Enforce <20KB & Zero-Leak   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 4-Section Standard Schema & Strict `<20KB` Ceiling

Every repository governed by `on-memory` maintains a rolling `MEMORY.md` constrained strictly below **20,000 bytes** (~200–300 lines), achieving an average **83.6% token overhead reduction** compared to unstructured project logs.

The file adheres to four deterministic sections:

1. **`## 1. Decisions Locked (Do Not Re-ask)`**: Tabular record of immutable architectural constraints (e.g., React Router SSR zero-backend rule, pinned C++ native animation versions, tenant isolation).
2. **`## 2. Active Tech Stack & Architecture`**: Exact runtimes, storage boundaries, routes, and validation gates.
3. **`## 3. Known Anti-Patterns & Pitfalls (5-Field Format)`**: Every resolved non-trivial bug is encoded in a rigid 5-field schema so future agents recognize and bypass it immediately:
   - **Symptom / Error Signature**
   - **Anti-Pattern (DO NOT REPEAT)**
   - **Root Cause**
   - **Verified Solution**
   - **Scope / Tags**
4. **`## 4. Recent Executions (Last 5)`**: A rolling 5-entry execution window with date, conventional commit scope, and exact passing test/build metrics. Older narrative ADRs rotate cleanly into `docs/ADR_ARCHIVE.md`.

---

## 2. Zero-Leak Security Law ("Security is the Law")

Because memory files are routinely ingested into LLM context windows and versioned across Git repositories, **`on-memory` enforces air-gapped credential hygiene**:

- **Zero Raw Secrets**: API keys, JWTs, OAuth client secrets, cloud account numbers, merchant IDs, and private connection strings are strictly forbidden in `MEMORY.md` and public web bundles.
- **Sanitized Placeholders**: Reusable templates enforce `<PROJECT_ID>`, `<API_KEY>`, and `https://api.example.com` placeholders.
- **Automated CI Gate (`on-memory-security.test.ts`)**: Before any portal change deploys to production, automated test suites scan compile-time datasets (`onMemoryData.ts`) and documentation artifacts using regex audits, failing the build immediately if a secret pattern or sensitive identifier appears.

---

## 3. Portable Zero-Dependency CLI (`init-mem-on.mjs`)

To remove onboarding friction for new projects, `mem-on` includes a single-file, zero-dependency Node/Bun CLI scaffolder and auditor:

```bash
# Bootstrap a new project with locked architecture & 5-field anti-patterns
node .agents/skills/mem-on/scripts/init-mem-on.mjs \
  --target ./my-new-product \
  --name "MyProduct" \
  --preset mobile-cloud

# Audit an existing MEMORY.md for <20KB budget & Zero-Leak compliance
node .agents/skills/mem-on/scripts/init-mem-on.mjs \
  --audit ./MEMORY.md
```

Four battle-tested architecture presets encode lessons from across the Aldeon ecosystem:
- **`monorepo`**: Multi-Product Ecosystem Monorepo (Web Portal + Mobile Apps + Cloud Services)
- **`mobile-cloud`**: Expo React Native Mobile App + Serverless Cloud Backend + RevenueCat Subscriptions
- **`edge-web`**: High-Performance React 19 / SSR Edge Web Platform targeting Lighthouse 95+
- **`fullstack`**: Modern Full-Stack Web & API Service with KMS Envelope Encryption

---

## 4. Interactive Stack Composer & Client-Side Linter (`aldeon.app/mem-on`)

Beyond the CLI, **MemOn** ships as a live developer governance surface on the Aldeon web portal (`aldeon.app/mem-on`):

- **Interactive Stack Composer**: Generates tailored `AGENTS.md`, `MEMORY.md`, `SKILL.md`, and CI security test scaffolds directly in the browser for selected stack combinations.
- **100% Client-Side `<20KB` Memory Linter**: Engineers can paste any `MEMORY.md` or `CLAUDE.md` file directly into the browser tool to audit byte footprint against the 20KB cap, validate 5-field anti-pattern structure, and scan for leaked keys or tokens **without ever sending file contents over the network**.
- **Searchable Cross-Ecosystem Anti-Pattern Registry**: Exposes sanitized, battle-tested engineering resolutions covering React Router SSR `*.client.*` stripping, Apple Review StoreKit bundling, iOS CALayer 3D clipping, Gradle OOM tuning, and Substack ProseMirror publishing.

---

## Production Outcomes

- **-83.6% Context Token Overhead**: Replaces sprawling multi-thousand-line history logs with compact `<20KB` high-signal architectural state.
- **0% Secret Leakage Gate**: Enforced automatically by CI regex suites and the client-side zero-network linter.
- **Cross-Ecosystem Consistency**: Governs all 8 Aldeon products (`SwanGo`, `RagOn`, `MemOn`, `HandSpeak`, `Be Your Stories`, `Pack`, `TATU Design`, `PostHub`) and external repositories from a single deterministic protocol.

*Try the Interactive Stack Composer and Client-Side Linter live at [aldeon.app/mem-on](https://aldeon.app/mem-on).*
