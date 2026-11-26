---
title: "The Complete Antigravity (agy) Command Field Manual: Every / Command Explained"
slug: "antigravity-agy-commands-complete-guide"
description: "Comprehensive breakdown of all 47 official Google Antigravity (agy) commands — invoked by typing / in the prompt — covering planning (/plan, /grill-me, /goal), multi-agent orchestration (/swarm, /teamwork, /boost), context hygiene (/compact, /fork, /rollback, /btw), security & tools (/permissions, /hooks, /mcp, /learn), chaining playbooks, and authoring custom commands via .agents/skills/."
date: "2026-11-26"
tags: ["AI", "Agents", "Antigravity", "Gemini", "Developer Tooling", "CLI", "Architecture"]
lang: "en"
author: "Célio Vieira"
---

## Why Commands Are the Control Plane of Antigravity (agy)

To use any command in Google Antigravity (`agy`), simply type `/` in the prompt—opening the typeahead control plane that turns an open-ended chat loop into explicit engineering state transitions.

In **Part 1** ([Local AI Coding Stack](/blog/local-ai-coding-stack-ollama-opencode-qwen3)) and **Part 2** ([Mastering Gemini Models in Antigravity](/blog/mastering-gemini-models-in-antigravity-agy)), we covered hardware/model routing, dual-phase Orchestrator Mode, bounded `<20KB` MemOn governance, and sandboxed execution. This **Part 3 Field Manual** breaks down every single one of the **47 official built-in `agy` TUI commands**, groups them by operational category, documents proven command-chaining playbooks, highlights common pitfalls, and shows how to author your own custom `/` commands using modern `.agents/skills/` packages.

---

## Complete Antigravity (agy) Command Quick-Reference Matrix

Typing `/` opens an interactive filterable palette inside the `agy` terminal UI (and Antigravity 2.0 chat canvas). Here is the complete 47-command reference organized across planning, reasoning, conversation lifecycle, tooling/governance, workspace navigation, model configuration, and utilities:

