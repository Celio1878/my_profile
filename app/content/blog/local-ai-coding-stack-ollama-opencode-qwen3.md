---
title: "Building a Local AI Coding Stack with Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder"
slug: "local-ai-coding-stack-ollama-opencode-qwen3"
description: "Production blueprint for running private, zero-token-cost agentic coding locally using Ollama, OpenCode, Qwen 3.5, and Qwen3-Coder — built directly from a real RTX 3070 8GB + Ryzen 7 3700X + 32GB DDR4-3600 + NVMe/HDD workstation."
date: "2026-11-26"
tags: ["AI", "LLMs", "Ollama", "Agents", "Local AI", "OpenCode", "Architecture"]
lang: "en"
author: "Célio Vieira"
---

## Why Build a Local Agentic Coding Stack on Existing Hardware

Most engineers assume local agentic coding requires buying a $2,000+ GPU or a maxed-out unified-memory workstation before writing a single line of code. In reality, you can run a productive, **zero-marginal-token-cost agentic coding loop** right on a mid-range desktop you already own—provided you align **4-agent model routing**, **VRAM/KV-cache guardrails**, and **NVMe vs. HDD storage tiering** with your hardware's real memory boundaries.

Running **OpenCode** as a terminal agent harness backed by **Ollama** serving **Qwen 3.5** and **Qwen3-Coder** delivers four concrete engineering advantages:

- **Zero Data Leakage & Full IP Sovereignty**: Proprietary microservices, `.env` topologies, database schemas, and client incident logs never leave `127.0.0.1`.
- **Zero-CapEx Reuse**: Repurposing an existing workstation eliminates subscription creep without waiting on hardware procurement.
- **Unthrottled Iteration**: Running test-fix loops, repo exploration, and context compaction triggers zero rate limits and zero per-token anxiety.
- **Offline & Air-Gapped Resilience**: Flights, unstable Wi-Fi, or locked-down enterprise VPNs no longer interrupt your agentic workflow.

---

## Reference Workstation: The Real-World Baseline

Every configuration file, model weight size, and tuning flag in this blueprint comes from an active engineering workstation:

| Component | Exact Reference Spec | Architectural Role in Local AI |
|---|---|---|
| **GPU** | **NVIDIA RTX 3070 — 8 GB GDDR6 VRAM** (`448 GB/s`) | Primary compute engine + `q8_0` KV cache + 100% residency for `qwen3.5:9b` & `qwen3.5-fast:9b` |
| **CPU** | **AMD Ryzen 7 3700X — 8 Cores / 16 Threads** (Zen 2, AVX2) | Executes offloaded Mixture-of-Experts (MoE) weights (`qwen3-coder:30b`) & harness tools |
| **System RAM** | **32 GB DDR4-3600 MHz** (Dual-Channel, `1800 MHz` 1:1 FCLK) | Holds offloaded MoE experts (`~13–15 GB`) while preserving `~14–16 GB` for OS, IDE & Docker |
| **Primary NVMe** | **Dual ~477 GB NVMe SSDs** | Root OS, active Git repositories, Docker layers, and build caches |
| **Dedicated LLM Store** | **~300 GB SATA HDD (`OLLAMA_MODELS`, 24 GB GGUF store)** | Frees NVMe space by holding `24 GB` of model blobs, amortized via `30m` keep-alive residency |

An **8 GB VRAM** card looks tight on paper—and for large *dense* models, it is. What makes this workstation genuinely effective is pairing **32 GB of DDR4-3600**, strict single-slot concurrency (`OLLAMA_NUM_PARALLEL=1`), a **derived zero-extra-disk no-think model (`qwen3.5-fast:9b`)**, and **sparse MoE (`qwen3-coder:30b`)** for wide-context planning.

---

## How It Works: Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder

Instead of running one oversized model for every prompt, OpenCode splits agentic coding across **four specialized agent roles** talking to Ollama over `http://127.0.0.1:11434/v1`:

