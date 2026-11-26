import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  GraduationCap,
  Layers,
  Play,
  Radio,
  Share2,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, data, useLoaderData } from "react-router";
import { LinkedInIcon, XIcon, YouTubeIcon } from "~/components/brand-icons";
import { Nav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { Footer } from "~/components/sections/footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { YouTubePlayer } from "~/components/youtube-player";
import { useI18n } from "~/i18n";
import { useLocalizedMeta } from "~/hooks/use-localized-meta";
import {
  getAllLessons,
  getLessonBySlug,
  getTrackById,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeWatchUrl,
  YOUTUBE_CHANNEL_URL,
  type AcademyLesson,
} from "~/lib/academy";
import { trackOutbound } from "~/lib/analytics";
import { getPostBySlug, resolvePostForLocale, type BlogPost } from "~/lib/blog";
import { copyText } from "~/lib/clipboard";
import { translateTag } from "~/lib/tags";
import type { Route } from "./+types/academy-lesson";

const SITE_URL = "https://celiovieira.com";

export async function loader({ params }: Route.LoaderArgs) {
  const lesson = params.slug ? getLessonBySlug(params.slug) : undefined;
  if (!lesson) {
    throw data("Academy lesson not found", { status: 404 });
  }
  const track = getTrackById(lesson.trackId);
  const relatedPosts = lesson.relatedBlogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post));
  return { lesson, track, relatedPosts };
}

export function meta({ params }: Route.MetaArgs) {
  const lesson = params.slug ? getLessonBySlug(params.slug) : undefined;
  if (!lesson) {
    return [{ title: "Lesson Not Found — Célio Vieira" }];
  }

  return [
    { title: `${lesson.title.en} — Academy | Célio Vieira` },
    { name: "description", content: lesson.summary.en },
    { property: "og:title", content: `${lesson.title.en} — Academy` },
    { property: "og:description", content: lesson.summary.en },
    { property: "og:type", content: "article" },
    { property: "og:url", content: `${SITE_URL}/academy/${lesson.slug}` },
    {
      property: "og:image",
      content:
        lesson.status === "published" && lesson.youtubeId
          ? getYouTubeThumbnailUrl(lesson.youtubeId)
          : `${SITE_URL}/og.png`,
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${lesson.title.en} — Academy` },
    { name: "twitter:description", content: lesson.summary.en },
    { name: "twitter:image", content: `${SITE_URL}/og.png` },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/academy/${lesson.slug}` },
  ];
}

