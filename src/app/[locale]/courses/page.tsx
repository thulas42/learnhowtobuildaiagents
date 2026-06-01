"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Lock, CheckCircle, PlayCircle, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { getCourseCatalog } from "@/data/lesson-generator";

const MODULE_COLORS: Record<number, string> = {
  1: "from-blue-500 to-cyan-500",
  2: "from-purple-500 to-pink-500",
  3: "from-amber-500 to-orange-500",
  4: "from-green-500 to-emerald-500",
  5: "from-red-500 to-rose-500",
  6: "from-indigo-500 to-violet-500",
};

const MODULE_TITLE_KEYS: Record<number, string> = {
  1: "module1",
  2: "module2",
  3: "module3",
  4: "module4",
  5: "module5",
  6: "module6",
};

type LessonStatus = "completed" | "current" | "locked";

export default function CoursesPage() {
  const t = useTranslations("course");
  const mt = useTranslations("landing.modules");
  const { data: session } = useSession();
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    new Set()
  );

  const catalog = useMemo(() => getCourseCatalog(), []);

  useEffect(() => {
    if (!session?.user) return;

    fetch("/api/progress", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.progress) {
          const completed = new Set<string>(
            data.progress
              .filter((p: { status: string }) => p.status === "COMPLETED")
              .map((p: { lessonId: string }) => p.lessonId)
          );
          setCompletedLessonIds(completed);
        }
      })
      .catch(() => {});
  }, [session?.user]);

  function getLessonStatus(
    lessonSlug: string,
    lessonIndex: number,
    moduleLessons: { slug: string }[]
  ): LessonStatus {
    if (completedLessonIds.has(lessonSlug)) return "completed";

    const firstIncompleteIndex = moduleLessons.findIndex(
      (l) => !completedLessonIds.has(l.slug)
    );
    if (lessonIndex === firstIncompleteIndex) return "current";
    if (firstIncompleteIndex === -1) return "completed";
    return "locked";
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Course Modules
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 ml-[52px]">
            6 modules • {catalog.reduce((n, m) => n + m.lessons.length, 0)}{" "}
            lessons • From fundamentals to production
          </p>
        </div>

        <div className="space-y-6">
          {catalog.map((module) => {
            const completedInModule = module.lessons.filter((l) =>
              completedLessonIds.has(l.slug)
            ).length;
            const progress = Math.round(
              (completedInModule / module.lessons.length) * 100
            );
            const titleKey = MODULE_TITLE_KEYS[module.moduleNumber] || "module1";
            const color =
              MODULE_COLORS[module.moduleNumber] || "from-blue-500 to-cyan-500";

            return (
              <div key={module.moduleNumber} className="card overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${color} p-5 text-white`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm opacity-80">
                        Module {module.moduleNumber}
                      </span>
                      <h2 className="text-xl font-bold">
                        {mt(titleKey)}
                      </h2>
                    </div>
                    <div className="text-end">
                      <span className="text-2xl font-bold">{progress}%</span>
                      <p className="text-xs opacity-80">
                        {completedInModule}/{module.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const status = getLessonStatus(
                      lesson.slug,
                      lessonIndex,
                      module.lessons
                    );
                    const isLocked = status === "locked";

                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={
                            isLocked
                              ? "/pricing"
                              : `/courses/${lesson.slug}`
                          }
                          className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                            isLocked
                              ? "opacity-60 cursor-not-allowed"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <div className="shrink-0">
                            {status === "completed" && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {status === "current" && (
                              <PlayCircle className="h-5 w-5 text-primary-500" />
                            )}
                            {status === "locked" && (
                              <Lock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-gray-400 font-mono">
                              {lesson.number}
                            </span>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {lesson.title}
                            </p>
                          </div>
                          {!isLocked && (
                            <span className="text-xs text-primary-600 font-medium">
                              {t("startLesson")}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