```text
┌────────────────────────────────────────────────────────────────────────────┐
│  OpenCode Terminal Harness (auto compaction + prune enabled)               │
│  • Reads compact <20KB MemOn context + repository files on NVMe            │
│  • Routes each agent turn to the exact right local weight & context cap    │
└───────┬───────────────────────────────┬──────────────────────────────┬─────┘
        │ explore / compaction          │ build (default)              │ plan
        ▼                               ▼                              ▼
┌───────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│ qwen3.5-fast:9b       │ │ qwen3.5:9b                │ │ qwen3-coder:30b           │
│ 32K ctx • No-Think    │ │ 32K ctx • Full Reasoning  │ │ 48K (49152) • Sparse MoE  │
│ 100% RTX 3070 VRAM    │ │ 100% RTX 3070 VRAM        │ │ Attention+KV on RTX 3070  │
│ 0 B extra disk blobs  │ │ 5.3 GiB + 880 MiB mmproj  │ │ 18 GB (3.3B active) in RAM│
└───────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
        └───────────────────────────────┬──────────────────────────────┘
                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  Ollama Systemd Service (CUDA, Flash Attention, q8_0 KV, 30m Keep-Alive)   │
│  OLLAMA_VULKAN=0 • OLLAMA_NUM_PARALLEL=1 • OLLAMA_MAX_LOADED_MODELS=2      │
│  Backed by 24 GB GGUF blob store on mounted SATA HDD (RequiresMountsFor)   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Model Division of Labor: Qwen 3.5, `qwen3.5-fast:9b` & Qwen3-Coder

Here is the exact 3-model inventory stored inside the workstation's **24 GB `OLLAMA_MODELS` blob directory**:

| Model Tag | Architecture & Format | Disk Blob Footprint | Context Cap in OpenCode | Execution Profile on RTX 3070 + 32 GB RAM | OpenCode Agent Role |
|---|---|---|---|---|---|
| `qwen3.5:9b` | `qwen35` Dense Hybrid (`Q4_K_M`) + Vision `mmproj.gguf` | `5.3 GiB` model + `880 MiB` projector | `32,768` (`32K`) | **100% RTX 3070 VRAM** (`448 GB/s`) | **`build` (default)**: multi-step edits, test fixes & UI inspection |
| `qwen3.5-fast:9b` | Custom `FROM qwen3.5:9b` (`Q4_K_M`, No-Think prompt, `temp 0.1`) | **`0 B` extra** (shares `qwen3.5:9b` blobs) | `32,768` (`32K`) | **100% RTX 3070 VRAM** (`448 GB/s`) | **`explore` & `compaction`**: rapid repo scans & zero-preamble pruning |
| `qwen3-coder:30b` | `qwen3moe` Sparse MoE (`30.5B` total / `3.3B` active, `Q4_K_M`) | `18 GB` (`17.3 GiB` GGUF) | `49,152` (`48K`) | **Hybrid**: Attention + KV on RTX 3070, experts in 32 GB DDR4-3600 | **`plan`**: deep repo architecture & multi-file refactoring plans |

Why does **sparse MoE** work on this rig while a 30B *dense* model fails?
- A dense 30B model must stream **all ~18 GB of weights** across DDR4 RAM for **every generated token**, choking dual-channel DDR4 (`~45–55 GB/s`) down to `~1–2 tokens/sec`.
- **Qwen3-Coder (`30.5B`, `qwen3moe`)** only activates **~3.3B parameters per token**. Keeping attention layers and KV cache inside the **RTX 3070's 448 GB/s GDDR6** while reading only active expert slices from **32 GB DDR4-3600** keeps planning sessions responsive on existing hardware.

### Tuning Ollama via Systemd for 8 GB VRAM & Session Warmth

Out of the box, Ollama defaults to small context windows and multi-slot KV allocations that either truncate OpenCode tool definitions or spill out of 8 GB VRAM. This exact systemd drop-in (`/etc/systemd/system/ollama.service.d/override.conf`) keeps inference pinned to CUDA and prevents cold HDD reloads mid-session:

```ini
[Unit]
RequiresMountsFor=/mnt/files

