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
import {
  Award,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  FileText,
  FolderOpen,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";

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

const BysMobileImages = [
  { src: "/bys-home-mobile.png", cap: "Mobile — Home" },
  { src: "/book-bys-search-mobile.png", cap: "Mobile — Search results" },
];

const BysTableImages = [
  { src: "/bys-ipad-search.png", cap: "iPad — Search feed" },
  { src: "/bys-ipad-user.png", cap: "iPad — User profile" },
];

function Section({
  id,
  title,
  icon,
  children,
  className = "",
}: {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 container mx-auto px-4 py-16 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mb-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary">
                {icon}
              </span>
            )}
            <h2
              id={`${id}-heading`}
              className="text-2xl font-bold tracking-tight"
            >
              {title}
            </h2>
          </div>
          <div className="section-divider" />
        </Reveal>
      </div>
      <div className="text-gray-700 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function HighlightChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
      {children}
    </span>
  );
}

function Content() {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Celio Vieira. All rights reserved.`;
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-28 pb-16 container mx-auto px-4">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-150 h-100 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Avatar */}
          <div className="animate-fade-in flex justify-center mb-6">
            <div className="relative">
              <img
                src="/me.jpeg"
                alt="Celio Vieira"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-xl"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-950"
                title="Available for opportunities"
              />
            </div>
          </div>

          {/* Name */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight gradient-text pb-1">
              {dict.hero.title}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up delay-100 mt-3">
            <p className="text-lg text-muted-foreground font-medium">
              {dict.hero.subtitle}
            </p>
          </div>

          {/* Location */}
          <div className="animate-fade-in-up delay-200 mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} aria-hidden="true" />
            <span>MG, Brazil</span>
          </div>

          {/* Highlight chips */}
          <div className="animate-fade-in-up delay-300 mt-5 flex flex-wrap items-center justify-center gap-2">
            <HighlightChip>
              <Brain size={12} aria-hidden="true" /> AI Engineer
            </HighlightChip>
            <HighlightChip>
              <Cloud size={12} aria-hidden="true" /> Cloud Architect
            </HighlightChip>
            <HighlightChip>
              <Layers size={12} aria-hidden="true" /> Data Engineer
            </HighlightChip>
            <HighlightChip>
              <Code2 size={12} aria-hidden="true" /> FullStack Dev
            </HighlightChip>
            <HighlightChip>
              <Sparkles size={12} aria-hidden="true" /> Tech Lead @ Itaú
            </HighlightChip>
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/celio-vieira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {dict.hero.ctaLinkedIn}
            </a>
            <a
              href="https://github.com/Celio1878"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.youtube.com/@celio_vieira"
              target="_blank"
              rel="noreferrer"
              aria-label={dict.hero.ariaYouTube}
              className="inline-flex items-center gap-2 rounded-full border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
              {dict.hero.ctaYouTube}
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <FileText size={16} aria-hidden="true" />
              {dict.resume.downloadLabel}
            </a>
          </div>
        </div>
      </header>

      {/* ── About ────────────────────────────────────────────────────── */}
      <Section
        id="about"
        title={dict.about.heading}
        icon={<Sparkles size={18} />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* Bio text */}
          <Reveal className="lg:col-span-2">
            <div className="space-y-4 text-base leading-7">
              {dict.about.body.split(/\n\s*\n/).map((para, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Aside — Quick Facts */}
          <Reveal delay={120} className="lg:col-span-1">
            <aside className="lg:sticky lg:top-24 space-y-4">
              <Card className="card-hover relative overflow-hidden border border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
                />
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Sparkles size={14} aria-hidden="true" /> Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Briefcase size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Currently
                      </div>
                      <div className="font-medium">Tech Lead @ Banco Itaú</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0">
                      <MapPin size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Based in
                      </div>
                      <div className="font-medium">Esmeraldas, MG · Brazil</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Brain size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Focus</div>
                      <div className="font-medium">FullStack · Data · AI</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                      <span
                        className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Status
                      </div>
                      <div className="font-medium text-green-700 dark:text-green-400">
                        Open to opportunities
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "10+", label: "Years" },
                  { value: "9+", label: "Roles" },
                  { value: "20+", label: "Certs" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="card-hover rounded-xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm p-3 text-center"
                  >
                    <div className="text-xl font-extrabold gradient-text leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack chips */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                  <Code2 size={12} aria-hidden="true" /> Daily stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "TypeScript",
                    "React",
                    "Node.js",
                    "Python",
                    "PySpark",
                    "AWS",
                    "LLMs",
                    "RAG",
                    "Docker",
                  ].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Section
        id="experience"
        title={dict.experience.heading}
        icon={<Briefcase size={18} />}
      >
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
            if (/(tech lead|techlead|principal|staff)/.test(r)) score += 5;
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
              const clean = (s: string) => s.replace(/\(.*?\)/g, "").trim();
              if (
                clean(it.company).length < clean(existing.companyLabel).length
              ) {
                existing.companyLabel = clean(it.company);
              }
            } else {
              const label =
                it.company.replace(/\(.*?\)/g, "").trim() || it.company;
              groups.set(key, { companyLabel: label, items: [it] });
            }
          });

          const grouped = Array.from(groups.values()).map((g) => {
            let best = g.items[0];
            let bestScore = roleScore(best.role);
            for (let i = 1; i < g.items.length; i++) {
              const sc = roleScore(g.items[i].role);
              if (sc > bestScore) {
                best = g.items[i];
                bestScore = sc;
              }
            }
            const seen = new Set<string>();
            const bullets: string[] = [];
            g.items.forEach((it) => {
              it.bullets.forEach((b) => {
                if (!seen.has(b.trim())) {
                  seen.add(b.trim());
                  bullets.push(b);
                }
              });
            });
            const periods = g.items.map((it) => it.period).filter(Boolean);
            return {
              company: g.companyLabel,
              role: best.role,
              bullets,
              period: periods[0] ?? "",
            };
          });

          const isCurrentRole = (period: string) =>
            /present|atual|aktuell|actual/i.test(period);

          return (
            <ul className="space-y-5">
              {grouped.map((item, i) => (
                <Reveal as="li" key={i} delay={i * 80}>
                  <Card className="card-hover border-l-4 border-l-primary/40 hover:border-l-primary transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-base font-semibold">
                              {item.role}
                            </CardTitle>
                            {isCurrentRole(item.period) && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                                  aria-hidden="true"
                                />
                                Current
                              </span>
                            )}
                          </div>
                          <CardDescription className="mt-0.5 font-medium">
                            {item.company}
                          </CardDescription>
                        </div>
                        {item.period && item.period !== "—" && (
                          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                            {item.period}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {item.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                              aria-hidden="true"
                            />
                            {b}
                          </li>
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

      {/* ── Education ────────────────────────────────────────────────── */}
      <Section
        id="education"
        title={dict.education.heading}
        icon={<GraduationCap size={18} />}
      >
        <ul className="space-y-4">
          {dict.education.items.map((edu, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {edu.degree}
                      </CardTitle>
                      <CardDescription className="mt-0.5">
                        {edu.institution}
                      </CardDescription>
                    </div>
                    {edu.period && (
                      <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                        {edu.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Certifications ───────────────────────────────────────────── */}
      <Section
        id="certifications"
        title={dict.certifications.heading}
        icon={<Award size={18} />}
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {dict.certifications.items.map((cert, i) => (
            <Reveal as="li" key={i} delay={i * 60}>
              <Card className="card-hover h-full">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold leading-snug">
                        {cert.title}
                      </CardTitle>
                      <CardDescription className="mt-0.5 text-xs">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                    {cert.issued && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                        {cert.issued}
                      </span>
                    )}
                  </div>
                  {cert.credentialId ? (
                    <p className="mt-1.5 text-xs text-muted-foreground font-mono truncate">
                      ID: {cert.credentialId}
                    </p>
                  ) : null}
                </CardHeader>
                {cert.skills.length > 0 ? (
                  <CardContent className="pt-0">
                    <Separator className="mb-3" />
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((s, j) => (
                        <Badge
                          key={j}
                          variant="outline"
                          className="text-xs skill-badge"
                        >
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

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <Section
        id="skills"
        title={dict.skills.heading}
        icon={<Code2 size={18} />}
      >
        <div className="space-y-6">
          {[
            {
              label: "AI & Machine Learning",
              tags: [
                "Ollama",
                "HuggingFace",
                "RAG",
                "LLM Fine-tuning",
                "ComfyUI",
                "Prompt Engineering",
              ],
            },
            {
              label: "Data Engineering",
              tags: [
                "PySpark",
                "Apache Spark",
                "Apache Airflow",
                "Apache Iceberg",
                "Databricks",
                "DataMesh",
                "Kafka",
                "SQL",
              ],
            },
            {
              label: "Cloud & Infrastructure",
              tags: [
                "AWS",
                "AWS Glue",
                "AWS EMR",
                "AWS Athena",
                "AWS Redshift",
                "AWS Lambda",
                "AWS Kinesis",
                "Terraform",
                "Docker",
              ],
            },
            {
              label: "Backend & Languages",
              tags: [
                "Node.js",
                "Python",
                "Go",
                "TypeScript",
                "TDD",
                "SOLID",
                "DDD",
              ],
            },
            {
              label: "Frontend & Mobile",
              tags: [
                "React",
                "Next.js",
                "React Router",
                "React Native",
                "Expo",
                "EAS",
              ],
            },
            {
              label: "Platforms & Services",
              tags: ["Vercel", "Railway", "Supabase", "Firebase"],
            },
          ].map((group, gi) => (
            <Reveal key={gi} delay={gi * 60}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((s, i) => (
                    <Badge
                      key={i}
                      className="text-sm skill-badge cursor-default"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <Section
        id="projects"
        title={dict.projects.heading}
        icon={<FolderOpen size={18} />}
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {dict.projects.items.map((p, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <Card className="card-hover h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold">
                        {p.name}
                      </CardTitle>
                      <CardDescription className="mt-0.5">
                        {p.tagline}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Visit{" "}
                          <SquareArrowOutUpRight size={12} aria-hidden="true" />
                        </a>
                      ) : null}
                      {p.repo ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>{" "}
                          Repo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {p.description}
                  </p>
                  <div>
                    <Separator className="mb-3" />
                    <div className="flex flex-wrap gap-1.5">
                      {p.skills.map((s, j) => (
                        <Badge
                          key={j}
                          variant="outline"
                          className="text-xs skill-badge"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── BYS Showcase ─────────────────────────────────────────────── */}
      <Section
        id="bys-showcase"
        title="Be Your Stories — Screenshots"
        icon={<FolderOpen size={18} />}
      >
        <div className="space-y-6">
          <Reveal>
            <figure className="w-full">
              <img
                src="/bys-banner.png"
                alt="Be Your Stories banner with logo between two open books"
                className="w-full rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground">
                BYS banner
              </figcaption>
            </figure>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="grid grid-cols-2 gap-2">
              {BysMobileImages.map((img, i) => (
                <Reveal key={i} delay={i * 60}>
                  <figure className="w-full">
                    <img
                      src={img.src}
                      alt={`BYS screenshot — ${img.cap}`}
                      className="max-w-55 sm:max-w-65 w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                      loading="lazy"
                    />
                    <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                      {img.cap}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            {BysTableImages.map((img, i) => (
              <Reveal key={i} delay={i * 60}>
                <figure className="w-full">
                  <img
                    src={img.src}
                    alt={`BYS screenshot — ${img.cap}`}
                    className="max-w-130 w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                    loading="lazy"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {img.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="https://beyourstories.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            >
              Visit Be Your Stories{" "}
              <SquareArrowOutUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

      {/* ── NodeJS App Builder ───────────────────────────────────────── */}
      <Section
        id="nodejs-appbuilder"
        title="NodeJS App Builder — Screenshots"
        icon={<Code2 size={18} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { src: "/express-app-builder-tests.png", cap: "Tests overview" },
            {
              src: "/express-app-builder-pkgs.png",
              cap: "Packages and scripts",
            },
          ].map((img, i) => (
            <Reveal key={i} delay={i * 60}>
              <figure className="w-full">
                <img
                  src={img.src}
                  alt={`NodeJS App Builder screenshot — ${img.cap}`}
                  className="w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                  loading="lazy"
                />
                <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                  {img.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CDK Factory ──────────────────────────────────────────────── */}
      <Section
        id="cdk-factory"
        title="CDK Factory — Screenshots"
        icon={<Cloud size={18} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{ src: "/cdk-factory-items.png", cap: "Library files" }].map(
            (img, i) => (
              <Reveal key={i} delay={i * 60}>
                <figure className="w-full">
                  <img
                    src={img.src}
                    alt={`CDK Factory screenshot — ${img.cap}`}
                    className="w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                    loading="lazy"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {img.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ),
          )}
        </div>
      </Section>

      {/* ── Resume ───────────────────────────────────────────────────── */}
      <Section
        id="resume"
        title={dict.resume.heading}
        icon={<FileText size={18} />}
      >
        <Reveal>
          <p className="mb-5 text-gray-700 dark:text-gray-300">
            {dict.resume.description}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary text-primary hover:bg-primary/5 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            >
              <FileText size={15} aria-hidden="true" />
              {dict.resume.viewLabel}
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 shadow-md"
            >
              <FileText size={15} aria-hidden="true" />
              {dict.resume.downloadLabel}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── Footer / Contact ─────────────────────────────────────────── */}
      <footer
        id="contact"
        className="relative mt-16 overflow-hidden border-t border-gray-200/80 dark:border-gray-800/80 bg-linear-to-b from-transparent via-primary/5 to-primary/10 dark:via-primary/10 dark:to-primary/20"
      >
        {/* Decorative top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="container mx-auto px-4 py-16 relative">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text inline-block pb-1">
                {dict.contact.heading}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Let&apos;s build something great together.
              </p>
            </div>
          </Reveal>

          {/* Social circle buttons */}
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
              {[
                {
                  href: "mailto:contato@celiovieira.com",
                  label: "Email",
                  ring: "hover:border-emerald-500 hover:text-emerald-500 hover:shadow-emerald-500/30",
                  icon: <Mail size={20} aria-hidden="true" />,
                },
                {
                  href: "https://www.linkedin.com/in/celio-vieira",
                  label: "LinkedIn",
                  ring: "hover:border-blue-500 hover:text-blue-500 hover:shadow-blue-500/30",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "https://github.com/Celio1878",
                  label: "GitHub",
                  ring: "hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white hover:shadow-gray-900/30",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.youtube.com/@celio_vieira",
                  label: "YouTube",
                  ring: "hover:border-red-500 hover:text-red-500 hover:shadow-red-500/30",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className={
                    "group relative inline-flex items-center justify-center w-12 h-12 rounded-full " +
                    "border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm " +
                    "text-gray-600 dark:text-gray-300 transition-all duration-300 " +
                    "hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:scale-95 " +
                    s.ring
                  }
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Contact details row */}
          <Reveal delay={150}>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <a
                href="mailto:contato@celiovieira.com"
                className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                <Mail size={14} aria-hidden="true" />
                contato@celiovieira.com
              </a>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} aria-hidden="true" />
                Esmeraldas, MG · Brazil
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Phone size={14} aria-hidden="true" />
                celiovieira.com
              </span>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-gray-200/60 dark:border-gray-800/60 py-5 text-center backdrop-blur-sm">
          <p className="text-xs text-muted-foreground">{copyright}</p>
        </div>
      </footer>
    </main>
  );
}
