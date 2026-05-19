"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { BookOpen, Trophy, Flame, ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  const progress = {
    overall: 35,
    currentModule: 2,
    currentLesson: "2.3",
    quizzesPassed: 7,
    totalQuizzes: 30,
    streak: 5,
  };

  const recentActivity = [
    { type: "quiz", title: "Quiz 2.2 — Passed (80%)", date: "Today", color: "bg-green-500" },
    { type: "lesson", title: "Introduction to Machine Learning", date: "Today", color: "bg-primary-500" },
    { type: "lesson", title: "Core AI Concepts", date: "Yesterday", color: "bg-primary-500" },
    { type: "quiz", title: "Quiz 2.1 — Passed (100%)", date: "Yesterday", color: "bg-green-500" },
  ];

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("welcome", { name: "Learner" })} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Keep up the great work. You're making solid progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/20">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("overallProgress")}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.overall}%</p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress.overall}%` }} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-500/20">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("quizzesPassed")}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {progress.quizzesPassed}<span className="text-sm text-gray-400 font-normal">/{progress.totalQuizzes}</span>
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
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("streak")}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.streak} <span className="text-sm text-gray-400 font-normal">days</span></p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("currentModule")}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Module {progress.currentModule}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-500" />
                {t("nextLesson")}
              </h2>
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/30 dark:via-gray-900 dark:to-purple-950/20 border border-primary-100 dark:border-primary-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-semibold">
                    Module {progress.currentModule}
                  </span>
                  <span className="text-xs text-gray-400">
                    Lesson {progress.currentLesson}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Key Algorithms for AI Agents
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                  Decision trees, neural networks, Q-learning, NLP basics, and vector embeddings — the building blocks of intelligent agents.
                </p>
                <Link
                  href={`/courses/module-${progress.currentModule}/lesson-${progress.currentLesson}`}
                  className="btn-primary gap-2"
                >
                  {t("continueButton")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              {t("recentActivity")}
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.color} shrink-0`} />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
