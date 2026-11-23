export type SupportedLocale = "en" | "pt-BR";

export type Dictionary = {
  nav: {
    home: string;
    ecosystem: string;
    capabilities: string;
    blog: string;
    about: string;
    contact: string;
    primary: string;
    toggleLanguage: string;
    switchLanguage: string;
  };
  hero: {
    title: string;
    role: string;
    tagline: string;
    bio: string;
    ctaEcosystem: string;
    ctaBlog: string;
    ctaContact: string;
  };
  ui: {
    openMenu: string;
    closeMenu: string;
    copied: string;
    skipToMain: string;
    copyCode: string;
    codeCopied: string;
    linkToSection: string;
  };
  ecosystem: {
    heading: string;
    subheading: string;
    aldeonTitle: string;
    aldeonTagline: string;
    aldeonDescription: string;
    visitAldeon: string;
    architectureDeepDive: string;
    productsHeading: string;
    platformBadge: string;
    fintechBadge: string;
    consumerBadge: string;
    logisticsBadge: string;
    creativeBadge: string;
    marketingBadge: string;
    accessibilityBadge: string;
    governanceBadge: string;
    openSourceBadge: string;
    cloudInfraBadge: string;
    swangoTitle: string;
    swangoTagline: string;
    swangoDescription: string;
    onmemoryTitle: string;
    onmemoryTagline: string;
    onmemoryDescription: string;
    bysTitle: string;
    bysTagline: string;
    bysDescription: string;
    webApp: string;
    iosApp: string;
    androidBetaApp: string;
    simulatorApp: string;
    academyApp: string;
    stackComposerApp: string;
    deepDive: string;
    packTitle: string;
    packTagline: string;
    packDescription: string;
    tatuTitle: string;
    tatuTagline: string;
    tatuDescription: string;
    postsTitle: string;
    postsTagline: string;
    postsDescription: string;
    handspeakTitle: string;
    handspeakTagline: string;
    handspeakDescription: string;
    appBuilderTitle: string;
    appBuilderTagline: string;
    appBuilderDescription: string;
    cdkFactoryTitle: string;
    cdkFactoryTagline: string;
    cdkFactoryDescription: string;
    viewNpm: string;
    viewRepo: string;
  };
  capabilities: {
    badge: string;
    heading: string;
    subheading: string;
    items: Array<{
      title: string;
      description: string;
      tags: string[];
    }>;
  };
  latestInsights: {
    heading: string;
    subheading: string;
    viewAll: string;
    readArticle: string;
  };
  blog: {
    title: string;
    subtitle: string;
    knowledgeHub: string;
    searchPlaceholder: string;
    filterAll: string;
    filterAllSources: string;
    filterBlueprints: string;
    filterSubstack: string;
    readTime: string;
    backToBlog: string;
    share: string;
    shareOnX: string;
    shareOnLinkedIn: string;
    shareArticle: string;
    copyLink: string;
    noPostsFound: string;
    substackBanner: string;
    substackText: string;
    substackCta: string;
    substackPublication: string;
    words: string;
    tableOfContents: string;
    keySections: string;
    sourceBlueprint: string;
    sourceSubstack: string;
    blueprintBadge: string;
    substackBadge: string;
    readingProgress: string;
    originallyPublished: string;
    readOnSubstack: string;
    openOnSubstack: string;
    authorRole: string;
    authorBio: string;
    relatedTitle: string;
    viewAllCount: string;
    read: string;
    aboutLink: string;
    clearSearch: string;
    resetFilters: string;
  };
  about: {
    heading: string;
    missionParagraphs: string[];
    buildingTitle: string;
    buildingList: string[];
    principlesTitle: string;
    principles: Array<{
      title: string;
      desc: string;
    }>;
    socialsTitle: string;
    socialsText: string;
  };
  contact: {
    heading: string;
    subheading: string;
    directNetwork: string;
    emailAddress: string;
    linkedIn: string;
    gitHub: string;
    youTube: string;
    xTwitter: string;
    substack: string;
  };
  footer: {
    rights: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundText: string;
    errorTitle: string;
    errorText: string;
    unknownError: string;
    backHome: string;
    stackTrace: string;
  };
};

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      ecosystem: "Aldeon Ecosystem",
      capabilities: "Capabilities",
      blog: "Blog",
      about: "About",
      contact: "Let's Talk",
      primary: "Primary navigation",
      toggleLanguage: "Toggle language",
      switchLanguage: "Switch language between English and Portuguese",
    },
    hero: {
      title: "Célio Vieira",
      role: "Founder, AI & Data Engineer",
      tagline: "Architecting AI Systems, Lakehouses & Distributed Cloud Engines",
      bio: "Engineering applied AI pipelines, agents project architecture, and lakehouse architectures — powered by deep foundations in Distributed System Architecture and FullStack Product Engineering.",
      ctaEcosystem: "Explore Aldeon Ecosystem",
      ctaBlog: "Read Discoveries",
      ctaContact: "Get in Touch",
    },
    ui: {
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      copied: "Copied!",
      skipToMain: "Skip to main content",
      copyCode: "Copy code",
      codeCopied: "Copied!",
      linkToSection: "Link to section",
    },
    ecosystem: {
      heading: "The Aldeon Ecosystem",
      subheading:
        "Aldeon (aldeon.app) is my venture engineered to build, launch, and operate autonomous digital products, consumer mobile apps, and applied AI engines.",
      aldeonTitle: "Aldeon Venture Studio",
      aldeonTagline: "Autonomous Multi-Product Venture Ecosystem & Applied AI Studio",
      aldeonDescription:
        "Serving as the central web platform, orchestration layer, and consolidated host for 7 autonomous products, AI-driven automation, and multi-cloud backends.",
      visitAldeon: "Visit aldeon.app",
      architectureDeepDive: "Architecture Deep-Dive",
      productsHeading: "Active Ventures & Child Applications",
      platformBadge: "Platform",
      fintechBadge: "FinTech & Medallion Data Warehouse",
      consumerBadge: "Live Consumer App",
      logisticsBadge: "Logistics & PropTech",
      creativeBadge: "Creative AI & AR Studio",
      marketingBadge: "Marketing Automation & AI",
      accessibilityBadge: "Accessibility & 3D Vision AI",
      governanceBadge: "AI Engineering & Dev Governance",
      openSourceBadge: "Open-Source Tool",
      cloudInfraBadge: "Cloud Infrastructure",
      swangoTitle: "SwanGo",
      swangoTagline:
        "B3 market intelligence, $0/mo dbt + BigQuery Medallion warehouse, 5 quant engines & financial academy.",
      swangoDescription:
        'Zero-mock financial control and collaborative trade decision platform indexing 1,076+ B3, CVM, BCB, Crypto, and SEC EDGAR assets via a 20-table dbt-core + BigQuery Medallion warehouse, publish-gated Supabase hot cache, deterministic "Can I Buy?" CDI NPV and DARF 6015 calculators, SHA-256 verifiable shared workspaces, a 6-Stage Interactive Simulator, and a 4-track bilingual Financial Academy.',
      onmemoryTitle: "OnMemory (on-memory)",
      onmemoryTagline:
        "Reusable AI engineering memory governance, project bootstrapper CLI & client-side <20KB linter.",
      onmemoryDescription:
        "Open developer governance protocol and portable zero-dependency CLI (init-on-memory.mjs) that bootstraps new software products with locked stack boundaries and 5-field anti-pattern guardrails while auditing existing repositories under a strict <20KB zero-leak memory ceiling (-83.6% token overhead).",
      bysTitle: "Be Your Stories (BYS)",
      bysTagline: "Cross-platform storytelling & reading platform on Web, iOS, and Android.",
      bysDescription:
        "Digital publishing ecosystem engineered with offline-first local synchronization, sub-15ms Meilisearch indexing, AWS Polly audiobook narration, and multi-platform apps live on App Store & Google Play.",
      webApp: "Web Application",
      iosApp: "App Store (iOS)",
      androidBetaApp: "Google Play (Beta)",
      simulatorApp: "6-Stage Simulator",
      academyApp: "Academy",
      stackComposerApp: "Stack Composer & Linter",
      deepDive: "Deep-Dive",
      packTitle: "Pack",
      packTagline:
        "Mailroom automation & sub-1.2s multimodal OCR delivery control for residential communities.",
      packDescription:
        "Condominium mailroom logistics app featuring sub-1.2s Gemini 2.5 Flash OCR parsing (99.4% accuracy), Legend-State v3 local-first reactivity, dynamic QR/PIN handover, and automated 48h EventBridge dwell-time reminders.",
      tatuTitle: "TATU Design",
      tatuTagline: "AI tattoo stencil studio, 60 FPS AR skin projection & thermal export engine.",
      tatuDescription:
        "Design studio app empowering tattoo artists with multi-style AI stencil generation (line-art, blackwork, fine-line), 60 FPS AR camera skin-lock projection, and 1080p thermal PNG export.",
      postsTitle: "PostHub",
      postsTagline: "Autonomous 5-platform content publishing & multi-channel syndication engine.",
      postsDescription:
        "Serverless distribution pipeline automating content syndication across LinkedIn, X, Substack, Facebook, and Instagram with AWS Step Functions state machines and 1-click approvals.",
      handspeakTitle: "HandSpeak",
      handspeakTagline:
        "Real-time 60 FPS 3D Libras translation, WebGL sign tutor & P2P video calls.",
      handspeakDescription:
        "Accessible communication platform featuring 60 FPS MediaPipe 3D hand tracking, full A–Z datilology with phonetic Levenshtein disambiguation, a 57+ pose Three.js WebGL anatomical tutor, Camera Practice Mode with 100% on-device local execution ($0 server/AI cost), a 5-track Bilingual Libras Academy, encrypted PeerJS WebRTC video calls with live captions, and dual-layer Trust & Safety moderation on GCP Cloud Run.",
      appBuilderTitle: "NodeJS App Builder",
      appBuilderTagline: "Microservices CLI generator & clean architecture template on npm.",
      appBuilderDescription:
        "Developer productivity tool downloaded on npm to scaffold production-ready Node.js APIs with clean architecture, strict linting, Docker orchestration, and automated CI test suites.",
      cdkFactoryTitle: "AWS CDK Factory",
      cdkFactoryTagline: "Infrastructure as Code framework for automated landing zones.",
      cdkFactoryDescription:
        "Modular AWS CDK constructs and deployment pipelines automating multi-account cloud topologies, lakehouses, and container clusters with enterprise guardrails.",
      viewNpm: "View Package",
      viewRepo: "Source Code",
    },
    capabilities: {
      badge: "Technical Pillars",
      heading: "AI & Data Engineering Pillars",
      subheading:
        "Where applied AI and data systems meet robust system architecture and full-stack execution.",
      items: [
        {
          title: "Applied AI & Private LLM Systems",
          description:
            "Architecting zero-leakage enterprise RAG pipelines, local quantized model hosting (Ollama, HuggingFace), hybrid vector search, deterministic agent memory protocols (OnMemory), and autonomous multi-step agentic workflows.",
          tags: [
            "RAG Pipelines",
            "Multimodal Vision/OCR",
            "Local LLMs (Ollama)",
            "OnMemory Governance (<20KB)",
            "HuggingFace",
            "Vector DBs",
            "AI Guardrails",
            "Agentic Loops",
          ],
        },
        {
          title: "Lakehouses & Data Engineering",
          description:
            "Designing high-throughput streaming and batch lakehouses and Medallion warehouses (dbt-core, BigQuery) handling billions of events with ACID transactions, partition evolution, and S3 cost optimization using Spark and Iceberg.",
          tags: [
            "Apache Spark",
            "Apache Iceberg",
            "dbt-core",
            "BigQuery Medallion",
            "Kafka",
            "Airflow",
            "AWS Glue",
            "Athena",
          ],
        },
        {
          title: "Distributed System Architecture",
          description:
            "Building resilient event-driven architectures, domain-driven design (DDD), deterministic quantitative engines, KMS envelope tenant isolation, automated landing zones, and cloud FinOps governance.",
          tags: [
            "System Design",
            "Event-Driven",
            "Quantitative Engines",
            "AWS Step Functions",
            "GCP Cloud Run",
            "Terraform IaC",
            "KMS Envelope Isolation",
            "FinOps",
          ],
        },
        {
          title: "Full-Stack Product Engineering",
          description:
            "End-to-end software delivery from customer validation to high-velocity MVP and scaled multi-platform systems across Web, iOS, and Android with 60 FPS WebGL/AR, AST-verified zero-hardcode i18n, strict SSR route budgets, and edge SSR.",
          tags: [
            "React 19",
            "React Router SSR",
            "React Native (Expo 57)",
            "TypeScript",
            "Three.js / WebGL",
            "WebRTC P2P",
            "Tailwind CSS",
          ],
        },
      ],
    },
    latestInsights: {
      heading: "Discoveries & Knowledge",
      subheading:
        "Architectural blueprints, AI experiments, and lessons from building scalable systems.",
      viewAll: "View All Articles",
      readArticle: "Read Article",
    },
    blog: {
      title: "Knowledge Hub & Discoveries",
      subtitle:
        "Practical engineering blueprints, architectural decisions, and product experiments from the field.",
      knowledgeHub: "Knowledge Hub",
      searchPlaceholder: "Search {count} articles by topic, architecture, or keywords...",
      filterAll: "All Topics",
      filterAllSources: "All Articles",
      filterBlueprints: "Engineering Blueprints",
      filterSubstack: "Substack Dispatches",
      readTime: "min read",
      backToBlog: "Back to Articles",
      share: "Share",
      shareOnX: "Share on X",
      shareOnLinkedIn: "Share on LinkedIn",
      shareArticle: "Share article",
      copyLink: "Copy Link",
      noPostsFound: "No articles found matching your criteria.",
      substackBanner: "Weekly AI & Data Engineering Dispatches",
      substackText:
        "Join my Substack publication for in-depth technical breakdowns, applied AI architectures, and venture building insights.",
      substackCta: "Read & Subscribe on Substack",
      substackPublication: "Substack Publication",
      words: "words",
      tableOfContents: "Table of Contents",
      keySections: "Key Sections",
      sourceBlueprint: "Blueprint",
      sourceSubstack: "Substack",
      blueprintBadge: "Engineering Blueprint",
      substackBadge: "Substack Dispatch",
      readingProgress: "Reading Progress",
      originallyPublished: "Originally published on Substack",
      readOnSubstack: "Read on Substack",
      openOnSubstack: "Open original on Substack",
      authorRole: "Founder & Architect",
      authorBio:
        "Engineering applied AI systems, distributed cloud platforms, and the Aldeon umbrella venture ecosystem.",
      relatedTitle: "Related Technical Dispatches",
      viewAllCount: "View all {count}",
      read: "Read",
      aboutLink: "About",
      clearSearch: "Clear",
      resetFilters: "Reset filters",
    },
    about: {
      heading: "About Célio Vieira",
      missionParagraphs: [
        "I build at the intersection of applied artificial intelligence, petabyte-scale data engineering, and commercial venture creation. As a Founder, AI & Data Engineer, my focus is turning deep technical systems into resilient, high-impact digital products. Rather than treating emerging technology as speculative demos, I approach engineering from first principles—crafting architectures that scale seamlessly under production workloads while driving real business momentum.",
        "My engineering foundation is rooted in formal computer engineering and a postgraduate specialization in Cloud Computing Process & Architecture. Over years of hands-on architecture, I have engineered mission-critical distributed systems—from event-driven hexagonal microservices running on AWS serverless backends (Lambda, SQS, EventBridge, DynamoDB) to petabyte-scale lakehouse platforms leveraging Apache Spark, Apache Iceberg, Glue, EMR, and Airflow. I specialize in designing streaming and batch data engines that guarantee ACID transactions, partition evolution, and FinOps cost efficiency without compromising throughput.",
        "In the AI domain, my work centers on high-precision Applied AI and private, zero-leakage infrastructure. I design retrieval-augmented generation (RAG) pipelines with hybrid vector search, prompt graph reasoning topologies, and autonomous task-oriented agents. On self-hosted servers, I actively experiment with model quantizations, fine-tuning, and inference pipelines utilizing Ollama, HuggingFace, and ComfyUI—delivering secure, local intelligence that protects data sovereignty while maximizing speed and accuracy.",
        "Bridging systems architecture with modern full-stack product engineering (TypeScript, React 19, React Native Expo, Node.js, Go, Python), I take complete end-to-end ownership from system design to production scale. This multi-disciplinary capability is the engine behind Aldeon (aldeon.app)—my venture umbrella operating 7 live products: SwanGo, OnMemory, HandSpeak, Be Your Stories, Pack, TATU Design, and PostHub, alongside open-source developer tooling.",
      ],
      buildingTitle: "What I'm Building Now",
      buildingList: [
        "Expanding Aldeon (aldeon.app) as a consolidated 7-product Edge SSR platform in gru1 with domain-sliced architecture, AST-verified bilingual i18n, and strict route bundle budgets.",
        "Operating SwanGo (aldeon.app/swango) with a $0/mo dbt-core + BigQuery 20-table Medallion warehouse indexing 1,076+ B3/CVM/BCB assets, 5 quantitative trade engines, SHA-256 shared workspaces & 4-track Financial Academy.",
        "Advancing OnMemory (aldeon.app/on-memory) as a reusable 3-phase AI agent memory governance protocol with an interactive stack composer, client-side <20KB linter & 5-field anti-pattern registry.",
        "Scaling HandSpeak (aldeon.app/handspeak) with 60 FPS 3D Libras vision, 57+ pose WebGL anatomical tutor, Camera Practice Mode, P2P WebRTC video calls & 5-track Bilingual Libras Academy.",
        "Growing Be Your Stories across Web, iOS, and Android with sub-15ms Meilisearch discovery, dual-stack IPv6 Edge proxy resilience, and serverless AWS Polly audiobooks.",
        "Operating condominium mailroom logistics with Pack featuring sub-1.2s Gemini Flash OCR, Legend-State v3 local-first reactivity, and dynamic QR/PIN handover.",
        "Powering TATU Design 60 FPS 2D Affine Cylinder AR stencil studio and PostHub 5-network AWS Step Functions publishing engine with KMS cryptographic tenant isolation.",
        "Engineering zero-leakage private RAG frameworks, local LLM agents (Ollama, HuggingFace, ComfyUI), and petabyte Apache Spark / Iceberg lakehouses.",
      ],
      principlesTitle: "Operating Principles",
      principles: [
        {
          title: "AI & Data as Core Multipliers",
          desc: "Harness modern AI models and resilient lakehouses to solve real-world bottlenecks, not as speculative tech demos.",
        },
        {
          title: "Speed with Architectural Rigor",
          desc: "Iterate with startup agility while enforcing robust typing, modular domain boundaries, and thorough automated testing.",
        },
        {
          title: "First-Principles Problem Solving",
          desc: "Strip away accidental complexity, challenge default assumptions, and architect direct, sustainable solutions.",
        },
        {
          title: "End-to-End Ownership",
          desc: "Taking complete accountability from system design and model evaluation to deployment, monitoring, and commercial scaling.",
        },
      ],
      socialsTitle: "Connect & Inquire",
      socialsText:
        "Open for venture collaborations, technical exchanges, and building innovative software.",
    },
    contact: {
      heading: "Let's Build Something Exceptional",
      subheading:
        "Interested in exchanging technical ideas, exploring venture collaborations, or building ambitious software? Connect directly.",
      directNetwork: "Direct Network",
      emailAddress: "contact@celiovieira.com",
      linkedIn: "LinkedIn",
      gitHub: "GitHub Projects",
      youTube: "YouTube Channel",
      xTwitter: "X / Twitter (@celio1878)",
      substack: "Substack (@celio1878)",
    },
    footer: {
      rights: "All rights reserved.",
    },
    errors: {
      notFoundTitle: "Page Not Found",
      notFoundText: "The page you are looking for doesn't exist or has been moved.",
      errorTitle: "Something Went Wrong",
      errorText: "An unexpected error occurred while rendering this page.",
      unknownError: "Unknown Error",
      backHome: "Back to Home",
      stackTrace: "Stack trace (development only):",
    },
  },
  "pt-BR": {
    nav: {
      home: "Início",
      ecosystem: "Ecossistema Aldeon",
      capabilities: "Capacidades",
      blog: "Blog",
      about: "Sobre Mim",
      contact: "Vamos Conversar",
      primary: "Navegação principal",
      toggleLanguage: "Alternar idioma",
      switchLanguage: "Alternar idioma entre inglês e português",
    },
    hero: {
      title: "Célio Vieira",
      role: "Founder, Engenheiro de IA & Dados",
      tagline: "Arquitetando Sistemas de IA, Lakehouses & Plataformas em Nuvem",
      bio: "Engenharia de pipelines de IA aplicada, arquitetura de projetos de agentes e arquiteturas de lakehouse — impulsionadas por bases sólidas em Arquitetura de Sistemas Distribuídos e Engenharia de Produtos FullStack.",
      ctaEcosystem: "Conhecer Ecossistema Aldeon",
      ctaBlog: "Ler Artigos & Descobertas",
      ctaContact: "Entrar em Contato",
    },
    ui: {
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
      copied: "Copiado!",
      skipToMain: "Pular para o conteúdo principal",
      copyCode: "Copiar código",
      codeCopied: "Copiado!",
      linkToSection: "Link para a seção",
    },
    ecosystem: {
      heading: "O Ecossistema Aldeon",
      subheading:
        "A Aldeon (aldeon.app) é meu ecossistema tecnológico e estúdio de IA projetado para criar, lançar e operar produtos digitais autônomos, aplicativos e microsserviços.",
      aldeonTitle: "Aldeon Venture Studio",
      aldeonTagline: "Ecossistema Autônomo de Produtos & Estúdio de IA Aplicada",
      aldeonDescription:
        "Atuando como a plataforma web central, camada de orquestração e ambiente consolidado para 7 produtos autônomos, automações inteligentes e infraestrutura em nuvem.",
      visitAldeon: "Acessar aldeon.app",
      architectureDeepDive: "Arquitetura em Detalhes",
      productsHeading: "Projetos Ativos & Aplicativos do Ecossistema",
      platformBadge: "Plataforma",
      fintechBadge: "FinTech & Data Warehouse Medallion",
      consumerBadge: "App de Consumo no Ar",
      logisticsBadge: "Logística & PropTech",
      creativeBadge: "Estúdio de IA Criativa & AR",
      marketingBadge: "Automação de Marketing & IA",
      accessibilityBadge: "Acessibilidade & IA de Visão 3D",
      governanceBadge: "Engenharia de IA & Governança Dev",
      openSourceBadge: "Ferramenta Open-Source",
      cloudInfraBadge: "Infraestrutura em Nuvem",
      swangoTitle: "SwanGo",
      swangoTagline:
        "Inteligência de mercado B3, Medallion warehouse dbt + BigQuery, 5 motores quantitativos e academia financeira.",
      swangoDescription:
        'Plataforma de controle financeiro e decisão colaborativa sem dados fictícios, indexando 1.076+ ativos da B3, CVM, BCB, Cripto e SEC EDGAR em um Medallion warehouse de 20 tabelas com dbt-core + BigQuery, cache quente no Supabase, motores determinísticos "Posso Comprar?" (VPL vs. CDI) e DARF 6015, workspaces compartilhados verificáveis via SHA-256, Simulador Interativo de 6 Etapas e Academia Financeira bilíngue.',
      onmemoryTitle: "OnMemory (on-memory)",
      onmemoryTagline:
        "Governança reutilizável de memória para engenharia de IA, CLI bootstrapper e linter client-side <20KB.",
      onmemoryDescription:
        "Protocolo aberto de governança para agentes de IA e CLI portátil sem dependências (init-on-memory.mjs) que inicializa novos produtos com fronteiras de stack travadas e registro de anti-padrões em 5 campos, auditando repositórios sob um teto estrito de <20KB sem vazamento de segredos (-83,6% de consumo de tokens).",
      bysTitle: "Be Your Stories (BYS)",
      bysTagline: "Ecossistema multiplataforma de leitura e publicação na Web, iOS e Android.",
      bysDescription:
        "Plataforma digital para leitores e autores com sincronização offline-first, busca Meilisearch em sub-15ms, narração de audiolivros via AWS Polly e aplicativos publicados na App Store e Google Play.",
      webApp: "Aplicação Web",
      iosApp: "App Store (iOS)",
      androidBetaApp: "Google Play (Beta)",
      simulatorApp: "Simulador 6 Etapas",
      academyApp: "Academia",
      stackComposerApp: "Stack Composer & Linter",
      deepDive: "Artigo Técnico",
      packTitle: "Pack",
      packTagline: "Automação de portaria & triagem de encomendas com OCR multimodal em sub-1.2s.",
      packDescription:
        "Solução logística para condomínios com extração OCR por IA via Gemini 2.5 Flash em sub-1.2s (99,4% de precisão), reatividade local-first com Legend-State v3, retirada via QR/PIN e lembretes de retenção via EventBridge.",
      tatuTitle: "TATU Design",
      tatuTagline:
        "Estúdio de decalques por IA, projeção AR na pele a 60 FPS e exportação térmica.",
      tatuDescription:
        "Aplicativo profissional para tatuadores com geração de stencils multi-estilo (line-art, blackwork, fine-line), projeção anatômica em realidade aumentada a 60 FPS na câmera e exportação térmica em 1080p.",
      postsTitle: "PostHub",
      postsTagline: "Motor autônomo de publicação e distribuição de conteúdo para 5 redes sociais.",
      postsDescription:
        "Esteira serverless automatizando a distribuição de conteúdo no LinkedIn, X, Substack, Facebook e Instagram com máquinas de estado no AWS Step Functions e aprovações em 1 clique.",
      handspeakTitle: "HandSpeak",
      handspeakTagline:
        "Tradução de Libras 3D a 60 FPS em tempo real, tutor WebGL e chamadas de vídeo P2P.",
      handspeakDescription:
        "Plataforma de comunicação acessível com rastreamento 3D de mãos a 60 FPS via MediaPipe, datilologia A–Z completa com desambiguação fonética Levenshtein, tutor anatômico 3D em Three.js/WebGL com 57+ poses, Modo Prática na câmera 100% local no dispositivo ($0 de custo de servidor/IA), Academia Bilíngue de Libras em 5 trilhas, chamadas P2P WebRTC criptografadas e moderação Trust & Safety no GCP Cloud Run.",
      appBuilderTitle: "NodeJS App Builder",
      appBuilderTagline: "Gerador de microsserviços CLI e arquitetura limpa publicado no npm.",
      appBuilderDescription:
        "Ferramenta de produtividade para criar APIs em Node.js com arquitetura limpa, linters rigorosos, Docker e testes automatizados de CI.",
      cdkFactoryTitle: "AWS CDK Factory",
      cdkFactoryTagline: "Framework de infraestrutura como código para landing zones na AWS.",
      cdkFactoryDescription:
        "Constructs modulares de AWS CDK e esteiras de deploy automatizando topologias multicontas, data lakes e clusters de contêineres com governança.",
      viewNpm: "Ver Pacote no NPM",
      viewRepo: "Código Fonte",
    },
    capabilities: {
      badge: "Pilares Técnicos",
      heading: "Pilares de Engenharia de IA & Dados",
      subheading:
        "Onde a IA aplicada e sistemas de dados em escala se apoiam em arquitetura robusta e entrega fullstack.",
      items: [
        {
          title: "IA Aplicada & Modelos LLM Privados",
          description:
            "Arquitetura de pipelines RAG sem vazamento de dados, modelos quantizados locais (Ollama, HuggingFace), busca vetorial híbrida, protocolos determinísticos de memória para agentes (OnMemory) e agentes autônomos orientados a tarefas.",
          tags: [
            "Pipelines RAG",
            "Visão Multimodal / OCR",
            "LLMs Locais (Ollama)",
            "Governança OnMemory (<20KB)",
            "HuggingFace",
            "Bancos Vetoriais",
            "Guardrails de IA",
            "Agentes",
          ],
        },
        {
          title: "Lakehouses & Engenharia de Dados",
          description:
            "Desenvolvimento de lakehouses streaming e batch e Medallion warehouses (dbt-core, BigQuery) para bilhões de eventos com transações ACID, evolução de partições e otimização de custo S3 via Spark e Iceberg.",
          tags: [
            "Apache Spark",
            "Apache Iceberg",
            "dbt-core",
            "BigQuery Medallion",
            "Kafka",
            "Airflow",
            "AWS Glue",
            "Athena",
          ],
        },
        {
          title: "Arquitetura de Sistemas Distribuídos",
          description:
            "Design de sistemas orientados a eventos, Domain-Driven Design (DDD), motores quantitativos determinísticos, isolamento de tenants com KMS, landing zones automatizadas e governança FinOps em nuvem.",
          tags: [
            "System Design",
            "Event-Driven",
            "Motores Quantitativos",
            "AWS Step Functions",
            "GCP Cloud Run",
            "Terraform IaC",
            "Isolamento KMS",
            "FinOps",
          ],
        },
        {
          title: "Engenharia Full-Stack de Produtos",
          description:
            "Entrega de software de ponta a ponta: validação, MVP veloz e sistemas multiplataforma robustos na Web, iOS e Android com 60 FPS WebGL/AR, i18n verificado via AST sem textos fixos, orçamentos estritos de SSR e SSR de borda.",
          tags: [
            "React 19",
            "React Router SSR",
            "React Native (Expo 57)",
            "TypeScript",
            "Three.js / WebGL",
            "WebRTC P2P",
            "Tailwind CSS",
          ],
        },
      ],
    },
    latestInsights: {
      heading: "Descobertas & Conhecimento",
      subheading:
        "Blueprints práticos de engenharia, retrospectivas de arquitetura e aprendizados de sistemas reais.",
      viewAll: "Ver Todos os Artigos",
      readArticle: "Ler Artigo",
    },
    blog: {
      title: "Hub de Conhecimento & Descobertas",
      subtitle: "Arquitetura de sistemas, engenharia de dados, IA aplicada e lições práticas.",
      knowledgeHub: "Hub de Conhecimento",
      searchPlaceholder: "Pesquisar {count} artigos por tópico, arquitetura ou palavras-chave...",
      filterAll: "Todos os Tópicos",
      filterAllSources: "Todos os Artigos",
      filterBlueprints: "Blueprints de Engenharia",
      filterSubstack: "Dispatches do Substack",
      readTime: "min de leitura",
      backToBlog: "Voltar para Artigos",
      share: "Compartilhar",
      shareOnX: "Compartilhar no X",
      shareOnLinkedIn: "Compartilhar no LinkedIn",
      shareArticle: "Compartilhar artigo",
      copyLink: "Copiar Link",
      noPostsFound: "Nenhum artigo encontrado com esses critérios.",
      substackBanner: "Publicação Semanal sobre IA & Engenharia de Dados",
      substackText:
        "Acompanhe meu Substack para análises técnicas aprofundadas, arquiteturas de IA aplicada e lições de construção de ventures.",
      substackCta: "Ler e Assinar no Substack",
      substackPublication: "Publicação no Substack",
      words: "palavras",
      tableOfContents: "Índice do Artigo",
      keySections: "Principais Seções",
      sourceBlueprint: "Blueprint",
      sourceSubstack: "Substack",
      blueprintBadge: "Blueprint de Engenharia",
      substackBadge: "Dispatch do Substack",
      readingProgress: "Progresso de Leitura",
      originallyPublished: "Publicado originalmente no Substack",
      readOnSubstack: "Ler no Substack",
      openOnSubstack: "Abrir original no Substack",
      authorRole: "Founder & Arquiteto",
      authorBio:
        "Engenharia de sistemas de IA aplicada, plataformas de nuvem distribuídas e o ecossistema de ventures Aldeon.",
      relatedTitle: "Dispatches Técnicos Relacionados",
      viewAllCount: "Ver todos ({count})",
      read: "Ler",
      aboutLink: "Sobre",
      clearSearch: "Limpar",
      resetFilters: "Limpar filtros",
    },
    about: {
      heading: "Sobre Célio Vieira",
      missionParagraphs: [
        "Atuo na convergência entre inteligência artificial aplicada, engenharia de dados em larga escala e criação de novos negócios. Como Founder e Engenheiro de IA & Dados, meu foco é transformar sistemas técnicos complexos em produtos digitais resilientes e de alto impacto. Em vez de tratar tecnologias emergentes como demonstrações conceituais, abordo a engenharia a partir de princípios fundamentais — projetando arquiteturas que escalam sob altas cargas de produção enquanto impulsionam valor de negócio tangível.",
        "Minha base técnica é fundamentada em engenharia de computação e pós-graduação lato sensu em Processos e Arquitetura de Nuvem (Cloud Computing). Ao longo de anos de atuação arquitetural, desenvolvi sistemas distribuídos de missão crítica — desde microsserviços orientados a eventos com arquitetura hexagonal sobre infraestruturas serverless AWS (Lambda, SQS, EventBridge, DynamoDB) até plataformas de lakehouse em escala de petabytes utilizando Apache Spark, Apache Iceberg, Glue, EMR e Airflow. Especializo-me no desenho de motores de dados streaming e batch que asseguram transações ACID, evolução de partições e eficiência FinOps sem abrir mão de alta vazão.",
        "No universo de IA, minha atuação concentra-se em IA aplicada de alta precisão e infraestruturas privadas sem vazamento de dados. Desenvolvo pipelines de RAG (Geração Aumentada por Recuperação) com busca vetorial híbrida, topologias de raciocínio em grafos de prompts e agentes autônomos orientados a tarefas. Em servidores locais dedicados, atuo no ajuste fino, quantização e esteiras de inferência utilizando Ollama, HuggingFace e ComfyUI — entregando inteligência soberana, rápida e segura.",
        "Integrando arquitetura de sistemas com engenharia de produtos fullstack moderna (TypeScript, React 19, React Native Expo, Node.js, Go, Python), assumo responsabilidade de ponta a ponta: do desenho técnico à escala em produção. Essa capacidade multidisciplinar é o motor propulsor da Aldeon (aldeon.app) — meu ecossistema de ventures que opera 7 produtos ativos: SwanGo, OnMemory, HandSpeak, Be Your Stories, Pack, TATU Design e PostHub, ao lado de ferramentas de código aberto para desenvolvedores.",
      ],
      buildingTitle: "O Que Estou Construindo Agora",
      buildingList: [
        "Expandindo a Aldeon (aldeon.app) como plataforma Edge SSR consolidada para 7 produtos em gru1 com arquitetura fatiada por domínio, i18n verificado via AST e orçamentos estritos de bundle.",
        "Operando o SwanGo (aldeon.app/swango) com Medallion warehouse de 20 tabelas em dbt-core + BigQuery ($0/mês) indexando 1.076+ ativos B3/CVM/BCB, 5 motores quantitativos, workspaces SHA-256 e Academia Financeira.",
        "Evoluindo o OnMemory (aldeon.app/on-memory) como protocolo reutilizável de memória em 3 fases para agentes de IA com Stack Composer interativo, linter client-side <20KB e registro de anti-padrões em 5 campos.",
        "Aprimorando o HandSpeak (aldeon.app/handspeak) com visão 3D de Libras a 60 FPS, tutor anatômico WebGL com 57+ poses, Modo Prática na câmera, videochamadas P2P WebRTC e Academia Bilíngue de Libras.",
        "Escalando o Be Your Stories na Web, iOS e Android com busca Meilisearch em sub-15ms, proxy de borda IPv6 dual-stack e audiolivros serverless via AWS Polly.",
        "Operando a logística condominial do Pack com OCR multimodal via Gemini Flash em sub-1.2s, reatividade local-first em Legend-State v3 e retirada segura por QR code/PIN.",
        "Alavancando o estúdio de decalques em AR cilíndrico 2D TATU Design a 60 FPS e a esteira PostHub para 5 redes no AWS Step Functions com isolamento criptográfico via KMS.",
        "Desenvolvendo frameworks empresariais de RAG privado, agentes locais (Ollama, HuggingFace, ComfyUI) e lakehouses em escala de petabytes com Apache Spark e Iceberg.",
      ],
      principlesTitle: "Princípios de Atuação",
      principles: [
        {
          title: "IA & Dados como Multiplicadores",
          desc: "Empregar IA moderna e lakehouses resilientes para resolver gargalos reais, e não como meras demonstrações conceituais.",
        },
        {
          title: "Velocidade com Rigor Arquitetural",
          desc: "Iterar rápido com agilidade de startup sem abrir mão de tipagem estrita, modularidade e testes automatizados.",
        },
        {
          title: "Pensamento de Primeiros Princípios",
          desc: "Eliminar complexidade acidental, questionar suposições e desenhar soluções diretas e sustentáveis.",
        },
        {
          title: "Responsabilidade de Ponta a Ponta",
          desc: "Desde a concepção do produto e desenho técnico até o deploy, observabilidade, escala e evolução contínua.",
        },
      ],
      socialsTitle: "Conexão & Contato",
      socialsText:
        "Aberto para colaborações em ventures, trocas técnicas e desenvolvimento de software inovador.",
    },
    contact: {
      heading: "Vamos Construir Algo Excepcional",
      subheading:
        "Interessado em trocar ideias técnicas, explorar parcerias de ventures ou construir software ambicioso? Conecte-se diretamente.",
      directNetwork: "Rede Direta",
      emailAddress: "contact@celiovieira.com",
      linkedIn: "LinkedIn",
      gitHub: "GitHub",
      youTube: "Canal no YouTube",
      xTwitter: "X / Twitter (@celio1878)",
      substack: "Substack (@celio1878)",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
    errors: {
      notFoundTitle: "Página Não Encontrada",
      notFoundText: "A página que você procura não existe ou foi movida.",
      errorTitle: "Algo Deu Errado",
      errorText: "Ocorreu um erro inesperado ao renderizar esta página.",
      unknownError: "Erro Desconhecido",
      backHome: "Voltar ao Início",
      stackTrace: "Stack trace (apenas desenvolvimento):",
    },
  },
};
