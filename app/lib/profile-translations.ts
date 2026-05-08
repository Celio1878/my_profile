import { yearsExperience } from "~/utils/dates";

export type SupportedLocale = "en" | "de" | "pt-BR" | "es";

export type Dictionary = {
  nav: {
    about: string;
    experience: string;
    education: string;
    certifications: string;
    hobbies: string;
    skills: string;
    contact: string;
    language: string;
    resume: string;
    projects: string;
    bys: string;
    appBuilder: string;
    cdkFactory: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaLinkedIn: string;
    ctaYouTube: string;
    ariaYouTube: string;
  };
  ui: {
    skipToMain: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    theme: {
      titleLight: string;
      titleDark: string;
      srLightMode: string;
      srDarkMode: string;
    };
  };
  about: { heading: string; body: string };
  experience: {
    heading: string;
    items: Array<{
      role: string;
      company: string;
      period: string;
      bullets: string[];
    }>;
  };
  hobbies: { heading: string; list: string[] };
  projects: {
    heading: string;
    items: Array<{
      name: string;
      tagline: string;
      description: string;
      skillsLabel: string;
      skills: string[];
      link?: string;
      repo?: string;
    }>;
  };
  skills: { heading: string; list: string[] };
  education: {
    heading: string;
    items: Array<{ degree: string; institution: string; period: string }>;
  };
  certifications: {
    heading: string;
    items: Array<{
      title: string;
      issuer: string;
      issued: string;
      credentialId?: string;
      skillsLabel: string;
      skills: string[];
    }>;
  };
  contact: { heading: string; email: string; note: string };
  resume: {
    heading: string;
    description: string;
    viewLabel: string;
    downloadLabel: string;
  };
};

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      certifications: "Certs",
      hobbies: "Hobbies",
      skills: "Skills",
      contact: "Contact",
      language: "Language",
      resume: "Resume",
      projects: "Projects",
      bys: "BYS",
      appBuilder: "App Builder",
      cdkFactory: "CDK Factory",
    },
    hero: {
      title: "Célio Vieira",
      subtitle:
        "FullStack Engineer • Data Engineer • AI Engineer | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "YouTube channel",
    },
    ui: {
      skipToMain: "Skip to main content",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      theme: {
        titleLight: "Switch to light theme",
        titleDark: "Switch to dark theme",
        srLightMode: "Light mode",
        srDarkMode: "Dark mode",
      },
    },
    about: {
      heading: "About me",
      body: `I am a FullStack, Data, and AI Engineer, with over ${yearsExperience} years of professional experience. Currently a Tech Lead at Banco Itaú, where I design and optimize real-time and batch data pipelines using AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) and Apache Spark/PySpark, while leading and mentoring my team from requirement gathering to delivery.\n\nI am deeply passionate about AI engineering — developing solutions with LLMs, fine-tuning models using Ollama, ComfyUI, and HuggingFace on local servers, and implementing RAG pipelines. I hold certifications in Prompt Engineering, AI Practitioner, and Responsible AI.\n\nWith a postgraduate degree in Cloud Computing, I bridge the gap between software and data engineering to build high-performance architectures. I apply TDD, SOLID, DDD, and event-driven design across Node.js, Python, Go, and TypeScript stacks.\n\nOutside of work, I enjoy playing video games, guitar, working out, walking and playing with my family and pets, and watching movies, series, anime, and superhero comics.`,
    },
    experience: {
      heading: "Experience",
      items: [
        {
          role: "Software/Data Engineer & Tech Lead",
          company: "Itaú Unibanco",
          period: "Jul 2022 – Present — Remote",
          bullets: [
            "Tech Lead: Leading and mentoring peers from requirement gathering to delivery",
            "Design and optimize real-time and batch data pipelines using AWS Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg, and Apache Spark",
            "Integrations with Kinesis/Kafka; Data Lake and Lakehouse architectures",
            "Ensure data quality through testing, schema validation, and observability",
            "Deliver analysis-ready datasets for Athena/Redshift and QuickSight dashboards",
            "Performance and cost optimization across storage/compute workloads",
            "Languages: Python, JavaScript/TypeScript, Go, Terraform",
          ],
        },
        {
          role: "Software Engineer",
          company: "Itaú Unibanco",
          period: "Jul 2022 – Present — Brazil",
          bullets: [
            "Develop and maintain banking software services (Payments and Receipts)",
            "Work with cross-functional teams on requirements, design, implementation, and delivery",
            "TDD/BDD, SOLID, YAGNI, DRY; system design and best practices",
            "AWS Stack: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Languages: Node.js, Python; Infrastructure and cloud with AWS",
          ],
        },
        {
          role: "Senior Software Developer",
          company: "Squadra Digital",
          period: "Apr 2022 – Jul 2022 (4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Led development and implementation of chatbot solutions",
            "Collaborated on frontend, backend, and DevOps; planning and project management",
            "Technologies: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Apr 2022 (2 yr 4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Maintained management system and bookstore user flow",
            "Event-driven hexagonal architecture in Node.js with AWS Serverless",
            "Elastic Stack (Elasticsearch/Kibana) for indexing, searching, and dashboards",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Apr 2022 (2 yr 4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Event-driven hexagonal architecture in Node.js on AWS Serverless",
            "Frontend with React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub for project management",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Apr 2022 (2 yr 4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Full-stack development of web systems within the organization",
          ],
        },
        {
          role: "Software Developer",
          company: "CIT SENAI",
          period: "May 2019 – Jan 2020 (9 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "IoT/Industry 4.0/Automation projects using Arduino, PLC",
            "Web systems developed with JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Computer Instructor",
          company: "Feed Idiomas",
          period: "Nov 2018 – Apr 2019 (6 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Assisted students: AutoCAD, Dreamweaver, Corel Draw, Office Package Advanced",
            "Technical support and assistance",
          ],
        },
        {
          role: "Software/Backend Developer",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "End-to-end development across web/mobile/serverless",
            "APIs and event-driven services with Node.js/Go/Python on AWS",
            "Serverless infra with AWS CDK; reusable modules (cdk-factory)",
            "React/Next.js and React Native/Expo with CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Hobbies",
      list: [
        "Playing video games",
        "Playing guitar and learning luthier skills",
        "Working out — the gym relaxes me",
        "Walking and playing with my family and animals (dogs, cats, etc.)",
        "Watching movies, series, anime, and superhero comics",
      ],
    },
    projects: {
      heading: "Projects",
      items: [
        {
          name: "Be Your Stories (BYS)",
          tagline:
            "A platform where readers can read books created by other people.",
          description:
            "Publish your books to the world and share them with your friends, read new books and get recommendations from other readers, help writers to grow and be a part of the community, and more.",
          skillsLabel: "Skills",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Full‑stack Development",
            "Python",
            "AWS",
            "Docker",
            "Next.js",
            "AWS Lambda",
            "TypeScript",
            "NoSQL",
            "TDD",
            "SOLID",
            "DDD",
            "Meilisearch",
            "Supabase",
            "React Native",
            "Expo",
            "AWS Glue",
            "API Gateways",
            "Stripe",
          ],
          link: "https://beyourstories.com",
        },
        {
          name: "NodeJS APP Builder",
          tagline:
            "Create NodeJS applications with a Serverless handler, handle routes easily.",
          description:
            "Library to help you to handle NodeJS Serverless applications, handle routes, security, tests, and more.",
          skillsLabel: "Skills",
          skills: ["JavaScript", "Node.js", "TypeScript"],
          repo: "https://www.npmjs.com/package/nodejs-appbuilder",
        },
        {
          name: "cdk-factory",
          tagline: "AWS CDK factory to build serverless infrastructure.",
          description:
            "Library to help you to build serverless infrastructure with AWS CDK, reusable modules, and more.",
          skillsLabel: "Skills",
          skills: ["JavaScript", "AWS", "TypeScript"],
          repo: "https://www.npmjs.com/package/cdk-factory",
        },
      ],
    },
    skills: {
      heading: "Skills",
      list: [
        "SQL",
        "PySpark",
        "Databricks",
        "DataMesh",
        "Apache Spark",
        "Apache Airflow",
        "Apache Iceberg",
        "Kafka",
        "Go",
        "Node.js",
        "Python",
        "TypeScript",
        "Terraform",
        "AWS",
        "AWS Glue",
        "AWS EMR",
        "AWS Athena",
        "AWS Redshift",
        "AWS Lambda",
        "AWS Kinesis",
        "Railway",
        "Supabase",
        "Firebase",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
        "Ollama",
        "HuggingFace",
        "RAG",
        "LLM Fine-tuning",
        "ComfyUI",
        "Docker",
        "TDD",
        "SOLID",
        "DDD",
      ],
    },
    education: {
      heading: "Education",
      items: [
        {
          degree: "Postgraduate — Cloud Computing Process and Architecture",
          institution: "Pitagoras College",
          period: "Aug 2021 – Feb 2022",
        },
        {
          degree: "Bachelor — Computer Science",
          institution: "Pitagoras College",
          period: "Aug 2019 – Jul 2021",
        },
        {
          degree: "Bachelor — Computer Engineering",
          institution: "Centro Universitário Una",
          period: "Aug 2013 – Jun 2019",
        },
        {
          degree: "Electrical Installation Process Operations",
          institution: "SENAI BH CECOTEG",
          period: "Jun 2018 – Dec 2018",
        },
      ],
    },
    certifications: {
      heading: "Certifications",
      items: [
        {
          title: "Essentials of Prompt Engineering",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Skills",
          skills: ["Prompt Engineering", "LLM", "AI", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Skills",
          skills: ["AI", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Responsible Artificial Intelligence Practices",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Skills",
          skills: ["AI Ethics", "Responsible AI", "AWS"],
        },
        {
          title: "AWS Knowledge: Serverless",
          issuer: "Amazon Web Services (AWS)",
          issued: "Jul 2025",
          credentialId: "c38a0fcd-b515-44e5-b4e6-009d66dda4c4",
          skillsLabel: "Skills",
          skills: [
            "API Gateway",
            "AWS",
            "Cloud Computing",
            "Cloud Applications",
            "AWS Lambda",
            "Serverless Computing",
            "Amazon DynamoDB",
            "Amazon SQS",
            "Amazon SNS",
            "AWS IAM",
            "AWS SAM",
            "AWS Step Functions",
          ],
        },
        {
          title: "Go: The Complete Developer's Guide",
          issuer: "Udemy",
          issued: "Nov 2023",
          credentialId: "UC-bc0659f2-d151-40eb-8500-1bf08edf9d97",
          skillsLabel: "Skills",
          skills: ["Go"],
        },
        {
          title: "SQL for Developers",
          issuer: "desenvolvedor.io",
          issued: "Nov 2023",
          credentialId: "064ce485-8785-478b-b182-762072f473ec",
          skillsLabel: "Skills",
          skills: ["SQL"],
        },
        {
          title: "Mastering Apache Kafka",
          issuer: "desenvolvedor.io",
          issued: "Oct 2023",
          credentialId: "7356c88e-24b9-40b2-aa07-13333947fc07",
          skillsLabel: "Skills",
          skills: ["Apache Kafka"],
        },
        {
          title: "AWS Solutions Architect - Associate",
          issuer: "Udemy",
          issued: "Aug 2022",
          credentialId: "UC-735116c9-2bd9-458a-bdec-827c7f7a0c16",
          skillsLabel: "Skills",
          skills: ["AWS"],
        },
        {
          title: "Energy Generation from the Kinetic Energy of Water (Project)",
          issuer: "Centro Universitário Una",
          issued: "Jul 2018",
          skillsLabel: "Skills",
          skills: [],
        },
      ],
    },
    contact: {
      heading: "Contact",
      email: "Contact me via LinkedIn",
      note: "More details are available on my LinkedIn profile.",
    },
    resume: {
      heading: "Resume",
      description: "View or download my full resume as a PDF.",
      viewLabel: "View inline",
      downloadLabel: "Download PDF",
    },
  },
  de: {
    nav: {
      about: "Über mich",
      experience: "Erfahrung",
      education: "Ausbildung",
      certifications: "Zertifizierungen",
      hobbies: "Hobbys",
      skills: "Fähigkeiten",
      contact: "Kontakt",
      language: "Sprache",
      resume: "Lebenslauf",
      projects: "Projekte",
      bys: "BYS",
      appBuilder: "App Builder",
      cdkFactory: "CDK Factory",
    },
    hero: {
      title: "Célio Vieira",
      subtitle:
        "FullStack Engineer • Data Engineer • AI Engineer | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "YouTube-Kanal",
    },
    ui: {
      skipToMain: "Zum Hauptinhalt springen",
      menu: "Speisekarte",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      theme: {
        titleLight: "Zum hellen Theme wechseln",
        titleDark: "Zum dunklen Theme wechseln",
        srLightMode: "Heller Modus",
        srDarkMode: "Dunkler Modus",
      },
    },
    about: {
      heading: "Über mich",
      body: `Ich bin FullStack-, Data- und AI-Engineer, mit über ${yearsExperience} Jahren Berufserfahrung. Derzeit Tech Lead bei Banco Itaú, wo ich Echtzeit- und Batch-Datenpipelines mit AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) und Apache Spark/PySpark entwerfe und optimiere, während ich mein Team von der Anforderungsaufnahme bis zur Lieferung führe und mentore. Ich bin leidenschaftlich an KI-Engineering interessiert — ich entwickle Lösungen mit LLMs, fine-tune Modelle mit Ollama, ComfyUI und HuggingFace auf lokalen Servern und implementiere RAG-Pipelines. Ich halte Zertifizierungen in Prompt Engineering, AI Practitioner und Responsible AI. Mit einem Postgraduiertenstudium in Cloud Computing verbinde ich Software- und Data-Engineering, um hochperformante Architekturen zu bauen. Ich wende TDD, SOLID, DDD und ereignisgetriebenes Design in Node.js-, Python-, Go- und TypeScript-Stacks an. Abseits der Arbeit spiele ich Videospiele, Gitarre, trainiere, gehe spazieren mit meiner Familie und Haustieren und schaue Filme, Serien, Anime und Superhelden-Comics.`,
    },
    experience: {
      heading: "Erfahrung",
      items: [
        {
          role: "Data Engineer & Tech Lead",
          company: "Itaú Unibanco",
          period: "Jan 2025 – Gegenwart",
          bullets: [
            "Tech Lead: Kollegen führen und mentoren, von der Anforderungsaufnahme bis zur Lieferung",
            "Echtzeit- und Batch-Datenpipelines mit AWS Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg und Apache Spark entwerfen und optimieren",
            "Integrationen with Kinesis/Kafka; Data-Lake- und Lakehouse-Architekturen",
            "Datenqualität durch Tests, Schema-Validierung und Observability sicherstellen",
            "Analysefertige Datasets für Athena/Redshift und QuickSight-Dashboards liefern",
            "Performance- und Kostenoptimierung über Storage/Compute-Workloads",
            "Sprachen: Python, JavaScript/TypeScript, Go, Terraform",
          ],
        },
        {
          role: "Software Engineer",
          company: "Itaú Unibanco",
          period: "Jul 2022 – Gegenwart — Brasilien",
          bullets: [
            "Banking-Softwareservices entwickeln und warten (Zahlungen und Belege)",
            "Mit funktionsübergreifenden Teams an Anforderungen, Design, Implementierung und Lieferung arbeiten",
            "TDD/BDD, SOLID, YAGNI, DRY; Systemdesign und Best Practices",
            "AWS-Stack: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Sprachen: Node.js, Python; Infrastruktur und Cloud mit AWS",
          ],
        },
        {
          role: "Senior Software Developer",
          company: "Squadra Digital",
          period:
            "Apr 2022 – Jul 2022 (4 Monate) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Entwicklung und Implementierung von Chatbot-Lösungen geleitet",
            "Zusammenarbeit in Frontend, Backend und DevOps; Planung und Projektmanagement",
            "Technologien: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2022 – Apr 2022 (4 Monate) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Verwaltungssystem und Buchhandel-Benutzerfluss betreut",
            "Ereignisgetriebene hexagonale Architektur in Node.js mit AWS Serverless",
            "Elastic Stack (Elasticsearch/Kibana) für Indexierung, Suche und Dashboards",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2021 – Jan 2022 (1 Jahr 1 Monat) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Ereignisgetriebene hexagonale Architektur in Node.js auf AWS Serverless",
            "Frontend with React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub für Projektmanagement",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Jan 2021 (1 Jahr 1 Monat) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Full-stack development of web systems within the organization",
          ],
        },
        {
          role: "Software Developer",
          company: "CIT SENAI",
          period:
            "Mai 2019 – Jan 2020 (9 Monate) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "IoT/Industrie 4.0/Automatisierungsprojekte mit Arduino, SPS",
            "Web-Systeme mit JavaScript, MongoDB, MySQL entwickelt",
          ],
        },
        {
          role: "Computer-Instructor",
          company: "Feed Idiomas",
          period:
            "Nov 2018 – Apr 2019 (6 Monate) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Schüler betreut: AutoCAD, Dreamweaver, Corel Draw, Office-Paket Fortgeschritten",
            "Technischer Support und Unterstützung",
          ],
        },
        {
          role: "Software/Backend-Entwickler",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "End-to-End-Entwicklung über Web, Mobile und Serverless-Plattformen",
            "APIs und ereignisgetriebene Services mit Node.js/Go/Python auf AWS",
            "Serverlose Infrastruktur mit AWS CDK; wiederverwendbare Module (cdk-factory)",
            "React/Next.js und React Native/Expo mit CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Hobbys",
      list: [
        "Videospiele spielen",
        "Gitarre spielen und Luthier‑Fertigkeiten lernen",
        "Training – das Fitnessstudio entspannt mich",
        "Spazierengehen und mit meiner Familie und Tieren (Hunde, Katzen, usw.) spielen",
        "Filme, Serien, Anime und Superhelden‑Comics",
      ],
    },
    projects: {
      heading: "Projekte",
      items: [
        {
          name: "Be Your Stories (BYS)",
          tagline:
            "Eine Plattform, auf der Leser Bücher lesen können, die von anderen erstellt wurden.",
          description:
            "BYS ist eine Plattform, auf der Menschen Bücher lesen können, die von anderen erstellt wurden.",
          skillsLabel: "Kompetenzen",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Full‑Stack‑Entwicklung",
            "Python",
            "AWS",
            "Docker",
            "Next.js",
            "AWS Lambda",
            "TypeScript",
            "NoSQL",
            "TDD",
            "SOLID",
            "DDD",
            "Meilisearch",
            "Supabase",
            "React Native",
            "Expo",
            "AWS Glue",
            "API Gateways",
            "Stripe",
          ],
        },
        {
          name: "NodeJS APP Builder",
          tagline:
            "Erstelle NodeJS‑Anwendungen mit einem Serverless‑Handler und füge leicht Routen hinzu.",
          description:
            "Erstelle NodeJS‑Anwendungen mit einem Serverless‑Handler und füge leicht Routen hinzu.",
          skillsLabel: "Kompetenzen",
          skills: ["JavaScript", "Node.js", "TypeScript"],
        },
        {
          name: "cdk-factory",
          tagline: "AWS CDK Factory zum Aufbau serverloser Infrastruktur.",
          description: "AWS CDK Factory zum Aufbau serverloser Infrastruktur.",
          skillsLabel: "Kompetenzen",
          skills: ["JavaScript", "AWS", "TypeScript"],
        },
      ],
    },
    skills: {
      heading: "Fähigkeiten",
      list: [
        "SQL",
        "PySpark",
        "Databricks",
        "DataMesh",
        "Apache Spark",
        "Apache Airflow",
        "Apache Iceberg",
        "Kafka",
        "Go",
        "Node.js",
        "Python",
        "TypeScript",
        "Terraform",
        "AWS",
        "AWS Glue",
        "AWS EMR",
        "AWS Athena",
        "AWS Redshift",
        "AWS Lambda",
        "AWS Kinesis",
        "Railway",
        "Supabase",
        "Firebase",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
        "Ollama",
        "HuggingFace",
        "RAG",
        "LLM Fine-tuning",
        "ComfyUI",
        "Docker",
        "TDD",
        "SOLID",
        "DDD",
      ],
    },
    education: {
      heading: "Ausbildung",
      items: [
        {
          degree:
            "Postgraduiertenstudium — Cloud Computing Process and Architecture",
          institution: "Faculdade Pitágoras (Pitagoras College)",
          period: "Aug. 2021 – Feb. 2022",
        },
        {
          degree: "Bachelor — Informatik (Computer Science)",
          institution: "Faculdade Pitágoras (Pitagoras College)",
          period: "Aug. 2019 – Jul. 2021",
        },
        {
          degree: "Bachelor — Computer Engineering",
          institution: "Centro Universitário Una",
          period: "Aug. 2013 – Jun. 2019",
        },
        {
          degree: "Electrical Installation Process Operations",
          institution: "SENAI BH CECOTEG",
          period: "Jun. 2018 – Dez. 2018",
        },
      ],
    },
    certifications: {
      heading: "Zertifizierungen",
      items: [
        {
          title: "Grundlagen des Prompt Engineering",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Kompetenzen",
          skills: ["Prompt Engineering", "LLM", "KI", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Kompetenzen",
          skills: ["KI", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Verantwortungsvolle KI-Praktiken",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Kompetenzen",
          skills: ["KI-Ethik", "Responsible AI", "AWS"],
        },
        {
          title: "AWS Knowledge: Serverless",
          issuer: "Amazon Web Services (AWS)",
          issued: "Juli 2025",
          credentialId: "c38a0fcd-b515-44e5-b4e6-009d66dda4c4",
          skillsLabel: "Kompetenzen",
          skills: [
            "API Gateway",
            "AWS",
            "Cloud Computing",
            "Cloud Applications",
            "AWS Lambda",
            "Serverless Computing",
            "Amazon DynamoDB",
            "Amazon SQS",
            "Amazon SNS",
            "AWS IAM",
            "AWS SAM",
            "AWS Step Functions",
          ],
        },
        {
          title: "Go: The Complete Developer's Guide",
          issuer: "Udemy",
          issued: "Nov. 2023",
          credentialId: "UC-bc0659f2-d151-40eb-8500-1bf08edf9d97",
          skillsLabel: "Kompetenzen",
          skills: ["Go"],
        },
        {
          title: "SQL für Entwickler",
          issuer: "desenvolvedor.io",
          issued: "Nov. 2023",
          credentialId: "064ce485-8785-478b-b182-762072f473ec",
          skillsLabel: "Kompetenzen",
          skills: ["SQL"],
        },
        {
          title: "Apache Kafka meistern",
          issuer: "desenvolvedor.io",
          issued: "Okt. 2023",
          credentialId: "7356c88e-24b9-40b2-aa07-13333947fc07",
          skillsLabel: "Kompetenzen",
          skills: ["Apache Kafka"],
        },
        {
          title: "AWS Solutions Architect - Associate",
          issuer: "Udemy",
          issued: "Aug. 2022",
          credentialId: "UC-735116c9-2bd9-458a-bdec-827c7f7a0c16",
          skillsLabel: "Kompetenzen",
          skills: ["AWS"],
        },
        {
          title:
            "Energiegewinnung aus der kinetischen Energie des Wassers (Projekt)",
          issuer: "Centro Universitário Una",
          issued: "Juli 2018",
          skillsLabel: "Kompetenzen",
          skills: [],
        },
        {
          title: "CertiProf Continuous Learner",
          issuer: "CertiProf",
          issued: "Aug. 2020 – Aug. 2022",
          skillsLabel: "Kompetenzen",
          skills: [],
        },
      ],
    },
    contact: {
      heading: "Kontakt",
      email: "Kontakt über LinkedIn",
      note: "Weitere Details finden Sie auf meinem LinkedIn‑Profil.",
    },
    resume: {
      heading: "Lebenslauf",
      description: "Lebenslauf im PDF‑Format ansehen oder herunterladen.",
      viewLabel: "Inline ansehen",
      downloadLabel: "PDF herunterladen",
    },
  },
  "pt-BR": {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      education: "Formação",
      certifications: "Certs",
      hobbies: "Hobbies",
      skills: "Habilidades",
      contact: "Contato",
      language: "Idioma",
      resume: "Currículo",
      projects: "Projetos",
      bys: "BYS",
      appBuilder: "App Builder",
      cdkFactory: "CDK Factory",
    },
    hero: {
      title: "Célio Vieira",
      subtitle:
        "FullStack Engineer • Data Engineer • AI Engineer | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "Canal no YouTube",
    },
    ui: {
      skipToMain: "Pular para o conteúdo principal",
      menu: "Cardápio",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      theme: {
        titleLight: "Mudar para tema claro",
        titleDark: "Mudar para tema escuro",
        srLightMode: "Modo claro",
        srDarkMode: "Modo escuro",
      },
    },
    about: {
      heading: "Sobre mim",
      body: `Sou um Engenheiro FullStack, de Dados e de IA, com mais de ${yearsExperience} anos de experiência profissional. Atualmente sou Tech Lead no Banco Itaú, onde projeto e otimizo pipelines de dados em tempo real e batch usando AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) e Apache Spark/PySpark, enquanto lidero e mentoro minha equipe desde o levantamento de requisitos até a entrega.\n\nSou profundamente apaixonado por engenharia de IA — desenvolvendo soluções com LLMs, fine-tuning de modelos usando Ollama, ComfyUI e HuggingFace em servidores locais e implementando pipelines RAG. Possuo certificações em Prompt Engineering, AI Practitioner e Responsible AI.\n\nCom pós-graduação em Cloud Computing, faço a ponte entre engenharia de software e de dados para construir arquiteturas de alta performance. Aplico TDD, SOLID, DDD e design orientado a eventos em stacks Node.js, Python, Go e TypeScript.\n\nFora do trabalho, gosto de jogar videogame, tocar guitarra, treinar, passear e brincar com minha família e pets, e assistir filmes, séries, animes e quadrinhos de super-heróis.`,
    },
    experience: {
      heading: "Experiência",
      items: [
        {
          role: "Data Engineer & Tech Lead",
          company: "Itaú Unibanco",
          period: "Jan 2025 – Presente",
          bullets: [
            "Tech Lead: Liderando e mentorando pares desde o levantamento de requisitos até a entrega",
            "Projetar e otimizar pipelines de dados em tempo real e batch usando AWS Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg e Apache Spark",
            "Integrações com Kinesis/Kafka; arquiteturas Data Lake e Lakehouse",
            "Garantir a qualidade dos dados por meio de testes, validação de esquema e observabilidade",
            "Entregar datasets prontos para análise para Athena/Redshift e dashboards QuickSight",
            "Otimização de performance e custo em workloads de storage/compute",
            "Linguagens: Python, JavaScript/TypeScript, Go, Terraform",
          ],
        },
        {
          role: "Software Engineer",
          company: "Itaú Unibanco",
          period: "Jul 2022 – Presente — Brasil",
          bullets: [
            "Desenvolver e manter serviços de software bancário (Pagamentos e Recebimentos)",
            "Trabalhar com equipes multifuncionais em requisitos, design, implementação e entrega",
            "TDD/BDD, SOLID, YAGNI, DRY; design de sistemas e melhores práticas",
            "Stack AWS: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Linguagens: Node.js, Python; Infraestrutura e nuvem com AWS",
          ],
        },
        {
          role: "Senior Software Developer",
          company: "Squadra Digital",
          period: "Abr 2022 – Jul 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Liderou o desenvolvimento e a implementação de soluções de chatbot",
            "Colaborou no frontend, backend e DevOps; planejamento e gerenciamento de projetos",
            "Tecnologias: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Software Developer",
          company: "Editora Fórum",
          period: "Jan 2022 – Abr 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Manteve o sistema de gerenciamento e o fluxo de usuários da livraria",
            "Arquitetura hexagonal orientada a eventos em Node.js com AWS Serverless",
            "Elastic Stack (Elasticsearch/Kibana) para indexação, busca e dashboards",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2021 – Jan 2022 (1 ano e 1 mês) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Arquitetura hexagonal orientada a eventos em Node.js no AWS Serverless",
            "Frontend with React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub para gerenciamento de projetos",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Jan 2021 (1 ano e 1 mês) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Desenvolvimento full-stack de sistemas web dentro da organização",
          ],
        },
        {
          role: "Software Developer",
          company: "CIT SENAI",
          period: "Mai 2019 – Jan 2020 (9 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Projetos de IoT/Indústria 4.0/Automação usando Arduino, CLP",
            "Sistemas web desenvolvidos com JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Instrutor de Informática",
          company: "Feed Idiomas",
          period: "Nov 2018 – Abr 2019 (6 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Auxiliou alunos: AutoCAD, Dreamweaver, Corel Draw, Pacote Office Avançado",
            "Suporte técnico e assistência",
          ],
        },
        {
          role: "Desenvolvedor Software/Backend",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "Desenvolvimento ponta a ponta em plataformas web, mobile e serverless",
            "APIs e serviços orientados a eventos com Node.js/Go/Python na AWS",
            "Infraestrutura serverless com AWS CDK; módulos reutilizáveis (cdk-factory)",
            "React/Next.js e React Native/Expo com CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Passatempos",
      list: [
        "Jogar videogame",
        "Tocar guitarra e aprender habilidades de luthier",
        "Treinar — a academia me relaxa",
        "Caminhar e brincar com minha família e animais (cães, gatos, etc.)",
        "Assistir filmes, séries, animes e quadrinhos de super‑heróis",
      ],
    },
    projects: {
      heading: "Projetos",
      items: [
        {
          name: "Be Your Stories (BYS)",
          tagline:
            "Uma plataforma onde os leitores podem ler livros criados por outras pessoas.",
          description:
            "Publique seus livros para o mundo e compartilhe-os com seus amigos, leia novos livros e receba recomendações de outros leitores, ajude escritores a crescer e faça parte da comunidade e muito mais.",
          skillsLabel: "Competências",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Desenvolvimento Full‑stack",
            "Python",
            "AWS",
            "Docker",
            "Next.js",
            "AWS Lambda",
            "TypeScript",
            "NoSQL",
            "TDD",
            "SOLID",
            "DDD",
            "Meilisearch",
            "Supabase",
            "React Native",
            "Expo",
            "AWS Glue",
            "API Gateways",
            "Stripe",
          ],
          link: "https://beyourstories.com",
        },
        {
          name: "NodeJS APP Builder",
          tagline:
            "Crie aplicativos NodeJS com um manipulador Serverless, manipule rotas facilmente.",
          description:
            "Biblioteca para ajudá-lo a lidar com aplicativos NodeJS Serverless, lidar com rotas, segurança, testes e muito mais.",
          skillsLabel: "Competências",
          skills: ["JavaScript", "Node.js", "TypeScript"],
          repo: "https://www.npmjs.com/package/nodejs-appbuilder",
        },
        {
          name: "cdk-factory",
          tagline: "Fábrica AWS CDK para construir infraestrutura serverless.",
          description:
            "Biblioteca para ajudá-lo a construir infraestrutura serverless com AWS CDK, módulos reutilizáveis e muito mais.",
          skillsLabel: "Competências",
          skills: ["JavaScript", "AWS", "TypeScript"],
          repo: "https://www.npmjs.com/package/cdk-factory",
        },
      ],
    },
    skills: {
      heading: "Habilidades",
      list: [
        "SQL",
        "PySpark",
        "Databricks",
        "DataMesh",
        "Apache Spark",
        "Apache Airflow",
        "Apache Iceberg",
        "Kafka",
        "Go",
        "Node.js",
        "Python",
        "TypeScript",
        "Terraform",
        "AWS",
        "AWS Glue",
        "AWS EMR",
        "AWS Athena",
        "AWS Redshift",
        "AWS Lambda",
        "AWS Kinesis",
        "Railway",
        "Supabase",
        "Firebase",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
        "Ollama",
        "HuggingFace",
        "RAG",
        "LLM Fine-tuning",
        "ComfyUI",
        "Docker",
        "TDD",
        "SOLID",
        "DDD",
      ],
    },
    education: {
      heading: "Educação",
      items: [
        {
          degree: "Pós-graduação — Arquitetura e Processo de Cloud Computing",
          institution: "Faculdade Pitágoras",
          period: "Ago 2021 – Fev 2022",
        },
        {
          degree: "Bacharel — Ciência da Computação",
          institution: "Faculdade Pitágoras",
          period: "Ago 2019 – Jul 2021",
        },
        {
          degree: "Bacharel — Engenharia de Computação",
          institution: "Centro Universitário Una",
          period: "Ago 2013 – Jun 2019",
        },
        {
          degree: "Operações de Processos de Instalações Elétricas",
          institution: "SENAI BH CECOTEG",
          period: "Jun 2018 – Dez 2018",
        },
      ],
    },
    certifications: {
      heading: "Certificações",
      items: [
        {
          title: "Essentials of Prompt Engineering",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["Prompt Engineering", "LLM", "IA", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["IA", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Responsible Artificial Intelligence Practices",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["Ética em IA", "IA Responsável", "AWS"],
        },
        {
          title: "AWS Knowledge: Serverless",
          issuer: "Amazon Web Services (AWS)",
          issued: "Jul 2025",
          credentialId: "c38a0fcd-b515-44e5-b4e6-009d66dda4c4",
          skillsLabel: "Competências",
          skills: [
            "API Gateway",
            "AWS",
            "Cloud Computing",
            "Cloud Applications",
            "AWS Lambda",
            "Serverless Computing",
            "Amazon DynamoDB",
            "Amazon SQS",
            "Amazon SNS",
            "AWS IAM",
            "AWS SAM",
            "AWS Step Functions",
          ],
        },
        {
          title: "Go: The Complete Developer's Guide",
          issuer: "Udemy",
          issued: "Nov 2023",
          credentialId: "UC-bc0659f2-d151-40eb-8500-1bf08edf9d97",
          skillsLabel: "Competências",
          skills: ["Go"],
        },
        {
          title: "SQL para Desenvolvedores",
          issuer: "desenvolvedor.io",
          issued: "Nov 2023",
          credentialId: "064ce485-8785-478b-b182-762072f473ec",
          skillsLabel: "Competências",
          skills: ["SQL"],
        },
        {
          title: "Dominando Apache Kafka",
          issuer: "desenvolvedor.io",
          issued: "Out 2023",
          credentialId: "7356c88e-24b9-40b2-aa07-13333947fc07",
          skillsLabel: "Competências",
          skills: ["Apache Kafka"],
        },
        {
          title: "AWS Solutions Architect - Associate",
          issuer: "Udemy",
          issued: "Ago 2022",
          credentialId: "UC-735116c9-2bd9-458a-bdec-827c7f7a0c16",
          skillsLabel: "Competências",
          skills: ["AWS"],
        },
        {
          title:
            "Proposta de Geração de Energia a partir da Energia Cinética da Água",
          issuer: "Centro Universitário Una",
          issued: "Jul 2018",
          skillsLabel: "Competências",
          skills: [],
        },
      ],
    },
    contact: {
      heading: "Contato",
      email: "Contate-me via LinkedIn",
      note: "Mais detalhes estão disponíveis no meu perfil do LinkedIn.",
    },
    resume: {
      heading: "Currículo",
      description: "Visualize ou baixe meu currículo completo em PDF.",
      viewLabel: "Ver inline",
      downloadLabel: "Baixar PDF",
    },
  },
  es: {
    nav: {
      about: "Sobre",
      experience: "Experiencia",
      education: "Formación",
      certifications: "Certs",
      hobbies: "Aficiones",
      skills: "Habilidades",
      contact: "Contacto",
      language: "Idioma",
      resume: "Currículum",
      projects: "Proyectos",
      bys: "BYS",
      appBuilder: "App Builder",
      cdkFactory: "CDK Factory",
    },
    hero: {
      title: "Célio Vieira",
      subtitle:
        "FullStack Engineer • Data Engineer • AI Engineer | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "Canal de YouTube",
    },
    ui: {
      skipToMain: "Saltar al contenido principal",
      menu: "Menú",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      theme: {
        titleLight: "Cambiar al tema claro",
        titleDark: "Cambiar al tema oscuro",
        srLightMode: "Modo claro",
        srDarkMode: "Modo oscuro",
      },
    },
    about: {
      heading: "Sobre mí",
      body: `Soy un ingeniero FullStack, de datos y de IA, con más de ${yearsExperience} años de experiencia profesional. Actualmente soy Tech Lead en el Banco Itaú, donde diseño y optimizo pipelines de datos en tiempo real y batch utilizando AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) y Apache Spark/PySpark, mientras lidero y asesoro a mi equipo desde la toma de requisitos hasta la entrega. Me apasiona profundamente la ingeniería de IA: desarrollo soluciones con LLMs, ajusto modelos usando Ollama, ComfyUI y HuggingFace en servidores locales e implemento pipelines RAG. Cuento con certificaciones en Prompt Engineering, AI Practitioner y Responsible AI. Con un posgrado en Cloud Computing, cierro la brecha entre la ingeniería de software y de datos para construir arquitecturas de alto rendimiento. Aplico TDD, SOLID, DDD y diseño orientado a eventos en stacks de Node.js, Python, Go y TypeScript. Fuera del trabajo, disfruto jugar videojuegos, tocar la guitarra, hacer ejercicio, caminar y jugar con mi familia y mascotas, y ver películas, series, anime y cómics de superhéroes.`,
    },
    experience: {
      heading: "Experiencia",
      items: [
        {
          role: "Data Engineer & Tech Lead",
          company: "Itaú Unibanco",
          period: "ene 2025 – Presente",
          bullets: [
            "Tech Lead: Liderazgo y mentoría de pares desde la toma de requisitos hasta la entrega",
            "Diseñar y optimizar pipelines de datos en tiempo real y batch usando AWS Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg y Apache Spark",
            "Integraciones with Kinesis/Kafka; arquitecturas Data Lake y Lakehouse",
            "Garantizar la calidad de los datos mediante pruebas, validación de esquemas y observabilidad",
            "Entregar conjuntos de datos listos para el análisis para Athena/Redshift y tableros de QuickSight",
            "Optimización de rendimiento y costos en cargas de trabajo de almacenamiento/cómputo",
            "Lenguajes: Python, JavaScript/TypeScript, Go, Terraform",
          ],
        },
        {
          role: "Software Engineer",
          company: "Itaú Unibanco",
          period: "jul 2022 – Presente — Brasil",
          bullets: [
            "Desarrollar y mantener servicios de software bancario (Pagos y Recibos)",
            "Trabajar con equipos multifuncionales en requisitos, diseño, implementación y entrega",
            "TDD/BDD, SOLID, YAGNI, DRY; diseño de sistemas y mejores prácticas",
            "Stack de AWS: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Lenguajes: Node.js, Python; Infraestructura y nube con AWS",
          ],
        },
        {
          role: "Senior Software Developer",
          company: "Squadra Digital",
          period: "abr 2022 – jul 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Liderazgo en el desarrollo e implementación de soluciones de chatbot",
            "Colaboración en frontend, backend y DevOps; planificación y gestión de proyectos",
            "Tecnologías: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Software Developer",
          company: "Editora Fórum",
          period: "ene 2022 – abr 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Mantenimiento del sistema de gestión y flujo de usuarios de la librería",
            "Arquitectura hexagonal orientada a eventos en Node.js con AWS Serverless",
            "Elastic Stack (Elasticsearch/Kibana) para indexación, búsqueda y tableros",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Editora Fórum",
          period:
            "ene 2021 – ene 2022 (1 año y 1 mes) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Arquitectura hexagonal orientada a eventos en Node.js en AWS Serverless",
            "Frontend with React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub para la gestión de proyectos",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "ene 2020 – ene 2021 (1 año y 1 mes) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Full-stack development of web systems within the organization",
          ],
        },
        {
          role: "Software Developer",
          company: "CIT SENAI",
          period: "may 2019 – ene 2020 (9 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Proyectos de IoT/Industria 4.0/Automatización con Arduino, PLC",
            "Sistemas web desarrollados con JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Instructor de Informática",
          company: "Feed Idiomas",
          period: "nov 2018 – abr 2019 (6 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Asistencia a estudiantes: AutoCAD, Dreamweaver, Corel Draw, Paquete Office Avanzado",
            "Soporte técnico y asistencia",
          ],
        },
        {
          role: "Desarrollador de Software/Backend",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "Desarrollo de extremo a extremo en plataformas web, móviles y serverless",
            "APIs y servicios orientados a eventos con Node.js/Go/Python en AWS",
            "Infraestructura serverless con AWS CDK; módulos reutilizables (cdk-factory)",
            "React/Next.js y React Native/Expo con CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Aficiones",
      list: [
        "Jugar videojuegos",
        "Tocar la guitarra y aprender habilidades de luthier",
        "Hacer ejercicio: el gimnasio me relaja",
        "Caminar y jugar con mi familia y mascotas (perros, gatos, etc.)",
        "Ver películas, series, anime y cómics de superhéroes",
      ],
    },
    projects: {
      heading: "Proyectos",
      items: [
        {
          name: "Be Your Stories (BYS)",
          tagline:
            "Una plataforma donde los lectores pueden leer libros creados por otras personas.",
          description:
            "Publica tus libros al mundo y compártelos con tus amigos, lee nuevos libros y obtén recomendaciones de otros lectores, ayuda a los escritores a crecer y forma parte de la comunidad, y más.",
          skillsLabel: "Competencias",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Desarrollo Full‑stack",
            "Python",
            "AWS",
            "Docker",
            "Next.js",
            "AWS Lambda",
            "TypeScript",
            "NoSQL",
            "TDD",
            "SOLID",
            "DDD",
            "Meilisearch",
            "Supabase",
            "React Native",
            "Expo",
            "AWS Glue",
            "API Gateways",
            "Stripe",
          ],
          link: "https://beyourstories.com",
        },
        {
          name: "NodeJS APP Builder",
          tagline:
            "Crea aplicaciones NodeJS con un controlador Serverless, maneja rutas fácilmente.",
          description:
            "Biblioteca para ayudarte a manejar aplicaciones NodeJS Serverless, manejar rutas, seguridad, pruebas y más.",
          skillsLabel: "Competencias",
          skills: ["JavaScript", "Node.js", "TypeScript"],
          repo: "https://www.npmjs.com/package/nodejs-appbuilder",
        },
        {
          name: "cdk-factory",
          tagline:
            "Fábrica de AWS CDK para construir infraestructura serverless.",
          description:
            "Biblioteca para ayudarte a construir infraestructura serverless con AWS CDK, módulos reutilizables y más.",
          skillsLabel: "Competencias",
          skills: ["JavaScript", "AWS", "TypeScript"],
          repo: "https://www.npmjs.com/package/cdk-factory",
        },
      ],
    },
    skills: {
      heading: "Habilidades",
      list: [
        "SQL",
        "PySpark",
        "Databricks",
        "DataMesh",
        "Apache Spark",
        "Apache Airflow",
        "Apache Iceberg",
        "Kafka",
        "Go",
        "Node.js",
        "Python",
        "TypeScript",
        "Terraform",
        "AWS",
        "AWS Glue",
        "AWS EMR",
        "AWS Athena",
        "AWS Redshift",
        "AWS Lambda",
        "AWS Kinesis",
        "Railway",
        "Supabase",
        "Firebase",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
        "Ollama",
        "HuggingFace",
        "RAG",
        "LLM Fine-tuning",
        "ComfyUI",
        "Docker",
        "TDD",
        "SOLID",
        "DDD",
      ],
    },
    education: {
      heading: "Educación",
      items: [
        {
          degree: "Posgrado — Arquitectura y Proceso de Cloud Computing",
          institution: "Pitagoras College",
          period: "ago 2021 – feb 2022",
        },
        {
          degree: "Grado — Ciencias de la Computación",
          institution: "Pitagoras College",
          period: "ago 2019 – jul 2021",
        },
        {
          degree: "Grado — Ingeniería Informática",
          institution: "Centro Universitário Una",
          period: "ago 2013 – jun 2019",
        },
        {
          degree: "Operaciones de Proceso de Instalaciones Eléctricas",
          institution: "SENAI BH CECOTEG",
          period: "jun 2018 – dic 2018",
        },
      ],
    },
    certifications: {
      heading: "Certificaciones",
      items: [
        {
          title: "Essentials of Prompt Engineering",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competencias",
          skills: ["Prompt Engineering", "LLM", "IA", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competencias",
          skills: ["IA", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Responsible Artificial Intelligence Practices",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competencias",
          skills: ["Ética en IA", "IA Responsable", "AWS"],
        },
        {
          title: "AWS Knowledge: Serverless",
          issuer: "Amazon Web Services (AWS)",
          issued: "jul 2025",
          credentialId: "c38a0fcd-b515-44e5-b4e6-009d66dda4c4",
          skillsLabel: "Competencias",
          skills: [
            "API Gateway",
            "AWS",
            "Cloud Computing",
            "Cloud Applications",
            "AWS Lambda",
            "Serverless Computing",
            "Amazon DynamoDB",
            "Amazon SQS",
            "Amazon SNS",
            "AWS IAM",
            "AWS SAM",
            "AWS Step Functions",
          ],
        },
        {
          title: "Go: The Complete Developer's Guide",
          issuer: "Udemy",
          issued: "nov 2023",
          credentialId: "UC-bc0659f2-d151-40eb-8500-1bf08edf9d97",
          skillsLabel: "Competencias",
          skills: ["Go"],
        },
        {
          title: "SQL para Desarrolladores",
          issuer: "desenvolvedor.io",
          issued: "nov 2023",
          credentialId: "064ce485-8785-478b-b182-762072f473ec",
          skillsLabel: "Competencias",
          skills: ["SQL"],
        },
        {
          title: "Dominando Apache Kafka",
          issuer: "desenvolvedor.io",
          issued: "oct 2023",
          credentialId: "7356c88e-24b9-40b2-aa07-13333947fc07",
          skillsLabel: "Competencias",
          skills: ["Apache Kafka"],
        },
        {
          title: "AWS Solutions Architect - Associate",
          issuer: "Udemy",
          issued: "ago 2022",
          credentialId: "UC-735116c9-2bd9-458a-bdec-827c7f7a0c16",
          skillsLabel: "Competencias",
          skills: ["AWS"],
        },
        {
          title:
            "Propuesta de Generación de Energía a partir de la Energía Cinética del Agua",
          issuer: "Centro Universitário Una",
          issued: "jul 2018",
          skillsLabel: "Competencias",
          skills: [],
        },
      ],
    },
    contact: {
      heading: "Contacto",
      email: "Contáctame por LinkedIn",
      note: "Más detalles en mi perfil de LinkedIn.",
    },
    resume: {
      heading: "Currículum",
      description: "Ver o descargar mi CV completo en PDF.",
      viewLabel: "Ver integrado",
      downloadLabel: "Descargar PDF",
    },
  },
};
