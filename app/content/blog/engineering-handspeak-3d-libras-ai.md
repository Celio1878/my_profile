---
title: "Engineering HandSpeak: Real-Time 60 FPS 3D Libras Translation and Accessible P2P Video"
slug: "engineering-handspeak-3d-libras-ai"
description: "Architectural blueprint of HandSpeak: 60 FPS MediaPipe 3D hand tracking with EMA anti-jitter, phonetic Levenshtein disambiguation, Three.js WebGL anatomical tutor, and encrypted PeerJS WebRTC video calls."
date: "2026-10-17"
tags: ["AI", "Computer Vision", "WebAssembly", "WebRTC", "Three.js", "Libras", "Cloud Run"]
lang: "en"
author: "Célio Vieira"
---

## The Vision: Breaking Communication Barriers with 3D AI

For Deaf and hard-of-hearing individuals, navigating daily conversations in hearing environments frequently introduces cognitive friction. While Brazilian Sign Language (**Libras**) is rich, spatial, and expressive, existing translation tools are often constrained by rigid 2D bounding boxes, unreliable cloud vision latency, or awkward speech-to-text flows that require microphone permissions.

**HandSpeak** (`aldeon.app/handspeak`) was engineered as a 5th flagship venture under the Aldeon umbrella to resolve these limitations from first principles. Our core requirements:

1. **Deterministic 60 FPS 3D Computer Vision**: Track up to two hands simultaneously in real time with sub-16ms local latency directly inside modern browsers.
2. **Phonetic & Geometric Disambiguation**: Resolve subtle sign collisions (such as *F vs. T*, *A vs. S*, *1 vs. D*, *U vs. V*) without requiring frustrating backspace corrections.
3. **Interactive 3D Anatomical Tutor**: Render a 21-joint cybernetic hand rig in WebGL with 360-degree orbit and real-time sentence animation to help deaf users read text inputs visually.
4. **Peer-to-Peer Encrypted Video**: Enable direct WebRTC video calls with floating live subtitles and comprehension reaction tags without dedicated streaming server costs.
5. **Zero-Trust Safety & Content Moderation**: Deploy dual-layer multimodal Trust & Safety on GCP Cloud Run with burst protection for safe interpersonal communication.

```
┌──────────────────────────────────────────────────────────────────┐
│                   Browser Client (React Router 7)                │
│                                                                  │
│  [Camera Feed 60 FPS] ──► [MediaPipe Tasks Vision 3D (WASM)]    │
│                                      │                           │
│                           [EMA Anti-Jitter Filter α=0.72]       │
│                                      │                           │
│                      [Geometric Feature Extractor]               │
│                                      │                           │
│               [Phonetic Weighted Levenshtein Disambiguator]      │
│                                      │                           │
│  ┌───────────────────────┴───────────────────────┐               │
│  ▼                                               ▼               │
│ [Three.js 3D WebGL Tutor]             [PeerJS WebRTC P2P Data]  │
└──────────────────────────────────────────────────┼───────────────┘
                                                   │ 
                                      [Encrypted Media Stream]
                                                   │
                                                   ▼
                                       ┌───────────────────────┐
                                       │   Remote Peer PeerJS  │
                                       │  (Floating Captions)  │
                                       └───────────────────────┘
```

---

## 1. 60 FPS 3D Hand Tracking & Anti-Jitter Architecture

Early prototypes relying on 2D coordinates suffered from perspective distortion: a hand tilted 15 degrees toward or away from the camera produced false classifications. 

To solve this, HandSpeak adopted **MediaPipe Tasks Vision** with normalized 3D landmarks (`numHands: 2`), computing intrinsic scale factors based on the Euclidean distance between the wrist ($P_0$) and the middle finger metacarpophalangeal joint ($P_9$).

### Local WASM Resilience & 4-Tier Hardware Fallback
To eliminate CDN mime-type breakage and ensure offline-ready execution, HandSpeak self-hosts all WebAssembly binaries and tasks models in `public/wasm/`. The initialization lifecycle applies a resilient 4-layer fallback strategy:

1. Local WASM Model + WebGL GPU Delegate
2. Local WASM Model + CPU Delegate
3. Remote Version-Pinned Model + WebGL GPU Delegate
4. Remote Version-Pinned Model + CPU Delegate

### Exponential Moving Average (EMA) Smoothing
Webcam optical sensor noise creates micro-tremors in landmark coordinates. We apply an Exponential Moving Average (EMA) filter across all 21 hand joints ($x, y, z$) before geometric evaluation:

$$S_t = \alpha \cdot X_t + (1 - \alpha) \cdot S_{t-1}$$

Using $\alpha = 0.72$ preserves rapid hand transitions while completely dampening high-frequency sensor noise. Combined with an optimized lock-in threshold of **320ms** (fast-locking in 200ms when classification confidence exceeds $0.90$), signers can compose natural sentences at conversational typing speeds.

---

## 2. Resolving Libras Collisions with Phonetic Levenshtein

In Libras datilology, several letters share nearly identical hand configurations:

- **F vs. T**: Both feature three fingers extended with the index finger folded over the thumb. In letter **F**, the thumb rests *outside* the index finger; in **T**, the thumb locks *inside*.
- **A vs. S**: Both are closed fists. In **A**, the thumb rests vertically alongside the index knuckle; in **S**, the thumb crosses horizontally over the fingers.
- **U vs. V**: Both have index and middle fingers raised. In **U**, fingers are tightly parallel ($\Delta < 0.22$); in **V**, they spread into a clear acute angle ($\Delta \ge 0.25$).

