import { marked } from "marked";
import { type FC, useMemo, useEffect, useRef } from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const html = useMemo(() => {
    // Configure marked for clean GitHub-like markdown
    const renderer = new marked.Renderer();

    // Customize links to open in new tab securely
    renderer.link = ({ href, title, text }) => {
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      const titleAttr = title ? ` title="${title}"` : "";
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${titleAttr}${targetAttr} class="text-blue-600 dark:text-blue-400 hover:underline font-medium">${text}</a>`;
    };

    // Customize headings
    renderer.heading = ({ text, depth }) => {
      const id = text
        .toLowerCase()
        .replace(/<[^>]*>/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      const classes: Record<number, string> = {
        1: "text-3xl font-extrabold mt-8 mb-4 tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2",
        2: "text-2xl font-bold mt-8 mb-3 tracking-tight text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-1.5",
        3: "text-xl font-semibold mt-6 mb-2.5 text-gray-900 dark:text-gray-100",
        4: "text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200",
      };

      const headingClass = classes[depth] || "text-base font-semibold mt-4 mb-2";
      return `<h${depth} id="${id}" class="${headingClass} group flex items-center gap-2">
        <span>${text}</span>
        <a href="#${id}" class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm" aria-label="Link to section">#</a>
      </h${depth}>`;
    };

    // Customize blockquotes
    renderer.blockquote = ({ text }) => {
      return `<blockquote class="border-l-4 border-primary/70 bg-primary/5 dark:bg-primary/10 pl-4 py-2 my-4 rounded-r-md text-gray-700 dark:text-gray-300 italic">${text}</blockquote>`;
    };

    // Customize code blocks
    renderer.code = ({ text, lang }) => {
      const language = lang || "text";
      return `<div class="relative my-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-slate-900 shadow-sm group">
        <div class="flex items-center justify-between px-4 py-1.5 bg-slate-950/80 border-b border-gray-800 text-xs text-gray-400 font-mono">
          <span class="font-medium">${language}</span>
          <button type="button" class="copy-code-btn text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded transition-colors bg-white/5 hover:bg-white/10" data-code="${encodeURIComponent(
            text
          )}">Copy</button>
        </div>
        <pre class="p-4 overflow-x-auto text-sm font-mono text-gray-100 leading-relaxed"><code>${text.replace(
          /</g,
          "&lt;"
        ).replace(/>/g, "&gt;")}</code></pre>
      </div>`;
    };

    const parsed = marked.parse(content, {
      renderer,
      gfm: true,
      breaks: true,
    });

    return parsed as string;
  }, [content]);

  // Attach event listener for copy code buttons
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const copyButtons = el.querySelectorAll<HTMLButtonElement>(".copy-code-btn");
    const cleanupFns: Array<() => void> = [];

    copyButtons.forEach((btn) => {
      const handler = () => {
        const raw = btn.getAttribute("data-code");
        if (!raw) return;
        const decoded = decodeURIComponent(raw);
        navigator.clipboard.writeText(decoded).then(() => {
          const original = btn.innerText;
          btn.innerText = "Copied!";
          btn.classList.add("text-emerald-400");
          setTimeout(() => {
            btn.innerText = original;
            btn.classList.remove("text-emerald-400");
          }, 2000);
        });
      };

      btn.addEventListener("click", handler);
      cleanupFns.push(() => btn.removeEventListener("click", handler));
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={`markdown-body text-gray-800 dark:text-gray-200 leading-relaxed text-base space-y-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
