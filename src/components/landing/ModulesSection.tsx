"use client";

import { useTranslations } from "next-intl";

export function ModulesSection() {
  const t = useTranslations("landing.modules");

  const modules = [
    { key: "module1", number: 1, weeks: "Week 1", color: "from-blue-500 to-cyan-500" },
    { key: "module2", number: 2, weeks: "Weeks 2–3", color: "from-purple-500 to-pink-500" },
    { key: "module3", number: 3, weeks: "Weeks 4–5", color: "from-amber-500 to-orange-500" },
    { key: "module4", number: 4, weeks: "Weeks 6–8", color: "from-green-500 to-emerald-500" },
    { key: "module5", number: 5, weeks: "Weeks 9–10", color: "from-red-500 to-rose-500" },
    { key: "module6", number: 6, weeks: "Weeks 11–12", color: "from-indigo-500 to-violet-500" },
  ] as const;

  return (
    <section id="modules" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            6 modules taking you from fundamentals to deploying production AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.key}
              className="card-hover group relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-center gap-3 mb-4">
                <span className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} text-white font-bold text-sm shadow-md`}>
                  {mod.number}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                  {mod.weeks}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(`${mod.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t(`${mod.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Learning paths */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">
            12 weeks self-paced • 6–10 hours/week • Choose your path
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-5 py-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium">
              ⚡ Fast Track — 6 weeks
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 text-sm font-medium">
              📚 Standard — 12 weeks
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-sm font-medium">
              🌱 Extended — 16 weeks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
