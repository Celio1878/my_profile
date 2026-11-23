import { track } from "@vercel/analytics";

type EventProps = Record<string, string | number | boolean | null>;

/** Fire-and-forget analytics; must never break the UX. */
export function trackEvent(name: string, props?: EventProps): void {
  try {
    track(name, props);
  } catch {
    /* analytics unavailable (dev, blocked, SSR) — ignore */
  }
}

/** Standardized outbound click tracking (stores, Aldeon, Substack, npm). */
export function trackOutbound(target: string, location: string): void {
  trackEvent("outbound_click", { target, location });
}
