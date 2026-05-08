import { useI18n } from "~/i18n";
import { HighlightChip } from "../highlight-chip";
import {
  Brain,
  Cloud,
  Code2,
  FileText,
  Layers,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Hero() {
  const { dict } = useI18n();

  return (
    <header className="relative overflow-hidden pt-28 pb-16 container mx-auto px-4">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-150 h-100 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Avatar */}
        <div className="animate-fade-in flex justify-center mb-6">
          <div className="relative">
            <img
              src="/me.jpeg"
              alt="Celio Vieira"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-xl"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-950"
              title="Available for opportunities"
            />
          </div>
        </div>

        {/* Name */}
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight gradient-text pb-1">
            {dict.hero.title}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in-up delay-100 mt-3">
          <p className="text-lg text-muted-foreground font-medium">
            {dict.hero.subtitle}
          </p>
        </div>

        {/* Location */}
        <div className="animate-fade-in-up delay-200 mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} aria-hidden="true" />
          <span>MG, Brazil</span>
        </div>

        {/* Highlight chips */}
        <div className="animate-fade-in-up delay-300 mt-5 flex flex-wrap items-center justify-center gap-2">
          <HighlightChip>
            <Brain size={12} aria-hidden="true" /> AI Engineer
          </HighlightChip>
          <HighlightChip>
            <Cloud size={12} aria-hidden="true" /> Cloud Architect
          </HighlightChip>
          <HighlightChip>
            <Layers size={12} aria-hidden="true" /> Data Engineer
          </HighlightChip>
          <HighlightChip>
            <Code2 size={12} aria-hidden="true" /> FullStack Dev
          </HighlightChip>
          <HighlightChip>
            <Sparkles size={12} aria-hidden="true" /> Tech Lead
          </HighlightChip>
        </div>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/celio-vieira"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {dict.hero.ctaLinkedIn}
          </a>
          <a
            href="https://github.com/Celio1878"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@celio_vieira"
            target="_blank"
            rel="noreferrer"
            aria-label={dict.hero.ariaYouTube}
            className="inline-flex items-center gap-2 rounded-full border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            {dict.hero.ctaYouTube}
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <FileText size={16} aria-hidden="true" />
            {dict.resume.downloadLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
