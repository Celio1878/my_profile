export type SupportedLocale = 'en' | 'pt-BR';

export type Dictionary = {
	nav: {
		home: string;
		ecosystem: string;
		capabilities: string;
		blog: string;
		about: string;
		contact: string;
		language: string;
	};
	hero: {
		statusBadge?: string;
		title: string;
		role: string;
		tagline: string;
		bio: string;
		ctaEcosystem: string;
		ctaBlog: string;
		ctaContact: string;
	};
	ui: {
		menu: string;
		openMenu: string;
		closeMenu: string;
		copied: string;
		skipToMain: string;
	};
	ecosystem: {
		badge: string;
		heading: string;
		subheading: string;
		aldeonTitle: string;
		aldeonTagline: string;
		aldeonDescription: string;
		visitAldeon: string;
		productsHeading: string;
		bysTitle: string;
		bysTagline: string;
		bysDescription: string;
		webApp: string;
		iosApp: string;
		androidApp: string;
		packTitle: string;
		packTagline: string;
		packDescription: string;
		tatuTitle: string;
		tatuTagline: string;
		tatuDescription: string;
		postsTitle: string;
		postsTagline: string;
		postsDescription: string;
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
		minRead: string;
	};
	blog: {
		title: string;
		subtitle: string;
		searchPlaceholder: string;
		filterAll: string;
		filterLangAll: string;
		readTime: string;
		publishedOn: string;
		by: string;
		backToBlog: string;
		share: string;
		shareOnX: string;
		shareOnLinkedIn: string;
		copyLink: string;
		linkCopied: string;
		noPostsFound: string;
		exploreVentures: string;
		substackBanner: string;
		substackText: string;
		substackCta: string;
	};
	about: {
		heading: string;
		subheading: string;
		missionTitle: string;
		missionText: string;
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
		email: string;
		emailAddress: string;
		linkedIn: string;
		gitHub: string;
		youTube: string;
		xTwitter: string;
		substack: string;
		note: string;
	};
};

