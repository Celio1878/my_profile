import { ArrowRight, Clock, GraduationCap, Play, Radio, SquareArrowOutUpRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";
import { YouTubeIcon } from "~/components/brand-icons";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n";
import {
  getFeaturedLessons,
  getTrackById,
  YOUTUBE_CHANNEL_URL,
  type AcademyLesson,
} from "~/lib/academy";
import { trackOutbound } from "~/lib/analytics";
import { translateTag } from "~/lib/tags";

export function AcademyPreview() {
  const { dict, locale } = useI18n();
  const featured = useMemo(() => getFeaturedLessons(3), []);

  return (
    <section id="academy-preview" className="py-16 container mx-auto px-4 max-w-5xl scroll-mt-20">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-3">
              <GraduationCap size={14} aria-hidden="true" />
              <span>{dict.academy.homeBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
              {dict.academy.homeHeading}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              {dict.academy.homeSubheading}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutbound("youtube_channel", "home_academy_preview")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#212836] bg-white/70 dark:bg-[#111620]/70 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 hover:border-red-500/50 hover:text-red-500 transition-colors"
            >
              <YouTubeIcon size={13} className="text-red-500" />
              <span>YouTube</span>
              <SquareArrowOutUpRight size={11} aria-hidden="true" />
            </a>

            <Link
              to="/academy"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline group"
            >
              <span>{dict.academy.homeViewAll}</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((lesson: AcademyLesson, idx: number) => {
          const track = getTrackById(lesson.trackId);
          const isPublished = lesson.status === "published" && Boolean(lesson.youtubeId);

          return (
            <Reveal key={lesson.slug} delay={idx * 80 + 100}>
              <Link
                to={`/academy/${lesson.slug}`}
                className="group block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
              >
                <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 shadow-sm transition-all">
                  <CardHeader className="pb-3 flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 mb-2 font-mono">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isPublished
                            ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/25"
                            : "text-amber-500 bg-amber-500/10 border border-amber-500/25"
                        }`}
                      >
                        {isPublished ? (
                          <Play size={10} aria-hidden="true" />
                        ) : (
                          <Radio size={10} aria-hidden="true" />
                        )}
                        <span>
                          {isPublished ? dict.academy.statusPublished : dict.academy.statusUpcoming}
                        </span>
                      </span>

                      <span className="flex items-center gap-1 text-primary font-medium shrink-0">
                        <Clock size={11} aria-hidden="true" />
                        <span>
                          {lesson.estimatedMinutes} {dict.academy.minutesLabel}
                        </span>
                      </span>
                    </div>

                    {track && (
                      <p
                        className={`text-[11px] font-mono font-semibold mb-1 ${track.accentClass}`}
                      >
                        {track.title[locale]}
                      </p>
                    )}

                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-balance">
                      {lesson.title[locale]}
                    </CardTitle>

                    <CardDescription className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300 text-pretty">
                      {lesson.summary[locale]}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lesson.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[11px] font-normal py-0 px-2 bg-slate-100/50 dark:bg-slate-800/50"
                        >
                          {translateTag(tag, locale)}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                      <span>
                        {isPublished ? dict.academy.watchLesson : dict.academy.previewSyllabus}
                      </span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
