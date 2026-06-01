"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Flame,
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { allLessonsMeta } from "@/data/lesson-generator";

interface ProgressResponse {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  progress: {
    lessonId: string;
    status: string;
    completedAt: string | null;
    updatedAt: string;
  }[];
}

interface QuizAttempt {
  lessonId: string;
  score: number;
  passed: boolean;
  completedAt: string;
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { data: session, status } = useSession();

  const [progressData, setProgressData] = useState<ProgressResponse | null>(
    null
  );
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const fullName = session?.user?.name || "";
  const firstName = fullName.split(" ")[0] || "there";

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [progressRes, quizRes] = await Promise.all([
          fetch("/api/progress", { credentials: "include" }),
          fetch("/api/quiz/submit", { credentials: "include" }),
        ]);

        if (progressRes.ok) {
          setProgressData(await progressRes.json());
        }
        if (quizRes.ok) {
          const quizData = await quizRes.json();
          setQuizAttempts(quizData.attempts || []);
        }
      } catch {
        // Keep empty states
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [status]);

  const overall = progressData?.overallProgress ?? 0;
  const completedLessons = progressData?.completedLessons ?? 0;
  const totalLessons = progressData?.totalLessons ?? allLessonsMeta.length;

  const completedIds = new Set(
    (progressData?.progress || [])
      .filter((p) => p.status === "COMPLETED")
      .map((p) => p.lessonId)
  );

  const nextLesson = allLessonsMeta.find((l) => !completedIds.has(l.slug));
  const quizzesPassed = quizAttempts.filter((a) => a.passed).length;

  const recentActivity = [
    ...quizAttempts
      .slice(-5)
      .reverse()
      .map((a) => {
        const meta = allLessonsMeta.find((l) => l.slug === a.lessonId);
        return {
          type: "quiz" as const,
          title: meta
            ? `Quiz ${meta.number} — ${a.passed ? "Passed" : "Attempted"} (${a.score}%)`
            : `Quiz — ${a.score}%`,
          date: new Date(a.completedAt).toLocaleDateString(),
          color: a.passed ? "bg-green-500" : "bg-amber-500",
        };
      }),
    ...(progressData?.progress || [])
      .filter((p) => p.status === "COMPLETED" && p.completedAt)
      .sort(
        (a, b) =>
          new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
      )
      .slice(0, 5)
      .map((p) => {
        const meta = allLessonsMeta.find((l) => l.slug === p.lessonId);
        return {
          type: "lesson" as const,
          title: meta?.title || p.lessonId,
          date: new Date(p.completedAt!).toLocaleDateString(),
          color: "bg-primary-500",
        };
      }),
  ].slice(0, 6);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("welcome", { name: firstName })}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {status === "authenticated"
              ? loading
                ? "Loading your progress..."
                : "Keep up the great work. You're making solid progress."
              : "Sign in to track your course progress."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/20">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {t("overallProgress")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overall}%
                </p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${overall}%` }}
              />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-500/20">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {t("quizzesPassed")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quizzesPassed}
                  <span className="text-sm text-gray-400 font-normal">
                    /{totalLessons}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Lessons done
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedLessons}
                  <span className="text-sm text-gray-400 font-normal">
                    /{totalLessons}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {t("currentLesson")}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {nextLesson?.number ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              Continue Learning
            </h2>
            {nextLesson ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Module {nextLesson.moduleNumber}: {nextLesson.title}
                </p>
                <Link
                  href={`/courses/${nextLesson.slug}`}
                  className="btn-primary gap-2 inline-flex"
                >
                  Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <p className="text-gray-500">
                {status === "authenticated"
                  ? "You've completed all lessons. Great job!"
                  : "Sign in to see your next lesson."}
              </p>
            )}
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Recent Activity
            </h2>
            {recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${item.color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No activity yet. Start a lesson to see progress here.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
