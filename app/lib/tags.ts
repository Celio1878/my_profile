import type { SupportedLocale } from "~/i18n";

const PT_BR_TAGS: Record<string, string> = {
  AI: "IA",
  Accessibility: "Acessibilidade",
  Agents: "Agentes",
  Algorithms: "Algoritmos",
  Architecture: "Arquitetura",
  "Augmented Reality": "Realidade Aumentada",
  Automation: "Automação",
  Cloud: "Nuvem",
  "Cloud Architecture": "Arquitetura em Nuvem",
  "Computer Vision": "Visão Computacional",
  "Creator Economy": "Economia Criativa",
  "Data Engineering": "Engenharia de Dados",
  "Developer Tooling": "Ferramentas Dev",
  "Edge AI": "IA na Borda",
  "Image Processing": "Processamento de Imagem",
  Leadership: "Liderança",
  "Local AI": "IA Local",
  Logistics: "Logística",
  "Multimodal AI": "IA Multimodal",
  "Multimodal OCR": "OCR Multimodal",
  "Quantum Computing": "Computação Quântica",
  Security: "Segurança",
};

/** Localize descriptive topic tags while keeping canonical filter slugs intact. */
export function translateTag(tag: string, locale: SupportedLocale): string {
  if (locale === "pt-BR") {
    return PT_BR_TAGS[tag] ?? tag;
  }
  return tag;
}
