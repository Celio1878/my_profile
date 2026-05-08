import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SupportedLocale = "en" | "de" | "pt-BR" | "es";

const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "de", "pt-BR", "es"];
const LOCALE_STORAGE_KEY = "preferred-locale";

/**
 * Map a single BCP-47 language tag (e.g. "pt-PT", "es-MX", "de-AT") to one of
 * our supported locales. Returns null when there is no reasonable match so the
 * caller can keep scanning the `navigator.languages` priority list.
 */
function matchLocale(tag: string): SupportedLocale | null {
  if (!tag) return null;
  const lower = tag.toLowerCase().replace("_", "-");
  const primary = lower.split("-")[0];

  // Portuguese — all variants map to pt-BR (the only Portuguese dictionary we ship)
  if (primary === "pt") return "pt-BR";
  // German — de, de-AT, de-CH, de-DE, ...
  if (primary === "de") return "de";
  // Spanish — es, es-ES, es-MX, es-AR, ca (close cultural fit), gl
  if (primary === "es") return "es";
  // English — en, en-US, en-GB, ...
  if (primary === "en") return "en";

  return null;
}

/**
 * Detects the best matching locale based on (in order):
 *   1. Explicit user preference saved in localStorage
 *   2. `navigator.languages` (full priority list set by the browser/OS)
 *   3. `navigator.language` (single fallback)
 *   4. `"en"` as the ultimate default
 *
 * Safe to call during SSR — returns `"en"` when `navigator` is unavailable.
 */
export function detectLocale(): SupportedLocale {
  if (typeof navigator === "undefined") return "en";

  // 1. Stored user preference wins over auto-detection
  if (typeof localStorage !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && (SUPPORTED_LOCALES as string[]).includes(stored)) {
        return stored as SupportedLocale;
      }
    } catch {
      /* ignore — privacy mode, disabled storage, etc. */
    }
  }

  // 2. & 3. Walk the browser's full language priority list
  const candidates: string[] = [];
  if (Array.isArray(navigator.languages)) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) candidates.push(navigator.language);

  for (const tag of candidates) {
    const match = matchLocale(tag);
    if (match) return match;
  }

  return "en";
}

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
    items: {
      role: string;
      company: string;
      period: string;
      bullets: string[];
    }[];
  };
  education: {
    heading: string;
    items: { degree: string; institution: string; period: string }[];
  };
  certifications: {
    heading: string;
    items: {
      title: string;
      issuer: string;
      issued: string;
      credentialId?: string;
      skillsLabel: string;
      skills: string[];
    }[];
  };
  hobbies: { heading: string; list: string[] };
  projects: {
    heading: string;
    items: {
      name: string;
      tagline: string;
      description: string;
      skillsLabel: string;
      skills: string[];
      repo?: string;
      link?: string;
    }[];
  };
  skills: { heading: string; list: string[] };
  contact: { heading: string; email: string; note: string };
  resume: {
    heading: string;
    description: string;
    viewLabel: string;
    downloadLabel: string;
  };
};