| Command                           | Alias            | Category                  | Core Purpose                                                                              |
| --------------------------------- | ---------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| `` `/plan <task>` ``              | —                | **Planning & Execution**  | Explore codebase, clarify requirements, draft reviewable Implementation Plan before edits |
| `` `/grill-me <task>` ``          | —                | Planning & Execution      | Interview user one question at a time (with recommended answers) to resolve ambiguity     |
| `` `/goal <task>` ``              | —                | Planning & Execution      | Run autonomously without intermediate pauses until goal is verified complete              |
| `/effort`                         | —                | Reasoning                 | Set or inspect active model reasoning effort level (`low` through `max` / `xhigh`)        |
| `` `/boost <task>` ``             | —                | Reasoning                 | On-demand multi-agent deep reasoning for complex bugs, races, and algorithms (paid tiers) |
| `` `/swarm <task>` ``             | —                | Multi-Agent Orchestration | Spawn coordinator + named parallel workers + `@verifier` on a shared board                |
| `/teamwork`                       | —                | Multi-Agent Orchestration | Autonomous blueprint-driven agent teams for multi-file/multi-day projects (Pro/Ultra)     |
| `` `/compact [message]` ``        | —                | Conversations             | Summarize conversation into a checkpoint and optionally continue with `<message>`         |
| `/clear`                          | `/new`           | Conversations             | Clear terminal and reset active conversation context                                      |
| `/resume`                         | `/switch`        | Conversations             | Open interactive thread picker to search and load prior workspace sessions                |
| `/fork`                           | `/branch`        | Conversations             | Clone active conversation history into an independent parallel session                    |
| `/rollback`                       | —                | Conversations             | Roll back conversation history to an earlier message/turn                                 |
| `` `/rename <title>` ``           | —                | Conversations             | Rename the active conversation thread                                                     |
| `/title`                          | —                | Conversations             | Toggle or update terminal window title tracking                                           |
| `` `/btw <query>` ``              | —                | Context / Utilities       | Ask a background side question without polluting or pausing the main thread               |
| `` `/copy [n]` / `/copy btw` ``     | —                | Utilities                 | Copy last response, *n*-th most recent response, or latest `/btw` answer                  |
| `/agents`                         | —                | Tools & Tasks             | Open Agent Manager to switch custom agents and monitor background subagents               |
| `/tasks`                          | —                | Tools & Tasks             | Open Task Manager to monitor background shell processes and logs                          |
| `` `/schedule <cron> <cmd>` ``    | —                | Tools & Tasks             | Register a one-shot timer or recurring cron schedule waking the agent                     |
| `` `/browser <task>` ``           | —                | Tools & Tasks             | Delegate browser automation, DOM checks, and UI debugging to browser subagent             |
| `/artifact`                       | —                | Tools & Tasks             | Open interactive Artifact Review panel for plans, walkthroughs, and reports               |
| `/permissions`                    | —                | Tools & Security          | Open interactive tool permissions panel (`Deny > Ask > Allow`)                            |
| `/hooks`                          | —                | Tools & Security          | Browse active `PreToolUse`, `PostToolUse`, and `Stop` lifecycle script hooks              |
| `/mcp`                            | —                | Tools & Tasks             | Open Model Context Protocol (MCP) server manager                                          |
| `/skills`                         | —                | Tools & Tasks             | Browse local/global skills; run `/skills reload` to hot-reload skills from disk           |
| `/plugins`                        | —                | Tools & Tasks             | Open Plugins Manager or run inline `install`, `uninstall`, `enable`, `disable`, `list`    |
| `/learn`                          | —                | Tools & Memory            | Capture session fixes/corrections as persistent rules or skills via reviewable proposal   |
| `` `/agy-customizations [req]` `` | —                | Tools & Tasks             | Load customization guide to build, fix, or audit rules, skills, plugins, hooks, and MCP   |
| `` `/add-dir <path>` ``           | —                | Workspace                 | Attach an additional directory path to the active workspace                               |
| `` `/codesearch <query>` ``       | `/cs`, `/search` | Workspace                 | Open interactive streaming Code Search panel across the workspace                         |
| `/diff`                           | —                | Workspace / Review        | Open interactive Diff/Review viewer to inspect turns, diffs, and commits line-by-line     |
| `` `/open <path>` ``              | —                | Workspace                 | Open target file or directory in host default system editor                               |
| `/context`                        | —                | Workspace / Context       | Visualize live context window token allocation and saturation                             |
| `` `/model [model]` ``            | —                | Configuration             | Switch persistent default model, or run one-shot `` `/model <model> <prompt>` ``          |
| `/config`                         | `/settings`      | Configuration             | Open interactive Settings Editor overlay                                                  |
| `/keybindings`                    | —                | Configuration             | Open interactive Keyboard Shortcut Editor                                                 |
| `/statusline`                     | —                | Configuration             | Open Status Bar layout customization overlay                                              |
| `/usage`                          | —                | Account                   | Display current model quota usage                                                         |
| `/credits`                        | —                | Account                   | View remaining AI credits and top-up links                                                |
| `/logout`                         | —                | Account                   | Disconnect account and purge authentication tokens from secure keyring                    |
| `/remote`                         | —                | Utilities                 | Toggle Remote Control / remote-agent session capabilities                                 |
| `/voice`                          | —                | Utilities                 | Speak live (`/voice live`) or dictate prompts (`/voice dictate`)                          |
| `` `/antigravity-guide [q]` ``    | —                | Utilities                 | Query built-in documentation and sitemap for Antigravity configuration help               |
| `/changelog`                      | —                | Utilities                 | Open release notes viewer (or print CLI changes in headless mode)                         |
| `/feedback`                       | —                | Utilities                 | Open product feedback submission panel                                                    |
| `/help`                           | —                | Utilities                 | Display help panel with commands and keybindings                                          |
| `/exit`                           | `/quit`          | Utilities                 | Close `agy` TUI session cleanly (`Ctrl+D Ctrl+D` equivalent)                              |

---

## Category 1: Planning, Reasoning & Multi-Agent Orchestration

These seven commands control **how** Antigravity thinks, clarifies requirements, and distributes work before or during execution:

- **`/plan`** `` `<task>` `` — Switches the agent into read-only exploration mode to inspect files, verify schemas/symbols on disk, and write a reviewable Implementation Plan before modifying a single line of code. In dual-phase Orchestrator setups, **Gemini 4 Neon** or **Carbon** handles `/plan` before handing execution off to **Hydrogen**.
- **`/grill-me`** `` `<task>` `` — Forces sequential interactive alignment: Gemini walks down each branch of your design tree asking one clear question at a time (pre-populated with a recommended answer) until every ambiguity is resolved. Chaining `/plan /grill-me <task>` is the gold standard for non-trivial features.
- **`/goal`** `` `<task>` `` — Removes intermediate confirmation pauses so the agent drives autonomously until your explicit verification criteria pass (only safe when backed by real automated tests or build gates).
- **`/effort`** — Adjusts or inspects the thinking depth (`low`, `medium`, `high`, `max` / `xhigh`) per model. Lower `/effort` on straightforward refactors cuts wall-clock latency sharply; raising it helps on subtle concurrency or compiler edge cases.
- **`/boost`** `` `<task>` `` — Triggers multi-agent deep reasoning passes tailored to hard race conditions, subtle algorithm bugs, or tangled legacy state machines (available on qualifying paid plans).
- **`/swarm`** `` `<task>` `` — Converts your active session into a coordinator spawning named workers (for example `@worker-1`, `@api-tests`) plus a `@verifier` agent communicating over a shared board across clean isolated contexts (`inherit`, `share`, or `branch` workspaces).
- **`/teamwork`** — Launches autonomous blueprint-driven agent teams on supported tiers (Google AI Pro/Ultra) where specialist roles propose, critique, and refine multi-day refactors or cross-service migrations.

