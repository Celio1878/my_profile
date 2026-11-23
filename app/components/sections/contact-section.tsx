import { Mail, MessageSquare, SquareArrowOutUpRight } from "lucide-react";
import type { FC } from "react";
import {
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
  XIcon,
  YouTubeIcon,
  type BrandIconProps,
} from "~/components/brand-icons";
import { Reveal } from "~/components/reveal";
import { useI18n } from "~/i18n";
import { trackOutbound } from "~/lib/analytics";

interface Channel {
  key: string;
  href: string;
  label: string;
  icon: FC<BrandIconProps>;
  iconClass: string;
  external: boolean;
  trackTarget: string;
}

export function ContactSection() {
  const { dict } = useI18n();

  const channels: Channel[] = [
    {
      key: "x",
      href: "https://x.com/celio1878",
      label: "X (@celio1878)",
      icon: XIcon,
      iconClass: "text-slate-700 dark:text-slate-300 group-hover:text-primary",
      external: true,
      trackTarget: "x_profile",
    },
    {
      key: "substack",
      href: "https://substack.com/@celio1878",
      label: dict.contact.substack,
      icon: SubstackIcon,
      iconClass: "text-amber-500",
      external: true,
      trackTarget: "substack_profile",
    },
    {
      key: "linkedin",
      href: "https://www.linkedin.com/in/celio-vieira",
      label: dict.contact.linkedIn,
      icon: LinkedInIcon,
      iconClass: "text-sky-500",
      external: true,
      trackTarget: "linkedin_profile",
    },
    {
      key: "github",
      href: "https://github.com/Celio1878",
      label: dict.contact.gitHub,
      icon: GitHubIcon,
      iconClass: "text-slate-800 dark:text-slate-200 group-hover:text-primary",
      external: true,
      trackTarget: "github_profile",
    },
    {
      key: "youtube",
      href: "https://www.youtube.com/@celio_vieira",
      label: dict.contact.youTube,
      icon: YouTubeIcon,
      iconClass: "text-red-500",
      external: true,
      trackTarget: "youtube_channel",
    },
  ];

  const cardClass =
    "flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-[#212836] bg-white/80 dark:bg-[#111620]/80 hover:border-emerald-500 hover:text-primary transition-all font-semibold shadow-sm group";

  return (
    <section id="contact" className="py-20 container mx-auto px-4 max-w-5xl scroll-mt-20">
      <Reveal>
        <div className="relative rounded-2xl p-8 sm:p-12 overflow-hidden border border-slate-200/90 dark:border-[#212836] bg-linear-to-br from-white/95 via-slate-50/80 to-emerald-500/5 dark:from-[#0d131d]/95 dark:via-[#090d14]/80 dark:to-emerald-500/10 backdrop-blur-xl shadow-xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-3">
              <MessageSquare size={14} aria-hidden="true" />
              <span>{dict.contact.directNetwork}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              {dict.contact.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {dict.contact.subheading}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto mb-8 font-mono text-xs">
            {/* Email */}
            <a href={`mailto:${dict.contact.emailAddress}`} className={cardClass}>
              <div className="flex items-center gap-2.5 truncate">
                <Mail size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
                <span className="truncate">{dict.contact.emailAddress}</span>
              </div>
              <SquareArrowOutUpRight
                size={12}
                className="shrink-0 text-muted-foreground group-hover:text-primary"
                aria-hidden="true"
              />
            </a>

            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.key}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackOutbound(channel.trackTarget, "contact_section")}
                  className={cardClass}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={15} className={`${channel.iconClass} shrink-0`} />
                    <span className="truncate">{channel.label}</span>
                  </div>
                  <SquareArrowOutUpRight
                    size={12}
                    className="shrink-0 text-muted-foreground group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
