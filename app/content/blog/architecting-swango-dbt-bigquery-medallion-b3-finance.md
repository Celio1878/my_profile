---
title: "Architecting SwanGo: $0/mo dbt-core & BigQuery Medallion Warehouse for B3 Finance"
slug: "architecting-swango-dbt-bigquery-medallion-b3-finance"
description: "Technical blueprint of SwanGo: A 20-table dbt-core and Google BigQuery Medallion warehouse indexing 1,076+ B3, CVM, BCB, Crypto, and SEC EDGAR assets with deterministic quantitative engines and SHA-256 verifiable shared workspaces."
date: "2026-11-20"
tags: ["Data Engineering", "dbt", "BigQuery", "FinTech", "Lakehouse", "Python", "Architecture"]
lang: "en"
author: "Célio Vieira"
---

## The FinTech Engineering Constraint: Zero Mock Data at $0.00/mo

Most consumer investment trackers and personal finance platforms fail along two structural axes:

1. **Mock-Heavy Prototypes & Opaque Wrapper Logic**: Platforms ship static seed portfolios or unverified estimates instead of computing deterministic metrics from real bank statements (`OFX`, `CSV`, `XLSX`) and official brokerage clearing notes (`SINACOR`).
2. **Prohibitive Market Data & Warehouse Burn**: Subscribing to commercial EOD feeds or spinning up always-on cluster warehouses destroys unit economics before an independent product reaches scale.

**SwanGo** (`aldeon.app/swango`) was engineered under the Aldeon umbrella to eliminate both compromises. Its entire market warehouse, analytical transformation layer, and REST runtime operate at **$0.00/month** in infrastructure baseline cost while enforcing **100% real data** and deterministic math across **1,076+ tracked assets**.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│  100% Free Official & Public Market Feeds (Zero Commercial EOD Licenses)   │
│  B3 COTAHIST • CVM Dados Abertos • BCB SGS • Tesouro • Crypto • SEC EDGAR  │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Nightly Cloud Scheduler -> Cloud Run Job
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│           Google BigQuery Free Tier (`swango_market` Medallion)            │
│   Bronze (9 Raw Tables) ──► Silver (6 Clean Models) ──► Gold (5 Marts)     │
│                 Validated by 49/49 dbt tests & 9/9 Freshness SLAs          │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Publish-Gated Hot-Cache Sync
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│       Dedicated Supabase PostgreSQL (RLS) + GCP Cloud Run FastAPI          │
│  `b3_asset_cache` • `macro_benchmarks` • RBAC Workspaces • SHA-256 Trails  │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Edge APIs (`/api/swango/*`)
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│        Aldeon Web Platform (`aldeon.app/swango`) — React Router 7 SSR      │
│  Console • 5 Quant Modules • 6-Stage Lab (/simulator) • Academy (/learn)   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 20-Table `dbt-core` + BigQuery Medallion Warehouse

