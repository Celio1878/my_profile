"use server";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  br: () => import("../dictionaries/br.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
  de: () => import("../dictionaries/de.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
};

// @ts-ignore
export const getDictionary = async (locale: string) => dictionaries[locale]();
