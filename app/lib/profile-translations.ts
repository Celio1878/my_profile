export type SupportedLocale = "en" | "pt-BR";

export type Dictionary = {
  nav: {
    home: string;
    ecosystem: string;
    capabilities: string;
    blog: string;
    academy: string;
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
    chips: string[];
    ctaEcosystem: string;
    ctaBlog: string;
    ctaContact: string;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    blogTitle: string;
    blogDescription: string;
    academyTitle: string;
    academyDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    notFoundTitle: string;
    errorTitle: string;
  };
  ui: {
    openMenu: string;
    closeMenu: string;
    copied: string;
    skipToMain: string;
    copyCode: string;
    codeCopied: string;
    linkToSection: string;
    mainContent: string;
    emailLabel: string;
  };
  ecosystem: {
    heading: string;
    subheading: string;
    aldeonTitle: string;
    aldeonTagline: string;
    aldeonDescription: string;
    aldeonChips: string[];
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
    ragBadge: string;
    openSourceBadge: string;
    cloudInfraBadge: string;
    swangoTitle: string;
    swangoTagline: string;
    swangoDescription: string;
    swangoMeta: string;
    swangoChips: string[];
    ragonTitle: string;
    ragonTagline: string;
    ragonDescription: string;
    ragonMeta: string;
    ragonChips: string[];
    ragStudioApp: string;
    memonTitle: string;
    memonTagline: string;
    memonDescription: string;
    memonMeta: string;
    memonChips: string[];
    bysTitle: string;
    bysTagline: string;
    bysDescription: string;
    bysMeta: string;
    bysChips: string[];
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
    packMeta: string;
    packChips: string[];
    tatuTitle: string;
    tatuTagline: string;
    tatuDescription: string;
    tatuMeta: string;
    tatuChips: string[];
    postsTitle: string;
    postsTagline: string;
    postsDescription: string;
    postsMeta: string;
    postsChips: string[];
    handspeakTitle: string;
    handspeakTagline: string;
    handspeakDescription: string;
    handspeakMeta: string;
    handspeakChips: string[];
    appBuilderTitle: string;
    appBuilderTagline: string;
    appBuilderDescription: string;
    cdkFactoryTitle: string;
    cdkFactoryTagline: string;
    cdkFactoryDescription: string;
    npmPackageLabel: string;
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
    mediumCta: string;
    mediumLabel: string;
    bilingualBadge: string;
    englishOnlyBadge: string;
    englishOnlyNoticeTitle: string;
    englishOnlyNoticeText: string;
  };
  academy: {
    badge: string;
    title: string;
    subtitle: string;
    youtubeChannelBadge: string;
    youtubeBannerTitle: string;
    youtubeBannerText: string;
    youtubeSubscribeCta: string;
    searchPlaceholder: string;
    clearSearch: string;
    resetFilters: string;
    allTracks: string;
    allLevels: string;
    levels: {
      foundations: string;
      intermediate: string;
      advanced: string;
    };
    statusPublished: string;
    statusUpcoming: string;
    minutesLabel: string;
    lessonsCount: string;
    watchLesson: string;
    previewSyllabus: string;
    watchOnYouTube: string;
    playVideoAria: string;
    upcomingStageTitle: string;
    upcomingStageText: string;
    upcomingNotifyCta: string;
    backToAcademy: string;
    outcomesTitle: string;
    chaptersTitle: string;
    companionBlueprintsTitle: string;
    relatedLessonsTitle: string;
    trackLabel: string;
    levelLabel: string;
    durationLabel: string;
    statusLabel: string;
    noLessonsFound: string;
    homeBadge: string;
    homeHeading: string;
    homeSubheading: string;
    homeViewAll: string;
    shareLesson: string;
    shareOnX: string;
    shareOnLinkedIn: string;
    copyLink: string;
    share: string;
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
    twitch: string;
    medium: string;
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
      academy: "Academy",
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
      chips: ["Applied AI & RAG", "Lakehouses & Spark", "System Architecture", "FullStack Systems"],
      ctaEcosystem: "Explore Aldeon Ecosystem",
      ctaBlog: "Read Discoveries",
      ctaContact: "Get in Touch",
    },
    meta: {
      homeTitle: "Célio Vieira — Founder, AI & Data Engineer",
      homeDescription:
        "Célio Vieira — Founder, AI & Data Engineer. Architecting intelligent AI systems, lakehouses, and commercial products under the Aldeon ecosystem.",
      blogTitle: "Knowledge Hub & Discoveries — Célio Vieira",
      blogDescription:
        "Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.",
      academyTitle: "Academy — Engineering Video Courses | Célio Vieira",
      academyDescription:
        "Structured YouTube engineering courses covering local AI stacks, Medallion lakehouses, distributed AWS/GCP cloud, and Aldeon builds.",
      aboutTitle: "About Célio Vieira — Founder, AI & Data Engineer",
      aboutDescription:
        "Célio Vieira is an AI & Data Engineer, founder, and systems architect bridging deep distributed lakehouse engineering with commercial AI products and the Aldeon ecosystem.",
      notFoundTitle: "Page Not Found — Célio Vieira",
      errorTitle: "Error — Célio Vieira",
    },
    ui: {
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      copied: "Copied!",
      skipToMain: "Skip to main content",
      copyCode: "Copy code",
      codeCopied: "Copied!",
      linkToSection: "Link to section",
      mainContent: "Main content",
      emailLabel: "Email",
    },
    ecosystem: {
      heading: "The Aldeon Ecosystem",
      subheading:
        "Aldeon (aldeon.app) is my venture engineered to build, launch, and operate autonomous digital products, consumer mobile apps, and applied AI engines.",
      aldeonTitle: "Aldeon Venture Studio",
      aldeonTagline: "Autonomous Multi-Product Venture Ecosystem & Applied AI Studio",
      aldeonDescription:
        "Serving as the central web platform, domain-sliced React Router 7 Edge SSR host (TypeScript 7 + Biome), and orchestration layer for 8 autonomous products, AI-driven automation, and multi-cloud backends.",
      aldeonChips: [
        "8 Active Products",
        "Vercel Edge SSR (gru1)",
        "TypeScript 7 • Biome",
        "AWS • GCP • Supabase • BigQuery",
        "dbt-core & Terraform IaC",
        "MemOn (<20KB) & RagOn (<2ms RAG)",
      ],
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
      ragBadge: "Air-Gapped AI RAG",
      openSourceBadge: "Open-Source Tool",
      cloudInfraBadge: "Cloud Infrastructure",
      swangoTitle: "SwanGo",
      swangoTagline:
        "B3 market intelligence, $0/mo dbt + BigQuery Medallion warehouse, risk & stress engines & financial academy.",
      swangoDescription:
        'Zero-mock financial control and collaborative trade decision platform indexing 1,076+ B3, CVM, BCB, Crypto, and SEC EDGAR assets via a 20-table dbt-core + BigQuery Medallion warehouse (49/49 dbt tests, 9/9 freshness SLAs), publish-gated Supabase hot cache, deterministic "Can I Buy?" CDI NPV, Risk/Stress & DARF 6015 engines, SHA-256 shared workspaces, a 6-Stage Interactive Simulator, and a 4-track Financial Academy.',
      swangoMeta: "BigQuery + dbt • Cloud Run",
      swangoChips: [
        "dbt-core + BigQuery (49/49 Tests)",
        "1,076+ B3/CVM/BCB Assets",
        "Risk & Stress Engines",
        "SHA-256 Workspaces",
        "6-Stage Simulator",
        "4-Track Financial Academy",
      ],
      ragonTitle: "RagOn (rag-on)",
      ragonTagline:
        "Free air-gapped zero-leak RAG studio, 6-stage BM25 + 3-gram X-Ray & 7-file cross-stack CLI.",
      ragonDescription:
        "100% free open developer product sharing Aldeon's air-gapped RAG architecture: live 6-stage BM25 + 3-gram X-Ray playground (<2ms retrieval, $0 LLM cost), client-side JSON corpus Zero-Leak auditor with 1-click Auto-Sanitize, 7-file cross-stack starter kit (init-rag-on.mjs), FNV-1a hashed client guardrails, and AP-RAG-01..08 anti-pattern registry.",
      ragonMeta: "Air-Gapped Studio • 7-File CLI • $0 RAG",
      ragonChips: [
        "<2ms BM25 + 3-Gram",
        "$0 Extractive RAG",
        "6-Stage X-Ray Playground",
        "Corpus Zero-Leak Auditor",
        "FNV-1a Hashed Guardrails",
        "init-rag-on.mjs",
      ],
      ragStudioApp: "RAG Studio & X-Ray",
      memonTitle: "MemOn (mem-on)",
      memonTagline:
        "Reusable AI engineering memory governance, project bootstrapper CLI & client-side <20KB linter.",
      memonDescription:
        "Open developer governance protocol (formerly OnMemory) and portable zero-dependency CLI (init-mem-on.mjs) that bootstraps new software products with locked stack boundaries and 5-field anti-pattern guardrails while auditing repositories under a strict <20KB zero-leak memory ceiling (-83.6% token overhead).",
      memonMeta: "Web Linter • Portable CLI • CI Gate",
      memonChips: [
        "<20KB Memory Ceiling",
        "-83.6% Token Savings",
        "5-Field Anti-Patterns",
        "Stack Composer & Linter",
        "Zero-Leak Security CI",
        "init-mem-on.mjs",
      ],
      bysTitle: "Be Your Stories (BYS)",
      bysTagline:
        "Cross-platform storytelling, chapter translation & audiobooks on Web, iOS, and Android.",
      bysDescription:
        "Digital reading and collaborative publishing platform featuring 4 distraction-free reader themes, zero paywalled chapters, built-in chapter translation, sub-15ms Meilisearch indexing, AWS Polly audiobook narration, instant PIX Pro checkout, and apps on App Store & Google Play.",
      bysMeta: "iOS • Android Beta • Web",
      bysChips: [
        "Expo SDK 57",
        "Offline-First",
        "Chapter Translation",
        "Meilisearch (<15ms)",
        "AWS Polly + PIX Pro",
      ],
      webApp: "Web Application",
      iosApp: "App Store (iOS)",
      androidBetaApp: "Google Play (Beta)",
      simulatorApp: "6-Stage Simulator",
      academyApp: "Academy",
      stackComposerApp: "Stack Composer & Linter",
      deepDive: "Deep-Dive",
      packTitle: "Pack",
      packTagline:
        "Mailroom automation & sub-1.2s Gemini 3.8 Flash OCR delivery control for residential communities.",
      packDescription:
        "Condominium mailroom logistics app featuring sub-1.2s Gemini 3.8 Flash OCR parsing (99.4% accuracy, -65% dwell), Legend-State v3 local-first reactivity, dynamic QR/PIN handover, automated 48h EventBridge reminders, and live iOS App Store & Android Beta apps.",
      packMeta: "iOS • Android Beta • Web",
      packChips: [
        "Gemini 3.8 Flash (<1.2s)",
        "Legend-State v3",
        "Expo SDK 57",
        "DynamoDB + Firestore",
        "EventBridge 48h",
        "Terraform",
      ],
      tatuTitle: "TATU Design",
      tatuTagline: "AI tattoo stencil studio, 60 FPS AR skin projection & thermal export engine.",
      tatuDescription:
        "Design studio app empowering tattoo artists with Gemini 3.8 Flash multi-style AI stencil generation (line-art, blackwork, fine-line), 60 FPS AR camera skin-lock projection, and 4K thermal PNG export on Web, iOS, and Android.",
      tatuMeta: "iOS • Android Beta • Web",
      tatuChips: [
        "60 FPS AR Skin-Lock",
        "Sobel/Bayer Stencils",
        "Gemini 3.8 Flash",
        "Expo SDK 57",
        "4K Thermal Export",
      ],
      postsTitle: "PostHub",
      postsTagline:
        "Autonomous 5-platform content pipeline, 8-topic curation & 3x/day publishing engine.",
      postsDescription:
        "Serverless distribution pipeline automating content syndication across LinkedIn, X, Substack, Facebook, and Instagram with AWS Step Functions, 1-click Publish Now & retry controls, live credential health checks, and live iOS App Store & Android Beta apps.",
      postsMeta: "iOS • Android Beta • Web",
      postsChips: [
        "AWS Step Functions",
        "5 Social Networks",
        "8-Topic / 3x Daily",
        "1-Click Publish Now",
        "Live Credential Health",
      ],
      handspeakTitle: "HandSpeak",
      handspeakTagline:
        "Real-time 60 FPS 3D Libras translation, A–Z & 0–10 WebGL tutor & P2P video calls.",
      handspeakDescription:
        "Accessible communication platform featuring 60 FPS MediaPipe 3D hand tracking (<16ms local WASM latency), A–Z & 0–10 Three.js WebGL anatomical tutor, Practice Mode scoring, Gemini 3.8 Flash contextual translation, conversation history persistence, 5-track Bilingual Libras Academy, and encrypted PeerJS WebRTC video calls on GCP Cloud Run.",
      handspeakMeta: "Web 3D Studio • GCP Cloud Run",
      handspeakChips: [
        "60 FPS 3D Tracking",
        "A-Z & 0-10 WebGL Tutor",
        "Gemini 3.8 Flash",
        "5-Track Libras Academy",
        "PeerJS WebRTC P2P",
        "GCP Cloud Run",
      ],
      appBuilderTitle: "NodeJS App Builder",
      appBuilderTagline: "Microservices CLI generator & clean architecture template on npm.",
      appBuilderDescription:
        "Developer productivity tool downloaded on npm to scaffold production-ready Node.js APIs with clean architecture, strict linting, Docker orchestration, and automated CI test suites.",
      cdkFactoryTitle: "AWS CDK Factory",
      cdkFactoryTagline: "Infrastructure as Code framework for automated landing zones.",
      cdkFactoryDescription:
        "Modular AWS CDK constructs and deployment pipelines automating multi-account cloud topologies, lakehouses, and container clusters with enterprise guardrails.",
      npmPackageLabel: "npm package",
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
            "Architecting zero-leakage air-gapped RAG pipelines (RagOn, <2ms BM25 + 3-gram), local quantized inference (Ollama, OpenCode, Qwen 3.5, Qwen3-Coder), deterministic agent memory governance (MemOn, <20KB), and autonomous multi-step workflows.",
          tags: [
            "RagOn (<2ms RAG)",
            "MemOn (<20KB)",
            "Local LLMs (Ollama)",
            "OpenCode + Qwen 3.5",
            "Multimodal Vision/OCR",
            "FNV-1a Guardrails",
            "HuggingFace",
            "Agentic Loops",
          ],
        },
        {
          title: "Lakehouses & Data Engineering",
          description:
            "Designing high-throughput streaming and batch lakehouses and Medallion warehouses (dbt-core with 49/49 tests, BigQuery) handling billions of events with ACID transactions, partition evolution, and S3 cost optimization using Spark and Iceberg.",
          tags: [
            "Apache Spark",
            "Apache Iceberg",
            "dbt-core (49/49 Tests)",
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
            "Building resilient event-driven architectures, domain-driven design (DDD), deterministic quantitative & stress-test engines, KMS envelope tenant isolation, automated landing zones, and cloud FinOps governance.",
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
            "End-to-end software delivery from customer validation to high-velocity MVP and scaled multi-platform systems across Web, iOS, and Android with TypeScript 7, Biome, 60 FPS WebGL/AR, AST-verified zero-hardcode i18n, and strict SSR budgets.",
          tags: [
            "React 19",
            "React Router SSR",
            "React Native (Expo 57)",
            "TypeScript 7 & Biome",
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
      mediumCta: "Read on Medium",
      mediumLabel: "Medium",
      bilingualBadge: "EN / PT-BR",
      englishOnlyBadge: "EN",
      englishOnlyNoticeTitle: "Canonical English Dispatch (Substack)",
      englishOnlyNoticeText:
        "This external Substack article is displayed in its original English edition. All 14 native Engineering Blueprints are fully available in English and Brazilian Portuguese.",
    },
    academy: {
      badge: "YouTube Video Academy",
      title: "Engineering Academy & Video Labs",
      subtitle:
        "Structured YouTube video deep-dives covering local AI stacks, Medallion lakehouses, distributed cloud, and Aldeon builds.",
      youtubeChannelBadge: "YouTube Channel (@celio_vieira)",
      youtubeBannerTitle: "Hands-On Engineering Lessons & Architecture Walkthroughs",
      youtubeBannerText:
        "Video lessons are published on YouTube and paired with written Engineering Blueprints for deep architectural reference.",
      youtubeSubscribeCta: "Subscribe on YouTube",
      searchPlaceholder: "Search {count} lessons by topic, stack, or track...",
      clearSearch: "Clear",
      resetFilters: "Reset filters",
      allTracks: "All Tracks",
      allLevels: "All Levels",
      levels: {
        foundations: "Foundations",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
      statusPublished: "Published on YouTube",
      statusUpcoming: "Upcoming on YouTube",
      minutesLabel: "min",
      lessonsCount: "{count} lessons",
      watchLesson: "Watch Lesson",
      previewSyllabus: "View Syllabus",
      watchOnYouTube: "Watch on YouTube",
      playVideoAria: "Play video lesson",
      upcomingStageTitle: "Episode in Production for YouTube",
      upcomingStageText:
        "The full technical syllabus and companion Engineering Blueprint are live below. Subscribe on YouTube to catch the episode as soon as it drops.",
      upcomingNotifyCta: "Subscribe for Release",
      backToAcademy: "Back to Academy",
      outcomesTitle: "What You Will Learn",
      chaptersTitle: "Lesson Chapters & Lab Flow",
      companionBlueprintsTitle: "Companion Engineering Blueprints",
      relatedLessonsTitle: "More in This Track",
      trackLabel: "Track",
      levelLabel: "Level",
      durationLabel: "Estimated Runtime",
      statusLabel: "Release Status",
      noLessonsFound: "No Academy lessons match your current filters.",
      homeBadge: "YouTube Academy",
      homeHeading: "Video Academy & Deep-Dives",
      homeSubheading:
        "Step-by-step video walkthroughs on YouTube paired directly with production Engineering Blueprints.",
      homeViewAll: "Explore Academy",
      shareLesson: "Share lesson",
      shareOnX: "Share on X",
      shareOnLinkedIn: "Share on LinkedIn",
      copyLink: "Copy Link",
      share: "Share",
    },
    about: {
      heading: "About Célio Vieira",
      missionParagraphs: [
        "I build at the intersection of applied artificial intelligence, petabyte-scale data engineering, and commercial venture creation. As a Founder, AI & Data Engineer, my focus is turning deep technical systems into resilient, high-impact digital products. Rather than treating emerging technology as speculative demos, I approach engineering from first principles—crafting architectures that scale seamlessly under production workloads while driving real business momentum.",
        "My engineering foundation is rooted in formal computer engineering and a postgraduate specialization in Cloud Computing Process & Architecture. Over years of hands-on architecture, I have engineered mission-critical distributed systems—from event-driven hexagonal microservices running on AWS serverless backends (Lambda, SQS, EventBridge, DynamoDB) to petabyte-scale lakehouse platforms leveraging Apache Spark, Apache Iceberg, Glue, EMR, and Airflow. I specialize in designing streaming and batch data engines that guarantee ACID transactions, partition evolution, and FinOps cost efficiency without compromising throughput.",
        "In the AI domain, my work centers on high-precision Applied AI and private, zero-leakage infrastructure. I design retrieval-augmented generation (RAG) pipelines with hybrid vector search, prompt graph reasoning topologies, and autonomous task-oriented agents. On self-hosted servers, I actively experiment with model quantizations, fine-tuning, and inference pipelines utilizing Ollama, HuggingFace, and ComfyUI—delivering secure, local intelligence that protects data sovereignty while maximizing speed and accuracy.",
        "Bridging systems architecture with modern full-stack product engineering (TypeScript, React 19, React Native Expo, Node.js, Go, Python), I take complete end-to-end ownership from system design to production scale. This multi-disciplinary capability is the engine behind Aldeon (aldeon.app)—my venture umbrella operating 8 live products: SwanGo, RagOn, MemOn, HandSpeak, Be Your Stories, Pack, TATU Design, and PostHub, alongside open-source developer tooling.",
      ],
      buildingTitle: "What I'm Building Now",
      buildingList: [
        "Expanding Aldeon (aldeon.app) as a consolidated 8-product Edge SSR platform in gru1 using TypeScript 7, Biome, bun:test, AST-verified bilingual i18n, and strict route bundle budgets.",
        "Operating SwanGo (aldeon.app/swango) with a $0/mo dbt-core + BigQuery 20-table Medallion warehouse (49/49 dbt tests, 9/9 freshness SLAs), Risk & Stress engines, SHA-256 workspaces & 4-track Financial Academy.",
        "Launching RagOn (aldeon.app/rag-on) as a 100% free air-gapped zero-leak RAG studio featuring a live 6-stage BM25 + 3-gram X-Ray (<2ms, $0), client-side corpus auditor & 7-file CLI (init-rag-on.mjs).",
        "Advancing MemOn (aldeon.app/mem-on, formerly OnMemory) as a reusable 3-phase AI agent memory governance protocol with an interactive stack composer, <20KB client linter & init-mem-on.mjs CLI.",
        "Scaling HandSpeak (aldeon.app/handspeak) with 60 FPS 3D Libras vision, A–Z & 0–10 WebGL tutor, Practice Mode scoring, Gemini 3.8 Flash translation, persistent history, P2P WebRTC & Libras Academy.",
        "Growing Be Your Stories (aldeon.app/bys) across Web, iOS App Store, and Android Beta with sub-15ms Meilisearch discovery, built-in chapter translation, AWS Polly audiobooks & instant PIX Pro checkout.",
        "Operating Pack (aldeon.app/pack) & TATU Design (aldeon.app/tatu) live on Apple App Store & Google Play Beta with Gemini 3.8 Flash OCR/vision, Legend-State v3 & 60 FPS AR skin-lock.",
        "Powering PostHub (aldeon.app/postshub, iOS App Store & Android Beta) 5-network AWS Step Functions publishing with KMS isolation alongside local AI coding stacks (Ollama, OpenCode, Qwen 3.5 & Qwen3-Coder).",
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
      twitch: "Twitch (@celio1878)",
      medium: "Medium (@celio.vieira1878)",
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
      academy: "Academy",
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
      chips: [
        "IA Aplicada & RAG",
        "Lakehouses & Spark",
        "Arquitetura de Sistemas",
        "Sistemas FullStack",
      ],
      ctaEcosystem: "Conhecer Ecossistema Aldeon",
      ctaBlog: "Ler Artigos & Descobertas",
      ctaContact: "Entrar em Contato",
    },
    meta: {
      homeTitle: "Célio Vieira — Founder, Engenheiro de IA & Dados",
      homeDescription:
        "Célio Vieira — Founder, Engenheiro de IA & Dados. Arquitetando sistemas de IA aplicada, lakehouses e o ecossistema de ventures Aldeon.",
      blogTitle: "Hub de Conhecimento & Descobertas — Célio Vieira",
      blogDescription:
        "Blueprints práticos de engenharia, decisões arquiteturais e experimentos em IA Aplicada, Nuvem Distribuída, Lakehouses e Apps Mobile.",
      academyTitle: "Academy — Cursos em Vídeo de Engenharia | Célio Vieira",
      academyDescription:
        "Aulas em vídeo estruturadas no YouTube cobrindo stacks de IA local, lakehouses Medallion, nuvem AWS/GCP e produtos Aldeon.",
      aboutTitle: "Sobre Célio Vieira — Founder, Engenheiro de IA & Dados",
      aboutDescription:
        "Célio Vieira é Founder e Engenheiro de IA & Dados unindo lakehouses distribuídos em escala a produtos comerciais de IA e o ecossistema Aldeon.",
      notFoundTitle: "Página Não Encontrada — Célio Vieira",
      errorTitle: "Erro — Célio Vieira",
    },
    ui: {
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
      copied: "Copiado!",
      skipToMain: "Pular para o conteúdo principal",
      copyCode: "Copiar código",
      codeCopied: "Copiado!",
      linkToSection: "Link para a seção",
      mainContent: "Conteúdo principal",
      emailLabel: "E-mail",
    },
    ecosystem: {
      heading: "O Ecossistema Aldeon",
      subheading:
        "A Aldeon (aldeon.app) é meu ecossistema tecnológico e estúdio de IA projetado para criar, lançar e operar produtos digitais autônomos, aplicativos e microsserviços.",
      aldeonTitle: "Aldeon Venture Studio",
      aldeonTagline: "Ecossistema Autônomo de Produtos & Estúdio de IA Aplicada",
      aldeonDescription:
        "Atuando como a plataforma web central em React Router 7 Edge SSR fatiado por domínio (TypeScript 7 + Biome) e camada de orquestração para 8 produtos autônomos, automações de IA e infraestrutura em nuvem.",
      aldeonChips: [
        "8 Produtos Ativos",
        "Vercel Edge SSR (gru1)",
        "TypeScript 7 • Biome",
        "AWS • GCP • Supabase • BigQuery",
        "dbt-core & Terraform IaC",
        "MemOn (<20KB) & RagOn (<2ms RAG)",
      ],
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
      ragBadge: "IA RAG Air-Gapped",
      openSourceBadge: "Ferramenta Open-Source",
      cloudInfraBadge: "Infraestrutura em Nuvem",
      swangoTitle: "SwanGo",
      swangoTagline:
        "Inteligência de mercado B3, Medallion warehouse dbt + BigQuery, motores de risco e estresse e academia financeira.",
      swangoDescription:
        'Plataforma de controle financeiro e decisão colaborativa sem dados fictícios, indexando 1.076+ ativos da B3, CVM, BCB, Cripto e SEC EDGAR em um Medallion warehouse de 20 tabelas com dbt-core + BigQuery (49/49 testes dbt, 9/9 SLAs), cache quente no Supabase, motores "Posso Comprar?" (VPL vs. CDI), Risco/Estresse e DARF 6015, workspaces SHA-256, Simulador de 6 Etapas e Academia Financeira.',
      swangoMeta: "BigQuery + dbt • Cloud Run",
      swangoChips: [
        "dbt-core + BigQuery (49/49 Testes)",
        "1.076+ Ativos B3/CVM/BCB",
        "Motores de Risco e Estresse",
        "Workspaces SHA-256",
        "Simulador 6 Etapas",
        "Academia Financeira 4 Trilhas",
      ],
      ragonTitle: "RagOn (rag-on)",
      ragonTagline:
        "Estúdio gratuito de RAG air-gapped zero-leak, Raio-X BM25 + 3-gramas em 6 estágios e CLI multi-stack.",
      ragonDescription:
        "Produto aberto e 100% gratuito compartilhando a arquitetura de RAG isolada da Aldeon: playground ao vivo de 6 estágios BM25 + 3-gramas (recuperação <2ms, custo $0 de LLM), auditor client-side Zero-Leak com Auto-Sanitize em 1 clique, kit de 7 arquivos multi-stack (init-rag-on.mjs), guardrails com hash FNV-1a e registro de anti-padrões AP-RAG-01..08.",
      ragonMeta: "Estúdio Air-Gapped • CLI 7 Arquivos • RAG $0",
      ragonChips: [
        "BM25 + 3-Gramas <2ms",
        "RAG Extrativo $0",
        "Playground Raio-X 6 Estágios",
        "Auditor Zero-Leak de Corpus",
        "Guardrails Hash FNV-1a",
        "init-rag-on.mjs",
      ],
      ragStudioApp: "Estúdio RAG & Raio-X",
      memonTitle: "MemOn (mem-on)",
      memonTagline:
        "Governança reutilizável de memória para engenharia de IA, CLI bootstrapper e linter client-side <20KB.",
      memonDescription:
        "Protocolo aberto de governança (antigo OnMemory) e CLI portátil sem dependências (init-mem-on.mjs) que inicializa novos produtos com fronteiras de stack travadas e registro de anti-padrões em 5 campos, auditando repositórios sob um teto estrito de <20KB sem vazamento de segredos (-83,6% de consumo de tokens).",
      memonMeta: "Linter Web • CLI Portátil • Trava CI",
      memonChips: [
        "Teto de Memória <20KB",
        "-83,6% Economia de Tokens",
        "Anti-Padrões em 5 Campos",
        "Stack Composer & Linter",
        "CI de Segurança Zero-Leak",
        "init-mem-on.mjs",
      ],
      bysTitle: "Be Your Stories (BYS)",
      bysTagline:
        "Plataforma multiplataforma de leitura, tradução e audiolivros na Web, iOS e Android.",
      bysDescription:
        "Ecossistema digital de leitura e publicação colaborativa com 4 temas de leitura, zero capítulos bloqueados, tradução integrada de capítulos, busca Meilisearch em sub-15ms, narração via AWS Polly, checkout Pro instantâneo via PIX e apps na App Store e Google Play.",
      bysMeta: "iOS • Android Beta • Web",
      bysChips: [
        "Expo SDK 57",
        "Offline-First",
        "Tradução de Capítulos",
        "Meilisearch (<15ms)",
        "AWS Polly + PIX Pro",
      ],
      webApp: "Aplicação Web",
      iosApp: "App Store (iOS)",
      androidBetaApp: "Google Play (Beta)",
      simulatorApp: "Simulador 6 Etapas",
      academyApp: "Academia",
      stackComposerApp: "Stack Composer & Linter",
      deepDive: "Artigo Técnico",
      packTitle: "Pack",
      packTagline:
        "Automação de portaria & triagem de encomendas com OCR Gemini 3.8 Flash em sub-1.2s.",
      packDescription:
        "Solução logística para condomínios com extração OCR por IA via Gemini 3.8 Flash em sub-1.2s (99,4% de precisão, -65% de retenção), reatividade local-first com Legend-State v3, retirada via QR/PIN, lembretes via EventBridge e apps no ar na App Store (iOS) e Android Beta.",
      packMeta: "iOS • Android Beta • Web",
      packChips: [
        "Gemini 3.8 Flash (<1.2s)",
        "Legend-State v3",
        "Expo SDK 57",
        "DynamoDB + Firestore",
        "EventBridge 48h",
        "Terraform",
      ],
      tatuTitle: "TATU Design",
      tatuTagline:
        "Estúdio de decalques por IA, projeção AR na pele a 60 FPS e exportação térmica 4K.",
      tatuDescription:
        "Aplicativo profissional para tatuadores com geração de stencils multi-estilo via Gemini 3.8 Flash (line-art, blackwork, fine-line), projeção anatômica em AR a 60 FPS na câmera e exportação térmica em alta resolução na Web, iOS e Android.",
      tatuMeta: "iOS • Android Beta • Web",
      tatuChips: [
        "AR Skin-Lock 60 FPS",
        "Stencils Sobel/Bayer",
        "Gemini 3.8 Flash",
        "Expo SDK 57",
        "Exportação Térmica 4K",
      ],
      postsTitle: "PostHub",
      postsTagline:
        "Pipeline autônomo para 5 redes sociais, curadoria em 8 tópicos e 3 ondas diárias.",
      postsDescription:
        "Esteira serverless automatizando a distribuição no LinkedIn, X, Substack, Facebook e Instagram com AWS Step Functions, publicação e retentativa em 1 clique, monitoramento de validade de credenciais e apps na App Store (iOS) e Android Beta.",
      postsMeta: "iOS • Android Beta • Web",
      postsChips: [
        "AWS Step Functions",
        "5 Redes Sociais",
        "8 Tópicos / 3x ao Dia",
        "Publicar em 1 Clique",
        "Saúde de Credenciais ao Vivo",
      ],
      handspeakTitle: "HandSpeak",
      handspeakTagline:
        "Tradução de Libras 3D a 60 FPS, tutor WebGL A–Z e 0–10 e chamadas de vídeo P2P.",
      handspeakDescription:
        "Plataforma de comunicação acessível com rastreamento 3D a 60 FPS via MediaPipe (<16ms local em WASM), tutor anatômico WebGL A–Z e 0–10, Modo Prática com pontuação, tradução contextual via Gemini 3.8 Flash, histórico de conversas persistente, Academia Bilíngue de Libras e videochamadas PeerJS WebRTC criptografadas no GCP Cloud Run.",
      handspeakMeta: "Estúdio Web 3D • GCP Cloud Run",
      handspeakChips: [
        "Rastreamento 3D 60 FPS",
        "Tutor WebGL A-Z e 0-10",
        "Gemini 3.8 Flash",
        "Academia Libras 5 Trilhas",
        "PeerJS WebRTC P2P",
        "GCP Cloud Run",
      ],
      appBuilderTitle: "NodeJS App Builder",
      appBuilderTagline: "Gerador de microsserviços CLI e arquitetura limpa publicado no npm.",
      appBuilderDescription:
        "Ferramenta de produtividade para criar APIs em Node.js com arquitetura limpa, linters rigorosos, Docker e testes automatizados de CI.",
      cdkFactoryTitle: "AWS CDK Factory",
      cdkFactoryTagline: "Framework de infraestrutura como código para landing zones na AWS.",
      cdkFactoryDescription:
        "Constructs modulares de AWS CDK e esteiras de deploy automatizando topologias multicontas, data lakes e clusters de contêineres com governança.",
      npmPackageLabel: "pacote npm",
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
            "Arquitetura de pipelines RAG air-gapped zero-leak (RagOn, BM25 + 3-gramas em <2ms), inferência local quantizada (Ollama, OpenCode, Qwen 3.5, Qwen3-Coder), governança determinística de memória (MemOn, <20KB) e agentes autônomos.",
          tags: [
            "RagOn (<2ms RAG)",
            "MemOn (<20KB)",
            "LLMs Locais (Ollama)",
            "OpenCode + Qwen 3.5",
            "Visão Multimodal / OCR",
            "Guardrails FNV-1a",
            "HuggingFace",
            "Agentes",
          ],
        },
        {
          title: "Lakehouses & Engenharia de Dados",
          description:
            "Desenvolvimento de lakehouses streaming e batch e Medallion warehouses (dbt-core com 49/49 testes, BigQuery) para bilhões de eventos com transações ACID, evolução de partições e otimização de custo S3 via Spark e Iceberg.",
          tags: [
            "Apache Spark",
            "Apache Iceberg",
            "dbt-core (49/49 Testes)",
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
            "Design de sistemas orientados a eventos, Domain-Driven Design (DDD), motores quantitativos e de estresse determinísticos, isolamento de tenants com KMS, landing zones automatizadas e governança FinOps.",
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
            "Entrega de software de ponta a ponta na Web, iOS e Android com TypeScript 7, Biome, 60 FPS WebGL/AR, i18n verificado via AST sem textos fixos, orçamentos estritos de SSR e Edge SSR.",
          tags: [
            "React 19",
            "React Router SSR",
            "React Native (Expo 57)",
            "TypeScript 7 & Biome",
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
      mediumCta: "Ler no Medium",
      mediumLabel: "Medium",
      bilingualBadge: "PT-BR / EN",
      englishOnlyBadge: "EN",
      englishOnlyNoticeTitle: "Artigo originalmente publicado em inglês no Substack",
      englishOnlyNoticeText:
        "Este dispatch externo do Substack é exibido em sua edição canônica em inglês. Todos os 14 Blueprints de Engenharia nativos estão disponíveis integralmente em português e inglês.",
    },
    academy: {
      badge: "Academy em Vídeo no YouTube",
      title: "Academy de Engenharia & Laboratórios",
      subtitle:
        "Aulas em vídeo no YouTube cobrindo stacks de IA local, lakehouses Medallion, nuvem distribuída e produtos da Aldeon.",
      youtubeChannelBadge: "Canal no YouTube (@celio_vieira)",
      youtubeBannerTitle: "Aulas Práticas de Engenharia & Arquitetura em Vídeo",
      youtubeBannerText:
        "As vídeo-aulas são publicadas no YouTube e acompanhadas por Blueprints Técnicos escritos para consulta detalhada.",
      youtubeSubscribeCta: "Inscrever-se no YouTube",
      searchPlaceholder: "Pesquisar {count} aulas por tópico, stack ou trilha...",
      clearSearch: "Limpar",
      resetFilters: "Limpar filtros",
      allTracks: "Todas as Trilhas",
      allLevels: "Todos os Níveis",
      levels: {
        foundations: "Fundamentos",
        intermediate: "Intermediário",
        advanced: "Avançado",
      },
      statusPublished: "Publicado no YouTube",
      statusUpcoming: "Em Produção no YouTube",
      minutesLabel: "min",
      lessonsCount: "{count} aulas",
      watchLesson: "Assistir Aula",
      previewSyllabus: "Ver Ementa",
      watchOnYouTube: "Assistir no YouTube",
      playVideoAria: "Reproduzir vídeo-aula",
      upcomingStageTitle: "Episódio em Produção para o YouTube",
      upcomingStageText:
        "A ementa técnica completa e o Blueprint de Engenharia complementar já estão disponíveis abaixo. Inscreva-se no YouTube para acompanhar o lançamento.",
      upcomingNotifyCta: "Inscrever-se no Canal",
      backToAcademy: "Voltar para Academy",
      outcomesTitle: "O Que Você Vai Aprender",
      chaptersTitle: "Capítulos da Aula & Roteiro Prático",
      companionBlueprintsTitle: "Blueprints de Engenharia Complementares",
      relatedLessonsTitle: "Mais Nesta Trilha",
      trackLabel: "Trilha",
      levelLabel: "Nível",
      durationLabel: "Duração Estimada",
      statusLabel: "Status de Publicação",
      noLessonsFound: "Nenhuma aula encontrada com os filtros selecionados.",
      homeBadge: "YouTube Academy",
      homeHeading: "Academy em Vídeo & Deep-Dives",
      homeSubheading:
        "Passo a passo em vídeo no YouTube integrado diretamente aos Blueprints de Engenharia.",
      homeViewAll: "Explorar Academy",
      shareLesson: "Compartilhar aula",
      shareOnX: "Compartilhar no X",
      shareOnLinkedIn: "Compartilhar no LinkedIn",
      copyLink: "Copiar Link",
      share: "Compartilhar",
    },
    about: {
      heading: "Sobre Célio Vieira",
      missionParagraphs: [
        "Atuo na convergência entre inteligência artificial aplicada, engenharia de dados em larga escala e criação de novos negócios. Como Founder e Engenheiro de IA & Dados, meu foco é transformar sistemas técnicos complexos em produtos digitais resilientes e de alto impacto. Em vez de tratar tecnologias emergentes como demonstrações conceituais, abordo a engenharia a partir de princípios fundamentais — projetando arquiteturas que escalam sob altas cargas de produção enquanto impulsionam valor de negócio tangível.",
        "Minha base técnica é fundamentada em engenharia de computação e pós-graduação lato sensu em Processos e Arquitetura de Nuvem (Cloud Computing). Ao longo de anos de atuação arquitetural, desenvolvi sistemas distribuídos de missão crítica — desde microsserviços orientados a eventos com arquitetura hexagonal sobre infraestruturas serverless AWS (Lambda, SQS, EventBridge, DynamoDB) até plataformas de lakehouse em escala de petabytes utilizando Apache Spark, Apache Iceberg, Glue, EMR e Airflow. Especializo-me no desenho de motores de dados streaming e batch que asseguram transações ACID, evolução de partições e eficiência FinOps sem abrir mão de alta vazão.",
        "No universo de IA, minha atuação concentra-se em IA aplicada de alta precisão e infraestruturas privadas sem vazamento de dados. Desenvolvo pipelines de RAG (Geração Aumentada por Recuperação) com busca vetorial híbrida, topologias de raciocínio em grafos de prompts e agentes autônomos orientados a tarefas. Em servidores locais dedicados, atuo no ajuste fino, quantização e esteiras de inferência utilizando Ollama, HuggingFace e ComfyUI — entregando inteligência soberana, rápida e segura.",
        "Integrando arquitetura de sistemas com engenharia de produtos fullstack moderna (TypeScript, React 19, React Native Expo, Node.js, Go, Python), assumo responsabilidade de ponta a ponta: do desenho técnico à escala em produção. Essa capacidade multidisciplinar é o motor propulsor da Aldeon (aldeon.app) — meu ecossistema de ventures que opera 8 produtos ativos: SwanGo, RagOn, MemOn, HandSpeak, Be Your Stories, Pack, TATU Design e PostHub, ao lado de ferramentas de código aberto para desenvolvedores.",
      ],
      buildingTitle: "O Que Estou Construindo Agora",
      buildingList: [
        "Expandindo a Aldeon (aldeon.app) como plataforma Edge SSR consolidada para 8 produtos em gru1 com TypeScript 7, Biome, bun:test, i18n verificado via AST e orçamentos estritos de bundle.",
        "Operando o SwanGo (aldeon.app/swango) com Medallion warehouse de 20 tabelas em dbt-core + BigQuery (49/49 testes dbt, 9/9 SLAs), motores de Risco e Estresse, workspaces SHA-256 e Academia Financeira.",
        "Lançando o RagOn (aldeon.app/rag-on) como estúdio gratuito de RAG air-gapped zero-leak com Raio-X BM25 + 3-gramas em 6 estágios (<2ms, $0), auditor client-side e CLI multi-stack (init-rag-on.mjs).",
        "Evoluindo o MemOn (aldeon.app/mem-on, antigo OnMemory) como protocolo reutilizável de memória em 3 fases para agentes de IA com Stack Composer, linter <20KB e CLI init-mem-on.mjs.",
        "Aprimorando o HandSpeak (aldeon.app/handspeak) com visão 3D de Libras a 60 FPS, tutor WebGL A–Z e 0–10, Modo Prática, tradução Gemini 3.8 Flash, histórico persistente, WebRTC P2P e Academia de Libras.",
        "Escalando o Be Your Stories (aldeon.app/bys) na Web, App Store (iOS) e Android Beta com busca Meilisearch em sub-15ms, tradução de capítulos, audiolivros AWS Polly e checkout instantâneo via PIX.",
        "Operando o Pack (aldeon.app/pack) e o TATU Design (aldeon.app/tatu) no ar na Apple App Store e Google Play Beta com OCR/visão Gemini 3.8 Flash, Legend-State v3 e AR skin-lock a 60 FPS.",
        "Alavancando o PostHub (aldeon.app/postshub, App Store iOS e Android Beta, Step Functions + KMS) ao lado de stacks de IA local para código (Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder).",
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
      twitch: "Twitch (@celio1878)",
      medium: "Medium (@celio.vieira1878)",
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
