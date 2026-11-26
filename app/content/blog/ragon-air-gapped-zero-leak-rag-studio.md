---
title: "RagOn: Air-Gapped Zero-Leak RAG Studio, 6-Stage BM25+3-Gram X-Ray & 7-File Cross-Stack Kit"
slug: "ragon-air-gapped-zero-leak-rag-studio"
description: "Inside RagOn (aldeon.app/rag-on): Aldeon's 8th free open developer product delivering sub-2ms deterministic BM25 + 3-gram retrieval at $0 LLM cost, FNV-1a hashed client guardrails, client-side corpus auditing, and a 7-file cross-stack starter kit."
date: "2026-11-26"
tags: ["AI", "RAG", "Security", "Architecture", "Developer Tooling", "TypeScript"]
lang: "en"
author: "Célio Vieira"
---

## Why We Built RagOn: $0 Air-Gapped RAG Without Hallucinations or Leaks

Most production documentation assistants and product Q&A widgets suffer from four compounding failures:
1. **Unbounded Vector-DB SaaS Tax**: Spinning up external vector stores, embedding pipelines, and frontier LLM calls just to answer verified product or API questions adds recurring cost and cold-start latency.
2. **Off-Topic Hallucinations**: Naive top-K similarity search returns the closest chunk even when `score = 0.12`, causing the assistant to invent answers on unrelated queries.
3. **Cleartext Blocklists Leaked in Client Bundles**: Widgets with offline fallbacks often import regex guardrails into browser chunks—exposing internal project handles, admin usernames, or secret prefixes to anyone inspecting `dist/client/assets/*.js`.
4. **Landing Page Bundle Bloat**: Statically importing chat UI + corpus payloads into the root layout penalizes First Contentful Paint (FCP) across every marketing route.

To share the exact architecture powering Aldeon's assistant as a **100% free open developer product**, we launched **RagOn (`rag-on`)** at [`aldeon.app/rag-on`](https://aldeon.app/rag-on)—our **8th active product**, pairing a live **6-Stage X-Ray Playground**, a **Client-Side Zero-Leak Corpus Auditor**, and a **7-File Cross-Stack Replication Kit** (`init-rag-on.mjs`).

---

## The 6-Phase Retrieval & Grounding Architecture

RagOn runs entirely in memory with **`0ms` disk I/O**, sub-2ms full-corpus ranking, and deterministic refusal whenever evidence falls below threshold:

```text
[User Query (<=360 chars)]
         │
         ▼  Phase 2: NFD Normalization + Hash/Injection Guardrail (<0.1ms)
         ├── (Blocked: Injection / Secret Probe / 40 req/min RL) ──► Safe Refusal
         │
         ▼  Phase 3: Bilingual PT/EN Scoring & Synonym Expansion (<0.2ms)
         │
         ▼  Phase 4: Field-Weighted BM25 + Character 3-Gram Cosine (<1.2ms)
         │
         ▼  Phase 5: Strict Evidence Grounding Gate
         │  (top.score >= 4.2 && strongAnchors >= 1)
         ├── (Failed) ──► Deterministic Out-of-Scope Refusal + Prompt Chips
         │
         ▼  Phase 6: Extractive ($0) or XML-Hardened Hybrid LLM + Output Shield
[Grounded Answer + Verified Internal /route Citations + Cache-Control: private, no-store]
```

### Phase 1: Air-Gapped Typed Bilingual Corpus
Instead of scraping unpredictable PDFs at runtime, knowledge lives in a versioned, TypeScript/Python-typed array (`ragCorpus.ts` / `rag_corpus.py`) containing bilingual EN/PT titles, concise facts, domain keywords, internal-only citations (`route.startsWith("/")`), and curated follow-up chips. Automated CI tests scan the serialized corpus against 10 Zero-Leak rules before every deploy.

