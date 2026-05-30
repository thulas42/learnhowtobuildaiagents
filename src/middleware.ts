import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";
import { getLocaleFromCountry } from "@/i18n/geo-locale";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/favicon.ico" ||
    /\.[a-z]{2,4}$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if user already has a locale preference cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  // If no cookie and visiting root path, detect locale from geolocation
  if (!localeCookie && pathname === "/") {
    // Try to get country from various headers (works on Vercel, Cloudflare, AWS)
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-country-code") ||
      request.geo?.country ||
      null;

    if (country) {
      const detectedLocale = getLocaleFromCountry(country);
      if (detectedLocale !== defaultLocale) {
        // Redirect to the detected locale
        const url = request.nextUrl.clone();
        url.pathname = `/${detectedLocale}`;
        const response = NextResponse.redirect(url);
        // Set cookie so we don't redirect again
        response.cookies.set("NEXT_LOCALE", detectedLocale, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: "/",
        });
        return response;
      }
    }
  }

  // Run the next-intl middleware for locale routing
  const response = intlMiddleware(request);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon\\.ico|icon\\.svg|apple-touch-icon\\.png|manifest\\.json|.*\\.(?:ico|svg|png|jpg|jpeg|gif|webp|txt|xml|json|js|css|woff|woff2|ttf|eot)$).*)",
  ],
};
