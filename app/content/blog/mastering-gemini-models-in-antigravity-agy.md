---
title: "Mastering Gemini Models in Antigravity (agy): Architecture, Memory, Security & Honest Limits"
slug: "mastering-gemini-models-in-antigravity-agy"
description: "Field-tested engineering guide to running Gemini 4 tiers (Hydrogen, Neon, Argon, Carbon) inside Google Antigravity (agy) — covering dual-phase orchestration, /plan + /grill-me workflows, MemOn (<20KB) memory, hooks, sandbox security, known pitfalls, and when to use agy vs. local Ollama + OpenCode."
date: "2026-11-26"
tags: ["AI", "Agents", "Gemini", "Antigravity", "Security", "Architecture", "Developer Tooling"]
lang: "en"
author: "Célio Vieira"
---

## Why Frontier Models Still Drift Without Harness Engineering

A 1-million-token context window does not automatically produce deterministic engineering. After shipping the products inside the **Aldeon** ecosystem (`aldeon.app`) and maintaining `celiovieira.com` with **Google Antigravity** (`agy` CLI and Antigravity 2.0), the biggest productivity jumps never came from prompting a smarter model with a vague paragraph—they came from engineering the harness around it.

Without structure, even a frontier reasoning model forgets yesterday's lint constraint, tries to run unsandboxed shell chains that bypass approval boundaries, burns quota thinking hard about boilerplate renames, and drifts across long multi-file edits. When you pair the right **Gemini 4** model tier with dual-phase orchestration, bounded **MemOn** (`<20KB`) memory, deterministic lifecycle hooks, and strict OS sandbox hygiene, the same workspace turns into a repeatable delivery engine.

This blueprint documents the exact operating patterns, security guardrails, memory layering, real failure modes, and hybrid cloud-vs-local routing rules we rely on in production.

---

## Gemini 4 Model Tiers & Orchestration in Antigravity

Every model in the **Gemini 4** family shares a **1M-token context window**, native tool execution, web search grounding, computer use, structured outputs, and configurable thinking budgets (`low` → `medium` → `high` → `xhigh`). What separates them in daily engineering is latency, cost, and reasoning depth per turn:

| Gemini 4 Tier         | Model Identifier    | Thinking Budget        | Pricing / Tier Profile                                            | Best Workload Match in Antigravity                                                                                     |
| --------------------- | ------------------- | ---------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Gemini 4 Hydrogen** | `gemini-4-hydrogen` | `low`–`xhigh`          | `$1.50 / 1M` input, `$7.50 / 1M` output (free API tier available) | High-speed execution phase, mechanical multi-file edits, fast subagents, test-fix loops, `/swarm` parallel workers     |
| **Gemini 4 Neon**     | `gemini-4-neon`     | `low`–`xhigh`          | Balanced mid-tier between Hydrogen and Carbon                     | Primary coding-agent workhorse: feature planning, analytical codebases, moderate cross-module refactors                |
| **Gemini 4 Argon**    | `gemini-4-argon`    | Early-release reasoner | Legacy Gemini 4 tier superseded in coding by Neon & Hydrogen      | Select stylistic prose, long-form editorial drafting, and documentation polish where raw code-agent speed is secondary |
| **Gemini 4 Carbon**   | `gemini-4-carbon`   | `low`–`xhigh`          | Heavy frontier flagship (Pro / Ultra / Enterprise tiers)          | Long-horizon multi-service architecture, subtle distributed root-cause debugging, and anti-drift verification          |

Matching tier to phase matters far more than defaulting everything to the heaviest flagship. Running **Carbon** at `xhigh` thinking on CSS spacing adjustments or i18n JSON edits multiplies wall-clock latency and burns quota with zero gain over **Hydrogen**. Conversely, delegating an ambiguous distributed state-machine redesign to a low-budget executor causes silent regressions that cost three times as many recovery turns.

### Dual-Phase Orchestrator Mode & /swarm Parallelism

