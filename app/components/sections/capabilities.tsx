import { useI18n } from "~/i18n";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Brain, Cloud, Cpu, Layers, Wrench } from "lucide-react";

const capabilityIcons = [
  <Brain key="ai" size={20} className="text-emerald-500" aria-hidden="true" />,
  <Cloud key="cloud" size={20} className="text-sky-500" aria-hidden="true" />,
  <Cpu key="arch" size={20} className="text-amber-500" aria-hidden="true" />,
  <Layers key="fullstack" size={20} className="text-teal-500" aria-hidden="true" />,
];

export function Capabilities() {
  const { dict } = useI18n();

  return (
    <section id="capabilities" className="py-16 container mx-auto px-4 max-w-5xl scroll-mt-20">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-3">
            <Wrench size={14} aria-hidden="true" />
            <span>{dict.capabilities.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {dict.capabilities.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.capabilities.subheading}
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {dict.capabilities.items.map((item, idx) => (
          <Reveal key={idx} delay={idx * 80 + 100}>
            <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#161e2b] flex items-center justify-center border border-slate-200/60 dark:border-[#212836]">
                    {capabilityIcons[idx % capabilityIcons.length]}
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                <div className="flex flex-wrap gap-1.5 pt-2 font-mono">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[11px] skill-badge bg-slate-100/50 dark:bg-[#161e2b]/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
