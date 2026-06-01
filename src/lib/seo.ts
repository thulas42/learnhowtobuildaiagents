import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/** Canonical production URL — prefer NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://learnhowtobuildaiagents.com";

export const SITE_NAME = "AI Agent Academy";

const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  ko: "ko_KR",
  "zh-CN": "zh_CN",
  "pt-BR": "pt_BR",
  ru: "ru_RU",
  ar: "ar_SA",
  hi: "hi_IN",
  it: "it_IT",
  nl: "nl_NL",
  pl: "pl_PL",
  tr: "tr_TR",
  vi: "vi_VN",
  th: "th_TH",
  id: "id_ID",
  uk: "uk_UA",
  fa: "fa_IR",
  ur: "ur_PK",
  ta: "ta_IN",
  sw: "sw_KE",
  he: "he_IL",
  bn: "bn_BD",
};

export const DEFAULT_OG_IMAGE = "/og-image.png";

export const PRIMARY_KEYWORDS = [
  "AI agent course",
  "learn to build AI agents",
  "AI agent development tutorial",
  "LangChain course",
  "LlamaIndex tutorial",
  "Claude AI agents",
  "multi-agent systems course",
  "LLM agent tutorial",
  "Python AI agents",
  "AI agent certification",
  "RAG tutorial",
  "CrewAI tutorial",
  "production AI agents",
];

/**
 * Path without locale prefix (e.g. "/courses", "/blog/slug").
 */
export function localePath(path: string, locale: string = defaultLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized === "" ? "/" : normalized;
  }
  if (normalized === "/" || normalized === "") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function absoluteUrl(path: string, locale: string = defaultLocale): string {
  const base = SITE_URL.replace(/\/$/, "");
  const localized = localePath(path, locale);
  return `${base}${localized === "/" ? "" : localized}`;
}

/**
 * hreflang map for Next.js metadata.alternates.languages
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(path, locale);
  }
  languages["x-default"] = absoluteUrl(path, defaultLocale);
  return languages;
}

export function pageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  keywords = [],
  ogType = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const canonical = localePath(path, locale);
  const url = absoluteUrl(path, locale);

  return {
    title,
    description,
    keywords: [...PRIMARY_KEYWORDS, ...keywords],
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: ogType,
      locale: OG_LOCALE_MAP[locale] || OG_LOCALE_MAP.en,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
