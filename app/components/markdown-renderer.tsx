import { type FC, useEffect, useRef } from "react";
import { useI18n } from "~/i18n";
import { copyText } from "~/lib/clipboard";

interface MarkdownRendererProps {
  /** Pre-rendered, sanitized HTML produced at build time (scripts/build-blog.ts). */
  html: string;
  className?: string;
}

/**
 * Renders build-time article HTML and wires interactive affordances:
 * copy-to-clipboard code buttons (localized, guarded) and localized
 * heading-anchor labels. No markdown parsing happens at runtime.
 */
export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ html, className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { dict } = useI18n();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timers: number[] = [];
    const cleanups: Array<() => void> = [];

    el.querySelectorAll<HTMLButtonElement>(".copy-code-btn").forEach((btn) => {
      btn.setAttribute("aria-label", dict.ui.copyCode);
      const label = btn.querySelector<HTMLElement>("[data-copy-label]");
      if (label) label.textContent = dict.ui.copyCode;

      const handler = () => {
        const raw = btn.getAttribute("data-code");
        if (!raw) return;
        let decoded = raw;
        try {
          decoded = decodeURIComponent(raw);
        } catch {
          /* keep raw value */
        }
        void copyText(decoded).then((ok) => {
          if (!ok || !label) return;
          label.textContent = dict.ui.codeCopied;
          btn.classList.add("text-emerald-500");
          const timer = window.setTimeout(() => {
            label.textContent = dict.ui.copyCode;
            btn.classList.remove("text-emerald-500");
          }, 2000);
          timers.push(timer);
        });
      };

      btn.addEventListener("click", handler);
      cleanups.push(() => btn.removeEventListener("click", handler));
    });

    el.querySelectorAll<HTMLElement>('[data-i18n-aria="linkToSection"]').forEach((anchor) => {
      anchor.setAttribute("aria-label", dict.ui.linkToSection);
    });

    return () => {
      cleanups.forEach((fn) => fn());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [html, dict]);

  return (
    <div
      ref={containerRef}
      className={`markdown-body text-gray-800 dark:text-gray-200 leading-relaxed text-base max-w-[75ch] mx-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
