import { createContext } from "react";

export type Language = "en" | "pt-BR" | "es" | "de";

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const getBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("de")) return "de";

  return "en"; // Default to English
};
