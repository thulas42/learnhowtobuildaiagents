import { NextRequest, NextResponse } from "next/server";
import { getLocaleFromCountry } from "@/i18n/geo-locale";

/**
 * GET /api/locale/detect
 * 
 * Detects the user's preferred locale based on:
 * 1. Geolocation headers (x-vercel-ip-country, cf-ipcountry)
 * 2. Accept-Language header
 * 3. Falls back to "en"
 * 
 * Used by the client to suggest a language switch if the user
 * is browsing in a different language than their detected one.
 */
export async function GET(request: NextRequest) {
  // Try geolocation headers
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    null;

  const geoLocale = getLocaleFromCountry(country);

  // Try Accept-Language header as secondary signal
  const acceptLanguage = request.headers.get("accept-language") || "";
  const browserLangs = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  // Map browser language to our supported locales
  let browserLocale = "en";
  for (const lang of browserLangs) {
    // Exact match (e.g., "zh-cn" -> "zh-CN")
    if (lang === "zh-cn" || lang === "zh") {
      browserLocale = "zh-CN";
      break;
    }
    if (lang === "pt-br" || lang === "pt") {
      browserLocale = "pt-BR";
      break;
    }
    // Two-letter code match
    const twoLetter = lang.substring(0, 2);
    const localeMap: Record<string, string> = {
      en: "en", es: "es", fr: "fr", de: "de", it: "it", ja: "ja",
      ko: "ko", ru: "ru", ar: "ar", hi: "hi", bn: "bn", tr: "tr",
      vi: "vi", th: "th", id: "id", pl: "pl", uk: "uk", nl: "nl",
      fa: "fa", ur: "ur", ta: "ta", sw: "sw", he: "he",
    };
    if (localeMap[twoLetter]) {
      browserLocale = localeMap[twoLetter];
      break;
    }
  }

  return NextResponse.json({
    detectedCountry: country,
    geoLocale,
    browserLocale,
    // Use geo if available, otherwise browser preference
    recommendedLocale: country ? geoLocale : browserLocale,
  });
}
