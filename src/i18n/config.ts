export const locales = [
  "en",
  "zh-CN",
  "hi",
  "es",
  "ar",
  "fr",
  "bn",
  "pt-BR",
  "ru",
  "ja",
  "de",
  "ko",
  "tr",
  "vi",
  "it",
  "th",
  "id",
  "pl",
  "uk",
  "nl",
  "fa",
  "ur",
  "ta",
  "sw",
  "he",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = ["ar", "fa", "ur", "he"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "中文 (简体)",
  hi: "हिन्दी",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  bn: "বাংলা",
  "pt-BR": "Português (Brasil)",
  ru: "Русский",
  ja: "日本語",
  de: "Deutsch",
  ko: "한국어",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  it: "Italiano",
  th: "ไทย",
  id: "Bahasa Indonesia",
  pl: "Polski",
  uk: "Українська",
  nl: "Nederlands",
  fa: "فارسی",
  ur: "اردو",
  ta: "தமிழ்",
  sw: "Kiswahili",
  he: "עברית",
};

export const localeRegions: Record<string, Locale[]> = {
  americas: ["en", "es", "pt-BR", "fr"],
  europe: ["fr", "de", "es", "it", "nl", "pl", "uk", "ru"],
  middleEast: ["ar", "tr", "he", "fa"],
  southAsia: ["hi", "bn", "ur", "ta"],
  eastAsia: ["zh-CN", "ja", "ko"],
  southeastAsia: ["id", "vi", "th"],
  africa: ["sw", "fr", "ar"],
};