[Service]
User=<user>
Group=<user>
Environment="OLLAMA_MODELS=/mnt/files/llms"
Environment="OLLAMA_VULKAN=0"
Environment="OLLAMA_FLASH_ATTENTION=1"
Environment="OLLAMA_KV_CACHE_TYPE=q8_0"
Environment="OLLAMA_CONTEXT_LENGTH=32768"
Environment="OLLAMA_KEEP_ALIVE=30m"
Environment="OLLAMA_MAX_LOADED_MODELS=2"
Environment="OLLAMA_NUM_PARALLEL=1"
```

Every single flag solves a concrete bottleneck on this hardware:
- **`OLLAMA_VULKAN=0`**: Ensures native CUDA execution on the RTX 3070 rather than Vulkan overhead.
- **`OLLAMA_NUM_PARALLEL=1`**: Critical on 8 GB VRAM—reserves **one** KV-cache allocation instead of splitting VRAM across parallel slots.
- **`OLLAMA_FLASH_ATTENTION=1` + `OLLAMA_KV_CACHE_TYPE=q8_0`**: Compresses KV cache roughly 2× so `32,768` context fits cleanly alongside `qwen3.5:9b`.
- **`OLLAMA_KEEP_ALIVE=30m` + `OLLAMA_MAX_LOADED_MODELS=2`**: Keeps `qwen3.5:9b` and `qwen3-coder:30b` resident across 30-minute pauses so switching between `plan` and `build` in OpenCode does not re-read `18 GB` from the SATA HDD.
- **`RequiresMountsFor=/mnt/files`**: Prevents `ollama.service` from booting before the secondary drive mounts and creating an empty shadow store.

### The Zero-Extra-Disk `qwen3.5-fast:9b` Modelfile

Thinking models waste hundreds of reasoning tokens on mechanical tasks like directory exploration and conversation compaction. Creating a derived Modelfile strips thinking preamble with **0 bytes of duplicate model weights** because Ollama shares the underlying `qwen3.5:9b` GGUF and `mmproj.gguf` blobs:

```dockerfile
# Modelfile.qwen35-fast
FROM qwen3.5:9b
SYSTEM "Follow output templates and formatting instructions strictly. Do not output thinking blocks, preamble, or conversational commentary."
PARAMETER num_ctx 32768
PARAMETER temperature 0.1
PARAMETER presence_penalty 1.5
PARAMETER top_k 20
PARAMETER top_p 0.95
```

```bash
ollama pull qwen3.5:9b
ollama pull qwen3-coder:30b
ollama create qwen3.5-fast:9b -f Modelfile.qwen35-fast
```

### Wiring the 4-Agent OpenCode Harness (`opencode.json`)

Here is the exact `~/.config/opencode/opencode.json` wiring all four OpenCode agent roles (`build`, `plan`, `explore`, `compaction`) with auto-compaction and explicit context/output budgets:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen3.5:9b",
  "compaction": {
    "auto": true,
    "prune": true
  },
  "mcp": {},
  "agent": {
    "build": {
      "model": "ollama/qwen3.5:9b"
    },
    "plan": {
      "model": "ollama/qwen3-coder:30b"
    },
    "explore": {
      "model": "ollama/qwen3.5-fast:9b"
    },
    "compaction": {
      "model": "ollama/qwen3.5-fast:9b"
    }
  },
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://127.0.0.1:11434/v1",
        "apiKey": "ollama"
      },
      "models": {
        "qwen3.5:9b": {
          "name": "Qwen 3.5 9B (GPU)",
          "limit": {
            "context": 32768,
            "output": 8192
          }
        },
        "qwen3.5-fast:9b": {
          "name": "Qwen 3.5 9B Fast / No-Think (GPU)",
          "limit": {
            "context": 32768,
            "output": 8192
          }
        },
        "qwen3-coder:30b": {
          "name": "Qwen 3 Coder 30B MoE (48K Hybrid)",
          "limit": {
            "context": 49152,
            "output": 8192
          }
        }
      }
    }
  }
}
```