Antigravity solves the cost-vs-judgment trade-off natively through **dual-phase Orchestrator Mode** and horizontal **`/swarm`** fan-out:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ANTIGRAVITY (agy) ORCHESTRATION TOPOLOGY                  │
└─────────────────────────────────────────────────────────────────────────────┘

  [1. PLANNING PHASE — Read-Only Planner: Gemini 4 Neon or Carbon]
     ├─ Inspects codebase, MemOn (<20KB) MEMORY.md, AGENTS.md, and schemas
     ├─ Runs /plan + /grill-me to resolve ambiguities one decision at a time
     └─ Locks exact file diffs + verification gate → hands off via exit_plan_mode
                                   │
                                   ▼
  [2. EXECUTION PHASE — Fast Executor: Gemini 4 Hydrogen]
     ├─ Carries out approved plan in batched parallel file writes/edits
     ├─ Executes lint → typecheck → unit tests → build → smoke gates
     └─ Calls enter_plan_mode immediately if an assumption breaks twice
                                   │
                                   ▼ (for independent multi-module work)
  [3. /swarm HORIZONTAL WORKERS — Parallel Hydrogen / Specialist Nodes]
     ├─ workspace: "inherit" → read-only auditors, verifiers, research nodes
     ├─ workspace: "share"   → concurrent authors in isolated git worktrees
     └─ workspace: "branch"  → fully cloned sandboxes for risky experiments
```

Keeping the **Planner** read-only prevents premature edits before edge cases are resolved, while letting **Hydrogen** execute an unambiguous plan cuts token burn and turnaround dramatically. When a task naturally shards across independent packages or locales, `/swarm` spawns parallel workers with explicit workspace isolation (`inherit` for readers, `share` or `branch` for concurrent editors) coordinated on a shared board.

---

## Improving Usability & Daily Engineering Best Practices

### 1. Spec-First Alignment with /plan and /grill-me

The single highest-leverage habit in Antigravity is invoking **`/plan` paired with `/grill-me`** before modifying a single file on any non-trivial feature:

- `/plan` switches the session into read-only exploration mode so Gemini must verify existing symbol names, schemas, and tests on disk first.
- `/grill-me` walks through every open architectural branch sequentially rather than dumping ten vague questions at once—forcing explicit trade-offs on routing, state ownership, failure handling, and verification criteria before code generation begins.
- Once approved, the execution model receives a concrete specification with explicit **"Re-plan if"** triggers instead of improvising design decisions mid-edit.

### 2. Progressive Disclosure Over Monolithic Prompts

Dumping every deployment playbook, design guideline, and database schema into a giant root system prompt bloats every single turn and dilutes attention. Structure instructions using **progressive disclosure**:

1. **Always-on root invariants (`AGENTS.md` / `GEMINI.md`):** Keep only non-negotiable repository contracts (package manager rules, security boundaries, build/test gates, locale requirements).
2. **Scoped directory rules & `@` mentions:** Place subfolder-specific conventions close to the code they govern, and reference concrete files via `@path` only when relevant.
3. **On-demand Skills (`.agents/skills/<name>/SKILL.md`):** Antigravity injects only each skill's concise name and description at startup; the full Markdown playbook, helper scripts, and reference docs load strictly when the task matches or the user invokes them. Rules with `trigger: model_decision` follow the same just-in-time loading discipline, with built-in deduplication preventing double injection.

### 3. Prefix-Matchable Commands & Clean Chain Splitting

When approving terminal commands in interactive CLI sessions, "Always Allow" rules work via **binary and subcommand prefix matching** (e.g., approving `bun run build` generalizes cleanly). Common shell patterns silently disable prefix matching and force exact-string re-prompts on every invocation—or worse, drag build steps outside the sandbox:

```bash
# ❌ BAD: Subshell expansion, variables, wrapper binaries, and mixed sandbox scope
TAG=$(git rev-parse --short HEAD) && env PORT=3100 bun run build && bun run smoke

# ✅ GOOD Step A (Sandboxed — prefix-matchable, auto-approves cleanly):
bun run content:build && bun run lint && bun run typecheck && bun run test && bun run build