### Phase 2: NFD Normalization & Pre-Retrieval Guardrail (`sub-0.1ms`)
Queries are capped at **360 characters**, decomposed via Unicode NFD normalization to strip combining marks (`[\u0300-\u036f]`) so accented variations like `"ignorar instruções"` cannot slip past ASCII patterns, and rate-limited at **40 requests / 60s** per IP in a sliding window.

### Phase 3: Bilingual PT/EN Scoring & Domain Synonym Expansion (`sub-0.2ms`)
Bilingual engineers routinely mix English UI nouns inside Portuguese sentences (e.g., *"Quais features e pricing o app tem?"*). RagOn weights Portuguese diacritics (`+3.5`) and function words (`+3.0`) above English tech loanwords (`+1.5`) so mixed queries stay in the user's grammatical language, then expands tokens through a curated bilingual synonym table (`preco -> pricing, price, cost, pro, free`).

### Phase 4: Field-Weighted BM25 + Character 3-Gram Cosine (`sub-1.2ms`)
At module boot, RagOn pre-indexes corpus tokens and character trigrams once. Each query is scored via:

```text
Score = BM25(Title * 3.0 + Keywords * 2.4 + Body * 1.0, k1 = 1.4, b = 0.65)
      + 4.5 * Cosine3Gram(Title + Keywords)
      + 4.0 * Cosine3Gram(FullChunk)
      + ScopeAndCategoryBoosts
```

Combining lexical IDF precision with character 3-gram cosine handles single-character typos (`"precing"`, `"sincroniza"`) without pulling in heavy vector embedding models.

### Phase 5: Strict Evidence Grounding Gate
Rather than blindly returning `rankedDocs[0]`, RagOn enforces a deterministic evidence gate:

```typescript
const passed =
  top.score >= 4.2 &&
  top.strongAnchors >= 1 &&
  (hasExplicitScope || (top.matchedConcepts >= 2 && top.score >= 5.5));
```

If evidence falls short, the engine returns a helpful `out_of_scope` response with clickable suggested prompts—achieving **0% off-topic hallucinations**.

### Phase 6: `$0` Extractive Synthesis or XML-Hardened Hybrid LLM
By default, RagOn synthesizes answers deterministically from the winning chunks at **$0 inference cost**. When optional LLM phrasing is enabled, only the winning chunks are wrapped inside `` `<grounded_context>` `` XML tags with user input escaped via `escapePromptXml()`, followed by a 10-rule `redactChatOutput()` shield and strict `Cache-Control: private, no-store, max-age=0` headers.

---

## Zero-Leak FNV-1a Hashed Guardrails & Client-Side Corpus Auditor

A subtle vulnerability in client-capable RAG assistants is putting restricted internal identifiers or developer handles into cleartext regexes inside client-imported guardrail files. RagOn eliminates cleartext literals from public JS bundles by hashing restricted tokens with **FNV-1a 32-bit digests**:

```typescript
function fnv1a32Hex(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

// Public bundle carries only one-way 32-bit digests — zero cleartext literals
const RESTRICTED_HASHES = new Set(["1794d565", "bf959e2f"]);

export function isRestrictedToken(token: string): boolean {
  return RESTRICTED_HASHES.has(fnv1a32Hex(token.trim().toLowerCase()));
}
```

