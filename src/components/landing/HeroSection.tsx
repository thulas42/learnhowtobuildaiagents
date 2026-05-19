"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Award, Code } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const stats = useTranslations("landing.stats");

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-purple-200/15 dark:bg-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100/10 to-purple-100/10 dark:from-primary-900/5 dark:to-purple-900/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 mb-8">
            <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              2026 Curriculum • LangChain, CrewAI, LlamaIndex
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Learn to Build{" "}
            <span className="gradient-text">AI Agents</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 gap-2">
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#modules" className="btn-secondary text-lg px-8 py-4 gap-2">
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Globe, label: stats("languages"), value: "25+" },
              { icon: Code, label: stats("modules"), value: "6" },
              { icon: Sparkles, label: stats("lessons"), value: "30+" },
              { icon: Award, label: stats("projects"), value: "4" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/60 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 backdrop-blur-sm"
              >
                <stat.icon className="h-5 w-5 text-primary-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
