import { useEffect } from "react";

/**
 * Syncs document.title and <meta name="description"> on the client whenever
 * the active locale (EN <-> pt-BR) or route content changes.
 */
export function useLocalizedMeta(title: string, description?: string) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (title) document.title = title;
    if (description) {
      const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
    }
  }, [title, description]);
}
