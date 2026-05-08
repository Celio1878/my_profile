import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  dictionaries,
  type Dictionary,
  type SupportedLocale,
} from "./lib/profile-translations";

export { type SupportedLocale, type Dictionary };

const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "de", "pt-BR", "es"];
const LOCALE_STORAGE_KEY = "preferred-locale";

/**
 * Map a single BCP-47 language tag (e.g. "pt-PT", "es-MX", "de-AT") to one of
 * our supported locales. Returns null when there is no reasonable match so the
 * caller can keep scanning the `navigator.languages` priority list.
 */
function matchLocale(tag: string): SupportedLocale | null {
  if (!tag) return null;
  const lower = tag.toLowerCase().replace("_", "-");
  const primary = lower.split("-")[0];

  // Portuguese — all variants map to pt-BR (the only Portuguese dictionary we ship)
  if (primary === "pt") return "pt-BR";
  // German — de, de-AT, de-CH, de-DE, ...
  if (primary === "de") return "de";
  // Spanish — es, es-ES, es-MX, es-AR, ca (close cultural fit), gl
  if (primary === "es") return "es";
  // English — en, en-US, en-GB, ...
  if (primary === "en") return "en";

  return null;
}

/**
 * Detects the best matching locale based on (in order):
 *   1. Explicit user preference saved in localStorage
 *   2. `navigator.languages` (full priority list set by the browser/OS)
 *   3. `navigator.language` (single fallback)
 *   4. `"en"` as the ultimate default
 *
 * Safe to call during SSR — returns `"en"` when `navigator` is unavailable.
 */
export function detectLocale(): SupportedLocale {
  if (typeof navigator === "undefined") return "en";

  // 1. Stored user preference wins over auto-detection
  if (typeof localStorage !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && (SUPPORTED_LOCALES as string[]).includes(stored)) {
        return stored as SupportedLocale;
      }
    } catch {
      /* ignore — privacy mode, disabled storage, etc. */
    }
  }

  // 2. & 3. Walk the browser's full language priority list
  const candidates: string[] = [];
  if (Array.isArray(navigator.languages)) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) candidates.push(navigator.language);

  for (const tag of candidates) {
    const match = matchLocale(tag);
    if (match) return match;
  }

  return "en";
}

const LocaleContext = createContext<{
  locale: SupportedLocale;
  setLocale: (l: SupportedLocale) => void;
  dict: Dictionary;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Initialize with "en" on both server and first client render to avoid
  // hydration mismatches; the real browser-based locale is applied right after
  // mount in the effect below.
  const [locale, setLocaleState] = useState<SupportedLocale>("en");

  // Detect & apply the browser/stored locale once on the client
  useEffect(() => {
    const detected = detectLocale();
    if (detected !== locale) setLocaleState(detected);
    // Intentionally run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect the active language on <html lang> for accessibility & SEO,
  // and persist explicit user choices.
  useEffect(() => {
    try {
      document.documentElement.setAttribute(
        "lang",
        locale.startsWith("pt") ? "pt-BR" : locale,
      );
    } catch {}
  }, [locale]);

  const setLocale = (l: SupportedLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      /* storage unavailable — silently keep in-memory value */
    }
  };

  const dict = useMemo(() => dictionaries[locale] ?? dictionaries.en, [locale]);

  const value = useMemo(() => ({ locale, setLocale, dict }), [locale, dict]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx;
  // Fallback to a safe default if the provider isn't mounted yet
  const locale: SupportedLocale = "en";
  return {
    locale,
    setLocale: () => {},
    dict: dictionaries[locale] ?? dictionaries.en,
  };
}
