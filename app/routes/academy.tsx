import {
  ArrowRight,
  Brain,
  Clock,
  Cloud,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Play,
  Radio,
  Search,
  Terminal,
} from "lucide-react";
import { useMemo, type FC } from "react";
import { Link, useSearchParams } from "react-router";
import { YouTubeIcon } from "~/components/brand-icons";
import { Nav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { Footer } from "~/components/sections/footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n";
import { useLocalizedMeta } from "~/hooks/use-localized-meta";
import { translateTag } from "~/lib/tags";
import {
  getAcademyTracks,
  getAllLessons,
  getTrackById,
  getYouTubeThumbnailUrl,
  YOUTUBE_SUBSCRIBE_URL,
  type AcademyLesson,
  type AcademyLevel,
  type AcademyTrackId,
} from "~/lib/academy";
import { trackOutbound } from "~/lib/analytics";
import type { Route } from "./+types/academy";

const SITE_URL = "https://celiovieira.com";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Academy — Engineering Video Courses | Célio Vieira" },
    {
      name: "description",
      content:
        "Structured YouTube engineering courses covering local AI stacks, Medallion lakehouses, distributed AWS/GCP cloud, and Aldeon builds.",
    },
    { property: "og:title", content: "Academy — Engineering Video Courses | Célio Vieira" },
    {
      property: "og:description",
      content:
        "Structured YouTube engineering courses on Local AI, Lakehouses, Cloud, and Full-Stack systems.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${SITE_URL}/academy` },
    { property: "og:image", content: `${SITE_URL}/og.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Academy — Engineering Video Courses | Célio Vieira" },
    {
      name: "twitter:description",
      content:
        "Structured YouTube engineering courses on Local AI, Lakehouses, Cloud, and Full-Stack systems.",
    },
    { name: "twitter:image", content: `${SITE_URL}/og.png` },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/academy` },
  ];
}

const VALID_TRACKS: AcademyTrackId[] = [
  "local-ai",
  "data-lakehouses",
  "distributed-cloud",
  "fullstack-ventures",
];

const VALID_LEVELS: AcademyLevel[] = ["foundations", "intermediate", "advanced"];

const TrackIcon: FC<{ trackId: AcademyTrackId; size?: number; className?: string }> = ({
  trackId,
  size = 16,
  className,
}) => {
  switch (trackId) {
    case "local-ai":
      return <Brain size={size} className={className} aria-hidden="true" />;
    case "data-lakehouses":
      return <Cpu size={size} className={className} aria-hidden="true" />;
    case "distributed-cloud":
      return <Cloud size={size} className={className} aria-hidden="true" />;
    case "fullstack-ventures":
      return <Code2 size={size} className={className} aria-hidden="true" />;
  }
};

