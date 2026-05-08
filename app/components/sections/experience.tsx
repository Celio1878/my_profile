import { useI18n } from "~/i18n";
import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { dict } = useI18n();

  type ExpItem = (typeof dict.experience.items)[number];

  const normalizeCompany = (c: string) => {
    const noAccents = c.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

  const groups = new Map<string, { companyLabel: string; items: ExpItem[] }>();

  dict.experience.items.forEach((it) => {
    const key = normalizeCompany(it.company);
    const existing = groups.get(key);
    if (existing) {
      existing.items.push(it);
      const clean = (s: string) => s.replace(/\(.*?\)/g, "").trim();
      if (clean(it.company).length < clean(existing.companyLabel).length) {
        existing.companyLabel = clean(it.company);
      }
    } else {
      const label = it.company.replace(/\(.*?\)/g, "").trim() || it.company;
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
    <Section
      id="experience"
      title={dict.experience.heading}
      icon={<Briefcase size={18} />}
    >
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
    </Section>
  );
}
