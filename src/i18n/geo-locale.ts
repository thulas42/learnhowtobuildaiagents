import type { Locale } from "./config";

/**
 * Maps country codes (ISO 3166-1 alpha-2) to preferred locale.
 * Used for geolocation-based language detection.
 */
export const countryToLocale: Record<string, Locale> = {
  // English
  US: "en", GB: "en", AU: "en", CA: "en", NZ: "en", IE: "en", ZA: "en",
  
  // Chinese (Simplified)
  CN: "zh-CN", SG: "zh-CN",
  
  // Hindi
  IN: "hi",
  
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  
  // Arabic
  SA: "ar", EG: "ar", IQ: "ar", MA: "ar", DZ: "ar", SD: "ar", YE: "ar",
  SY: "ar", TN: "ar", JO: "ar", LY: "ar", LB: "ar", AE: "ar", OM: "ar",
  KW: "ar", QA: "ar", BH: "ar",
  
  // French
  FR: "fr", BE: "fr", CH: "fr", SN: "fr", CI: "fr", CM: "fr", MG: "fr",
  ML: "fr", BF: "fr", NE: "fr", TD: "fr", GN: "fr", RW: "fr", HT: "fr",
  
  // Bengali
  BD: "bn",
  
  // Portuguese (Brazilian)
  BR: "pt-BR", PT: "pt-BR", AO: "pt-BR", MZ: "pt-BR",
  
  // Russian
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  
  // Japanese
  JP: "ja",
  
  // German
  DE: "de", AT: "de",
  
  // Korean
  KR: "ko",
  
  // Turkish
  TR: "tr",
  
  // Vietnamese
  VN: "vi",
  
  // Italian
  IT: "it",
  
  // Thai
  TH: "th",
  
  // Indonesian
  ID: "id",
  
  // Polish
  PL: "pl",
  
  // Ukrainian
  UA: "uk",
  
  // Dutch
  NL: "nl",
  
  // Persian
  IR: "fa", AF: "fa",
  
  // Urdu
  PK: "ur",
  
  // Tamil (Sri Lanka uses Tamil too)
  LK: "ta",
  
  // Swahili
  KE: "sw", TZ: "sw", UG: "sw",
  
  // Hebrew
  IL: "he",
};

/**
 * Get the preferred locale based on country code.
 * Falls back to "en" if country is not mapped.
 */
export function getLocaleFromCountry(countryCode: string | null): Locale {
  if (!countryCode) return "en";
  return countryToLocale[countryCode.toUpperCase()] || "en";
}
