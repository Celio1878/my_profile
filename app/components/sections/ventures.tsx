import {
  ArrowRight,
  BookOpen,
  Cloud,
  Compass,
  ExternalLink,
  Layers,
  PackageCheck,
  Paintbrush,
  Search,
  Share2,
  Sparkles,
  SquareArrowOutUpRight,
  Terminal,
} from "lucide-react";
import { Link } from "react-router";
import type { MouseEvent } from "react";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n";
import { trackOutbound } from "~/lib/analytics";

export function Ventures() {
  const { dict } = useI18n();

  // Delegated outbound-click analytics for every external venture link.
  const handleOutboundClick = (event: MouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement).closest("a[target='_blank']");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href) trackOutbound(href, "ecosystem");
  };

  return (
    <section
      id="ecosystem"
      onClick={handleOutboundClick}
      className="py-16 container mx-auto px-4 max-w-5xl scroll-mt-20"
    >
      <div id="projects" className="scroll-mt-24" />

      {/* Section Header */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {dict.ecosystem.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {dict.ecosystem.subheading}
          </p>
        </div>
      </Reveal>

      {/* Flagship Umbrella Card: Aldeon */}
      <Reveal delay={100}>
        <div className="mb-12 rounded-2xl border border-emerald-500/30 bg-linear-to-b from-white/95 to-slate-50/80 dark:from-[#0d131d]/95 dark:to-[#090d14]/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
          {/* Subtle decorative circuit watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/5 blur-2xl"
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#212836]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-mono font-bold"
                >
                  {dict.ecosystem.platformBadge}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">aldeon.app</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {dict.ecosystem.aldeonTitle}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {dict.ecosystem.aldeonTagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
              <a
                href="https://aldeon.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all hover:scale-105 shadow-sm"
              >
                <span>{dict.ecosystem.visitAldeon}</span>
                <SquareArrowOutUpRight size={13} aria-hidden="true" />
              </a>
              <Link
                to="/blog/aldeon-unified-edge-ssr-multi-cloud-ecosystem"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border border-slate-200 dark:border-[#212836] bg-white/70 dark:bg-[#161e2b]/70 text-slate-800 dark:text-slate-200 hover:border-emerald-500 transition-all"
              >
                <span>{dict.ecosystem.architectureDeepDive}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-5 max-w-3xl">
            {dict.ecosystem.aldeonDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-5 font-mono text-xs">
            {dict.ecosystem.aldeonChips.map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#212836] bg-slate-100/50 dark:bg-[#161e2b]/50 text-slate-700 dark:text-slate-300 text-[11px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Child Ventures Grid (Symmetrical 4x2: 8 Active Products) */}
      <div className="mb-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
          <Layers size={14} className="text-emerald-500" aria-hidden="true" />
          <span>{dict.ecosystem.productsHeading}</span>
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Row 1, Card 1: SwanGo */}
        <Reveal delay={120}>
          <Card className="card-hover h-full flex flex-col border border-emerald-500/30 bg-linear-to-br from-white/80 via-slate-50/70 to-emerald-500/5 dark:from-[#0d1520]/80 dark:via-[#0a0f18]/70 dark:to-emerald-950/10 backdrop-blur-md relative overflow-hidden shadow-sm">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-mono font-semibold"
                >
                  {dict.ecosystem.fintechBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.swangoMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Compass size={19} className="text-emerald-500" aria-hidden="true" />
                <span>{dict.ecosystem.swangoTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.swangoTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.swangoDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.swangoChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/swango"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://aldeon.app/swango/simulator"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.simulatorApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://aldeon.app/swango/learn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.academyApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/architecting-swango-dbt-bigquery-medallion-b3-finance"
                  className="text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto font-semibold"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 1, Card 2: RagOn (NEW) */}
        <Reveal delay={140}>
          <Card className="card-hover h-full flex flex-col border border-cyan-500/30 bg-linear-to-br from-white/80 via-slate-50/70 to-cyan-500/5 dark:from-[#0d1520]/80 dark:via-[#0a0f18]/70 dark:to-cyan-950/10 backdrop-blur-md relative overflow-hidden shadow-sm">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 text-xs font-mono font-semibold"
                >
                  {dict.ecosystem.ragBadge}
                </Badge>
                <span className="text-[11px] font-mono text-cyan-500 font-bold">
                  {dict.ecosystem.ragonMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Search size={18} className="text-cyan-500" aria-hidden="true" />
                <span>{dict.ecosystem.ragonTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                {dict.ecosystem.ragonTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.ragonDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.ragonChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-cyan-500/5 border-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/rag-on"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-sm"
                >
                  <span>{dict.ecosystem.ragStudioApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/ragon-air-gapped-zero-leak-rag-studio"
                  className="text-xs font-mono text-cyan-500 hover:underline inline-flex items-center gap-1 ml-auto font-semibold"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 2, Card 3: MemOn (formerly OnMemory) */}
        <Reveal delay={160}>
          <Card className="card-hover h-full flex flex-col border border-indigo-500/25 bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.governanceBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.memonMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Terminal size={18} className="text-indigo-400" aria-hidden="true" />
                <span>{dict.ecosystem.memonTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {dict.ecosystem.memonTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.memonDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.memonChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/mem-on"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <span>{dict.ecosystem.stackComposerApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/on-memory-deterministic-ai-engineering-governance"
                  className="text-xs font-mono text-indigo-400 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 2, Card 4: HandSpeak */}
        <Reveal delay={180}>
          <Card className="card-hover h-full flex flex-col border border-teal-500/25 bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.accessibilityBadge}
                </Badge>
                <span className="text-[11px] font-mono text-teal-500 font-bold">
                  {dict.ecosystem.handspeakMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-teal-400" aria-hidden="true" />
                <span>{dict.ecosystem.handspeakTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                {dict.ecosystem.handspeakTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.handspeakDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.handspeakChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/handspeak"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-teal-600 text-white hover:bg-teal-500 transition-colors"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://aldeon.app/handspeak/learn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-teal-500 transition-colors"
                >
                  <span>{dict.ecosystem.academyApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/engineering-handspeak-3d-libras-ai"
                  className="text-xs font-mono text-teal-500 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 3, Card 5: Be Your Stories (BYS) */}
        <Reveal delay={200}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.consumerBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.bysMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BookOpen size={18} className="text-sky-500" aria-hidden="true" />
                <span>{dict.ecosystem.bysTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.bysTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.bysDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.bysChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/bys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-primary text-white hover:bg-emerald-600 transition-colors"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://apps.apple.com/app/bys-be-your-stories/id6812739940"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.iosApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://play.google.com/apps/testing/com.aldeon.bys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.androidBetaApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/building-be-your-stories"
                  className="text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 3, Card 6: Pack */}
        <Reveal delay={220}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.logisticsBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.packMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <PackageCheck size={18} className="text-amber-500" aria-hidden="true" />
                <span>{dict.ecosystem.packTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.packTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.packDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.packChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/pack"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-600 text-white hover:bg-amber-500 transition-colors"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://apps.apple.com/app/pack/id6797659977"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
                >
                  <span>{dict.ecosystem.iosApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://play.google.com/apps/testing/com.aldeon.pack"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
                >
                  <span>{dict.ecosystem.androidBetaApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/architecting-pack-multimodal-ocr-logistics"
                  className="text-xs font-mono text-amber-500 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 4, Card 7: TATU Design */}
        <Reveal delay={240}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.creativeBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.tatuMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Paintbrush size={18} className="text-purple-500" aria-hidden="true" />
                <span>{dict.ecosystem.tatuTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.tatuTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.tatuDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.tatuChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/tatu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 text-white hover:bg-purple-500 transition-colors"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://apps.apple.com/app/tatu-design/id6812737660"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-purple-500 transition-colors"
                >
                  <span>{dict.ecosystem.iosApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://play.google.com/apps/testing/com.aldeon.tatu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-purple-500 transition-colors"
                >
                  <span>{dict.ecosystem.androidBetaApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/building-tatu-design-ai-stencil-ar-studio"
                  className="text-xs font-mono text-purple-500 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Row 4, Card 8: PostHub */}
        <Reveal delay={260}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.marketingBadge}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  {dict.ecosystem.postsMeta}
                </span>
              </div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Share2 size={18} className="text-emerald-500" aria-hidden="true" />
                <span>{dict.ecosystem.postsTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.postsTagline}
              </p>
              <CardDescription className="text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.postsDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono">
                {dict.ecosystem.postsChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://aldeon.app/postshub"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-primary text-white hover:bg-emerald-600 transition-colors"
                >
                  <span>{dict.ecosystem.webApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://apps.apple.com/us/app/postshub/id6813979346"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.iosApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <a
                  href="https://play.google.com/apps/testing/com.aldeon.posthub"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <span>{dict.ecosystem.androidBetaApp}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
                <Link
                  to="/blog/autonomous-publishing-posthub-step-functions"
                  className="text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>{dict.ecosystem.deepDive}</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Developer Tooling Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Reveal delay={280}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.openSourceBadge}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  {dict.ecosystem.npmPackageLabel}
                </span>
              </div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Terminal size={17} className="text-emerald-500" aria-hidden="true" />
                <span>{dict.ecosystem.appBuilderTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.appBuilderTagline}
              </p>
              <CardDescription className="text-xs mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.appBuilderDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://www.npmjs.com/package/@celio1878/express-app-builder"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline"
                >
                  <span>{dict.ecosystem.viewNpm}</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/Celio1878/express-app-builder"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <span>{dict.ecosystem.viewRepo}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={320}>
          <Card className="card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md">
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 text-xs font-mono"
                >
                  {dict.ecosystem.cloudInfraBadge}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  {dict.ecosystem.npmPackageLabel}
                </span>
              </div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Cloud size={17} className="text-emerald-500" aria-hidden="true" />
                <span>{dict.ecosystem.cdkFactoryTitle}</span>
              </CardTitle>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dict.ecosystem.cdkFactoryTagline}
              </p>
              <CardDescription className="text-xs mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.ecosystem.cdkFactoryDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-[#212836]">
                <a
                  href="https://www.npmjs.com/package/@celio1878/cdk-factory"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline"
                >
                  <span>{dict.ecosystem.viewNpm}</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/Celio1878/cdk-factory"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <span>{dict.ecosystem.viewRepo}</span>
                  <SquareArrowOutUpRight size={11} aria-hidden="true" />
                </a>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