export const dictionaries: Record<SupportedLocale, Dictionary> = {
	en: {
		nav: {
			home: 'Home',
			ecosystem: 'Aldeon Ecosystem',
			capabilities: 'Capabilities',
			blog: 'Blog',
			about: 'About',
			contact: "Let's Talk",
			language: 'Language',
		},
		hero: {
			title: 'Célio Vieira',
			role: 'Founder, AI & Data Engineer',
			tagline: 'Architecting AI Systems, Lakehouses & Distributed Cloud Engines',
			bio: 'Engineering applied AI pipelines, agents project architecture, and lakehouse architectures — powered by deep foundations in Distributed System Architecture and FullStack Product Engineering.',
			ctaEcosystem: 'Explore Aldeon Ecosystem',
			ctaBlog: 'Read Discoveries',
			ctaContact: 'Get in Touch',
		},
		ui: {
			menu: 'Menu',
			openMenu: 'Open navigation menu',
			closeMenu: 'Close navigation menu',
			copied: 'Copied!',
			skipToMain: 'Skip to main content',
		},
		ecosystem: {
			badge: 'Venture',
			heading: 'The Aldeon Ecosystem',
			subheading:
				'Aldeon (aldeon.app) is my venture engineered to build, launch, and operate autonomous digital products, consumer mobile apps, and applied AI engines.',
			aldeonTitle: 'Aldeon Venture Studio',
			aldeonTagline: 'Autonomous Multi-Product Venture Ecosystem & Applied AI Studio',
			aldeonDescription:
				'Serving as the central web platform, orchestration layer, and consolidated host for autonomous consumer products, AI-driven automation, and cloud backends.',
			visitAldeon: 'Visit aldeon.app',
			productsHeading: 'Active Ventures & Child Applications',
			bysTitle: 'Be Your Stories (BYS)',
			bysTagline: 'Cross-platform storytelling & reading platform on Web, iOS, and Android.',
			bysDescription:
				'Digital publishing ecosystem engineered with offline-first local synchronization, cross-platform apps live on Apple App Store & Google Play, and resilient serverless cloud services.',
			webApp: 'Web Application',
			iosApp: 'App Store (iOS)',
			androidApp: 'Google Play (Android)',
			packTitle: 'Pack',
			packTagline: 'Mailroom automation & OCR parcel delivery control for residential communities.',
			packDescription:
				'Smart condominium mailroom logistics app featuring Gemini OCR label parsing, automated resident notifications, and serverless AWS microservices.',
			tatuTitle: 'TATU Design (T3O2)',
			tatuTagline: 'AI-powered tattoo stencil studio, AR skin preview & portfolio manager.',
			tatuDescription:
				'Creative studio app empowering tattoo artists with generative image stencils, augmented reality skin overlay previews, and secure cloud storage.',
			postsTitle: 'PostHub',
			postsTagline: 'Autonomous multi-platform content publishing & distribution engine.',
			postsDescription:
				'Serverless distribution pipeline automating content syndication across LinkedIn, X, Substack, and social channels with Gemini AI enhancements.',
			appBuilderTitle: 'NodeJS App Builder',
			appBuilderTagline: 'Microservices CLI generator & clean architecture template on npm.',
			appBuilderDescription:
				'Developer productivity tool downloaded on npm to scaffold production-ready Node.js APIs with clean architecture, strict linting, Docker orchestration, and automated CI test suites.',
			cdkFactoryTitle: 'AWS CDK Factory',
			cdkFactoryTagline: 'Infrastructure as Code framework for automated landing zones.',
			cdkFactoryDescription:
				'Modular AWS CDK constructs and deployment pipelines automating multi-account cloud topologies, lakehouses, and container clusters with enterprise guardrails.',
			viewNpm: 'View Package',
			viewRepo: 'Source Code',
		},
		capabilities: {
			badge: 'Technical Pillars',
			heading: 'AI & Data Engineering Pillars',
			subheading:
				'Where applied AI and data systems meet robust system architecture and full-stack execution.',
			items: [
				{
					title: 'Applied AI & Private LLM Systems',
					description:
						'Architecting zero-leakage enterprise RAG pipelines, local quantized model hosting (Ollama, HuggingFace), hybrid vector search, and autonomous multi-step agentic workflows.',
					tags: [
						'RAG Pipelines',
						'Local LLMs',
						'Ollama',
						'HuggingFace',
						'Vector DBs',
						'Embeddings',
						'Agentic Loops',
					],
				},
				{
					title: 'Lakehouses & Data Engineering',
					description:
						'Designing high-throughput streaming and batch lakehouses handling billions of events with ACID transactions, partition evolution, and S3 cost optimization using Spark and Iceberg.',
					tags: ['Apache Spark', 'Apache Iceberg', 'Kafka', 'Airflow', 'AWS Glue', 'EMR', 'Athena'],
				},
				{
					title: 'Distributed System Architecture',
					description:
						'Building resilient event-driven architectures, domain-driven design (DDD), transactional microservices, automated landing zones, and cloud FinOps governance.',
					tags: [
						'System Design',
						'Event-Driven',
						'DDD / TDD',
						'AWS Architecture',
						'Terraform',
						'FinOps',
					],
				},
				{
					title: 'Full-Stack Product Engineering',
					description:
						'End-to-end software delivery from customer validation to high-velocity MVP and scaled multi-platform systems across Web, iOS, and Android with 60 FPS polish.',
					tags: ['React', 'React Native', 'TypeScript', 'Node.js', 'Go', 'Tailwind CSS'],
				},
			],
		},
		latestInsights: {
			heading: 'Discoveries & Knowledge',
			subheading: 'Architectural blueprints, AI experiments, and lessons from building scalable systems.',
			viewAll: 'View All Articles',
			readArticle: 'Read Article',
			minRead: 'min read',
		},
		blog: {
			title: 'Knowledge Hub & Discoveries',
			subtitle:
				'Practical engineering blueprints, architectural decisions, and product experiments from the field.',
			searchPlaceholder: 'Search articles by topic, keywords, or technology...',
			filterAll: 'All Topics',
			filterLangAll: 'All Languages',
			readTime: 'min read',
			publishedOn: 'Published on',
			by: 'By',
			backToBlog: 'Back to Articles',
			share: 'Share this article',
			shareOnX: 'Share on X',
			shareOnLinkedIn: 'Share on LinkedIn',
			copyLink: 'Copy Link',
			linkCopied: 'Link copied to clipboard!',
			noPostsFound: 'No articles found matching your criteria.',
			exploreVentures: 'Interested in discussing this or collaborating?',
			substackBanner: 'Weekly AI & Data Engineering Dispatches',
			substackText:
				'Join my Substack publication for in-depth technical breakdowns, applied AI architectures, and venture building insights.',
			substackCta: 'Read & Subscribe on Substack',
		},
		about: {
			heading: 'About Célio Vieira',
			subheading: 'Founder, AI & Data Engineer',
			missionTitle: 'The Mission',
			missionText:
				'I build at the intersection of applied artificial intelligence, petabyte-scale data engineering, and commercial venture creation. As a Founder, AI & Data Engineer, my focus is turning deep technical systems into resilient, high-impact digital products. Rather than treating emerging technology as speculative demos, I approach engineering from first principles—crafting architectures that scale seamlessly under production workloads while driving real business momentum.',
			missionParagraphs: [
				'I build at the intersection of applied artificial intelligence, petabyte-scale data engineering, and commercial venture creation. As a Founder, AI & Data Engineer, my focus is turning deep technical systems into resilient, high-impact digital products. Rather than treating emerging technology as speculative demos, I approach engineering from first principles—crafting architectures that scale seamlessly under production workloads while driving real business momentum.',
				'My engineering foundation is rooted in formal computer engineering and a postgraduate specialization in Cloud Computing Process & Architecture. Over years of hands-on architecture, I have engineered mission-critical distributed systems—from event-driven hexagonal microservices running on AWS serverless backends (Lambda, SQS, EventBridge, DynamoDB) to petabyte-scale lakehouse platforms leveraging Apache Spark, Apache Iceberg, Glue, EMR, and Airflow. I specialize in designing streaming and batch data engines that guarantee ACID transactions, partition evolution, and FinOps cost efficiency without compromising throughput.',
				'In the AI domain, my work centers on high-precision Applied AI and private, zero-leakage infrastructure. I design retrieval-augmented generation (RAG) pipelines with hybrid vector search, prompt graph reasoning topologies, and autonomous task-oriented agents. On self-hosted servers, I actively experiment with model quantizations, fine-tuning, and inference pipelines utilizing Ollama, HuggingFace, and ComfyUI—delivering secure, local intelligence that protects data sovereignty while maximizing speed and accuracy.',
				'Bridging systems architecture with modern full-stack product engineering (TypeScript, React, React Native, Node.js, Go, Python), I take complete end-to-end ownership from system design to production scale. This multi-disciplinary capability is the engine behind Aldeon (aldeon.app)—my venture umbrella operating live products like Be Your Stories on Web, iOS, and Android, smart automation engines, and open-source developer tooling.',
			],
			buildingTitle: "What I'm Building Now",
			buildingList: [
				'Expanding Aldeon (aldeon.app) as an autonomous venture studio and multi-product technology ecosystem.',
				'Scaling Be Your Stories across Web, iOS, and Android into a vibrant digital storytelling community.',
				'Engineering enterprise-grade private RAG frameworks and local LLM agents for secure, offline AI inference.',
				'Shipping condo mailroom automation with Pack and generative tattoo tools with TATU Design.',
			],
			principlesTitle: 'Operating Principles',
			principles: [
				{
					title: 'AI & Data as Core Multipliers',
					desc: 'Harness modern AI models and resilient lakehouses to solve real-world bottlenecks, not as speculative tech demos.',
				},
				{
					title: 'Speed with Architectural Rigor',
					desc: 'Iterate with startup agility while enforcing robust typing, modular domain boundaries, and thorough automated testing.',
				},
				{
					title: 'First-Principles Problem Solving',
					desc: 'Strip away accidental complexity, challenge default assumptions, and architect direct, sustainable solutions.',
				},
				{
					title: 'End-to-End Ownership',
					desc: 'Taking complete accountability from system design and model evaluation to deployment, monitoring, and commercial scaling.',
				},
			],
			socialsTitle: 'Connect & Inquire',
			socialsText:
				'Open for venture collaborations, technical exchanges, and building innovative software.',
		},
		contact: {
			heading: "Let's Build Something Exceptional",
			subheading:
				'Interested in exchanging technical ideas, exploring venture collaborations, or building ambitious software? Connect directly.',
			email: 'Send an Email',
			emailAddress: 'contact@celiovieira.com',
			linkedIn: 'LinkedIn Profile',
			gitHub: 'GitHub Projects',
			youTube: 'YouTube Channel',
			xTwitter: 'X / Twitter (@celio1878)',
			substack: 'Substack (@celio1878)',
			note: '',
		},
	},
	'pt-BR': {
		nav: {
			home: 'Início',
			ecosystem: 'Ecossistema Aldeon',
			capabilities: 'Capacidades',
			blog: 'Blog',
			about: 'Sobre Mim',
			contact: 'Vamos Conversar',
			language: 'Idioma',
		},
		hero: {
			title: 'Célio Vieira',
			role: 'Founder, Engenheiro de IA & Dados',
			tagline: 'Arquitetando Sistemas de IA, Lakehouses & Plataformas em Nuvem',
			bio: 'Engenharia de pipelines de IA aplicada, arquitetura de projetos de agentes e arquiteturas de lakehouse — impulsionadas por bases sólidas em Arquitetura de Sistemas Distribuídos e Engenharia de Produtos FullStack.',
			ctaEcosystem: 'Conhecer Ecossistema Aldeon',
			ctaBlog: 'Ler Artigos & Descobertas',
			ctaContact: 'Entrar em Contato',
		},
		ui: {
			menu: 'Menu',
			openMenu: 'Abrir menu de navegação',
			closeMenu: 'Fechar menu de navegação',
			copied: 'Copiado!',
			skipToMain: 'Pular para o conteúdo principal',
		},
		ecosystem: {
			badge: 'Guarda-Chuva de Negócios',
			heading: 'O Ecossistema Aldeon',
			subheading:
				'A Aldeon (aldeon.app) é meu ecossistema tecnológico e estúdio de IA projetado para criar, lançar e operar produtos digitais autônomos, aplicativos e microsserviços.',
			aldeonTitle: 'Aldeon Venture Studio',
			aldeonTagline: 'Ecossistema Autônomo de Produtos & Estúdio de IA Aplicada',
			aldeonDescription:
				'Atuando como a plataforma web central, camada de orquestração e ambiente consolidado para produtos de consumo, automações inteligentes e infraestrutura em nuvem.',
			visitAldeon: 'Acessar aldeon.app',
			productsHeading: 'Projetos Ativos & Aplicativos do Ecossistema',
			bysTitle: 'Be Your Stories (BYS)',
			bysTagline: 'Ecossistema multiplataforma de leitura e publicação na Web, iOS e Android.',
			bysDescription:
				'Plataforma digital para leitores e autores com sincronização offline-first, aplicativos nativos publicados na App Store e Google Play e nuvem serverless escalável.',
			webApp: 'Aplicação Web',
			iosApp: 'App Store (iOS)',
			androidApp: 'Google Play (Android)',
			packTitle: 'Pack',
			packTagline: 'Automação de encomendas e triagem por OCR para condomínios residenciais.',
			packDescription:
				'Solução logística para condomínios com reconhecimento óptico de etiquetas via Gemini OCR, avisos automáticos aos moradores e microsserviços serverless na AWS.',
			tatuTitle: 'TATU Design (T3O2)',
			tatuTagline: 'Estúdio de decalques com IA, visualização em realidade aumentada e portfólio.',
			tatuDescription:
				'Aplicativo para tatuadores com geração de stencils por IA, simulação em realidade aumentada (AR) diretamente na pele e armazenamento seguro em nuvem.',
			postsTitle: 'PostHub',
			postsTagline: 'Motor autônomo de publicação e distribuição de conteúdo multiplataforma.',
			postsDescription:
				'Esteira de distribuição serverless automatizando publicações no LinkedIn, X, Substack e redes sociais com aprimoramentos do Google Gemini.',
			appBuilderTitle: 'NodeJS App Builder',
			appBuilderTagline: 'Gerador de microsserviços CLI e arquitetura limpa publicado no npm.',
			appBuilderDescription:
				'Ferramenta de produtividade para criar APIs em Node.js com arquitetura limpa, linters rigorosos, Docker e testes automatizados de CI.',
			cdkFactoryTitle: 'AWS CDK Factory',
			cdkFactoryTagline: 'Framework de infraestrutura como código para landing zones na AWS.',
			cdkFactoryDescription:
				'Constructs modulares de AWS CDK e esteiras de deploy automatizando topologias multiconas, data lakes e clusters de contêineres com governança.',
			viewNpm: 'Ver Pacote no NPM',
			viewRepo: 'Código Fonte',
		},
		capabilities: {
			badge: 'Pilares Técnicos',
			heading: 'Pilares de Engenharia de IA & Dados',
			subheading:
				'Onde a IA aplicada e sistemas de dados em escala se apoiam em arquitetura robusta e entrega fullstack.',
			items: [
				{
					title: 'IA Aplicada & Modelos LLM Privados',
					description:
						'Arquitetura de pipelines RAG sem vazamento de dados, modelos quantizados locais (Ollama, HuggingFace), busca vetorial híbrida e agentes autônomos orientados a tarefas.',
					tags: [
						'Pipelines RAG',
						'LLMs Locais',
						'Ollama',
						'HuggingFace',
						'Bancos Vetoriais',
						'Embeddings',
						'Agentes',
					],
				},
				{
					title: 'Lakehouses & Engenharia de Dados',
					description:
						'Desenvolvimento de lakehouses streaming e batch para bilhões de eventos com transações ACID, evolução de partições e otimização de custo S3 via Spark e Iceberg.',
					tags: ['Apache Spark', 'Apache Iceberg', 'Kafka', 'Airflow', 'AWS Glue', 'EMR', 'Athena'],
				},
				{
					title: 'Arquitetura de Sistemas Distribuídos',
					description:
						'Design de sistemas orientados a eventos, Domain-Driven Design (DDD), microsserviços transacionais, landing zones automatizadas e governança FinOps em nuvem.',
					tags: ['System Design', 'Event-Driven', 'DDD / TDD', 'Arquitetura AWS', 'Terraform', 'FinOps'],
				},
				{
					title: 'Engenharia Full-Stack de Produtos',
					description:
						'Entrega de software de ponta a ponta: validação, MVP veloz e sistemas multiplataforma robustos na Web, iOS e Android com desempenho de 60 FPS.',
					tags: ['React', 'React Native', 'TypeScript', 'Node.js', 'Go', 'Tailwind CSS'],
				},
			],
		},
		latestInsights: {
			heading: 'Descobertas & Conhecimento',
			subheading:
				'Blueprints práticos de engenharia, retrospectivas de arquitetura e aprendizados de sistemas reais.',
			viewAll: 'Ver Todos os Artigos',
			readArticle: 'Ler Artigo',
			minRead: 'min de leitura',
		},
		blog: {
			title: 'Hub de Conhecimento & Descobertas',
			subtitle: 'Arquitetura de sistemas, engenharia de dados, IA aplicada e lições práticas.',
			searchPlaceholder: 'Pesquisar artigos por tópico, tecnologia ou palavras-chave...',
			filterAll: 'Todos os Tópicos',
			filterLangAll: 'Todos os Idiomas',
			readTime: 'min de leitura',
			publishedOn: 'Publicado em',
			by: 'Por',
			backToBlog: 'Voltar para Artigos',
			share: 'Compartilhar artigo',
			shareOnX: 'Compartilhar no X',
			shareOnLinkedIn: 'Compartilhar no LinkedIn',
			copyLink: 'Copiar Link',
			linkCopied: 'Link copiado para a área de transferência!',
			noPostsFound: 'Nenhum artigo encontrado com esses critérios.',
			exploreVentures: 'Quer discutir este tema ou construir um projeto juntos?',
			substackBanner: 'Publicação Semanal sobre IA & Engenharia de Dados',
			substackText:
				'Acompanhe meu Substack para análises técnicas aprofundadas, arquiteturas de IA aplicada e lições de construção de ventures.',
			substackCta: 'Ler e Assinar no Substack',
		},
		about: {
			heading: 'Sobre Célio Vieira',
			subheading: 'Founder, Engenheiro de IA & Dados',
			missionTitle: 'A Missão',
			missionText:
				'Atuo na convergência entre inteligência artificial aplicada, engenharia de dados em larga escala e criação de novos negócios. Como Founder e Engenheiro de IA & Dados, meu foco é transformar sistemas técnicos complexos em produtos digitais resilientes e de alto impacto. Em vez de tratar tecnologias emergentes como demonstrações conceituais, abordo a engenharia a partir de princípios fundamentais — projetando arquiteturas que escalam sob altas cargas de produção enquanto impulsionam valor de negócio tangível.',
			missionParagraphs: [
				'Atuo na convergência entre inteligência artificial aplicada, engenharia de dados em larga escala e criação de novos negócios. Como Founder e Engenheiro de IA & Dados, meu foco é transformar sistemas técnicos complexos em produtos digitais resilientes e de alto impacto. Em vez de tratar tecnologias emergentes como demonstrações conceituais, abordo a engenharia a partir de princípios fundamentais — projetando arquiteturas que escalam sob altas cargas de produção enquanto impulsionam valor de negócio tangível.',
				'Minha base técnica é fundamentada em engenharia de computação e pós-graduação lato sensu em Processos e Arquitetura de Nuvem (Cloud Computing). Ao longo de anos de atuação arquitetural, desenvolvi sistemas distribuídos de missão crítica — desde microsserviços orientados a eventos com arquitetura hexagonal sobre infraestruturas serverless AWS (Lambda, SQS, EventBridge, DynamoDB) até plataformas de lakehouse em escala de petabytes utilizando Apache Spark, Apache Iceberg, Glue, EMR e Airflow. Especializo-me no desenho de motores de dados streaming e batch que asseguram transações ACID, evolução de partições e eficiência FinOps sem abrir mão de alta vazão.',
				'No universo de IA, minha atuação concentra-se em IA aplicada de alta precisão e infraestruturas privadas sem vazamento de dados. Desenvolvo pipelines de RAG (Geração Aumentada por Recuperação) com busca vetorial híbrida, topologias de raciocínio em grafos de prompts e agentes autônomos orientados a tarefas. Em servidores locais dedicados, atuo no ajuste fino, quantização e esteiras de inferência utilizando Ollama, HuggingFace e ComfyUI — entregando inteligência soberana, rápida e segura.',
				'Integrando arquitetura de sistemas com engenharia de produtos fullstack moderna (TypeScript, React, React Native, Node.js, Go, Python), assumo responsabilidade de ponta a ponta: do desenho técnico à escala em produção. Essa capacidade multidisciplinar é o motor propulsor da Aldeon (aldeon.app) — meu ecossistema de ventures que opera produtos ativos como o Be Your Stories na Web, iOS e Android, automações logísticas e ferramentas de código aberto para desenvolvedores.',
			],
			buildingTitle: 'O Que Estou Construindo Agora',
			buildingList: [
				'Expandindo a Aldeon (aldeon.app) como estúdio de negócios e ecossistema de produtos tecnológicos autônomos.',
				'Evoluindo o Be Your Stories na Web, iOS e Android para conectar leitores e autores globalmente.',
				'Desenvolvendo frameworks empresariais de RAG privado e agentes locais para inferência rápida e segura.',
				'Operando a automação de correspondências Pack e o estúdio de decalques inteligentes TATU Design.',
			],
			principlesTitle: 'Princípios de Atuação',
			principles: [
				{
					title: 'IA & Dados como Multiplicadores',
					desc: 'Empregar IA moderna e lakehouses resilientes para resolver gargalos reais, e não como meras demonstrações conceituais.',
				},
				{
					title: 'Velocidade com Rigor Arquitetural',
					desc: 'Iterar rápido com agilidade de startup sem abrir mão de tipagem estrita, modularidade e testes automatizados.',
				},
				{
					title: 'Pensamento de Primeiros Princípios',
					desc: 'Eliminar complexidade acidental, questionar suposições e desenhar soluções diretas e sustentáveis.',
				},
				{
					title: 'Responsabilidade de Ponta a Ponta',
					desc: 'Desde a concepção do produto e desenho técnico até o deploy, observabilidade, escala e evolução contínua.',
				},
			],
			socialsTitle: 'Conexão & Contato',
			socialsText:
				'Aberto para colaborações em ventures, trocas técnicas e desenvolvimento de software inovador.',
		},
		contact: {
			heading: 'Vamos Construir Algo Excepcional',
			subheading:
				'Interessado em trocar ideias técnicas, explorar parcerias de ventures ou construir software ambicioso? Conecte-se diretamente.',
			email: 'Enviar Email',
			emailAddress: 'contact@celiovieira.com',
			linkedIn: 'Perfil no LinkedIn',
			gitHub: 'Projetos no GitHub',
			youTube: 'Canal no YouTube',
			xTwitter: 'X / Twitter (@celio1878)',
			substack: 'Substack (@celio1878)',
			note: '',
		},
	},
};