Rather than relying purely on heuristic thresholds, HandSpeak combines geometric angle calculations with a **Phonological Weighted Levenshtein Algorithm** (`libras-disambiguation-service.ts`). Known visual collision pairs carry fractional substitution penalties ($0.18$ to $0.25$ instead of $1.0$). When a user pauses for $1.2\text{s}$ or inputs a space sign, the system transparently autocorrects the token buffer in under $2\text{ms}$ without modifying already verified words.

---

## 3. The 57+ Pose 3D Anatomical WebGL Sign Tutor & Practice Mode

Communication is bidirectional. When a hearing participant replies by typing in the chat, Deaf signers benefit from seeing how that text is formed in Libras hand shapes.

We built a **Three.js WebGL Anatomical Rig** (`anatomical-hand-scene.ts`) expanded to **57+ articulated poses** with 100% parity across the A–Z alphabet (`26`), numbers `0–10` (`11`), and core conversational expressions (`20+`):
- **21 Articular Joints & 20 Cybernetic Bones**: Fully articulated 3D mesh with smooth geometric pose interpolation (`interpolateHandPoses`).
- **360° Orbit & Camera Presets**: Palmar, dorsal, lateral, and top-down perspectives allowing learners and signers to inspect articulation depth.
- **Synced Movement Flow Cadence Presets**: Shared timing presets (`accessible` `550ms`, `natural` `320ms`, `fluent` `220ms`) synchronized between the translator engine, 3D tutor, and Academy deep-links (`?practice=` and `?sign=`).
- **Interactive Camera Practice Mode**: Real-time accuracy scoring against live webcam landmarks so learners can verify handshape (`CM`) and orientation (`O`) immediately.
- **Strict WebGL Memory Lifecycle**: Enforces comprehensive geometry and material disposal with `requestAnimationFrame` cancellation upon unmount to eliminate memory leaks.

---

## 4. P2P WebRTC Video, Zero-Cost Solo Privacy & Trust & Safety

For real-time remote communication between signers and hearing individuals, HandSpeak implements serverless P2P WebRTC calls via **PeerJS**:

- **Room Code Handshake**: Lightweight 6-character room codes (e.g. `HS-7482`) allow instant connections with zero signup friction.
- **Floating Subtitles & Mutual Comprehension Reactions**: Displays dynamic live captions directly over the remote video feed, accompanied by quick tactile reactions (👍 *Understood*, 🔄 *Please repeat*, ⏳ *One moment*, 👏 *Agree*).
- **Zero-Cost Solo Webcam Isolation**: Solo local translation and Camera Practice Mode run **100% on-device** via local WebAssembly + WebGL with **$0 server or multimodal API cost**. Server-side `VideoSafetyGuard` moderation activates **strictly inside active 2-peer remote WebRTC calls** (`P2PVideoCallModal`).
- **Dual-Layer Multimodal Moderation (Remote Calls)**:
  - *Tier 1 (Client Canvas 128x128)*: Heuristic skin-tone and velocity monitoring in the browser.
  - *Tier 2 (GCP Cloud Run Microservice)*: Periodic frame moderation via FastAPI (3s cruise / 1s burst under visual anomaly), with immediate blur and disconnect if critical policy violations occur.

---

## 5. Bilingual 5-Track Libras & Accessibility Academy (`/handspeak/learn`)

To broaden adoption before users ever sign in, HandSpeak includes a **100% free, zero-login, zero-backend bilingual (`PT-BR`/`EN`) Academy** at [`aldeon.app/handspeak/learn`](https://aldeon.app/handspeak/learn):

1. **Track 1 — Accessibility, LBI & 10-Point Etiquette Audit**: Practical communication audit grounded in Brazil's inclusion standards.
2. **Track 2 — The 5 Phonological Parameters (`CM/PA/M/O/ENM`)**: Visual topic-comment grammar and structural sign anatomy.
3. **Track 3 — Neutral Signing Space & 11-Pair Collision Lab**: Interactive geometric breakdowns for high-collision pairs (`F/T`, `A/S`, `U/V`, `G/L`, `G/Q`, `K/P/H`, `I/J`, `1/D`, `2/V`, `5/B`, `0/O`).
4. **Track 4 — Real-World Two-Way Scenarios**: Five practical dialogue flows paired with visual repair strategies.
5. **Track 5 — Lip-Reading (~30%) vs. Captions + Sign Clarity Simulator**: Demonstrates why lip-reading alone fails most words and links learners directly into `?practice=` sessions with synchronized cadence presets.

---

## Production Outcomes

- **60 FPS** continuous tracking with $<16\text{ms}$ frame processing latency on standard laptop webcams.
- **57+ 3D Poses** achieving 100% parity across `A–Z`, `0–10`, and core conversational expressions.
- **Zero Server Media & Solo Practice Costs**: Video and data streams flow directly between peers via WebRTC, while solo practice runs 100% locally in WASM + WebGL.
- **Sovereign Privacy**: Hand landmarks are computed locally in client WebAssembly memory; camera frames never leave the device in solo practice.

*HandSpeak and its 5-track Libras Academy are live at [aldeon.app/handspeak](https://aldeon.app/handspeak) and [aldeon.app/handspeak/learn](https://aldeon.app/handspeak/learn).*
