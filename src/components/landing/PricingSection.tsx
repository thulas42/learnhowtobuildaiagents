"use client";

import { useTranslations } from "next-intl";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  const t = useTranslations("landing.pricing");

  const plans = ["free", "standard", "premium"] as const;

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div
              key={plan}
              className={`card relative ${
                index === 1
                  ? "border-primary-200 dark:border-primary-800 shadow-xl shadow-primary-100/50 dark:shadow-none md:scale-105 md:-my-4"
                  : ""
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {t(`${plan}.title`)}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {t(`${plan}.price`)}
                </span>
                {plan !== "free" && (
                  <span className="text-sm text-gray-500">USD</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw(`${plan}.features`) as string[]).map(
                  (feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  )
                )}
              </ul>

              <Link
                href="/auth/signup"
                className={`w-full text-center ${index === 1 ? "btn-primary" : "btn-secondary"}`}
              >
                {plan === "free" ? "Start Free" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
