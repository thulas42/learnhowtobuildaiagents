import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as Locale)
    ? locale
    : defaultLocale;

  let messages;
  try {
    messages = (await import(`../../messages/${validLocale}.json`)).default;
  } catch {
    // Fall back to English if the locale file doesn't exist yet
    messages = (await import(`../../messages/en.json`)).default;
  }

  return { messages };
});
