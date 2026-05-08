import type { Route } from "./+types/home";
import { Nav } from "~/components/nav";
import { Hero } from "~/components/sections/hero";
import { About } from "~/components/sections/about";
import { Experience } from "~/components/sections/experience";
import { Education } from "~/components/sections/education";
import { Certifications } from "~/components/sections/certifications";
import { Skills } from "~/components/sections/skills";
import { Projects } from "~/components/sections/projects";
import { Showcase } from "~/components/sections/showcase";
import { Resume } from "~/components/sections/resume";
import { Footer } from "~/components/sections/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Célio Vieira — FullStack · Data · AI Engineer" },
    {
      name: "description",
      content:
        "Célio Vieira — FullStack, Data & AI Engineer. Tech Lead at Banco Itaú. Cloud, Web, Mobile, LLMs, RAG, PySpark, AWS.",
    },
    {
      name: "keywords",
      content:
        "Célio Vieira, fullstack engineer, data engineer, ai engineer, aws, react, node.js, python, go, pyspark, databricks, llm, rag",
    },
    { name: "author", content: "Célio Vieira" },
    {
      property: "og:title",
      content: "Célio Vieira — FullStack · Data · AI Engineer",
    },
    {
      property: "og:description",
      content:
        "Tech Lead at Banco Itaú. Building scalable cloud, data & AI systems.",
    },
    { property: "og:url", content: "https://celiovieira.com/" },
    { property: "og:type", content: "profile" },
    { property: "og:image", content: "https://celiovieira.com/me.jpeg" },
    { property: "og:site_name", content: "Célio Vieira Portfolio" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Célio Vieira — FullStack · Data · AI Engineer",
    },
    {
      name: "twitter:description",
      content:
        "Tech Lead at Banco Itaú. Building scalable cloud, data & AI systems.",
    },
    { name: "twitter:image", content: "https://celiovieira.com/me.jpeg" },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "canonical", href: "https://celiovieira.com/" },
];

export default function Home() {
  return (
    <main id="main" role="main" aria-label="Main content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Célio Vieira",
            url: "https://celiovieira.com/",
            image: "https://celiovieira.com/me.jpeg",
            jobTitle: "FullStack, Data & AI Engineer",
            worksFor: {
              "@type": "Organization",
              name: "Itaú Unibanco",
            },
            sameAs: [
              "https://www.linkedin.com/in/celio-vieira",
              "https://github.com/Celio1878",
              "https://www.youtube.com/@celio_vieira",
            ],
            description:
              "Célio Vieira is a FullStack, Data & AI Engineer and Tech Lead at Banco Itaú, specializing in Cloud, Web, Mobile, LLMs, and RAG.",
          }),
        }}
      />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certifications />
      <Skills />
      <Projects />
      <Showcase />
      <Resume />
      <Footer />
    </main>
  );
}
