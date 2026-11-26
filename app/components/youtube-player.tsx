import { Play, Radio, SquareArrowOutUpRight, Terminal } from "lucide-react";
import { useState, type FC } from "react";
import { YouTubeIcon } from "~/components/brand-icons";
import { useI18n } from "~/i18n";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeWatchUrl,
  YOUTUBE_SUBSCRIBE_URL,
  type AcademyLesson,
} from "~/lib/academy";
import { trackOutbound } from "~/lib/analytics";
import { translateTag } from "~/lib/tags";

interface YouTubePlayerProps {
  lesson: AcademyLesson;
  trackTitle: string;
}

export const YouTubePlayer: FC<YouTubePlayerProps> = ({ lesson, trackTitle }) => {
  const { dict, locale } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);

  const hasVideo = lesson.status === "published" && Boolean(lesson.youtubeId);
  const title = lesson.title[locale];

  if (hasVideo && lesson.youtubeId) {
    const youtubeId = lesson.youtubeId;
    const watchUrl = getYouTubeWatchUrl(youtubeId);

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-[#212836] bg-[#090b10] shadow-2xl">
        {isPlaying ? (
          <iframe
            src={getYouTubeEmbedUrl(youtubeId)}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full group">
            <img
              src={getYouTubeThumbnailUrl(youtubeId)}
              alt={title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-[#090b10]/90 via-[#090b10]/30 to-[#090b10]/40"
            />

            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`${dict.academy.playVideoAria}: ${title}`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/40 group-hover:scale-110 transition-transform">
                <Play size={28} className="ml-1 fill-current" aria-hidden="true" />
              </span>
              <span className="px-3 py-1 rounded-full bg-[#090b10]/85 border border-white/15 text-xs font-mono font-semibold text-white">
                {trackTitle} • {lesson.estimatedMinutes} {dict.academy.minutesLabel}
              </span>
            </button>

            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutbound("youtube_lesson_watch", "academy_player")}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090b10]/85 border border-[#212836] text-xs font-mono font-semibold text-slate-200 hover:border-red-500/60 hover:text-white transition-colors"
            >
              <YouTubeIcon size={13} className="text-red-500" />
              <span>{dict.academy.watchOnYouTube}</span>
              <SquareArrowOutUpRight size={11} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-[#212836] bg-linear-to-br from-[#0b1019] via-[#090b10] to-emerald-950/30 shadow-2xl flex flex-col justify-between p-5 sm:p-8 text-slate-100">
      {/* Terminal header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-400">
          <Terminal size={14} className="text-emerald-400" aria-hidden="true" />
          <span className="truncate">
            $ yt-studio --track {lesson.trackId} --status in-production
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <Radio size={12} aria-hidden="true" />
          <span>{dict.academy.statusUpcoming}</span>
        </span>
      </div>

      {/* Center staging content */}
      <div className="my-auto py-4 max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
          <span>{trackTitle}</span>
          <span aria-hidden="true">•</span>
          <span>
            {lesson.estimatedMinutes} {dict.academy.minutesLabel}
          </span>
        </div>

        <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white text-balance">
          {dict.academy.upcomingStageTitle}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-pretty max-w-xl mx-auto">
          {dict.academy.upcomingStageText}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={YOUTUBE_SUBSCRIBE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackOutbound("youtube_subscribe", "academy_upcoming_stage")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono transition-colors shadow-md shadow-red-600/20"
          >
            <YouTubeIcon size={14} />
            <span>{dict.academy.upcomingNotifyCta}</span>
            <SquareArrowOutUpRight size={11} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Bottom tags strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
        {lesson.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded border border-[#212836] bg-[#0f141c]/90 text-slate-300"
          >
            #{translateTag(tag, locale)}
          </span>
        ))}
      </div>
    </div>
  );
};