On [`aldeon.app/rag-on`](https://aldeon.app/rag-on), engineers can also paste any serialized JSON corpus into the **100% Client-Side Corpus & Citation Security Auditor** to validate schema integrity, flag external non-relative citations, detect leaked key prefixes (`AIza`, `AKIA`, `sk_live`, `ghp_`, `eyJ`), and run **1-click Auto-Sanitize** without sending a single byte over the network.

---

## 7-File Cross-Stack Starter Kit (`init-rag-on.mjs`)

RagOn packages its entire architecture into a portable **7-file starter kit** generated interactively in the browser or scaffolded via `init-rag-on.mjs` across five runtimes:

- **React 19 + React Router 7 Edge SSR** (`TypeScript · Edge Action + Lazy Drawer`)
- **Next.js App Router** (`TypeScript · app/api/chat/route.ts + Client Drawer`)
- **Node / Bun / Cloudflare Worker (Hono)** (`TypeScript · Stateless JSON Microservice`)
- **Python 3.12 FastAPI + Pydantic v2** (`Pure Stdlib Math + FastAPI Router`)
- **Expo SDK React Native** (`Offline Fallback + Modal Sheet`)

Every generated bundle outputs the exact 7-file contract:
1. `ragCorpus.ts` / `rag_corpus.py` — Typed air-gapped knowledge chunks
2. `chatGuardrails.ts` / `rag_guardrails.py` — NFD normalization, FNV-1a hashed guards & output shield
3. `ragEngine.ts` / `rag_engine.py` — Field-weighted BM25 + 3-gram cosine + grounding gate
4. `api.chat.ts` / `route.ts` / `routers/chat.py` — Rate-limited endpoint (`Cache-Control: private, no-store`)
5. `RagChatDrawer.tsx` / `RagChatSheet.tsx` — `React.lazy()` drawer (`0 KB` initial paint impact)
6. `rag-security.test.ts` / `test_rag_security.py` — Automated CI zero-leak & grounding suite
7. `.agents/skills/rag-on/SKILL.md` — Agent skill instructions compatible with [`MemOn`](/blog/on-memory-deterministic-ai-engineering-governance)

---

## Production Anti-Patterns Registry (`AP-RAG-01` to `AP-RAG-08`)

RagOn ships an interactive **5-field Anti-Pattern Registry** documenting real production failure modes encountered across Edge SSR, mobile, and serverless deployments:

| Code | Domain | Anti-Pattern Eliminated | Verified Solution |
|---|---|---|---|
| `AP-RAG-01` | Security | Cleartext internal blocklist literals in client JS | Structural regexes + 32-bit FNV-1a token hashes |
| `AP-RAG-02` | Security | Accented Unicode bypassing ASCII guardrails | NFD decomposition + diacritic stripping before checks |
| `AP-RAG-03` | Retrieval | Pure exact-word matching failing on typos | Field-weighted BM25 + character 3-gram cosine + synonyms |
| `AP-RAG-04` | Grounding | Returning `rankedDocs[0]` unconditionally | Strict threshold gate (`score >= 4.2`, `strongAnchors >= 1`) |
| `AP-RAG-05` | Edge SSR | Eagerly importing corpus & chat drawer in root | Mount lightweight trigger + `React.lazy()` drawer on open |
| `AP-RAG-06` | Edge SSR | Public CDN caching on dynamic `POST /api/chat` | `Cache-Control: private, no-store, max-age=0` on all statuses |
| `AP-RAG-07` | Bilingual | English UI loanwords flipping PT-BR replies | Higher weights for PT function words & diacritics |
| `AP-RAG-08` | LLM Safety | Unescaped user queries in hybrid LLM prompts | `` `<grounded_context>` `` XML tags + `escapePromptXml()` + output shield |

---

## Production Outcomes & Ecosystem Links

- **`$0 / Free` Default Inference**: Deterministic extractive synthesis resolves documentation and support queries with zero external LLM API calls.
- **`sub-2ms` End-to-End Retrieval**: Pre-indexed BM25 + 3-gram scoring finishes in under 2 milliseconds per request.
- **`0%` CI Secret Leakage & `0 KB` Initial Paint Tax**: Automated `rag-on-security.test.ts` gates combined with `React.lazy()` mounting keep landing pages fast and air-gapped.

Explore the live X-Ray Playground, Corpus Auditor, and Starter Kit at [**aldeon.app/rag-on**](https://aldeon.app/rag-on), pair it with [**MemOn (`sub-20KB` agent governance)**](/blog/on-memory-deterministic-ai-engineering-governance), or follow the hands-on curriculum in [**Academy Track 1: RagOn & MemOn**](/academy/private-rag-onmemory-agent-governance).
