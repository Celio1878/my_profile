/** @type {{experimental: {instrumentationHook: boolean, webVitalsAttribution: (string)[]}, i18n: {locales: string[]}}} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "pt-BR", "de-DE", "fr", "es"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