### Choosing Between /plan, /goal, /boost, /swarm, and /teamwork

| Command         | Best Scope                                             | Human Checkpoints                   | Multi-Agent Topology                    | Quota Burn       |
| --------------- | ------------------------------------------------------ | ----------------------------------- | --------------------------------------- | ---------------- |
| **`/plan`**     | Single feature, bug fix, or scoped migration           | Review & approve before edits       | Single planner → fast executor          | Low–Medium       |
| **`/goal`**     | Well-tested build/fix loops with objective CI criteria | Final completion gate only          | Single autonomous loop                  | Medium           |
| **`/boost`**    | Deep root-cause analysis on hard bugs or algorithms    | Interactive findings report         | Multi-agent deep-reasoning loop         | High             |
| **`/swarm`**    | Parallel changes across independent files/packages     | Coordinator plan + `@verifier` diff | Coordinator + *N* workers + `@verifier` | Medium–High      |
| **`/teamwork`** | Multi-day greenfield builds or cross-repo migrations   | Milestone reviews                   | Dynamic self-critiquing agent team      | High (Pro/Ultra) |

---

## Category 2: Conversation & Context Lifecycle

Context rot and polluted threads quietly derail long sessions. These nine commands give you surgical control over conversation state:

- **`/compact`** `` `[message]` `` — Summarizes the active session into a dense checkpoint carrying settled decisions, verified file paths, and open blockers while reclaiming context headroom. Appending an optional prompt (for instance `/compact Implement Step 2 now using the verified schema`) resumes work in one step without losing momentum.
- **`/clear`** (alias **`/new`**) — Wipes the active conversation window cleanly when pivoting to an unrelated task so zero old context leaks into the new prompt.
- **`/resume`** (alias **`/switch`**) — Opens an interactive picker scoped to your workspace directory to search and reload earlier sessions; press `F2` directly inside the picker to rename saved threads.
- **`/fork`** (alias **`/branch`**) — Clones your active conversation history up to the exact current turn into a parallel independent thread. Always run `/fork` *before* trying a speculative refactor so your clean baseline remains untouched.
- **`/rollback`** — Steps backward in your current thread to rewind unintended tool calls or wrong turns without throwing away earlier research.
- **`/rename`** `` `<title>` `` — Assigns a human-readable title so you can locate critical sessions weeks later inside `/resume`.
- **`/title`** — Toggles or configures live terminal tab/window title synchronization for juggling multiple `agy` tabs.
- **`/btw`** `` `<query>` `` — Runs an out-of-band side question without pausing or polluting the primary conversation's tool history—ideal for checking a syntax quirk mid-refactor.
- **`/copy`** `` `[n|btw]` `` — Copies the latest response, the *n*-th most recent turn, or your last `/btw` side answer directly to the system clipboard.

---

## Category 3: Tools, Automation, Governance & Security

Twelve commands wire external capabilities, background execution, and deterministic safety controls into Antigravity:

