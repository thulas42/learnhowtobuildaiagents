"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { localeNames, type Locale } from "@/i18n/config";

export function LanguageSelector() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    // Set cookie to remember preference
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;

    // Navigate to the new locale
    const segments = pathname.split("/");
    // Check if first segment is a locale
    const currentLocales = Object.keys(localeNames);
    if (currentLocales.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t("language")}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium hidden sm:block">
          {localeNames[locale as Locale]?.split(" ")[0] || locale}
        </span>
        <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 w-64 max-h-80 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t("language")}
            </p>
            {(Object.entries(localeNames) as [Locale, string][]).map(
              ([code, name]) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className={`w-full flex items-center justify-between text-start px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    code === locale
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span>{name}</span>
                  {code === locale && (
                    <Check className="h-4 w-4 text-primary-600" />
                  )}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