# ✅ GOOD Step B (Isolated minimal network/port-binding step outside sandbox):
bun run smoke
```

Avoid `$(...)` command substitutions, `$VAR` expansions, brace expansions (`{a,b}`), shell `&` backgrounding, and `env` / `sudo` / `xargs` / `eval` wrappers whenever direct literal invocations exist. Splitting sandboxed compilation from the single localhost port-binding step keeps both approval UX tight and blast radius minimal.

### 4. Parallel Tool Batching, /compact Discipline & Verification Gates

Every conversational turn re-sends context, so single-tool turns waste latency and budget:

- **Batch independent operations in parallel:** Read all target modules in one turn, then apply independent edits together.
- **Verify in a single deterministic chain:** Run `lint`, `typecheck`, `format:check`, unit tests, and `build` in one chained command after final edits rather than re-running checks piecemeal after every file.
- **Use `/compact` proactively:** Compact long exploratory threads right after research settles and before implementation begins, preserving settled decisions while reclaiming clean working attention.
- **Persist hard-won fixes with `/learn`:** Whenever you correct a subtle framework or tooling mistake, run `/learn` so the lesson graduates into durable rules or skills instead of vanishing when the session closes.

---

## Memory Architecture: Stopping Gemini From Repeating the Same Mistakes

The number one frustration engineers report with AI coding agents is fixing the exact same quirk twice across separate sessions. Solving that permanently requires understanding Antigravity's exact **customization precedence and size ceilings**.

Antigravity resolves customization layers in strict priority order:

1. **Workspace project scope** (`.agents/` and hierarchical `AGENTS.md` / `GEMINI.md` walking from CWD up to git root) — highest precedence
2. **Declared project manifests** (`skills.json`, `plugins.json`)
3. **Global user config** (`~/.gemini/config/`)
4. **Built-in & global declared defaults**

Crucially, Antigravity enforces **two hard always-on budgets**:
- **Per-file cap:** **`24 KB` (`24,000` bytes)** maximum per rule file *after* expanding `@[label](path)` inclusions (oversized files are truncated on line boundaries).
- **Aggregate rules cap:** **`20,000` tokens** across all always-on rules (excess rules are silently demoted from inline text to bare file-path pointers).

This architectural constraint is the exact reason we engineered **MemOn** (`aldeon.app/mem-on`, detailed in [MemOn: Deterministic AI Engineering Governance Under 20KB](/blog/on-memory-deterministic-ai-engineering-governance)) with a hard **`<20KB` (`20,480`-byte)** ceiling on `MEMORY.md`. Staying below `20 KB` preserves guaranteed headroom beneath Antigravity's `24 KB` truncation threshold so critical constraints are **never** silently dropped mid-file.

```markdown
# Layered Antigravity Memory Contract (Always <20KB Total Hot Context)

1. AGENTS.md / GEMINI.md   → Immutable repo invariants, tech stack matrix & verify gates
2. MEMORY.md (MemOn <20KB) → Four bounded operational tables:
   - Locked Decisions      (architecture choices already settled)
   - Active Stack          (exact versions: React Router 8, Tailwind v4, Bun 1.3+)
   - Anti-Patterns         (5-field entries: ID, Symptom, Root Cause, Prevention Rule, Scope)
   - Rolling Last-5 Runs   (latest verified state so sessions resume without re-discovery)
