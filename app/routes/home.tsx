import type { Route } from "./+types/home";
import { useI18n } from "~/i18n";
import { Nav } from "~/components/nav";
import type { ReactNode } from "react";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Celio Vieira - Profile" },
    { name: "description", content: "About myself and my experiences" },
    { keywords: ["celio", "vieira", "profile", "about", "me"] },
    { category: "blog" },
    { applicationName: "My Profile" },
    { author: "Celio Vieira", url: "celiovieira.com" },
    { publisher: "Vercel" },
  ];
}

export default function Home() {
  return <Content />;
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 container mx-auto px-4 py-16"
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Content() {
  const { dict } = useI18n();
  return (
    <main id="main" role="main" aria-label="Main content">
      <Nav />
      <header className="pt-24 pb-10 container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {dict.hero.title}
            </h1>
          </div>
          <div className="mt-2">
            <h2 className="sr-only">Subtitle</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {dict.hero.subtitle}
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.linkedin.com/in/celio-vieira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-4 py-2 transition-colors"
            >
              {dict.hero.ctaLinkedIn}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <Section id="about" title={dict.about.heading}>
        <Reveal>
          <p>{dict.about.body}</p>
        </Reveal>
      </Section>

      <Section id="experience" title={dict.experience.heading}>
        <ul className="space-y-6">
          {dict.experience.items.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-base">{item.role}</CardTitle>
                    <CardDescription className="!mt-0">
                      {item.company}
                    </CardDescription>
                    <CardDescription className="!mt-0">
                      {item.period}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-1">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="education" title={dict.education.heading}>
        <ul className="space-y-4">
          {dict.education.items.map((edu, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
                  <CardDescription>{edu.period}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="certifications" title={dict.certifications.heading}>
        <ul className="space-y-4">
          {dict.certifications.items.map((cert, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-base">{cert.title}</CardTitle>
                    <CardDescription className="!mt-0">
                      {cert.issuer}
                    </CardDescription>
                    <CardDescription className="!mt-0">
                      {cert.issued}
                    </CardDescription>
                  </div>
                  {cert.credentialId ? (
                    <CardDescription className="mt-2 text-xs">
                      Credential ID:{" "}
                      <span className="font-mono">{cert.credentialId}</span>
                    </CardDescription>
                  ) : null}
                </CardHeader>
                {cert.skills.length > 0 ? (
                  <CardContent>
                    <Separator className="mb-3" />
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      {cert.skillsLabel}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {cert.skills.map((s, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="skills" title={dict.skills.heading}>
        <div className="flex flex-wrap gap-2">
          {dict.skills.list.map((s, i) => (
            <Reveal key={i}>
              <Badge className="text-sm">{s}</Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="hobbies" title={dict.hobbies.heading}>
        <div className="flex flex-wrap gap-2">
          {dict.hobbies.list.map((h, i) => (
            <Reveal key={i}>
              <Badge className="text-sm">{h}</Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" title={dict.projects.heading}>
        <ul className="grid gap-6 md:grid-cols-2">
          {dict.projects.items.map((p, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      <CardDescription>{p.tagline}</CardDescription>
                    </div>
                    <div className="flex gap-3">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 dark:text-blue-400 text-sm hover:underline"
                        >
                          Visit
                        </a>
                      ) : null}
                      {p.repo ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 dark:text-blue-400 text-sm hover:underline"
                        >
                          Repo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{p.description}</p>
                  <Separator className="my-3" />
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {p.skillsLabel}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {p.skills.map((s, j) => (
                      <Reveal key={j}>
                        <Badge variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      </Reveal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="resume" title={dict.resume.heading}>
        <Reveal>
          <p className="mb-4">{dict.resume.description}</p>
        </Reveal>
        <div className="mt-3 text-sm">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 dark:text-blue-400 underline"
          >
            {dict.resume.viewLabel}
          </a>
          <span className="mx-2">·</span>
          <a
            href="/resume.pdf"
            download
            className="text-blue-700 dark:text-blue-400 underline"
          >
            {dict.resume.downloadLabel}
          </a>
        </div>
      </Section>

      <Section id="contact" title={dict.contact.heading}>
        <Reveal>
          <p className="mb-2">{dict.contact.email}</p>
        </Reveal>
        <p className="mb-2">
          <a
            href="mailto:contato@celiovieira.com"
            className="text-blue-700 dark:text-blue-400 hover:underline"
          >
            contato@celiovieira.com
          </a>
        </p>
        <Reveal>
          <a
            href="https://www.linkedin.com/in/celio-vieira"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 dark:text-blue-400 hover:underline"
          >
            https://www.linkedin.com/in/celio-vieira
          </a>
        </Reveal>
        <p className="mt-2 text-sm text-gray-500">{dict.contact.note}</p>
      </Section>

      <footer className="container mx-auto px-4 py-10 text-center text-xs text-gray-500">
        <p>
          Data curated from the public LinkedIn profile:{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/celio-vieira"
            target="_blank"
            rel="noreferrer"
          >
            celio-vieira
          </a>
        </p>
      </footer>
    </main>
  );
}