const dictionaries: Record<SupportedLocale, Dictionary> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
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
      title: "Celio Vieira",
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
      heading: "About Me",
      body: "I'm a FullStack, Data, and AI Engineer based in Minas Gerais, Brazil, with over 5 years of professional experience building scalable systems across cloud, web, mobile, and data platforms. Currently acting as Tech Lead at Banco Itaú, I design and optimize real-time and batch data pipelines using AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) and Apache Spark/PySpark, while leading and mentoring my team from requirements gathering to delivery.\n\nI'm deeply passionate about AI engineering — building solutions with LLMs, fine-tuning models using Ollama, ComfyUI, and HuggingFace on local servers, and implementing Retrieval-Augmented Generation (RAG) pipelines. I hold certifications in Prompt Engineering, AI Practitioner, and Responsible AI Practices.\n\nWith a postgraduate specialization in Cloud Computing Process and Architecture, I bridge software and data engineering to build high-performance architectures that power analytics, machine learning, and business intelligence. I apply TDD, SOLID, DDD, and event-driven design across Node.js, Python, Go, and TypeScript stacks.\n\nBeyond work, I'm an avid learner who loves teaching and mentoring. I unwind by playing guitar, working out, gaming, and spending time with my family and pets. I'm also a fan of movies, anime, and superhero comics.",
    },
    experience: {
      heading: "Experience",
      items: [
        {
          role: "Data Engineer & Tech Lead",
          company: "Itaú Unibanco",
          period: "Jan 2025 – Present",
          bullets: [
            "Acting as Tech Lead: managing and mentoring colleagues, leading from requirements gathering to delivery and client feedback",
            "Design and optimize real-time and batch data pipelines using AWS Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg, Hadoop, and Apache Spark",
            "Integrations with Kinesis/Kafka; data lake and lakehouse architectures",
            "Ensure data quality through rigorous testing, schema validation, and observability",
            "Deliver analytics-ready datasets for Athena/Redshift and dashboards in QuickSight",
            "Performance and cost optimization across storage/compute workloads",
            "Languages: Python, JavaScript/TypeScript, Go, Terraform",
          ],
        },
        {
          role: "Software Engineer",
          company: "Itaú Unibanco",
          period: "Jul 2022 – Present — Brazil",
          bullets: [
            "Develop and maintain banking software services (payments and receipts)",
            "Work with cross-functional teams on requirements, design, implementation, and delivery",
            "Practice TDD/BDD, SOLID, YAGNI, DRY; design systems and best practices",
            "AWS stack: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Languages: Node.js, Python; Infrastructure and cloud with AWS",
          ],
        },
        {
          role: "Senior Software Developer",
          company: "Squadra Digital",
          period: "Apr 2022 – Jul 2022 (4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Led development and implementation of chatbot solutions",
            "Collaborated across Frontend, Backend, and DevOps; planning and managing projects",
            "Technologies: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Software Developer",
          company: "Editora Fórum",
          period: "Jan 2022 – Apr 2022 (4 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Managed and evolved the manager system; bookstore user flow",
            "Event-driven hexagonal/layered architecture in Node.js with AWS serverless",
            "Elastic Stack (Elasticsearch/Kibana) for indexing, search, and dashboards",
          ],
        },
        {
          role: "Junior Software Developer",
          company: "Editora Fórum",
          period:
            "Jan 2021 – Jan 2022 (1 year 1 month) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Event-driven hexagonal architecture in Node.js on AWS serverless",
            "Frontend with React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub for project management",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Jan 2021 (1 year 1 month) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Full-stack development across web systems within the organization",
          ],
        },
        {
          role: "Software Developer",
          company: "CIT SENAI",
          period: "May 2019 – Jan 2020 (9 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "IoT/Industry 4.0/automation projects using Arduino, PLC",
            "Built web systems with JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Computer Instructor",
          company: "Feed Idiomas",
          period: "Nov 2018 – Apr 2019 (6 months) — Belo Horizonte, MG, Brazil",
          bullets: [
            "Guided students: AutoCAD, Dreamweaver, Corel Draw, Advanced Office Pack",
            "Technical support and assistance",
          ],
        },
        {
          role: "Software/Backend Engineer",
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
      body: "Ich bin FullStack-, Data- und AI-Engineer aus Minas Gerais, Brasilien, mit über 5 Jahren Berufserfahrung. Derzeit Tech Lead bei Banco Itaú, wo ich Echtzeit- und Batch-Datenpipelines mit AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) und Apache Spark/PySpark entwerfe und optimiere, während ich mein Team von der Anforderungsaufnahme bis zur Lieferung führe und mentore.\n\nIch bin leidenschaftlich an KI-Engineering interessiert — ich entwickle Lösungen mit LLMs, fine-tune Modelle mit Ollama, ComfyUI und HuggingFace auf lokalen Servern und implementiere RAG-Pipelines. Ich halte Zertifizierungen in Prompt Engineering, AI Practitioner und Responsible AI.\n\nMit einem Postgraduiertenstudium in Cloud Computing verbinde ich Software- und Data-Engineering, um hochperformante Architekturen zu bauen. Ich wende TDD, SOLID, DDD und ereignisgetriebenes Design in Node.js-, Python-, Go- und TypeScript-Stacks an.\n\nAbseits der Arbeit spiele ich Videospiele, Gitarre, trainiere, gehe spazieren mit meiner Familie und Haustieren und schaue Filme, Serien, Anime und Superhelden-Comics.",
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
            "Integrationen mit Kinesis/Kafka; Data-Lake- und Lakehouse-Architekturen",
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
            "Frontend mit React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; Jira/Trello/GitHub für Projektmanagement",
          ],
        },
        {
          role: "Full Stack Developer",
          company: "Editora Fórum",
          period:
            "Jan 2020 – Jan 2021 (1 Jahr 1 Monat) — Belo Horizonte, MG, Brasilien",
          bullets: [
            "Full-Stack-Entwicklung von Web-Systemen innerhalb der Organisation",
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
      description:
        "Meinen vollständigen Lebenslauf als PDF ansehen oder herunterladen.",
      viewLabel: "Inline ansehen",
      downloadLabel: "PDF herunterladen",
    },
  },
  "pt-BR": {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      education: "Formação",
      certifications: "Certificações",
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
        "Engenheiro FullStack • Engenheiro de Dados • Engenheiro de IA | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "Canal do YouTube",
    },
    ui: {
      skipToMain: "Ir para o conteúdo principal",
      menu: "Menu",
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
      body: "Sou Engenheiro FullStack, de Dados e de IA baseado em Minas Gerais, Brasil, com mais de 5 anos de experiência profissional. Atualmente atuando como Tech Lead no Banco Itaú, projeto e otimizo pipelines de dados em tempo real e batch usando AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) e Apache Spark/PySpark, enquanto lidero e mentoro meu time desde o levantamento de requisitos até a entrega.\n\nSou apaixonado por engenharia de IA — construindo soluções com LLMs, fine-tuning de modelos com Ollama, ComfyUI e HuggingFace em servidores locais, e implementando pipelines de RAG. Possuo certificações em Prompt Engineering, AI Practitioner e Responsible AI.\n\nCom pós-graduação em Cloud Computing, conecto engenharia de software e dados para construir arquiteturas de alta performance. Aplico TDD, SOLID, DDD e design orientado a eventos em stacks Node.js, Python, Go e TypeScript.\n\nFora do trabalho, gosto de jogar videogame, tocar guitarra, treinar, caminhar com minha família e pets, e assistir filmes, séries, animes e quadrinhos de super-heróis.",
    },
    experience: {
      heading: "Experiência",
      items: [
        {
          role: "Engenheiro de Dados & Tech Lead",
          company: "Banco Itaú (Itaú Unibanco)",
          period: "jan 2025 – Presente",
          bullets: [
            "Desenhar e otimizar pipelines de dados em tempo real e batch (Glue, EMR, Spark, Databricks)",
            "Integrações com Kinesis/Kafka; arquitetura de data lake e lakehouse",
            "Garantir qualidade de dados com testes automatizados, validação de esquemas e observabilidade",
            "Entregar datasets prontos para Athena/Redshift e dashboards no QuickSight",
            "Otimização de performance e custos em storage/compute",
          ],
        },
        {
          role: "Engenheiro de Software",
          company: "Banco Itaú",
          period: "jul 2022 – Presente (3 anos 2 meses) — Brasil",
          bullets: [
            "Desenvolvimento e manutenção de serviços bancários (pagamentos e recibos)",
            "Trabalho com times multidisciplinares: requisitos, design, implementação e entrega",
            "TDD/BDD, SOLID, YAGNI, DRY; boas práticas e design de sistemas",
            "Stack AWS: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Linguagens: Node.js, Python; infraestrutura em AWS",
          ],
        },
        {
          role: "Desenvolvedor de Software Sênior",
          company: "Squadra Digital",
          period: "abr 2022 – jul 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Liderança no desenvolvimento e implantação de soluções de chatbots",
            "Colaboração em Frontend, Backend e DevOps; planejamento e gestão de projetos",
            "Tecnologias: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Desenvolvedor de Software",
          company: "Editora Fórum",
          period: "jan 2022 – abr 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Responsável pelo sistema de gestão; fluxo da livraria (área do usuário)",
            "Arquitetura hexagonal/event-driven em Node.js com AWS serverless",
            "Elastic Stack (Elasticsearch/Kibana) para indexação, busca e dashboards",
          ],
        },
        {
          role: "Desenvolvedor de Software Júnior",
          company: "Editora Fórum",
          period:
            "jan 2021 – jan 2022 (1 ano 1 mês) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Arquitetura hexagonal orientada a eventos em Node.js na AWS serverless",
            "Frontend com React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; gestão com Jira/Trello/GitHub",
          ],
        },
        {
          role: "Desenvolvedor Full Stack",
          company: "Editora Fórum",
          period:
            "jan 2020 – jan 2021 (1 ano 1 mês) — Belo Horizonte, MG, Brasil",
          bullets: ["Desenvolvimento full stack de sistemas web internos"],
        },
        {
          role: "Desenvolvedor de Software",
          company: "CIT SENAI",
          period: "mai 2019 – jan 2020 (9 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Projetos de IoT/Indústria 4.0/automação com Arduino e CLP",
            "Sistemas web com JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Instrutor de Informática",
          company: "Feed Idiomas",
          period: "nov 2018 – abr 2019 (6 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Orientação a alunos: AutoCAD, Dreamweaver, Corel Draw, Pacote Office Avançado",
            "Suporte técnico e assistência",
          ],
        },
        {
          role: "Engenheiro de Software/Backend",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "Desenvolvimento fim a fim (web/mobile/serverless)",
            "APIs e serviços orientados a eventos com Node.js/Go/Python na AWS",
            "Infra serverless com AWS CDK; módulos reutilizáveis (cdk-factory)",
            "React/Next.js e React Native/Expo com CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Hobbies",
      list: [
        "Jogar videogame",
        "Tocar violão/guitarra e aprender luteria",
        "Treinar — a academia me relaxa",
        "Caminhar e brincar com minha família e animais (cães, gatos, etc.)",
        "Filmes, séries, animes e quadrinhos de super‑heróis",
      ],
    },
    projects: {
      heading: "Projetos",
      items: [
        {
          name: "Be Your Stories (BYS)",
          tagline:
            "BYS é uma plataforma onde pessoas podem ler livros criados por outras pessoas.",
          description:
            "BYS é uma plataforma onde pessoas podem ler livros criados por outras pessoas.",
          skillsLabel: "Competências",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Desenvolvimento Full Stack",
            "Python",
            "AWS",
            "Docker",
            "Next.js",
            "AWS Lambda",
            "TypeScript",
            "NoSQL",
            "TDD",
            "Princípios SOLID",
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
            "Crie aplicações NodeJS com um handler Serverless e adicione rotas facilmente.",
          description:
            "Crie aplicações NodeJS com um handler Serverless e adicione rotas facilmente.",
          skillsLabel: "Competências",
          skills: ["JavaScript", "Node.js", "TypeScript"],
        },
        {
          name: "cdk-factory",
          tagline:
            "Fábrica de AWS CDK para construir infraestrutura serverless.",
          description:
            "Fábrica de AWS CDK para construir infraestrutura serverless.",
          skillsLabel: "Competências",
          skills: ["JavaScript", "AWS", "TypeScript"],
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
      heading: "Formação",
      items: [
        {
          degree:
            "Pós-graduação — Processos e Arquitetura de Computação em Nuvem",
          institution: "Faculdade Pitágoras",
          period: "Ago 2021 – Fev 2022",
        },
        {
          degree: "Bacharelado — Ciência da Computação",
          institution: "Faculdade Pitágoras",
          period: "Ago 2019 – Jul 2021",
        },
        {
          degree: "Bacharelado — Engenharia de Computação",
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
          title: "Fundamentos de Engenharia de Prompt",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["Engenharia de Prompt", "LLM", "IA", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["IA", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Práticas de IA Responsável",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competências",
          skills: ["Ética em IA", "IA Responsável", "AWS"],
        },
        {
          title: "AWS Knowledge: Serverless",
          issuer: "Amazon Web Services (AWS)",
          issued: "jul 2025",
          credentialId: "c38a0fcd-b515-44e5-b4e6-009d66dda4c4",
          skillsLabel: "Competências",
          skills: [
            "API Gateway",
            "AWS",
            "Computação em Nuvem",
            "Aplicações em Nuvem",
            "AWS Lambda",
            "Serverless",
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
          skillsLabel: "Competências",
          skills: ["Go"],
        },
        {
          title: "SQL para Desenvolvedores",
          issuer: "desenvolvedor.io",
          issued: "nov 2023",
          credentialId: "064ce485-8785-478b-b182-762072f473ec",
          skillsLabel: "Competências",
          skills: ["SQL"],
        },
        {
          title: "Dominando o Apache Kafka",
          issuer: "desenvolvedor.io",
          issued: "out 2023",
          credentialId: "7356c88e-24b9-40b2-aa07-13333947fc07",
          skillsLabel: "Competências",
          skills: ["Apache Kafka"],
        },
        {
          title: "AWS Solutions Architect - Associate",
          issuer: "Udemy",
          issued: "ago 2022",
          credentialId: "UC-735116c9-2bd9-458a-bdec-827c7f7a0c16",
          skillsLabel: "Competências",
          skills: ["AWS"],
        },
        {
          title:
            "Proposta de Geração de Energia a Partir da Energia Cinética da Água",
          issuer: "Centro Universitário Una",
          issued: "jul 2018",
          skillsLabel: "Competências",
          skills: [],
        },
        {
          title: "CertiProf Continuous Learner",
          issuer: "CertiProf",
          issued: "ago 2020 – ago 2022",
          skillsLabel: "Competências",
          skills: [],
        },
      ],
    },
    contact: {
      heading: "Contato",
      email: "Fale comigo no LinkedIn",
      note: "Mais detalhes estão no meu perfil do LinkedIn.",
    },
    resume: {
      heading: "Currículo",
      description: "Veja ou baixe meu currículo completo em PDF.",
      viewLabel: "Ver incorporado",
      downloadLabel: "Baixar PDF",
    },
  },
  es: {
    nav: {
      about: "Acerca de",
      experience: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      hobbies: "Pasatiempos",
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
        "Ingeniero FullStack • Ingeniero de Datos • Ingeniero de IA | Cloud | Web | Mobile",
      ctaLinkedIn: "LinkedIn",
      ctaYouTube: "YouTube",
      ariaYouTube: "Canal de YouTube",
    },
    ui: {
      skipToMain: "Saltar al contenido principal",
      menu: "Menu",
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
      heading: "Acerca de mí",
      body: "Soy Ingeniero FullStack, de Datos e IA con base en Minas Gerais, Brasil, con más de 5 años de experiencia profesional. Actualmente como Tech Lead en Banco Itaú, diseño y optimizo pipelines de datos en tiempo real y batch usando AWS (Glue, EMR, Athena, Redshift, Kinesis, Airflow, Iceberg) y Apache Spark/PySpark, mientras lidero y mentoreo a mi equipo desde la toma de requisitos hasta la entrega.\n\nSoy apasionado por la ingeniería de IA — construyendo soluciones con LLMs, fine-tuning de modelos con Ollama, ComfyUI y HuggingFace en servidores locales, e implementando pipelines de RAG. Tengo certificaciones en Prompt Engineering, AI Practitioner y Responsible AI.\n\nCon un posgrado en Cloud Computing, conecto ingeniería de software y datos para construir arquitecturas de alto rendimiento. Aplico TDD, SOLID, DDD y diseño orientado a eventos en stacks Node.js, Python, Go y TypeScript.\n\nFuera del trabajo, disfruto videojuegos, guitarra, entrenar, caminar con mi familia y mascotas, y ver películas, series, anime y cómics de superhéroes.",
    },
    experience: {
      heading: "Experiencia",
      items: [
        {
          role: "Ingeniero de Datos & Tech Lead",
          company: "Banco Itaú (Itaú Unibanco)",
          period: "ene 2025 – Presente",
          bullets: [
            "Diseñar y optimizar pipelines de datos en tiempo real y batch (Glue, EMR, Spark, Databricks)",
            "Integraciones con Kinesis/Kafka; arquitecturas de data lake y lakehouse",
            "Asegurar calidad de datos con pruebas automatizadas, validación de esquemas y observabilidad",
            "Entregar datasets listos para Athena/Redshift y BI con QuickSight",
            "Optimización de rendimiento y costos en storage/compute",
          ],
        },
        {
          role: "Ingeniero de Software",
          company: "Banco Itaú",
          period: "jul 2022 – Presente (3 años 2 meses) — Brasil",
          bullets: [
            "Desarrollar y mantener servicios bancarios (pagos y recibos)",
            "Trabajo con equipos multifuncionales: requisitos, diseño, implementación y entrega",
            "TDD/BDD, SOLID, YAGNI, DRY; buenas prácticas y diseño de sistemas",
            "Stack AWS: Lambda, API Gateway, SQS, EventBridge, DynamoDB",
            "Lenguajes: Node.js, Python; infraestructura en AWS",
          ],
        },
        {
          role: "Desarrollador de Software Senior",
          company: "Squadra Digital",
          period: "abr 2022 – jul 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Lideró el desarrollo e implementación de soluciones de chatbots",
            "Colaboración en Frontend, Backend y DevOps; planificación y gestión de proyectos",
            "Tecnologías: Node.js, Next.js, AWS (Amplify, API Gateway, DynamoDB, S3)",
          ],
        },
        {
          role: "Desarrollador de Software",
          company: "Editora Fórum",
          period: "ene 2022 – abr 2022 (4 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Responsable por el sistema de gestión; flujo de usuario de la librería",
            "Arquitectura hexagonal y dirigida por eventos en Node.js con AWS serverless",
            "Elastic Stack (Elasticsearch/Kibana) para indexación, búsqueda y dashboards",
          ],
        },
        {
          role: "Desarrollador de Software Junior",
          company: "Editora Fórum",
          period:
            "ene 2021 – ene 2022 (1 año 1 mes) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Arquitectura hexagonal orientada a eventos en Node.js sobre AWS serverless",
            "Frontend con React/Next.js (Ant Design, MSW, React Hook Form/Formik, Tailwind, AG-Grid)",
            "TDD, SOLID, Strategy; gestión con Jira/Trello/GitHub",
          ],
        },
        {
          role: "Desarrollador Full Stack",
          company: "Editora Fórum",
          period:
            "ene 2020 – ene 2021 (1 año 1 mes) — Belo Horizonte, MG, Brasil",
          bullets: ["Desarrollo full stack de sistemas web internos"],
        },
        {
          role: "Desarrollador de Software",
          company: "CIT SENAI",
          period: "may 2019 – ene 2020 (9 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Proyectos de IoT/Industria 4.0/automatización con Arduino y PLC",
            "Sistemas web con JavaScript, MongoDB, MySQL",
          ],
        },
        {
          role: "Instructor de Informática",
          company: "Feed Idiomas",
          period: "nov 2018 – abr 2019 (6 meses) — Belo Horizonte, MG, Brasil",
          bullets: [
            "Orientación a estudiantes: AutoCAD, Dreamweaver, Corel Draw, Paquete Office Avanzado",
            "Soporte técnico y asistencia",
          ],
        },
        {
          role: "Ingeniero de Software/Backend",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "Desarrollo end-to-end (web/mobile/serverless)",
            "APIs y servicios dirigidos por eventos con Node.js/Go/Python en AWS",
            "Infra serverless con AWS CDK; módulos reutilizables (cdk-factory)",
            "React/Next.js y React Native/Expo con CI/CD",
          ],
        },
      ],
    },
    hobbies: {
      heading: "Pasatiempos",
      list: [
        "Jugar videojuegos",
        "Tocar guitarra y aprender luthería",
        "Entrenar — el gimnasio me relaja",
        "Caminar y jugar con mi familia y animales (perros, gatos, etc.)",
        "Películas, series, anime y cómics de superhéroes",
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
            "BYS es una plataforma en la que las personas pueden leer libros creados por otras personas.",
          skillsLabel: "Competencias",
          skills: [
            "JavaScript",
            "Node.js",
            "Go",
            "React.js",
            "Desarrollo full stack",
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
            "Crea aplicaciones NodeJS con un handler Serverless y agrega rutas fácilmente.",
          description:
            "Crea aplicaciones NodeJS con un handler Serverless y agrega rutas fácilmente.",
          skillsLabel: "Competencias",
          skills: ["JavaScript", "Node.js", "TypeScript"],
        },
        {
          name: "cdk-factory",
          tagline:
            "Fábrica de AWS CDK para construir infraestructura serverless.",
          description:
            "Fábrica de AWS CDK para construir infraestructura serverless.",
          skillsLabel: "Competencias",
          skills: ["JavaScript", "AWS", "TypeScript"],
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
          degree: "Posgrado — Cloud Computing Process and Architecture",
          institution: "Faculdade Pitágoras",
          period: "Ago 2021 – Feb 2022",
        },
        {
          degree: "Licenciatura — Ciencias de la Computación",
          institution: "Faculdade Pitágoras",
          period: "Ago 2019 – Jul 2021",
        },
        {
          degree: "Licenciatura — Ingeniería Informática",
          institution: "Centro Universitário Una",
          period: "Ago 2013 – Jun 2019",
        },
        {
          degree: "Operaciones de Procesos de Instalación Eléctrica",
          institution: "SENAI BH CECOTEG",
          period: "Jun 2018 – Dic 2018",
        },
      ],
    },
    certifications: {
      heading: "Certificaciones",
      items: [
        {
          title: "Fundamentos de Ingeniería de Prompts",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competencias",
          skills: ["Ingeniería de Prompts", "LLM", "IA", "AWS"],
        },
        {
          title: "Artificial Intelligence Practitioner",
          issuer: "Amazon Web Services (AWS)",
          issued: "2025",
          skillsLabel: "Competencias",
          skills: ["IA", "Machine Learning", "AWS", "Cloud AI"],
        },
        {
          title: "Prácticas de IA Responsable",
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
            "Computación en la Nube",
            "Aplicaciones en la Nube",
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
        {
          title: "CertiProf Continuous Learner",
          issuer: "CertiProf",
          issued: "ago 2020 – ago 2022",
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

const LocaleContext = createContext<{
  locale: SupportedLocale;
  setLocale: (l: SupportedLocale) => void;
  dict: Dictionary;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Initialize with "en" on both server and first client render to avoid
  // hydration mismatches; the real browser-based locale is applied right after
  // mount in the effect below.
  const [locale, setLocaleState] = useState<SupportedLocale>("en");

  // Detect & apply the browser/stored locale once on the client
  useEffect(() => {
    const detected = detectLocale();
    if (detected !== locale) setLocaleState(detected);
    // Intentionally run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect the active language on <html lang> for accessibility & SEO,
  // and persist explicit user choices.
  useEffect(() => {
    try {
      document.documentElement.setAttribute(
        "lang",
        locale.startsWith("pt") ? "pt-BR" : locale,
      );
    } catch {}
  }, [locale]);

  const setLocale = (l: SupportedLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      /* storage unavailable — silently keep in-memory value */
    }
  };

  const dict = useMemo(() => dictionaries[locale] ?? dictionaries.en, [locale]);

  const value = useMemo(() => ({ locale, setLocale, dict }), [locale, dict]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx;
  // Fallback to a safe default if the provider isn't mounted yet
  const locale: SupportedLocale = "en";
  return {
    locale,
    setLocale: () => {},
    dict: dictionaries[locale] ?? dictionaries.en,
  };
}