Notice how `compaction.auto: true` + `prune: true` paired with `qwen3.5-fast:9b` prevents long build sessions from silently overflowing the `32,768` GPU context limit on the RTX 3070.

---

## Real-World Problem Solving & MemOn Synergy

Where does this exact 4-agent setup consistently shine?

1. **Architecture Planning Before Edits**: Running OpenCode's `plan` agent on `qwen3-coder:30b` (`48K` context) maps cross-file TypeScript/Python dependencies accurately before handing execution back to `build` (`qwen3.5:9b`).
2. **Fast Repo Exploration & Compaction**: Routing `explore` and `compaction` to `qwen3.5-fast:9b` (`temperature: 0.1`, no thinking blocks) keeps file discovery and history pruning crisp inside GPU VRAM.
3. **Test-Driven Verification Loops**: Letting `build` run `bun test`, `tsc`, or `pytest`, parse failures locally, and patch code without paying per retry.
4. **Private Log, Schema & Config Debugging**: Inspecting cloud IAM policies, SQL queries, and local service configs directly on `127.0.0.1` with zero data exposure.

### Why `MemOn` (`sub-20KB`) Multiplies Local GPU Efficiency

On a 200K-token frontier cloud API, bloated 150 KB instruction files merely waste money. On an **8 GB RTX 3070**, context bloat directly steals VRAM from your `q8_0` KV cache, pushes attention layers over PCIe into DDR4, and forces premature compaction.

Pairing OpenCode with the deterministic [`MemOn` (`sub-20KB`, formerly OnMemory) governance protocol](/blog/on-memory-deterministic-ai-engineering-governance) keeps repository rules, locked stack choices, and 5-field anti-patterns under **20,000 bytes (~5K tokens)**—preserving over **80% of your 32K–48K context window** for actual source files and tool diffs.

---

## Money Saving & Zero-CapEx Economics

Comparing realistic **monthly developer spend** makes the ROI unmistakable:

| Stack Option | Upfront Hardware CapEx | Monthly Recurring Cost | Privacy & Rate Limits | Practical Engineering Fit |
|---|---|---|---|---|
| **Single Cloud Coding Seat** | `$0` | `$20 / month` (`$240/yr`) | Cloud-hosted; strict monthly burst quotas | Good baseline, throttles under heavy agentic loops |
| **Heavy Agentic Cloud / Max Usage** | `$0` | `$100–$200+ / month` (`$1,200–$2,400+/yr`) | Cloud-hosted; rapid token burn on test retries | Best frontier reasoning for ambiguous greenfield work |
| **Existing RTX 3070 Rig (This Blueprint)** | **`$0`** (already owned) | **`~$3–$6 / month`** burst electricity | **100% private**, zero token throttling | Handles ~85% of daily coding, TDD, and private debugging |

Why is electricity so low? Your RTX 3070 (`~220W` peak) and Ryzen 7 3700X (`~65W` TDP) are **not running at 100% load 24/7**. During an 8-hour workday of bursty agentic coding, active GPU inference typically totals **45–90 minutes** of actual compute (`~0.25–0.45 kWh/day`, or roughly `$3–$6/month` depending on local kWh rates).

> **The 85/15 Hybrid FinOps Rule**: Run **85% of daily engineering work** (repo exploration, refactors, test loops, log analysis, scaffolding) locally at `$0` per token, and reserve frontier cloud APIs strictly for the hardest **15%** (massive 40-file architectural rewrites or subtle distributed race conditions). That split cuts monthly AI spend by **70–85%** without sacrificing shipping velocity.

---

## Honest Limitations & Failure Modes

