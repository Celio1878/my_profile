import { useI18n } from "~/i18n";
import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Brain, Briefcase, Code2, MapPin, Sparkles } from "lucide-react";
import { yearsExperience } from "~/utils/dates";

export function About() {
  const { dict } = useI18n();

  return (
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
              <CardHeader>
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
                    <div className="font-medium">Tech/Data Lead</div>
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
                    <div className="font-medium">MG · Brazil</div>
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
              </CardContent>
            </Card>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: `${yearsExperience}+`, label: "Years" },
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
  );
}