export default function AcademyRoute() {
  const { dict, locale } = useI18n();
  useLocalizedMeta(dict.meta.academyTitle, dict.meta.academyDescription);
  const tracks = useMemo(() => getAcademyTracks(), []);
  const allLessons = useMemo(() => getAllLessons(), []);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const rawTrack = searchParams.get("track");
  const selectedTrack: AcademyTrackId | null =
    rawTrack && VALID_TRACKS.includes(rawTrack as AcademyTrackId)
      ? (rawTrack as AcademyTrackId)
      : null;

  const rawLevel = searchParams.get("level");
  const selectedLevel: AcademyLevel | null =
    rawLevel && VALID_LEVELS.includes(rawLevel as AcademyLevel) ? (rawLevel as AcademyLevel) : null;

  const updateParams = (mutate: (params: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    setSearchParams(next, { replace: true });
  };

  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lesson of allLessons) {
      counts[lesson.trackId] = (counts[lesson.trackId] || 0) + 1;
    }
    return counts;
  }, [allLessons]);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allLessons.filter((lesson) => {
      const matchesTrack = !selectedTrack || lesson.trackId === selectedTrack;
      const matchesLevel = !selectedLevel || lesson.level === selectedLevel;
      const matchesSearch =
        query === "" ||
        lesson.title[locale].toLowerCase().includes(query) ||
        lesson.summary[locale].toLowerCase().includes(query) ||
        lesson.tags.some(
          (t) =>
            t.toLowerCase().includes(query) ||
            translateTag(t, locale).toLowerCase().includes(query),
        ) ||
        lesson.chapters[locale].some((c) => c.toLowerCase().includes(query));
      return matchesTrack && matchesLevel && matchesSearch;
    });
  }, [allLessons, selectedTrack, selectedLevel, search, locale]);

  const levelLabels: Record<AcademyLevel, string> = {
    foundations: dict.academy.levels.foundations,
    intermediate: dict.academy.levels.intermediate,
    advanced: dict.academy.levels.advanced,
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Nav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl py-10" id="main">
        {/* Header & YouTube / Twitch Creator Banner */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-4">
              <GraduationCap size={14} aria-hidden="true" />
              <span>{dict.academy.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text text-balance">
              {dict.academy.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
              {dict.academy.subtitle}
            </p>

            {/* YouTube Creator Banner */}
            <div className="p-5 sm:p-6 rounded-2xl border border-emerald-500/25 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left shadow-lg">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <YouTubeIcon size={16} className="text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-500 font-mono">
                    {dict.academy.youtubeChannelBadge}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  {dict.academy.youtubeBannerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
                  {dict.academy.youtubeBannerText}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href={YOUTUBE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackOutbound("youtube_subscribe", "academy_banner")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm group"
                >
                  <YouTubeIcon size={14} />
                  <span>{dict.academy.youtubeSubscribeCta}</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Curriculum Tracks */}
        <Reveal delay={60}>
          <section className="mb-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tracks.map((track) => {
                const active = selectedTrack === track.id;
                const count = trackCounts[track.id] || 0;
                return (
                  <button
                    key={track.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      updateParams((p) => {
                        if (active) p.delete("track");
                        else p.set("track", track.id);
                      })
                    }
                    className={`text-left p-4 rounded-2xl border transition-all backdrop-blur-md flex flex-col justify-between gap-3 ${
                      active
                        ? "border-primary bg-primary/10 dark:bg-primary/15 shadow-md"
                        : "border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${track.accentClass}`}
                      >
                        <TrackIcon trackId={track.id} size={14} />
                        <span>0{track.order}</span>
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {dict.academy.lessonsCount.replace("{count}", String(count))}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                        {track.title[locale]}
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 text-pretty">
                        {track.description[locale]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Search & Filter Controls */}
        <Reveal delay={100}>
          <div className="space-y-4 mb-10 max-w-4xl mx-auto">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder={dict.academy.searchPlaceholder.replace(
                  "{count}",
                  String(allLessons.length),
                )}
                value={search}
                onChange={(e) =>
                  updateParams((p) => {
                    if (e.target.value) p.set("q", e.target.value);
                    else p.delete("q");
                  })
                }
                aria-label={dict.academy.searchPlaceholder.replace(
                  "{count}",
                  String(allLessons.length),
                )}
                className="w-full pl-10 pr-16 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => updateParams((p) => p.delete("q"))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded bg-gray-100 dark:bg-slate-800"
                >
                  {dict.academy.clearSearch}
                </button>
              )}
            </div>

            {/* Track & Level filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-pressed={selectedTrack === null}
                  onClick={() => updateParams((p) => p.delete("track"))}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border flex items-center gap-1.5 ${
                    selectedTrack === null
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50"
                  }`}
                >
                  <Layers size={11} aria-hidden="true" />
                  <span>{dict.academy.allTracks}</span>
                </button>

                {tracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    aria-pressed={selectedTrack === track.id}
                    onClick={() =>
                      updateParams((p) => {
                        if (selectedTrack === track.id) p.delete("track");
                        else p.set("track", track.id);
                      })
                    }
                    className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border ${
                      selectedTrack === track.id
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50"
                    }`}
                  >
                    {track.title[locale]}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  aria-pressed={selectedLevel === null}
                  onClick={() => updateParams((p) => p.delete("level"))}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                    selectedLevel === null
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/40"
                  }`}
                >
                  {dict.academy.allLevels}
                </button>
                {VALID_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={selectedLevel === level}
                    onClick={() =>
                      updateParams((p) => {
                        if (selectedLevel === level) p.delete("level");
                        else p.set("level", level);
                      })
                    }
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                      selectedLevel === level
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold"
                        : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/40"
                    }`}
                  >
                    {levelLabels[level]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <Reveal>
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {dict.academy.noLessonsFound}
              </p>
              <button
                type="button"
                onClick={() => setSearchParams({}, { replace: true })}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                {dict.academy.resetFilters}
              </button>
            </div>
          </Reveal>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson: AcademyLesson, idx: number) => {
              const track = getTrackById(lesson.trackId);
              const isPublished = lesson.status === "published" && Boolean(lesson.youtubeId);

              return (
                <Reveal as="li" key={lesson.slug} delay={Math.min(idx * 40, 280)}>
                  <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg group">
                    {/* 16:9 Stage Thumbnail / Vector Terminal Preview */}
                    <Link
                      to={`/academy/${lesson.slug}`}
                      className="relative aspect-video w-full overflow-hidden bg-[#090b10] border-b border-gray-200/80 dark:border-[#212836] block focus:outline-none"
                    >
                      {isPublished && lesson.youtubeId ? (
                        <>
                          <img
                            src={getYouTubeThumbnailUrl(lesson.youtubeId)}
                            alt={lesson.title[locale]}
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                            loading="lazy"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-center bg-[#090b10]/25"
                          >
                            <span className="w-11 h-11 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg">
                              <Play size={18} className="ml-0.5 fill-current" />
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full p-4 flex flex-col justify-between bg-linear-to-br from-[#0b1019] via-[#090b10] to-emerald-950/35 text-slate-200">
                          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                            <span className="inline-flex items-center gap-1 truncate">
                              <Terminal size={11} className="text-emerald-400" aria-hidden="true" />
                              <span>{lesson.trackId}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">
                              <Radio size={9} aria-hidden="true" />
                              {dict.academy.statusUpcoming}
                            </span>
                          </div>
                          <div className="my-auto flex items-center justify-center">
                            <div className="w-11 h-11 rounded-xl border border-[#212836] bg-[#0f141c] flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                              <TrackIcon trackId={lesson.trackId} size={20} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>{levelLabels[lesson.level]}</span>
                            <span>
                              {lesson.estimatedMinutes} {dict.academy.minutesLabel}
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>

                    <CardHeader className="pb-3 flex-1 space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 font-mono">
                        {track && (
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${track.badgeClass}`}
                          >
                            {track.title[locale]}
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-primary font-medium shrink-0">
                          <Clock size={11} aria-hidden="true" />
                          <span>
                            {lesson.estimatedMinutes} {dict.academy.minutesLabel}
                          </span>
                        </span>
                      </div>

                      <Link to={`/academy/${lesson.slug}`} className="block focus:outline-none">
                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-balance">
                          {lesson.title[locale]}
                        </CardTitle>
                      </Link>

                      <CardDescription className="text-xs line-clamp-3 text-gray-600 dark:text-gray-300 text-pretty">
                        {lesson.summary[locale]}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {lesson.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] font-normal py-0 px-2 bg-slate-100/50 dark:bg-slate-800/50"
                          >
                            {translateTag(tag, locale)}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold pt-2.5 border-t border-gray-100/80 dark:border-gray-800/80">
                        <Link
                          to={`/academy/${lesson.slug}`}
                          className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform"
                        >
                          <span>
                            {isPublished ? dict.academy.watchLesson : dict.academy.previewSyllabus}
                          </span>
                          <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {levelLabels[lesson.level]}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