Rather than maintaining ad-hoc Python ETL scripts that write unvalidated rows directly to production tables, SwanGo separates ingestion from transformation using **`dbt-core` (Apache 2.0)** targeting **Google BigQuery** (staying well inside BigQuery's `10 GiB` storage / `1 TiB` query free tier).

### Bronze Layer (9 Raw Ingestion Tables)
The containerized `etl-dbt-runtime` Cloud Run Job pulls strictly free, commercially safe official feeds:
- **B3 COTAHIST & Indices (`IBOV`, `IFIX`)**: Official end-of-day quotes, volume, and instrument classifications across Brazilian equities, FIIs, ETFs, and BDRs.
- **CVM Dados Abertos (`dados.cvm.gov.br`)**: Annual (`DFP`) and quarterly (`ITR`) corporate financial statements, company registry (`Cadastro`), and Resolution 175 monthly FII disclosures.
- **BCB SGS & Tesouro Transparente**: Macroeconomic series including `SELIC` (`432`), `CDI` (`4389`), `IPCA` (`433`), `PTAX` (`1`), and sovereign bond yield curves.
- **Global & Alternative Feeds**: Public spot OHLCV series for digital assets (`Binance data-api` / `Coinbase`) and **SEC EDGAR XBRL** filings supporting BDRs and US brokerage CSV imports.

### Solving Live BigQuery & CVM Production Quirks
Running real official data in production uncovered three non-trivial engineering edge cases that are solved deterministically in our Silver layer (`6 models`):
1. **BigQuery Schema Drift on `WRITE_TRUNCATE`**: `load_table_from_json` with `autodetect=True` mutates zero-padded `STRING` identifiers (`bdi_code`, `cvm_code`, `cik`) into `INT64`, breaking downstream string joins. Our loader (`bq_loader.py`) explicitly fetches the Terraform-provisioned table schema (`autodetect=target_schema is None`), and Silver SQL models defensively `CAST(... AS STRING)` with `LPAD` normalization.
2. **BCB SGS `/ultimos/{n}` Deprecation & PTAX Gaps**: BCB's `/dados/ultimos/{n}` endpoint returns HTTP 400 under current gateway rules, and weekends/holidays introduce null FX rates. SwanGo queries explicit 450-day `?dataInicial=&dataFinal=` ranges and applies `FIRST_VALUE` PTAX backfill across non-trading dates.
3. **CVM ITR DRE 3M vs. 9M YTD Duplication**: Quarterly CVM filings publish both standalone 3-month and cumulative year-to-date income statement lines under identical `DT_REFER` keys, producing false negative `LAG()` deltas. Silver deduplication partitions by earliest `DT_INI_EXERC` to isolate true standalone quarterly cash flows.

### Gold Layer (5 Analytical Marts) & Publish-Gated Supabase Sync
Gold marts aggregate valuations, dividend yields, multi-horizon price bases (Base-100 comparisons), macro benchmarks, and pipeline health metadata. Crucially, the sync worker enforces a **publish-gate invariant**: if any of the **49 `dbt test` assertions** or **9 source freshness SLAs** fails, the pipeline aborts before touching the live Supabase `b3_asset_cache` hot cache.

To support offline CI without GCP credentials, incremental models guard metadata calls with:
```sql
{% if execute and target.name != 'ci' and is_incremental() %}
```
Allowing `dbt compile --target ci` to validate all 47/47 graph nodes completely offline.

---

## 2. Deterministic Quantitative Engines & "Can I Buy?"

Inside SwanGo's FastAPI backend and modular web runtime (`app/src/lib/swango/`), every calculation is 100% deterministic—zero mocked balances, zero opaque heuristics:

- **Universal *"Can I Buy?"* Decision Engine**: Evaluates an intended purchase against live cashflow surplus, emergency runway, and opportunity cost, computing **cash discount vs. `1x–24x` installment Net Present Value (NPV)** discounted against live **CDI** yields.
- **5 Quantitative Trade Modules**:
  1. **Pre-Trade Tax & Monthly DARF 6015 Simulator**: Derives weighted average acquisition cost from transaction ledgers, enforces the R$ 20,000 monthly Brazilian equity swing-trade exemption threshold, tracks accumulated loss carry-forwards, and outputs exact DARF 6015 tax obligations.
  2. **Portfolio Correlation Matrix**: Quantifies pairwise asset covariance across equities, FIIs, fixed income, and BDRs to expose hidden concentration risk.
  3. **Multi-Scenario Stress Testing & DCA Planner**: Models `-20%` to `-40%` market drawdowns and interest rate shifts alongside dollar-cost averaging recovery paths.
  4. **Base-100 B3 & Macro Benchmark Comparator**: Normalizes any combination of the **1,076+ indexed assets** against `CDI`, `IPCA`, `IBOV`, and `IFIX`.
  5. **Decision Alpha Ledger**: Tracks thesis rationale and post-trade realized outcome across historical decisions so users measure reviewer and strategy accuracy over time.

---

## 3. Collaborative Workspaces & SHA-256 Verifiable Snapshots

Financial decisions rarely happen in isolation. SwanGo supports **Hybrid Local-First + Cloud Sync Shared Workspaces** backed by Supabase PostgreSQL Row-Level Security (RLS) across 4 strict roles (`owner`, `editor`, `viewer`, `reviewer`):

- **Trade Proposal Cards**: Collaborators submit structured buy/sell/rebalance proposals and record votes in append-only `trade_proposal_votes` tables.
- **Privacy-Masked Verifiable Snapshots (`/swango/share/:token`)**: Users can publish interactive snapshot packages using `percentage_masked` or `scores_only` modes—allowing external reviewers to verify asset allocations, health ratios, and audit trails **without ever exposing raw `R$` net worth or bank balances**.
- **Immutable Audit Chain**: Each verification event appends a `SHA-256` payload digest chained via `signature_hash` so shared reports remain tamper-evident.

---

## 4. The 6-Stage Interactive Simulator & 4-Track Financial Academy

To let anyone test every engine before uploading personal statements—without violating the zero-mock invariant on production workspaces—SwanGo provides two dedicated public surfaces:

- **Interactive 6-Stage Lab (`/swango/simulator`)**: An isolated sandbox guiding users step by step through statement ingestion, Base-100 market comparison, *"Can I Buy?"* CDI NPV modeling, DARF 6015 calculation, stress testing, and snapshot verification.
- **Bilingual Financial & Investment Education Hub (`/swango/learn`)**: A free 4-track curriculum in English and Portuguese covering:
  1. **Track 1**: Salary & Bills `50/30/20` Splitter
  2. **Track 2**: Installment Stacking & Revolving Credit Simulator
  3. **Track 3**: Emergency Reserve Builder + 10-Point Anti-Scam & Account Security Audit
  4. **Track 4**: Compound Real Yield Above `IPCA` + B3 Asset Matrix & `DARF 6015` Rule Checker

---

## Production Outcomes

- **$0.00/month** warehouse and market-feed baseline cost on BigQuery Free Tier + Supabase + GCP Cloud Run (`southamerica-east1`).
- **1,076+ live market assets** and macro series served with **49/49 passing `dbt` tests** and **9/9 source freshness SLAs**.
- **20-table Medallion warehouse** bridging official Brazilian (`B3`, `CVM`, `BCB`, `Tesouro`) and international (`SEC EDGAR`, `Crypto`) data under strict **zero-mock** deterministic engineering.

*Explore SwanGo live at [aldeon.app/swango](https://aldeon.app/swango), test the [6-Stage Simulator](https://aldeon.app/swango/simulator), or study the [Financial Academy](https://aldeon.app/swango/learn).*
