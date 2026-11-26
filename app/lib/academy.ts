import type { SupportedLocale } from "~/i18n";

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@celio_vieira";
export const YOUTUBE_SUBSCRIBE_URL = "https://www.youtube.com/@celio_vieira?sub_confirmation=1";

export type AcademyTrackId =
  "local-ai" | "data-lakehouses" | "distributed-cloud" | "fullstack-ventures";

export type AcademyLevel = "foundations" | "intermediate" | "advanced";

export type AcademyLessonStatus = "published" | "upcoming";

export type LocalizedText = Record<SupportedLocale, string>;
export type LocalizedList = Record<SupportedLocale, string[]>;

export interface AcademyTrack {
  id: AcademyTrackId;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  accentClass: string;
  badgeClass: string;
}

export interface AcademyLesson {
  slug: string;
  trackId: AcademyTrackId;
  level: AcademyLevel;
  status: AcademyLessonStatus;
  estimatedMinutes: number;
  youtubeId?: string;
  publishedAt?: string;
  title: LocalizedText;
  summary: LocalizedText;
  outcomes: LocalizedList;
  chapters: LocalizedList;
  tags: string[];
  relatedBlogSlugs: string[];
}

export function getYouTubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export function getYouTubeThumbnailUrl(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    id: "local-ai",
    order: 1,
    title: {
      en: "Local & Applied AI",
      "pt-BR": "IA Local & Aplicada",
    },
    description: {
      en: "Zero-leakage private LLMs, Ollama + OpenCode agent harnesses, Qwen 3.5 / Qwen3-Coder routing, RagOn air-gapped RAG, and MemOn context governance.",
      "pt-BR":
        "LLMs privados sem vazamento, harnesses Ollama + OpenCode, roteamento Qwen 3.5 / Qwen3-Coder, RAG air-gapped RagOn e governança MemOn.",
    },
    accentClass: "text-emerald-600 dark:text-emerald-400",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
  },
  {
    id: "data-lakehouses",
    order: 2,
    title: {
      en: "Data & Lakehouses",
      "pt-BR": "Dados & Lakehouses",
    },
    description: {
      en: "Zero-cost dbt-core + BigQuery Medallion warehouses and petabyte-scale Apache Spark & Iceberg lakehouse engineering.",
      "pt-BR":
        "Medallion warehouses em dbt-core + BigQuery com custo zero e engenharia de lakehouses em escala com Apache Spark e Iceberg.",
    },
    accentClass: "text-sky-600 dark:text-sky-400",
    badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/25",
  },
  {
    id: "distributed-cloud",
    order: 3,
    title: {
      en: "Distributed Cloud",
      "pt-BR": "Nuvem Distribuída",
    },
    description: {
      en: "AWS Step Functions orchestration, KMS cryptographic tenant isolation, multi-cloud Edge SSR, and cloud FinOps.",
      "pt-BR":
        "Orquestração com AWS Step Functions, isolamento criptográfico KMS, Edge SSR multi-cloud e FinOps em nuvem.",
    },
    accentClass: "text-amber-600 dark:text-amber-400",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25",
  },
  {
    id: "fullstack-ventures",
    order: 4,
    title: {
      en: "Full-Stack & Aldeon Builds",
      "pt-BR": "Full-Stack & Produtos Aldeon",
    },
    description: {
      en: "Real-world product engineering behind SwanGo, HandSpeak 3D WebGL vision, Pack multimodal OCR, and Be Your Stories.",
      "pt-BR":
        "Engenharia real por trás de SwanGo, visão 3D WebGL no HandSpeak, OCR multimodal no Pack e Be Your Stories.",
    },
    accentClass: "text-purple-600 dark:text-purple-400",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25",
  },
];

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    slug: "local-ai-coding-ollama-opencode-qwen3",
    trackId: "local-ai",
    level: "intermediate",
    status: "upcoming",
    estimatedMinutes: 28,
    title: {
      en: "Local AI Coding Stack: Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder",
      "pt-BR": "Stack de IA Local para Código: Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder",
    },
    summary: {
      en: "End-to-end lab running OpenCode + Ollama locally on an RTX 3070 (8 GB VRAM), Ryzen 7 3700X, 32 GB DDR4-3600 & NVMe/HDD — 4-agent routing (qwen3.5:9b, qwen3.5-fast:9b, qwen3-coder:30b), systemd tuning, FinOps, and real limitations.",
      "pt-BR":
        "Laboratório completo rodando OpenCode + Ollama localmente em uma RTX 3070 (8 GB VRAM), Ryzen 7 3700X, 32 GB DDR4-3600 e NVMe/HDD — roteamento de 4 agentes (qwen3.5:9b, qwen3.5-fast:9b, qwen3-coder:30b), systemd, economia e limitações reais.",
    },
    outcomes: {
      en: [
        "Configure OpenCode's 4 agent roles (build, plan, explore, compaction) with auto-prune against Ollama's 127.0.0.1:11434/v1 API.",
        "Build a zero-extra-disk no-think Modelfile (qwen3.5-fast:9b) sharing qwen3.5:9b blobs alongside 48K hybrid MoE qwen3-coder:30b.",
        "Tune systemd overrides (OLLAMA_VULKAN=0, q8_0 KV, NUM_PARALLEL=1, KEEP_ALIVE=30m) for 8 GB VRAM and HDD/NVMe storage.",
        "Apply the 85/15 Hybrid FinOps split and sub-20KB MemOn context governance to maximize local velocity.",
      ],
      "pt-BR": [
        "Configurar os 4 agentes do OpenCode (build, plan, explore, compaction) com auto-prune via API local 127.0.0.1:11434/v1 do Ollama.",
        "Criar um Modelfile no-think sem gasto extra em disco (qwen3.5-fast:9b) ao lado do MoE híbrido 48K qwen3-coder:30b.",
        "Ajustar flags systemd (OLLAMA_VULKAN=0, KV q8_0, NUM_PARALLEL=1, KEEP_ALIVE=30m) para 8 GB VRAM e armazenamento HDD/NVMe.",
        "Aplicar a regra FinOps 85/15 e governança MemOn sub-20KB para economizar sem perder velocidade.",
      ],
    },
    chapters: {
      en: [
        "01. Real Workstation Baseline: RTX 3070 8 GB, Ryzen 7 3700X, 32 GB DDR4-3600 & NVMe/HDD (24 GB Store)",
        "02. Systemd Tuning: OLLAMA_VULKAN=0, Flash Attention, q8_0 KV, NUM_PARALLEL=1 & 30m Keep-Alive",
        "03. Zero-Duplicate qwen3.5-fast:9b Modelfile & 4-Agent opencode.json (build/plan/explore/compaction)",
        "04. Live Repo Refactor, TDD Loop & MemOn (<20KB) Context Guardrails",
        "05. FinOps Math ($3–6/mo Burst Power vs Cloud) & Honest VRAM/HDD Trade-Offs",
      ],
      "pt-BR": [
        "01. Hardware Real: RTX 3070 8 GB, Ryzen 7 3700X, 32 GB DDR4-3600 & NVMe/HDD (24 GB de Modelos)",
        "02. Ajuste Systemd: OLLAMA_VULKAN=0, Flash Attention, KV q8_0, NUM_PARALLEL=1 & Keep-Alive 30m",
        "03. Modelfile qwen3.5-fast:9b (0 B Extra) & 4 Agentes no opencode.json (build/plan/explore/compaction)",
        "04. Refatoração Ao Vivo, Loop TDD e Governança de Contexto MemOn (<20KB)",
        "05. Economia Real vs Cloud & Limitações Honestas de 8 GB VRAM e HDD",
      ],
    },
    tags: ["Ollama", "OpenCode", "Qwen 3.5", "Qwen3-Coder", "Hardware"],
    relatedBlogSlugs: ["local-ai-coding-stack-ollama-opencode-qwen3"],
  },
  {
    slug: "private-rag-onmemory-agent-governance",
    trackId: "local-ai",
    level: "advanced",
    status: "upcoming",
    estimatedMinutes: 26,
    title: {
      en: "RagOn & MemOn: Air-Gapped Zero-Leak RAG Studio & <20KB Agent Governance",
      "pt-BR": "RagOn & MemOn: Estúdio RAG Air-Gapped Zero-Leak & Governança <20KB",
    },
    summary: {
      en: "Build sub-2ms BM25 + 3-gram air-gapped RAG pipelines ($0 LLM cost) with FNV-1a client guardrails alongside deterministic MemOn (<20KB) agent governance.",
      "pt-BR":
        "Construa pipelines RAG air-gapped BM25 + 3-gramas em sub-2ms (custo $0) com guardrails FNV-1a e governança determinística de memória MemOn (<20KB).",
    },
    outcomes: {
      en: [
        "Implement 6-phase RagOn retrieval combining field-weighted BM25, 3-gram cosine, and strict grounding gates.",
        "Harden client-side fallback widgets using FNV-1a hashed guardrails and NFD diacritic normalization.",
        "Bootstrap projects in 1 second with init-rag-on.mjs and init-mem-on.mjs under strict <20KB zero-leak CI checks.",
      ],
      "pt-BR": [
        "Implementar o pipeline RagOn em 6 fases com BM25 ponderado, cosseno de 3-gramas e trava rígida de evidência.",
        "Blindar widgets client-side com guardrails FNV-1a e normalização Unicode NFD.",
        "Inicializar projetos com init-rag-on.mjs e init-mem-on.mjs sob auditorias CI zero-leak e teto <20KB.",
      ],
    },
    chapters: {
      en: [
        "01. Air-Gapped Typed Corpus & NFD Pre-Retrieval Guardrails",
        "02. Field-Weighted BM25 + 3-Gram Cosine & Strict Grounding Gate",
        "03. FNV-1a Hashed Client Guardrails & 7-File Cross-Stack CLI (init-rag-on.mjs)",
        "04. MemOn (<20KB) 4-Section Schema & Automated Zero-Leak CI Gates",
      ],
      "pt-BR": [
        "01. Corpus Tipado Air-Gapped & Guardrails NFD Pré-Recuperação",
        "02. BM25 Ponderado + Cosseno de 3-Gramas & Trava Rígida de Grounding",
        "03. Guardrails FNV-1a no Cliente & CLI Multi-Stack de 7 Arquivos (init-rag-on.mjs)",
        "04. Esquema MemOn (<20KB) & Auditorias Zero-Leak Automatizadas em CI",
      ],
    },
    tags: ["RagOn", "MemOn", "BM25", "Security", "Agents"],
    relatedBlogSlugs: [
      "ragon-air-gapped-zero-leak-rag-studio",
      "on-memory-deterministic-ai-engineering-governance",
      "mastering-gemini-models-in-antigravity-agy",
      "antigravity-agy-slash-commands-complete-guide",
      "enterprise-rag-with-local-llms",
    ],
  },
  {
    slug: "zero-cost-medallion-warehouse-dbt-bigquery",
    trackId: "data-lakehouses",
    level: "intermediate",
    status: "upcoming",
    estimatedMinutes: 30,
    title: {
      en: "Zero-Cost FinTech Medallion Warehouse with dbt-core & BigQuery",
      "pt-BR": "Medallion Warehouse FinTech a Custo Zero com dbt-core & BigQuery",
    },
    summary: {
      en: "Inside SwanGo's 20-table Bronze-Silver-Gold Medallion architecture indexing 1,076+ B3, CVM, BCB, and SEC EDGAR assets under BigQuery's free sandbox tiers.",
      "pt-BR":
        "Por dentro da arquitetura Medallion de 20 tabelas do SwanGo indexando 1.076+ ativos da B3, CVM, BCB e SEC EDGAR no tier gratuito do BigQuery.",
    },
    outcomes: {
      en: [
        "Design idempotent Bronze/Silver/Gold SQL models with dbt-core data quality tests.",
        "Sync curated Gold tables to a publish-gated Supabase hot cache for sub-50ms reads.",
        "Verify deterministic financial calculations (CDI NPV & DARF 6015) with zero mocks.",
      ],
      "pt-BR": [
        "Modelar camadas Bronze/Silver/Gold idempotentes com testes de qualidade no dbt-core.",
        "Sincronizar tabelas Gold para cache quente no Supabase com leitura em sub-50ms.",
        "Validar motores financeiros determinísticos (VPL vs. CDI e DARF 6015) sem dados fictícios.",
      ],
    },
    chapters: {
      en: [
        "01. Ingesting B3, CVM, BCB & SEC EDGAR Feeds Idempotently",
        "02. 20-Table dbt-core Medallion Lineage & Schema Assertions",
        "03. Publish-Gated Supabase Hot Cache & SHA-256 Workspaces",
        "04. Zero-Cost BigQuery FinOps Guardrails",
      ],
      "pt-BR": [
        "01. Ingestão Idempotente de Dados B3, CVM, BCB e SEC EDGAR",
        "02. Linhagem Medallion em 20 Tabelas no dbt-core e Testes",
        "03. Cache Quente no Supabase e Workspaces Verificáveis SHA-256",
        "04. Regras de FinOps para Manter o BigQuery a $0/mês",
      ],
    },
    tags: ["dbt-core", "BigQuery", "Medallion", "FinTech", "FinOps"],
    relatedBlogSlugs: ["architecting-swango-dbt-bigquery-medallion-b3-finance"],
  },
  {
    slug: "scaling-lakehouses-spark-iceberg",
    trackId: "data-lakehouses",
    level: "advanced",
    status: "upcoming",
    estimatedMinutes: 32,
    title: {
      en: "Scaling Petabyte Lakehouses with Apache Spark & Apache Iceberg",
      "pt-BR": "Escalando Lakehouses de Petabytes com Apache Spark & Apache Iceberg",
    },
    summary: {
      en: "Hidden partitioning, ACID snapshots, Z-Order compaction, and S3 I/O optimization strategies for high-throughput streaming and batch analytics.",
      "pt-BR":
        "Particionamento oculto, snapshots ACID, compactação Z-Order e otimização de I/O em S3 para pipelines batch e streaming em escala.",
    },
    outcomes: {
      en: [
        "Eliminate small-file overhead using Iceberg rewrite_data_files compaction schedules.",
        "Evolve table schemas and partition specs safely without full-table rewrites.",
        "Cut Spark shuffle and S3 GET/LIST costs on multi-terabyte joins.",
      ],
      "pt-BR": [
        "Eliminar o problema de small files com rotinas de compactação no Iceberg.",
        "Evoluir schemas e particionamento sem reprocessar tabelas inteiras.",
        "Reduzir custos de shuffle no Spark e chamadas GET/LIST no S3.",
      ],
    },
    chapters: {
      en: [
        "01. Why Hive-Style Partitions Break at Scale",
        "02. Iceberg Snapshot Isolation & Hidden Partition Evolution",
        "03. Compaction, Z-Ordering & Expired Snapshot Pruning",
        "04. FinOps Benchmarks for AWS Glue / EMR Jobs",
      ],
      "pt-BR": [
        "01. Por Que Partições Estilo Hive Travam em Larga Escala",
        "02. Isolamento de Snapshots & Evolução Oculta no Iceberg",
        "03. Compactação, Z-Ordering & Limpeza de Snapshots",
        "04. Benchmarks de FinOps para Jobs no AWS Glue / EMR",
      ],
    },
    tags: ["Apache Spark", "Apache Iceberg", "Lakehouse", "S3", "FinOps"],
    relatedBlogSlugs: ["scaling-lakehouses-spark-iceberg"],
  },
  {
    slug: "autonomous-workflows-aws-step-functions-kms",
    trackId: "distributed-cloud",
    level: "advanced",
    status: "upcoming",
    estimatedMinutes: 26,
    title: {
      en: "Autonomous Orchestration with AWS Step Functions & KMS Isolation",
      "pt-BR": "Orquestração Autônoma com AWS Step Functions & Isolamento KMS",
    },
    summary: {
      en: "Designing human-in-the-loop task tokens, cryptographic multi-tenant token isolation, and DynamoDB Streams sync in PostHub's 5-network publishing engine.",
      "pt-BR":
        "Projetando task tokens com aprovação humana, isolamento criptográfico via KMS e sincronização em tempo real com DynamoDB Streams no PostHub.",
    },
    outcomes: {
      en: [
        "Pause serverless workflows cleanly for 1-click approvals using Step Functions task tokens.",
        "Enforce per-tenant envelope encryption with AWS KMS before persisting OAuth tokens.",
        "Broadcast live state transitions over WebSockets via DynamoDB Streams.",
      ],
      "pt-BR": [
        "Pausar fluxos serverless para aprovação em 1 clique com task tokens do Step Functions.",
        "Aplicar criptografia envelope por tenant com AWS KMS para credenciais OAuth.",
        "Transmitir mudanças de estado via WebSocket usando DynamoDB Streams.",
      ],
    },
    chapters: {
      en: [
        "01. State Machine Topology & Wait-for-Task-Token Pattern",
        "02. AWS KMS Envelope Encryption & Zero-Trust Secret Handling",
        "03. ProseMirror AST Conversion for Substack Publishing",
        "04. Event-Driven WebSocket Updates via DynamoDB Streams",
      ],
      "pt-BR": [
        "01. Topologia da Máquina de Estados & Padrão Wait-for-Task-Token",
        "02. Criptografia Envelope AWS KMS & Segurança Zero-Trust",
        "03. Conversão ProseMirror AST para Publicação no Substack",
        "04. Atualizações WebSocket Orientadas a Eventos via DynamoDB Streams",
      ],
    },
    tags: ["AWS Step Functions", "KMS", "Serverless", "DynamoDB", "PostHub"],
    relatedBlogSlugs: ["autonomous-publishing-posthub-step-functions"],
  },
  {
    slug: "edge-ssr-multi-cloud-aldeon-architecture",
    trackId: "distributed-cloud",
    level: "intermediate",
    status: "upcoming",
    estimatedMinutes: 22,
    title: {
      en: "Unified Edge SSR & Domain-Sliced Multi-Cloud Architecture on Aldeon",
      "pt-BR": "Edge SSR Unificado & Arquitetura Multi-Cloud Fatiada por Domínio na Aldeon",
    },
    summary: {
      en: "How a single React Router SSR portal in gru1 orchestrates 8 autonomous products using TypeScript 7, Biome, AST-verified i18n parity, and strict gzip route budgets.",
      "pt-BR":
        "Como um único portal React Router SSR em gru1 orquestra 8 produtos autônomos com TypeScript 7, Biome, paridade i18n por AST e orçamentos estritos de bundle.",
    },
    outcomes: {
      en: [
        "Slice monolith portals into isolated domain modules without micro-frontend runtime tax.",
        "Verify 100% EN/PT-BR dictionary parity at build time using oxc-parser AST checks.",
        "Enforce TypeScript 7, Biome linting, bun:test SSR safety, and strict gzip route budgets in CI.",
      ],
      "pt-BR": [
        "Fatiar portais em módulos de domínio isolados sem custo de micro-frontends em runtime.",
        "Verificar paridade total EN/PT-BR em build time via análise AST.",
        "Aplicar TypeScript 7, Biome, testes SSR em bun:test e orçamentos estritos de bundle no CI.",
      ],
    },
    chapters: {
      en: [
        "01. Domain-Sliced Routing Across 8 Independent Products",
        "02. Edge SSR Execution in gru1 & Multi-Cloud Backend Boundaries",
        "03. TypeScript 7, Biome & AST-Verified Zero-Hardcode Bilingual i18n",
        "04. Automated verify:ssr & perf:budget:strict Gates",
      ],
      "pt-BR": [
        "01. Roteamento Fatiado por Domínio para 8 Produtos Independentes",
        "02. Edge SSR em gru1 & Fronteiras de Backend Multi-Cloud",
        "03. TypeScript 7, Biome & i18n Bilíngue Verificado por AST",
        "04. Portões Automatizados verify:ssr & perf:budget:strict",
      ],
    },
    tags: ["Edge SSR", "React Router", "Multi-Cloud", "Architecture", "Aldeon"],
    relatedBlogSlugs: ["aldeon-unified-edge-ssr-multi-cloud-ecosystem"],
  },
  {
    slug: "realtime-3d-vision-handspeak-mediapipe-webgl",
    trackId: "fullstack-ventures",
    level: "advanced",
    status: "upcoming",
    estimatedMinutes: 28,
    title: {
      en: "60 FPS On-Device 3D Vision & WebGL Sign Language Tutoring in HandSpeak",
      "pt-BR": "Visão 3D On-Device a 60 FPS & Tutor WebGL de Libras no HandSpeak",
    },
    summary: {
      en: "Running MediaPipe WASM landmark tracking, 57+ pose Three.js WebGL hand rigs, and encrypted PeerJS WebRTC video calls at $0 AI server cost.",
      "pt-BR":
        "Executando MediaPipe WASM, tutor anatômico Three.js WebGL com 57+ poses e chamadas PeerJS WebRTC criptografadas a $0 de custo de IA.",
    },
    outcomes: {
      en: [
        "Extract 21-point 3D hand landmarks at 60 FPS inside the browser via MediaPipe WASM.",
        "Eliminate AI inference bills by running Camera Practice Mode 100% client-side.",
        "Combine Three.js anatomical hand poses with PeerJS WebRTC accessible video calls.",
      ],
      "pt-BR": [
        "Extrair 21 pontos 3D da mão a 60 FPS no navegador via MediaPipe WASM.",
        "Zerar custos de inferência rodando o Modo Prática 100% no dispositivo do usuário.",
        "Integrar poses anatômicas Three.js com chamadas P2P criptografadas via PeerJS WebRTC.",
      ],
    },
    chapters: {
      en: [
        "01. Zero-Server-Cost Browser Vision with MediaPipe WASM",
        "02. A–Z Datilology & Phonetic Levenshtein Disambiguation",
        "03. 57+ Pose Three.js WebGL Anatomical Hand Rigging",
        "04. Encrypted PeerJS WebRTC Video Calls & Trust Moderation",
      ],
      "pt-BR": [
        "01. Visão Computacional Zero-Custo no Navegador com MediaPipe WASM",
        "02. Datilologia A–Z & Desambiguação Fonética Levenshtein",
        "03. Rigging Anatômico 3D em Three.js/WebGL com 57+ Poses",
        "04. Videochamadas PeerJS WebRTC Criptografadas & Moderação",
      ],
    },
    tags: ["MediaPipe", "Three.js", "WebGL", "WebRTC", "Accessibility"],
    relatedBlogSlugs: ["engineering-handspeak-3d-libras-ai"],
  },
  {
    slug: "offline-first-mobile-ocr-pack-bys",
    trackId: "fullstack-ventures",
    level: "foundations",
    status: "upcoming",
    estimatedMinutes: 25,
    title: {
      en: "Offline-First Mobile Apps & Sub-1.2s Multimodal OCR (Pack & BYS)",
      "pt-BR": "Apps Mobile Offline-First & OCR Multimodal em Sub-1.2s (Pack & BYS)",
    },
    summary: {
      en: "Production patterns from Pack and Be Your Stories: Legend-State v3 local-first sync, Gemini Flash multimodal extraction, Meilisearch sub-15ms discovery, and App Store shipping.",
      "pt-BR":
        "Padrões de produção do Pack e Be Your Stories: sincronização local-first Legend-State v3, OCR multimodal com Gemini Flash, Meilisearch em sub-15ms e publicação mobile.",
    },
    outcomes: {
      en: [
        "Design resilient local-first React Native Expo workflows with Legend-State v3.",
        "Parse noisy parcel labels in under 1.2 seconds using structured multimodal OCR.",
        "Pair sub-15ms Meilisearch indexing with serverless AWS Polly audio generation.",
      ],
      "pt-BR": [
        "Projetar fluxos React Native Expo resilientes e offline-first com Legend-State v3.",
        "Extrair dados de etiquetas de encomendas em sub-1.2s via OCR multimodal estruturado.",
        "Integrar busca Meilisearch em sub-15ms e audiolivros serverless com AWS Polly.",
      ],
    },
    chapters: {
      en: [
        "01. Local-First Reactivity & Offline Sync Queues",
        "02. Sub-1.2s Multimodal OCR Label Parsing in Pack",
        "03. Sub-15ms Meilisearch & AWS Polly Audio Pipeline in BYS",
        "04. Shipping Production Builds to Apple App Store & Google Play",
      ],
      "pt-BR": [
        "01. Reatividade Local-First & Filas de Sincronização Offline",
        "02. Leitura OCR Multimodal de Encomendas em Sub-1.2s no Pack",
        "03. Busca Meilisearch Sub-15ms & Áudio AWS Polly no BYS",
        "04. Publicação em Produção na Apple App Store & Google Play",
      ],
    },
    tags: ["React Native", "Multimodal OCR", "Meilisearch", "Offline-First", "Mobile"],
    relatedBlogSlugs: ["architecting-pack-multimodal-ocr-logistics", "building-be-your-stories"],
  },
];

export function getAcademyTracks(): AcademyTrack[] {
  return ACADEMY_TRACKS;
}

export function getTrackById(id: AcademyTrackId): AcademyTrack | undefined {
  return ACADEMY_TRACKS.find((t) => t.id === id);
}

export function getAllLessons(): AcademyLesson[] {
  return ACADEMY_LESSONS;
}

export function getLessonBySlug(slug: string): AcademyLesson | undefined {
  return ACADEMY_LESSONS.find((lesson) => lesson.slug === slug);
}

export function getLessonsByTrack(trackId: AcademyTrackId): AcademyLesson[] {
  return ACADEMY_LESSONS.filter((lesson) => lesson.trackId === trackId);
}

export function getFeaturedLessons(limit = 3): AcademyLesson[] {
  return ACADEMY_LESSONS.slice(0, limit);
}
