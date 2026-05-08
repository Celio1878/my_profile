import type { Route } from "./+types/home";
import { useI18n } from "~/i18n";
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
    { title: "Celio Vieira — FullStack · Data · AI Engineer" },
    {
      name: "description",
      content:
        "Celio Vieira — FullStack, Data & AI Engineer. Tech Lead at Banco Itaú. Cloud, Web, Mobile, LLMs, RAG, PySpark, AWS.",
    },
    {
      name: "keywords",
      content:
        "celio vieira, fullstack engineer, data engineer, ai engineer, aws, react, node.js, python, go, pyspark, databricks, llm, rag",
    },
    { name: "author", content: "Celio Vieira" },
    {
      property: "og:title",
      content: "Celio Vieira — FullStack · Data · AI Engineer",
    },
    {
      property: "og:description",
      content:
        "Tech Lead at Banco Itaú. Building scalable cloud, data & AI systems.",
    },
  ];
}

export default function Home() {
  return <Content />;
}

function Content() {
  const { dict } = useI18n();

  return (
    <main id="main" role="main" aria-label="Main content">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        {dict.ui.skipToMain}
      </a>

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