Local AI breaks down quickly if you pretend an 8 GB workstation behaves like an 8×H100 cluster. Keep these six real constraints front and center:

1. **The 8 GB VRAM Cliff**: Even with `OLLAMA_FLASH_ATTENTION=1`, `OLLAMA_KV_CACHE_TYPE=q8_0`, and `OLLAMA_NUM_PARALLEL=1`, `qwen3.5:9b` (`5.3 GiB` + `880 MiB` vision projector) leaves tight headroom inside 8 GB VRAM. Let OpenCode's `compaction.auto` + `prune` keep sessions under `32K`.
2. **SATA HDD Cold-Load Latency**: Storing the **24 GB** `OLLAMA_MODELS` directory on a spinning SATA HDD (`~120–180 MB/s`) saves precious NVMe capacity, **but** cold-loading `qwen3-coder:30b` (`18 GB`) takes **~105–160 seconds** on the first request of the day—which is precisely why `OLLAMA_KEEP_ALIVE=30m` and `OLLAMA_MAX_LOADED_MODELS=2` are mandatory on this setup.
3. **32 GB RAM Ceiling with `MAX_LOADED_MODELS=2`**: Holding both `qwen3.5:9b` and `qwen3-coder:30b` warm works cleanly inside 32 GB RAM during coding, but running heavy Docker Compose stacks + Android emulators simultaneously can pressure RAM; drop `OLLAMA_MAX_LOADED_MODELS=1` if you also launch heavy VMs.
4. **Tool-Calling Drift Below `Q4_K_M`**: Never downgrade to `Q2_K` or `Q3_K_S` just to shrink weights. Sub-4-bit quantization corrupts JSON tool-call schemas inside OpenCode and triggers edit-retry loops.
5. **Frontier Reasoning Ceiling**: On deeply ambiguous multi-service migrations across 30+ files, frontier cloud models still make fewer wrong assumptions on the first pass.
6. **Desktop Thermals & Acoustics**: Long agentic test loops keep a dual-fan RTX 3070 spun up. Enforcing a clean power limit (e.g., `nvidia-smi -pl 190`) lowers fan noise and heat with negligible speed impact.

---

## Hardware Points: Reference Rig Dissected & 4-Stage Upgrade Matrix

### 1. Memory Bandwidth Dominates Token Generation

LLM decoding is overwhelmingly **memory-bandwidth bound**, not compute-bound:
- **RTX 3070 GDDR6 (`448 GB/s`)**: Powers snappy `qwen3.5:9b` and `qwen3.5-fast:9b` turns when layers fit inside 8 GB VRAM.
- **DDR4-3600 Dual-Channel (`~45–55 GB/s` real-world)**: Roughly 8–10× slower than GDDR6, which is why **only sparse MoE models** (`3.3B` active per token in `qwen3-coder:30b`) remain practical when experts reside in system RAM.

### 2. Why 32 GB DDR4-3600 Matters for `qwen3-coder:30b`

On a 16 GB RAM workstation, loading `qwen3-coder:30b` (`18 GB`) immediately triggers OS swap thrashing to disk. **32 GB at 3600 MHz** hits two sweet spots simultaneously:
- Holds `~13–15 GB` of offloaded MoE experts in RAM while leaving enough memory untouched for Linux/Windows, your IDE, and local dev servers.
- Aligns with the **Ryzen 7 3700X** Infinity Fabric (`1800 MHz` 1:1 FCLK), avoiding cross-clock latency penalties during CPU-assisted MoE routing.

### 3. NVMe (OS/Repos) vs. SATA HDD (`OLLAMA_MODELS`): Choosing the Trade-Off

Dual storage (NVMe + HDD) forces a practical engineering trade-off between **disk space** and **first-load latency**:

