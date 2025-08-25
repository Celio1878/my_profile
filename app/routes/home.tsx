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
import { SquareArrowOutUpRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Celio Vieira - Profile" },
    { name: "description", content: "About myself and my experiences" },
    { keywords: ["celio", "vieira", "profile", "about", "me"] },
    { category: "blog" },
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
  const year = new Date().getFullYear();
  const copyright = `© ${year} Celio Vieira. All rights reserved.`;

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
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/celio-vieira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-4 py-2 transition-colors"
            >
              {dict.hero.ctaLinkedIn}
              <SquareArrowOutUpRight size={16} />
            </a>
            <a
              href="https://www.youtube.com/@celio_vieira"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube channel"
              className="inline-flex items-center gap-2 rounded-full border border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 transition-colors"
            >
              Youtube
              <svg
                width="24"
                height="24"
                viewBox="0 0 22 22"
                aria-hidden="true"
                focusable="false"
                className="inline-block"
                fill="currentColor"
              >
                <path d="M21.8 8.001a3.3 3.3 0 0 0-2.324-2.334C17.64 5.333 12 5.333 12 5.333s-5.64 0-7.476.334A3.3 3.3 0 0 0 2.2 8c-.334 1.84-.334 4 0 5.84.301 1.145 1.18 2.024 2.324 2.334C6.36 16.5 12 16.5 12 16.5s5.64 0 7.476-.334A3.3 3.3 0 0 0 21.8 13.84c.334-1.84.334-4 0-5.84zM10.5 13.75v-4.5l4 2.25-4 2.25z" />
              </svg>
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </header>

      <Section id="about" title={dict.about.heading}>
        <Reveal>
          {dict.about.body.split(/\n\s*\n/).map((para, i) => (
            <p key={i} className={i > 0 ? "mt-4" : undefined}>
              {para}
            </p>
          ))}
        </Reveal>
      </Section>

      <Section id="experience" title={dict.experience.heading}>
        {(() => {
          type ExpItem = (typeof dict.experience.items)[number];
          const normalizeCompany = (c: string) => {
            const noAccents = c
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const noParen = noAccents.replace(/\(.*?\)/g, "");
            return noParen
              .toLowerCase()
              .replace(/[^a-z0-9]+/gi, " ")
              .trim();
          };
          const roleScore = (role: string) => {
            const r = role.toLowerCase();
            let score = 0;
            if (/(principal|staff)/.test(r)) score += 4;
            if (/(senior|sênior|sénior)/.test(r)) score += 3;
            if (/(lead|líder|lider)/.test(r)) score += 2;
            if (/(mid|pleno)/.test(r)) score += 1;
            if (/(junior|jr)/.test(r)) score -= 1;
            return score;
          };

          const groups = new Map<
            string,
            { companyLabel: string; items: ExpItem[] }
          >();

          dict.experience.items.forEach((it) => {
            const key = normalizeCompany(it.company);
            const existing = groups.get(key);
            if (existing) {
              existing.items.push(it);
              // Prefer the shortest clean label to avoid parentheticals; otherwise keep the first
              const currentLabel = existing.companyLabel;
              const candidate = it.company;
              const clean = (s: string) => s.replace(/\(.*?\)/g, "").trim();
              const cleanedCurrent = clean(currentLabel);
              const cleanedCandidate = clean(candidate);
              if (cleanedCandidate.length < cleanedCurrent.length) {
                existing.companyLabel = cleanedCandidate;
              }
            } else {
              // Initialize label cleaned of parentheticals for nicer display
              const label =
                it.company.replace(/\(.*?\)/g, "").trim() || it.company;
              groups.set(key, { companyLabel: label, items: [it] });
            }
          });

          const grouped = Array.from(groups.values()).map((g) => {
            // Choose role with highest score; tie-break by original order (assumed newest first in dict)
            let best = g.items[0];
            let bestScore = roleScore(best.role);
            for (let i = 1; i < g.items.length; i++) {
              const it = g.items[i];
              const sc = roleScore(it.role);
              if (sc > bestScore) {
                best = it;
                bestScore = sc;
              }
            }
            // Merge bullets and dedupe while preserving order
            const seen = new Set<string>();
            const bullets: string[] = [];
            g.items.forEach((it) => {
              it.bullets.forEach((b) => {
                const key = b.trim();
                if (!seen.has(key)) {
                  seen.add(key);
                  bullets.push(b);
                }
              });
            });
            return { company: g.companyLabel, role: best.role, bullets };
          });

          return (
            <ul className="space-y-6">
              {grouped.map((item, i) => (
                <Reveal as="li" key={i} delay={i * 80}>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle className="text-base">{item.role}</CardTitle>
                        <CardDescription className="!mt-0">
                          {item.company}
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
          );
        })()}
      </Section>

      <Section id="education" title={dict.education.heading}>
        <ul className="space-y-4">
          {dict.education.items.map((edu, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
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

      <footer className="flex flex-col w-full pb-4 text-center justify-between border-t border-gray-200 dark:border-gray-800">
        <Section id="contact" title={dict.contact.heading}>
          <Reveal>
            <a
              href="mailto:contato@celiovieira.com"
              className="text-blue-700 dark:text-blue-400 hover:underline"
            >
              contato@celiovieira.com
            </a>
          </Reveal>
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
          <Reveal>
            <a
              href="https://www.youtube.com/@celio_vieira"
              target="_blank"
              rel="noreferrer"
              className="text-red-700 dark:text-red-400 hover:underline"
            >
              https://www.youtube.com/@celio_vieira
            </a>
          </Reveal>
        </Section>
        <p className="text-xs text-gray-500">{copyright}</p>
      </footer>
    </main>
  );
}
