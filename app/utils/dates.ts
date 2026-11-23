export const currentYear = new Date().getFullYear();

/** Locale-aware article date formatting (deterministic per app locale). */
export function formatDate(iso: string, locale: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/** Locale-aware number formatting that is stable between SSR and hydration. */
export function formatNumber(value: number, locale: string): string {
  return value.toLocaleString(locale === "pt-BR" ? "pt-BR" : "en-US");
}
