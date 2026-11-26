import { Mail } from "lucide-react";
import { Link } from "react-router";
import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  SubstackIcon,
  TwitchIcon,
  XIcon,
  YouTubeIcon,
} from "~/components/brand-icons";
import { HashLink } from "~/components/hash-link";
import { useI18n } from "~/i18n";
import { trackOutbound } from "~/lib/analytics";
import { currentYear } from "~/utils/dates";

const socialLinkClass =
  "w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors";

export function Footer() {
  const { dict } = useI18n();
  const copyright = `© ${currentYear} Célio Vieira. ${dict.footer.rights}`;

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200/80 dark:border-[#212836] bg-linear-to-b from-transparent via-emerald-500/5 to-emerald-500/10 dark:via-emerald-500/5 dark:to-emerald-500/15">
      {/* Decorative top border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-[#212836]/60">
          {/* Brand info with me.jpeg */}
          <div className="text-center md:text-left flex items-center gap-3">
            <img
              src="/me.jpeg"
              alt="Célio Vieira"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-sm"
            />
            <div>
              <Link
                to="/"
                className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white hover:text-primary transition-colors"
              >
                Célio Vieira
              </Link>
              <p className="text-xs font-mono text-muted-foreground">{dict.hero.role}</p>
            </div>
          </div>

          {/* Quick Route Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Link to="/" className="hover:text-primary transition-colors">
              {dict.nav.home}
            </Link>
            <HashLink hash="ecosystem" className="hover:text-primary transition-colors">
              {dict.nav.ecosystem}
            </HashLink>
            <HashLink hash="capabilities" className="hover:text-primary transition-colors">
              {dict.nav.capabilities}
            </HashLink>
            <Link to="/blog" className="hover:text-primary transition-colors">
              {dict.nav.blog}
            </Link>
            <Link to="/academy" className="hover:text-primary transition-colors">
              {dict.nav.academy}
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              {dict.nav.about}
            </Link>
          </div>

          {/* Socials: Email, X, Substack, Medium, LinkedIn, GitHub, YouTube, Twitch */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="mailto:contact@celiovieira.com"
              aria-label={dict.ui.emailLabel}
              className={`${socialLinkClass} hover:text-emerald-500 hover:border-emerald-500/60`}
            >
              <Mail size={14} aria-hidden="true" />
            </a>

            <a
              href="https://x.com/celio1878"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              onClick={() => trackOutbound("x_profile", "footer")}
              className={`${socialLinkClass} hover:text-emerald-500 hover:border-emerald-500/60`}
            >
              <XIcon size={13} />
            </a>

            <a
              href="https://substack.com/@celio1878"
              target="_blank"
              rel="noreferrer"
              aria-label="Substack"
              onClick={() => trackOutbound("substack_profile", "footer")}
              className={`${socialLinkClass} text-amber-500 hover:text-amber-400 hover:border-amber-500/60`}
            >
              <SubstackIcon size={13} />
            </a>

            <a
              href="https://www.linkedin.com/in/celio-vieira"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onClick={() => trackOutbound("linkedin_profile", "footer")}
              className={`${socialLinkClass} hover:text-sky-500 hover:border-sky-500/60`}
            >
              <LinkedInIcon size={13} />
            </a>

            <a
              href="https://github.com/Celio1878"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              onClick={() => trackOutbound("github_profile", "footer")}
              className={`${socialLinkClass} hover:text-emerald-500 hover:border-emerald-500/60`}
            >
              <GitHubIcon size={13} />
            </a>

            <a
              href="https://www.youtube.com/@celio_vieira"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              onClick={() => trackOutbound("youtube_channel", "footer")}
              className={`${socialLinkClass} hover:text-red-500 hover:border-red-500/60`}
            >
              <YouTubeIcon size={13} />
            </a>

            <a
              href="https://www.twitch.tv/celio1878"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitch"
              onClick={() => trackOutbound("twitch_profile", "footer")}
              className={`${socialLinkClass} hover:text-purple-500 hover:border-purple-500/60`}
            >
              <TwitchIcon size={13} />
            </a>

            <a
              href="https://medium.com/@celio.vieira1878"
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
              onClick={() => trackOutbound("medium_profile", "footer")}
              className={`${socialLinkClass} hover:text-emerald-500 hover:border-emerald-500/60`}
            >
              <MediumIcon size={13} />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-muted-foreground gap-2">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