| Storage Tier | Sequential Read | Cold Load: `qwen3.5:9b` (`~6.2 GB` w/ `mmproj`) | Cold Load: `qwen3-coder:30b` (`18 GB`) | Trade-Off & Mitigation |
|---|---|---|---|---|
| **SATA HDD (`OLLAMA_MODELS`)** | `~120–180 MB/s` | `~35–50 sec` | `~105–160 sec` | **Saves 24+ GB on NVMe**; pair with `OLLAMA_KEEP_ALIVE=30m` & `MAX_LOADED_MODELS=2` so cold load only happens once per session |
| **NVMe PCIe SSD** | `~3,000–3,500 MB/s` | `~1.8–2.5 sec` | **`~5–7 sec`** | Ideal for active Git repos, Docker layers & build caches—and the #1 zero-cost quality-of-life upgrade if you free 25–40 GB on NVMe for hot models |

### 4. 4-Stage Hardware Progression Matrix

| Tier | Representative Hardware | VRAM / Unified Memory | Bandwidth | What Unlocks in OpenCode + Ollama |
|---|---|---|---|---|
| **Baseline (This Rig)** | **RTX 3070 + Ryzen 7 3700X + 32 GB DDR4-3600 + NVMe/HDD** | `8 GB VRAM` + `32 GB RAM` | `448 GB/s` VRAM / `~50 GB/s` RAM | Full-VRAM `qwen3.5:9b` + `qwen3.5-fast:9b` (`32K`) + hybrid MoE `qwen3-coder:30b` (`48K`) at `$0` CapEx |
| **Tier 1: Mid-VRAM GPU** | RTX 4060 Ti 16 GB / 4070 Ti Super / 5070 Ti | `16 GB VRAM` | `288–896 GB/s` | Full-VRAM `qwen3.5:9b` at `128K` context + fewer MoE layers spilled to RAM |
| **Tier 2: Enthusiast GPU** | RTX 3090 / RTX 4090 / RTX 5090 | `24–32 GB VRAM` | `936–1,792 GB/s` | **100% VRAM** `qwen3-coder:30b` & `qwen3.5:35b-a3b` + `qwen3.5:27b` dense at high tok/s |
| **Tier 3: High-Memory Rig** | Apple Silicon M3/M4 Max/Ultra or Dual 24 GB GPUs | `64–128 GB+` | `400–800+ GB/s` | Simultaneous multi-model VRAM residency, `Q6_K`/`Q8_0` weights & `qwen3.5:122b-a10b` |

---

## Production Quickstart & Companion Academy Track

To replicate this exact setup on Linux in under ten minutes:

```bash
# 1. Inspect GPU, RAM, and model drive mount
nvidia-smi && free -h && df -h /mnt/files

# 2. Apply systemd override (/etc/systemd/system/ollama.service.d/override.conf) and restart
sudo systemctl daemon-reload && sudo systemctl restart ollama

# 3. Pull base models and create the 0-byte-overhead No-Think variant
ollama pull qwen3.5:9b
ollama pull qwen3-coder:30b
ollama create qwen3.5-fast:9b -f Modelfile.qwen35-fast

# 4. Verify loaded VRAM/RAM split after launching OpenCode
opencode
ollama ps
```

Want to follow the full hands-on video walkthrough—including live `ollama ps` VRAM/RAM profiling on the **RTX 3070 + Ryzen 7 3700X + 32 GB DDR4-3600 + NVMe/HDD** rig and OpenCode 4-agent refactor sessions?

- **Companion Academy Lesson**: [Local AI Coding Stack with Ollama, OpenCode & Qwen 3.5](/academy/local-ai-coding-ollama-opencode-qwen3)
- **Part 2 (Cloud Frontier Orchestration)**: [Mastering Gemini Models in Antigravity (agy): Architecture, Memory, Security & Honest Limits](/blog/mastering-gemini-models-in-antigravity-agy)
- **Part 3 (Antigravity `/` Slash Command Manual)**: [The Complete Antigravity (agy) Slash Command Field Manual: Every / Command Explained](/blog/antigravity-agy-slash-commands-complete-guide)