export default function AcademyLessonRoute() {
  const { lesson, track, relatedPosts } = useLoaderData<typeof loader>();
  const { dict, locale } = useI18n();
  const allLessons = useMemo(() => getAllLessons(), []);

  const relatedLessons = useMemo(() => {
    const sameTrack = allLessons.filter(
      (item) => item.slug !== lesson.slug && item.trackId === lesson.trackId,
    );
    const others = allLessons.filter(
      (item) => item.slug !== lesson.slug && item.trackId !== lesson.trackId,
    );
    return [...sameTrack, ...others].slice(0, 2);
  }, [allLessons, lesson.slug, lesson.trackId]);

  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      queueMicrotask(() => setCanNativeShare(true));
    }
  }, []);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const shareUrl = `${SITE_URL}/academy/${lesson.slug}`;
  const title = lesson.title[locale];
  const summary = lesson.summary[locale];
  const trackTitle = track ? track.title[locale] : lesson.trackId;
  const isPublished = lesson.status === "published" && Boolean(lesson.youtubeId);

  useLocalizedMeta(`${title} — ${dict.nav.academy} | Célio Vieira`, summary);

  const resolvedRelatedPosts = useMemo(
    () => relatedPosts.map((p) => resolvePostForLocale(p, locale)),
    [relatedPosts, locale],
  );

  const handleCopyLink = () => {
    void copyText(shareUrl).then((ok) => {
      if (!ok) return;
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {
        /* user cancelled */
      });
    }
  };

  const levelLabels = {
    foundations: dict.academy.levels.foundations,
    intermediate: dict.academy.levels.intermediate,
    advanced: dict.academy.levels.advanced,
  };

  const jsonLd = JSON.stringify(
    isPublished && lesson.youtubeId
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title,
          description: summary,
          inLanguage: locale,
          thumbnailUrl: getYouTubeThumbnailUrl(lesson.youtubeId),
          embedUrl: getYouTubeEmbedUrl(lesson.youtubeId),
          contentUrl: getYouTubeWatchUrl(lesson.youtubeId),
          uploadDate: lesson.publishedAt,
          duration: `PT${lesson.estimatedMinutes}M`,
          author: {
            "@type": "Person",
            name: "Célio Vieira",
            url: `${SITE_URL}/about`,
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: title,
          description: summary,
          inLanguage: locale,
          educationalLevel: lesson.level,
          timeRequired: `PT${lesson.estimatedMinutes}M`,
          url: `${SITE_URL}/academy/${lesson.slug}`,
          author: {
            "@type": "Person",
            name: "Célio Vieira",
            url: `${SITE_URL}/about`,
          },
        },
  );

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Nav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-5xl py-10" id="main">
        {/* Breadcrumb & Share */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/academy"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>{dict.academy.backToAcademy}</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:border-primary/50 transition-colors"
                title={dict.academy.copyLink}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" aria-hidden="true" />
                    <span className="text-emerald-500">{dict.ui.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} aria-hidden="true" />
                    <span>{dict.academy.copyLink}</span>
                  </>
                )}
              </button>

              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:border-primary/50 transition-colors"
                  title={dict.academy.shareLesson}
                  aria-label={dict.academy.shareLesson}
                >
                  <Share2 size={13} aria-hidden="true" />
                </button>
              )}

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("share_x", "academy_lesson")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:text-primary hover:border-primary/50 transition-colors"
                title={dict.academy.shareOnX}
              >
                <XIcon size={12} />
                <span>{dict.academy.share}</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("share_linkedin", "academy_lesson")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:text-sky-500 hover:border-sky-500/50 transition-colors"
                title={dict.academy.shareOnLinkedIn}
                aria-label={dict.academy.shareOnLinkedIn}
              >
                <LinkedInIcon size={12} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Lesson Header */}
        <Reveal delay={40}>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {track && (
                <Badge className={`text-xs font-mono font-bold ${track.badgeClass}`}>
                  <GraduationCap size={11} className="mr-1" aria-hidden="true" />
                  <span>{trackTitle}</span>
                </Badge>
              )}

              <Badge
                className={`text-xs font-mono font-bold flex items-center gap-1 ${
                  isPublished
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/25"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/25"
                }`}
              >
                {isPublished ? (
                  <Play size={11} aria-hidden="true" />
                ) : (
                  <Radio size={11} aria-hidden="true" />
                )}
                <span>
                  {isPublished ? dict.academy.statusPublished : dict.academy.statusUpcoming}
                </span>
              </Badge>

              {lesson.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-primary/5 text-primary border-primary/20"
                >
                  {translateTag(tag, locale)}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-white leading-tight text-balance">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-pretty max-w-3xl">
              {summary}
            </p>
          </header>
        </Reveal>

        {/* Video Stage */}
        <Reveal delay={80}>
          <div className="mb-10">
            <YouTubePlayer lesson={lesson} trackTitle={trackTitle} />
          </div>
        </Reveal>

        {/* Syllabus + Metadata Sidebar */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Outcomes */}
            <Reveal delay={100}>
              <section className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />
                  <span>{dict.academy.outcomesTitle}</span>
                </h2>
                <ul className="space-y-3">
                  {lesson.outcomes[locale].map((outcome, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-pretty">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Chapters */}
            <Reveal delay={130}>
              <section className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Compass size={18} className="text-primary" aria-hidden="true" />
                  <span>{dict.academy.chaptersTitle}</span>
                </h2>
                <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                  {lesson.chapters[locale].map((chapter, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-slate-50/70 dark:bg-[#0b1018]/70 text-gray-700 dark:text-gray-200"
                    >
                      {chapter}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Companion Blueprints */}
            {resolvedRelatedPosts.length > 0 && (
              <Reveal delay={160}>
                <section>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-primary" aria-hidden="true" />
                    <span>{dict.academy.companionBlueprintsTitle}</span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {resolvedRelatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                      >
                        <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 p-5">
                          <CardHeader className="p-0 pb-2 space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-emerald-500">
                              {dict.blog.blueprintBadge}
                            </span>
                            <CardTitle className="text-base font-bold group-hover:text-primary transition-colors leading-snug text-balance">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="text-xs line-clamp-2 text-gray-600 dark:text-gray-300 text-pretty">
                              {post.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-0 pt-2 mt-auto flex items-center justify-between text-xs font-semibold text-primary">
                            <span>
                              {post.readTimeMinutes} {dict.blog.readTime}
                            </span>
                            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              {dict.latestInsights.readArticle}{" "}
                              <ArrowRight size={11} aria-hidden="true" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <Reveal delay={120}>
              <div className="p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md space-y-4">
                <dl className="space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-200/60 dark:border-gray-800">
                    <dt className="text-muted-foreground flex items-center gap-1.5">
                      <Layers size={12} aria-hidden="true" />
                      <span>{dict.academy.trackLabel}</span>
                    </dt>
                    <dd className="font-bold text-gray-900 dark:text-white text-right">
                      {trackTitle}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-200/60 dark:border-gray-800">
                    <dt className="text-muted-foreground">{dict.academy.levelLabel}</dt>
                    <dd className="font-bold text-gray-900 dark:text-white">
                      {levelLabels[lesson.level]}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-200/60 dark:border-gray-800">
                    <dt className="text-muted-foreground flex items-center gap-1.5">
                      <Clock size={12} aria-hidden="true" />
                      <span>{dict.academy.durationLabel}</span>
                    </dt>
                    <dd className="font-bold text-primary">
                      {lesson.estimatedMinutes} {dict.academy.minutesLabel}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-muted-foreground">{dict.academy.statusLabel}</dt>
                    <dd
                      className={
                        isPublished ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"
                      }
                    >
                      {isPublished ? dict.academy.statusPublished : dict.academy.statusUpcoming}
                    </dd>
                  </div>
                </dl>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={
                      isPublished && lesson.youtubeId
                        ? getYouTubeWatchUrl(lesson.youtubeId)
                        : YOUTUBE_CHANNEL_URL
                    }
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackOutbound("youtube_channel", "academy_sidebar")}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono transition-colors"
                  >
                    <YouTubeIcon size={13} />
                    <span>
                      {isPublished ? dict.academy.watchOnYouTube : dict.academy.youtubeSubscribeCta}
                    </span>
                    <SquareArrowOutUpRight size={11} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Related Lessons */}
        {relatedLessons.length > 0 && (
          <section className="mt-14 pt-10 border-t border-gray-200/80 dark:border-gray-800/80">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dict.academy.relatedLessonsTitle}
              </h2>
              <Link
                to="/academy"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>{dict.academy.homeViewAll}</span>
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {relatedLessons.map((item: AcademyLesson) => {
                const itemTrack = getTrackById(item.trackId);
                return (
                  <Link
                    key={item.slug}
                    to={`/academy/${item.slug}`}
                    className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                  >
                    <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 p-5">
                      <CardHeader className="p-0 pb-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className={itemTrack ? itemTrack.accentClass : "text-primary"}>
                            {itemTrack ? itemTrack.title[locale] : item.trackId}
                          </span>
                          <span className="text-muted-foreground">
                            {item.estimatedMinutes} {dict.academy.minutesLabel}
                          </span>
                        </div>
                        <CardTitle className="text-base font-bold group-hover:text-primary transition-colors leading-snug text-balance">
                          {item.title[locale]}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2 text-gray-600 dark:text-gray-300 text-pretty">
                          {item.summary[locale]}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pt-2 mt-auto flex items-center justify-between text-xs font-semibold text-primary">
                        <span>{levelLabels[item.level]}</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {dict.academy.previewSyllabus} <ArrowRight size={11} aria-hidden="true" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
