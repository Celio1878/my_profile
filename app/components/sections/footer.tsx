import { useI18n } from "~/i18n";
import { Reveal } from "~/components/reveal";
import { Mail } from "lucide-react";
import { currentYear } from "~/utils/dates";

export function Footer() {
  const { dict } = useI18n();
  const copyright = `© ${currentYear} Celio Vieira. All rights reserved.`;

  return (
    <footer
      id="contact"
      className="relative mt-16 overflow-hidden border-t border-gray-200/80 dark:border-gray-800/80 bg-linear-to-b from-transparent via-primary/5 to-primary/10 dark:via-primary/10 dark:to-primary/20"
    >
      {/* Decorative top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container mx-auto px-4 py-16 relative">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text inline-block pb-1">
              {dict.contact.heading}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Let&apos;s build something great together.
            </p>
          </div>
        </Reveal>

        {/* Social circle buttons */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            {[
              {
                href: "mailto:contato@celiovieira.com",
                label: "Email",
                ring: "hover:border-emerald-500 hover:text-emerald-500 hover:shadow-emerald-500/30",
                icon: <Mail size={20} aria-hidden="true" />,
              },
              {
                href: "https://www.linkedin.com/in/celio-vieira",
                label: "LinkedIn",
                ring: "hover:border-blue-500 hover:text-blue-500 hover:shadow-blue-500/30",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                href: "https://github.com/Celio1878",
                label: "GitHub",
                ring: "hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white hover:shadow-gray-900/30",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: "https://www.youtube.com/@celio_vieira",
                label: "YouTube",
                ring: "hover:border-red-500 hover:text-red-500 hover:shadow-red-500/30",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                title={s.label}
                className={
                  "group relative inline-flex items-center justify-center w-12 h-12 rounded-full " +
                  "border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm " +
                  "text-gray-600 dark:text-gray-300 transition-all duration-300 " +
                  "hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:scale-95 " +
                  s.ring
                }
              >
                {s.icon}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Contact details row */}
        <Reveal delay={150}>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a
              href="mailto:contato@celiovieira.com"
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            >
              <Mail size={14} aria-hidden="true" />
              contato@celiovieira.com
            </a>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-gray-200/60 dark:border-gray-800/60 py-5 text-center backdrop-blur-sm">
        <p className="text-xs text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  );
}