3. .agents/skills/*/       → Deep task runbooks loaded strictly on demand
```

### Real Bugs Permanently Eliminated in Aldeon & celiovieira.com

Recording concrete **5-field anti-pattern entries** in `MEMORY.md` stopped Gemini from re-introducing these exact production bugs across dozens of follow-up sessions:

- **React Router SSR Hydration & `*.client.*` Isolation:** Browser-only globals (`window`, `document`, `localStorage`, `navigator.share`) caused SSR hydration mismatches until locked behind explicit `typeof window !== "undefined"` guards and post-mount effects.
- **ESLint 9 `react-hooks/set-state-in-effect`:** Synchronous `setMenuOpen(false)` inside route-change `useEffect` hooks triggered cascading-render lint failures until standardized around `queueMicrotask(() => setMenuOpen(false))`.
- **Tailwind CSS v4 Typography & Syntax Shifts:** Missing `@plugin "@tailwindcss/typography"` left `.prose` article lists/tables completely unstyled, and invalid spacing steps (`py-0.2` instead of multiples of `0.25`) generated zero CSS—both permanently prevented via explicit `MEMORY.md` entries.
- **`marked` v18 Inline Token Parsing Bug:** Custom paragraph/heading renderers reading raw `token.text` leaked literal `**bold**` strings across articles until switched to `this.parser.parseInline(tokens)` inside a build-time pipeline.
- **Deployment Discipline:** Mixing manual `vercel --prod` bypasses with Git-driven production merges caused preview/branch drift—permanently blocked with an explicit rule restricting deployments to verified Git pushes.

---

## Security, Sandbox Isolation & Lifecycle Hooks

### Permission Engine & OS Terminal Sandbox

Antigravity governs tool invocations using resource-scoped `action(target)` permission rules evaluated with strict precedence:

**`Deny` > `Ask` > `Allow`**

No permissive rule can ever override an explicit `Deny` rule. Alongside permissions, Antigravity's **Terminal Sandbox** enforces OS-level isolation by default—granting read/write access inside the active workspace and `/tmp` while blocking outbound network calls and arbitrary host filesystem paths across presets (`Default`, `Auto`, `Request Review`, and `Turbo`).

Keep four real-world security rules non-negotiable:

1. **Never combine `--dangerously-skip-permissions` casually with sandbox escape paths:** Automated headless flags can auto-approve `bypassSandbox: true` requests and defeat OS containment on untrusted repositories.
2. **Remember the CLI vs. Desktop config split:** The terminal CLI (`~/.gemini/antigravity-cli/settings.json`) and Antigravity 2.0 Desktop maintain **separate** permission and configuration stores. A `Deny` rule saved in the Desktop UI does not automatically guard standalone `agy` CLI invocations—mirror critical security rules into project-level hooks or both configs.
3. **Minimize unsandboxed execution:** Only isolate the exact single command that genuinely needs localhost port binding or authenticated cloud access (such as `bun run smoke` or `gh`). Never run `bun install`, builds, or test suites unsandboxed just to save splitting a shell line.
4. **Zero-Leak hygiene in repo memory files:** Never paste API keys, session cookies, `.env` secrets, or local host usernames into `AGENTS.md`, `MEMORY.md`, or commit-tracked skills—pair every repository with automated regex CI secret scans.

### Deterministic Guardrails with .agents/hooks.json

When prompt rules are advisory, **lifecycle hooks** in `.agents/hooks.json` are deterministic enforcement gates. Antigravity exposes `SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, and `Stop` hooks communicating via camelCase JSON over stdin/stdout:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));const c=d.toolInput?.CommandLine||\"\";if(/rm\\s+-rf\\s+\\/|curl.*(\\.env|TOKEN)/.test(c)){console.log(JSON.stringify({decision:\"deny\",reason:\"Blocked destructive or secret-exfiltrating command\"}));}else if(/vercel\\s+--prod|git\\s+push\\s+--force/.test(c)){console.log(JSON.stringify({decision:\"ask\",reason:\"Confirm production deploy or force push\"}));}'",
            "timeout": 3000
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "write_file|edit_file",
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));const p=d.toolInput?.Path||\"\";if(/\\.(ts|tsx|md)$/.test(p)){require(\"child_process\").execFileSync(\"bunx\",[\"prettier\",\"--check\",p],{stdio:\"inherit\"});}'",
            "timeout": 10000
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));if(d.continuationActive)process.exit(0);try{require(\"child_process\").execFileSync(\"bun\",[\"run\",\"typecheck\"],{stdio:\"pipe\"});}catch{console.log(JSON.stringify({decision:\"continue\",reason:\"TypeScript validation failed. Fix typecheck errors before finishing.\"}));}'",
            "timeout": 25000
          }
        ]
      }
    ]
  }
}
```

Three practical hook constraints are worth knowing up front: Antigravity hooks currently support **`type: "command"` only** (no HTTP endpoints or prompt evaluators), execute **synchronously and blocking** (so `PreToolUse` and `PostToolUse` must stay fast to avoid stalling every edit), and **must inspect `continuationActive`** inside `Stop` hooks so a failing check triggers a bounded recovery turn rather than an infinite loop.

---

## Real Issues, Friction Points & Failure Modes

Even well-tuned Antigravity setups hit sharp edges in day-to-day engineering:

1. **Context rot long before 1M tokens:** Model recall degrades noticeably once noisy tool outputs and stack traces stack above ~150K–250K tokens. Skipping `/compact` between research and implementation leads to forgotten constraints even when theoretically well inside the 1M ceiling.
2. **Sandbox localhost & port-binding blocks (`403`):** Running production SSR smoke suites (`smoke-ssr.ts` spinning up `http://localhost:3100`) inside the default terminal sandbox fails immediately with socket/HTTP `403` errors. Until you separate build verification from the single unsandboxed smoke step, agents either stall or erroneously "fix" passing server code.
3. **CLI vs. Desktop settings divergence:** Editing sandbox presets or allowlists inside Antigravity Desktop and wondering why terminal `agy` commands still prompt—or vice versa—stems directly from separate configuration stores.
4. **Slow synchronous hooks bottlenecking loops:** Putting a full 30-second test suite inside `PostToolUse` adds 30 seconds after *every single file edit*. Keep per-tool hooks sub-second (fast syntax/regex/format checks) and reserve full typechecks/builds for explicit verification commands or `Stop`.
5. **Quota waste from over-tiering:** Leaving sessions pinned to **Gemini 4 Carbon** with `xhigh` thinking for straightforward documentation updates or mechanical refactors slows iteration by 3–5× with zero quality benefit over **Hydrogen**.
6. **Silent regressions when tests don't exist:** Gemini writes plausible TypeScript rapidly—meaning an edge case in a regex tagger, i18n dictionary key, or RSS route can ship cleanly if your verification command only checks compilation instead of semantic tests (`tests/academy.test.ts`, `audit:content`, `smoke-ssr.ts`).

---

## What It Works For vs. What It Does NOT Work For

| Works Exceptionally Well For                                                                                         | Does NOT Work Well For (Or Requires Hard Gates)                                                          |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Full-stack multi-file migrations** (React Router upgrades, Tailwind v4 transitions, build-time markdown pipelines) | **Strict zero-egress air-gapped NDA repositories** where policy forbids source bytes leaving `127.0.0.1` |
| **Spec-driven greenfield engineering** using `/plan` + `/grill-me` + dual-phase Orchestrator Mode                    | **Unguarded production DB, IAM, DNS, or billing mutations** without explicit `Deny` / `Ask` gates        |
| **Repo-wide audits & quality remediation** across security, accessibility, SSR parity, and i18n keys                 | **Unattended multi-hour loops without tests** — agents optimize for what they can measure                |
| **Parallel `/swarm` refactors** with isolated `share` / `branch` worktrees and verifier workers                      | **Pixel-accurate UI/UX sign-off** without live browser inspection, screenshots, or visual review         |
| **Structured research + implementation bridges** leveraging web grounding and 1M-token cross-repo synthesis          | **High-frequency trivial boilerplate** at high token volume where local `$0` inference finishes faster   |

---

## Decision Matrix: Antigravity (Gemini) vs. Local AI (Ollama + OpenCode)

Rather than treating cloud frontier agents and local open-weight models as competing religions, our production engineering splits workloads deliberately between **Antigravity (`agy` + Gemini 4)** and our **Local AI Stack (`Ollama` + `OpenCode` + `Qwen 3.5` / `Qwen3-Coder`)** running on an RTX 3070 8 GB workstation:

| Dimension                              | Antigravity (`agy` + Gemini 4)                                    | Local AI (`Ollama` + `OpenCode` + `Qwen3`)                                  | Winning Hybrid Split                                                     |
| -------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Data Privacy / Air-Gap**             | Cloud API inference (sandboxed host execution)                    | **100% local `127.0.0.1`** — zero bytes leave disk                          | **Local AI** for NDA schemas, `.env` topologies & client incident logs   |
| **Context Window & Synthesis**         | **1M tokens** across all Gemini 4 tiers                           | `16K–48K` practical local budget (`q8_0` KV cache on 8 GB VRAM + 32 GB RAM) | **Antigravity** for full-repo audits & cross-service planning            |
| **Multi-File Architecture & Research** | **Neon / Carbon** + `/plan` + `/grill-me` + `/swarm` + web search | Good structured planning (`qwen3-coder:30b` MoE) on single repos            | **Antigravity (20–30%)** for complex design spikes & framework upgrades  |
| **Daily Iterative Edits & Test Loops** | Fast on **Hydrogen**, bounded by API quota & latency              | **Unlimited zero-token loops** (`qwen3.5-fast:9b` at ~60–80 tok/s)          | **Local AI (70–80%)** for daily TDD cycles, utilities & offline travel   |
| **Shared Engineering Memory**          | `AGENTS.md` + **MemOn (`<20KB`)** (`24KB` limit aware)            | Reads exact same `AGENTS.md` + `MEMORY.md` contract                         | **Single MemOn Source of Truth** shared seamlessly across both harnesses |

When both harnesses read the **exact same `<20KB` `AGENTS.md` and `MEMORY.md` contract**, switching from a cloud **Gemini 4 Neon/Carbon** planning session in Antigravity to an offline **OpenCode + Qwen 3.5** execution sprint requires zero duplicated onboarding. Every locked architecture decision, Tailwind quirk, and security rule stays portable across models, hardware, and budgets.

---

### Continue the Engineering Series

- **Part 1 (Local Zero-Token Execution):** [Building a Local AI Coding Stack with Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder](/blog/local-ai-coding-stack-ollama-opencode-qwen3)
- **Part 3 (Antigravity `/` Command Manual):** [The Complete Antigravity (agy) Command Field Manual: Every / Command Explained](/blog/antigravity-agy-commands-complete-guide)
- **Deterministic Memory Governance (`<20KB`):** [MemOn: Deterministic AI Engineering Governance Under 20KB](/blog/on-memory-deterministic-ai-engineering-governance)
- **Air-Gapped Retrieval Architecture:** [RagOn: Air-Gapped Zero-Leak RAG Studio](/blog/ragon-air-gapped-zero-leak-rag-studio)
- **Companion Academy Lesson:** [RagOn & MemOn: Air-Gapped Zero-Leak RAG Studio & Sub-20KB Agent Governance](/academy/private-rag-onmemory-agent-governance)
