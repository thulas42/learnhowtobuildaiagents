"use client";

import { useTranslations } from "next-intl";
import { Code, Brain, Award, Globe, Rocket, Users } from "lucide-react";

const featureIcons = {
  interactive: Code,
  quizzes: Brain,
  certificate: Award,
  global: Globe,
  projects: Rocket,
  community: Users,
};

const featureColors = {
  interactive: "from-blue-500 to-cyan-500",
  quizzes: "from-purple-500 to-pink-500",
  certificate: "from-amber-500 to-orange-500",
  global: "from-green-500 to-emerald-500",
  projects: "from-red-500 to-rose-500",
  community: "from-indigo-500 to-violet-500",
};

export function FeaturesSection() {
  const t = useTranslations("landing.features");

  const features = [
    "interactive",
    "quizzes",
    "certificate",
    "global",
    "projects",
    "community",
  ] as const;

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to go from zero to building production AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = featureIcons[feature];
            const gradient = featureColors[feature];
            return (
              <div
                key={feature}
                className="card-hover group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg shadow-gray-200/50 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`${feature}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t(`${feature}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
