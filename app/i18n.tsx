import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLocale = "en" | "de" | "pt-BR" | "es";

export function detectLocale(): SupportedLocale {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language || "en";
  const lower = nav.toLowerCase();
  if (lower.startsWith("pt-br")) return "pt-BR";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("es")) return "es";
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
  };
  hero: { title: string; subtitle: string; ctaLinkedIn: string };
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
    },
    hero: {
      title: "Celio Vieira",
      subtitle: "Software Engineer • Cloud & Web",
      ctaLinkedIn: "LinkedIn",
    },
    about: {
      heading: "About Me",
      body: "I am a passionate Data Engineer with a strong foundation in software engineering. My expertise lies in designing and building robust, scalable data platforms on AWS, leveraging a diverse tech stack that includes PySpark, Databricks, Kafka, and SQL. I am deeply committed to ensuring data quality, implementing automated testing, and focusing on observability to make complex data ecosystems simpler and more reliable for users. My goal is to optimize both cost and performance without sacrificing reliability.\n\nWith a postgraduate specialization in Cloud Computing Process and Architecture, I bring a unique blend of cloud expertise and software development best practices (like TDD and SOLID principles) to my work. This background enables me to bridge the gap between software and data engineering, allowing me to build high-performance architectures that power analytics, machine learning, and business intelligence. My skills also extend to full-stack development with Python, Go, and Node.js, and modern front-end frameworks like React and Next.js.\n\nBeyond my professional life, I am an avid learner and a firm believer in the value of teaching, mentoring, and knowledge sharing. To relax and unwind, I enjoy a range of hobbies, from playing video games and practicing guitar to working out at the gym. My family, including our pets, is very important to me, and I cherish our walks and time spent together. I also love movies, series, animes, and superhero comics.",
    },
    experience: {
      heading: "Experience",
      items: [
        {
          role: "Data Engineer",
          company: "Banco Itaú Unibanco",
          period: "Jan 2025 – Present (8 months)",
          bullets: [
            "Design and optimize real-time and batch data pipelines using AWS Glue, EMR, Apache Spark, Databricks",
            "Integrations with Kinesis/Kafka; data lake architectures and lakehouse practices",
            "Ensure data quality with automated tests, schema validation, and observability",
            "Deliver analytics-ready datasets for Athena/Redshift and dashboards in QuickSight",
            "Performance and cost optimization across storage/compute workloads",
          ],
        },
        {
          role: "Software Engineer",
          company: "Banco Itaú Unibanco",
          period: "Jul 2022 – Present (3 years 2 months) — Brazil",
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
            "BYS is a platform that people can read book created by other people.",
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
            "Create NodeJS applications with a Serverless handler, easily add routes.",
          description:
            "Create NodeJS applications with a Serverless handler, easily add routes.",
          skillsLabel: "Skills",
          skills: ["JavaScript", "Node.js", "TypeScript"],
          repo: "https://www.npmjs.com/package/nodejs-appbuilder",
        },
        {
          name: "cdk-factory",
          tagline: "AWS CDK factory to build serverless infrastructure.",
          description: "AWS cdk factory to build serverless infrastructure.",
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
        "Go",
        "Node.js",
        "Python",
        "AWS",
        "Railway",
        "Supabase",
        "Firebase",
        "Kafka",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
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
      ],
    },
    certifications: {
      heading: "Certifications",
      items: [
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
    },
    hero: {
      title: "Célio Vieira",
      subtitle: "Softwareentwickler • Cloud & Web",
      ctaLinkedIn: "LinkedIn",
    },
    about: {
      heading: "Über mich",
      body: "Ich bin Data Engineer mit solidem Hintergrund in der Softwareentwicklung. Ich entwerfe Echtzeit‑ und Batch‑Datenplattformen auf AWS (Glue, EMR, Spark, Databricks; Kinesis/Kafka) mit Fokus auf Datenqualität, automatisierte Tests, Observability sowie Kosten/Performance. Mir ist wichtig, komplexe Datenlandschaften für Menschen verständlicher und verlässlicher zu machen. Abseits der Arbeit spiele ich gern Videospiele, spiele Gitarre (und lerne Luthier‑Fertigkeiten), trainiere (das Fitnessstudio entspannt mich), gehe spazieren und spiele mit meiner Familie und unseren Haustieren (Hunde, Katzen, usw.) und schaue Filme, Serien, Anime und Superhelden‑Comics. Wissen zu teilen, zu mentorieren und kontinuierlich zu lernen ist mir wichtig. Postgraduale Spezialisierung in Cloud Computing Process and Architecture (Faculdade Pitágoras).",
    },
    experience: {
      heading: "Erfahrung",
      items: [
        {
          role: "Data Engineer",
          company: "Itaú Unibanco",
          period: "—",
          bullets: [
            "Entwurf und Betrieb großskaliger ETL/ELT‑Pipelines auf AWS mit Glue, EMR, Apache Spark und Databricks",
            "Aufbau von Streaming‑ und Batch‑Integrationen mit Kinesis, Kafka und ereignisgetriebenen Architekturen",
            "Verbesserung von Datenqualität und Zuverlässigkeit durch automatisierte Tests, Schema‑Validierungen und CI/CD",
            "Bereitstellung analysefertiger Datensätze für Athena/Redshift und BI mit QuickSight",
            "Optimierung von Performance und Kosten über Speicher‑ und Rechenlasten hinweg",
          ],
        },
        {
          role: "Software/Backend‑Entwickler",
          company: "Side Projects (BYS, NodeJS App Builder, cdk-factory)",
          period: "—",
          bullets: [
            "End‑to‑End‑Entwicklung über Web, Mobile und Serverless‑Plattformen",
            "Aufbau von APIs und ereignisgetriebenen Services mit Node.js/Go/Python auf AWS (Lambda, API Gateway)",
            "Bereitstellung serverloser Infrastruktur mit AWS CDK; wiederverwendbare Infra‑Module (cdk-factory)",
            "Implementierung von Produktfeatures in React/Next.js sowie React Native/Expo mit CI/CD",
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
        "Go",
        "Node.js",
        "Python",
        "AWS",
        "Railway",
        "Supabase",
        "Firebase",
        "Kafka",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
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
    },
    hero: {
      title: "Célio Vieira",
      subtitle: "Engenheiro de Software • Cloud & Web",
      ctaLinkedIn: "LinkedIn",
    },
    about: {
      heading: "Sobre mim",
      body: "Sou Engenheiro de Dados com sólida base em engenharia de software. Desenho plataformas de dados em tempo real e em batch na AWS (Glue, EMR, Spark, Databricks; Kinesis/Kafka), com foco em qualidade de dados, testes automatizados, observabilidade e custo/performance. Gosto de tornar ecossistemas de dados complexos mais simples e confiáveis para quem usa. Fora do trabalho, gosto de jogar videogame, tocar violão/guitarra (e aprender luteria), treinar (a academia me relaxa), caminhar e brincar com minha família e nossos pets (cães, gatos, etc.) e assistir a filmes, séries, animes e quadrinhos de super‑heróis. Valorizo ensinar, mentorar, compartilhar conhecimento e o aprendizado contínuo. Pós‑graduação em Processos e Arquitetura de Computação em Nuvem (Faculdade Pitágoras).",
    },
    experience: {
      heading: "Experiência",
      items: [
        {
          role: "Engenheiro de Dados",
          company: "Banco Itaú (Itaú Unibanco)",
          period: "jan 2025 – Presente (8 meses)",
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
        "Go",
        "Node.js",
        "Python",
        "AWS",
        "Railway",
        "Supabase",
        "Firebase",
        "Kafka",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
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
    },
    hero: {
      title: "Célio Vieira",
      subtitle: "Ingeniero de Software • Cloud y Web",
      ctaLinkedIn: "LinkedIn",
    },
    about: {
      heading: "Acerca de mí",
      body: "Soy Ingeniero de Datos con base sólida en ingeniería de software. Diseño plataformas de datos en tiempo real y por lotes en AWS (Glue, EMR, Spark, Databricks; Kinesis/Kafka), con foco en calidad de datos, pruebas automatizadas, observabilidad y costo/rendimiento. Disfruto simplificar ecosistemas de datos complejos y hacerlos más confiables para las personas que los usan. Fuera del trabajo, me gusta jugar videojuegos, tocar guitarra (y aprender luthería), entrenar (el gimnasio me relaja), caminar y jugar con mi familia y nuestras mascotas (perros, gatos, etc.) y ver películas, series, anime y cómics de superhéroes. Valoro enseñar, mentorear, compartir conocimiento y el aprendizaje continuo. Posgrado en Cloud Computing Process and Architecture (Faculdade Pitágoras).",
    },
    experience: {
      heading: "Experiencia",
      items: [
        {
          role: "Ingeniero de Datos",
          company: "Banco Itaú (Itaú Unibanco)",
          period: "ene 2025 – Presente (8 meses)",
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
        "Go",
        "Node.js",
        "Python",
        "AWS",
        "Railway",
        "Supabase",
        "Firebase",
        "Kafka",
        "React",
        "Next.js",
        "React Router",
        "Vercel",
        "React Native",
        "Expo",
        "EAS",
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
  const [locale, setLocale] = useState<SupportedLocale>(() => detectLocale());

  useEffect(() => {
    try {
      // Reflect the active language on the <html> element for accessibility
      document.documentElement.setAttribute(
        "lang",
        locale.startsWith("pt") ? "pt-BR" : locale,
      );
    } catch {}
  }, [locale]);

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
  const locale = detectLocale();
  return {
    locale,
    setLocale: () => {},
    dict: dictionaries[locale] ?? dictionaries.en,
  };
}