- **`/agents`** — Opens the Agent Manager overlay to inspect running subagents, conversation IDs, and custom agent definitions.
- **`/tasks`** — Monitors background shell executions started asynchronously (dev servers, test runners, builds) and streams their live logs.
- **`/schedule`** `` `<cron> <cmd>` `` — Registers recurring 5-field cron schedules or one-shot delayed timers that wake `agy` with an instruction prompt.
- **`/browser`** `` `<task>` `` — Hands web navigation, DOM inspection, screenshot checks, and Core Web Vitals debugging to a dedicated browser subagent.
- **`/artifact`** — Opens the Artifact Review viewer to inspect structured implementation plans, architecture audits, or `walkthrough.md` deliverables.
- **`/permissions`** — Interactive editor for `action(target)` rules evaluated under strict **`Deny > Ask > Allow`** precedence plus terminal sandbox presets (`Default`, `Auto`, `Request Review`, `Turbo`).
- **`/hooks`** — Inspects active lifecycle hooks defined in `.agents/hooks.json` (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`).
- **`/mcp`** — Manages configured Model Context Protocol (MCP) servers, statuses, and exposed external tools/resources.
- **`/skills`** — Lists discovered local and global Agent Skills; run **`/skills reload`** immediately after editing or creating a `SKILL.md` so Antigravity registers it without restarting the session.
- **`/plugins`** — Interactive Plugins Manager supporting inline subcommands (`install`, `uninstall`, `enable`, `disable`, `list`) for bundled skills, rules, hooks, and MCP presets.
- **`/learn`** — Distills corrections or verified workarounds from your current conversation into a reviewable rule or skill proposal—feeding directly into your `<20KB` **MemOn** governance layer so the same error never happens twice.
- **`/agy-customizations`** `` `[request]` `` — Injects the official customization specification so the agent can safely author or debug `.agents/rules/`, `skills/`, `plugins/`, `hooks.json`, and MCP configs.

---

## Category 4: Workspace Navigation, Code Search & Review

Five workspace commands eliminate manual context switching between terminal, grep, and IDE diff tools:

- **`/add-dir`** `` `<path>` `` — Mounts an additional local directory into the active workspace scope so Antigravity can cross-reference sibling repositories (for example reading a core product monorepo while updating public documentation).
- **`/codesearch`** `` `<query>` `` (aliases **`/cs`**, **`/search`**) — Opens a live streaming codebase search UI across your mounted directories without burning conversational turns on manual `rg` calls.
- **`/diff`** — Opens an interactive review overlay comparing line-by-line turn modifications, staged edits, and commits directly inside the CLI.
- **`/open`** `` `<path>` `` — Opens a specific file or directory inside your operating system's default graphical editor.
- **`/context`** — Renders a visual breakdown of active token allocation across system rules, skills metadata, conversation turns, and tool results so you know *beforehand* when `/compact` is due.

---

## Category 5: Model Control, Configuration, Account & Utilities

The remaining fourteen commands manage model routing, local settings, billing transparency, voice/remote surfaces, and session exit:

- **`/model`** `` `[model]` `` — Switches your active Gemini model persistently across sessions. Passing a prompt inline (`` `/model gemini-4-carbon Audit this authentication middleware for race conditions` ``) executes a **single-turn one-shot override** without changing your default fast model—critical for saving Pro/Ultra quota while keeping frontier judgment one command away.
- **`/config`** (alias **`/settings`**) — Opens the interactive TUI settings panel backed by `~/.gemini/antigravity-cli/settings.json` (remember CLI settings live separately from Antigravity 2.0 Desktop settings).
- **`/keybindings`** — Customizes interactive TUI keyboard bindings cleanly.
- **`/statusline`** — Configures custom status bar widgets (model tier, token budget, git branch, active cost/quota indicators).
- **`/usage`** & **`/credits`** — `/usage` inspects per-model quota utilization; `/credits` checks remaining AI credits and balance links.
- **`/logout`** — Signs out and purges stored authentication credentials from the OS keyring.
- **`/remote`** — Toggles Remote Control / remote-agent orchestration so long-running jobs survive laptop sleep or surface switches.
- **`/voice`** — Supports real-time voice interaction (`/voice live`) and fast speech-to-text prompt dictation (`/voice dictate`).
- **`/antigravity-guide`** `` `[question]` `` — Queries Antigravity's built-in documentation sitemap directly across CLI, Desktop 2.0, IDE, and Python SDK features.
- **`/changelog`**, **`/feedback`**, **`/help`** — `/changelog` surfaces recent release notes; `/feedback` submits structured bug reports; `/help` opens the full command & keybinding cheat sheet.
- **`/exit`** (alias **`/quit`**) — Terminates the interactive `agy` session gracefully and returns control cleanly to your host shell (same as `Ctrl+D Ctrl+D`).

---

## Proven Command-Chaining Playbooks & Common Mistakes

Individual commands are handy; chaining them in repeatable loops is where velocity compounds:

```bash
# 1. Zero-Drift Feature Delivery
/plan /grill-me Add bilingual RSS & sitemap entries for new engineering blueprints
# → answer one question at a time → approve plan → let Hydrogen execute →
/diff
/learn Save the RSS & sitemap smoke check checklist to repository rules

# 2. Risk-Free Architecture Spike
/context
/fork
/model gemini-4-carbon Evaluate replacing synchronous build hook with cached metadata index
# → if experiment fails, return to clean baseline thread via /resume →

# 3. Long-Session Anti-Rot Loop
/btw Does Tailwind CSS v4 use bg-linear-to-br or bg-gradient-to-br?
/copy btw
/compact Continue migrating dashboard cards using verified Tailwind v4 syntax

# 4. Multi-Module Parallel Refactor
/plan Migrate all 8 product routes to strict loader error boundaries
/swarm Shard route updates across independent modules with @verifier running bun run test

# 5. Gated Autonomy & Scheduled Health Checks
/goal Refactor helper functions in app/lib/blog.ts until bun run lint && bun run test pass
/schedule "0 9 * * 1" Run bun run audit:content and report any broken links
```

### Five Common Command Mistakes to Avoid

1. **Calling `/goal` without automated verification tests:** Unattended loops optimize for what they can measure. Without failing assertions, TypeScript checks, or SSR smoke tests, `/goal` can silently declare broken output complete.
2. **Waiting until `/context` hits 85%+ before running `/compact`:** Model recall softens long before the hard window limit. Check `/context` after exploration ends and `/compact` cleanly right before writing code.
3. **Burning `/boost`, `/swarm`, or `/teamwork` on sequential single-file tasks:** Multi-agent coordination overhead slows down linear three-step edits. Reserve `/swarm` and `/teamwork` for genuinely parallelizable work.
4. **Asking unrelated syntax questions in the main thread:** Every tangent pollutes working memory. Isolate side lookups inside `/btw` (and grab answers with `/copy btw`).
5. **Writing deprecated `.agents/workflows/*.md` files for custom commands:** Legacy workflows lack progressive disclosure, semantic invocation, and helper scripts. Always author skills instead.

---

## Authoring Custom Commands via .agents/skills/

Legacy workflows (`.agents/workflows/*.md` and `_agents/workflows/*.md`) are deprecated. In modern Antigravity, every custom **Skill** inside `.agents/skills/<name>/SKILL.md` (workspace-scoped, version-controlled) or `~/.gemini/config/skills/<name>/SKILL.md` (global machine scope) automatically becomes **both**:

1. An **explicit command** (typing `/<name>` directly in the prompt bar or `/` menu), and
2. A **semantically discoverable capability** loaded on demand via progressive disclosure (so only `name` and `description` consume tokens at startup).

If you have legacy workflow files sitting in an older repository, invoke Antigravity's built-in migration workflow once to convert them idempotently into skills (preserving `.md.bak` backups).

Here is a minimal, production-ready template creating a custom `/release-check` command inside any repository:

```markdown
---
name: release-check
description: >-
  Run full pre-release verification gates (content compilation, formatting,
  ESLint, TypeScript, unit tests, production bundle build, and SSR smoke check).
  Use when preparing a release or invoking /release-check.
---

# Pre-Release Verification Runbook

Execute the repository release gate strictly in order before tagging or merging:

1. Compile content, verify code formatting, lint with zero warnings, typecheck, run unit tests, and build:
   `bun run content:build && bun run format:check && bun run lint && bun run typecheck && bun run test && bun run build`
2. Run the production SSR smoke suite against localhost in its own step:
   `bun run smoke`
3. Report exact command exit status, test counts, and any regressions concisely before proceeding.
```

Save that file to `.agents/skills/release-check/SKILL.md`, run **`/skills reload`** inside `agy`, and `/release-check` is immediately live across CLI and IDE surfaces without restarting your terminal.

---

## Continue the AI Engineering Harness Series

- **Part 1 (Local Zero-Token Execution):** [Building a Local AI Coding Stack with Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder](/blog/local-ai-coding-stack-ollama-opencode-qwen3)
- **Part 2 (Gemini 4 Tiers, Memory & Security):** [Mastering Gemini Models in Antigravity (agy): Architecture, Memory, Security & Honest Limits](/blog/mastering-gemini-models-in-antigravity-agy)
- **Deterministic Memory Governance (`<20KB`):** [MemOn: Deterministic AI Engineering Governance Under 20KB](/blog/on-memory-deterministic-ai-engineering-governance)
- **Air-Gapped Retrieval Architecture:** [RagOn: Air-Gapped Zero-Leak RAG Studio](/blog/ragon-air-gapped-zero-leak-rag-studio)
- **Companion Academy Lesson:** [RagOn & MemOn: Air-Gapped Zero-Leak RAG Studio & Sub-20KB Agent Governance](/academy/private-rag-onmemory-agent-governance)
