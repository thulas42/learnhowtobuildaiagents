"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Lock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { getLesson } from "@/data/lessons";
import { getQuestionsForLesson } from "@/data/question-bank";
import { trackEvent } from "@/lib/analytics";

export default function LessonPage() {
  const t = useTranslations("course");
  const params = useParams();
  const { data: session } = useSession();
  const moduleSlug = params.moduleSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const lesson = getLesson(moduleSlug, lessonSlug);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  function startQuiz() {
    setShowQuiz(true);
    trackEvent("quiz_started", { lesson: `${moduleSlug}/${lessonSlug}` });
  }

  // Check if this is a paid module (module-2 through module-6)
  const moduleNumber = parseInt(moduleSlug.replace("module-", ""), 10);
  const isPaidModule = moduleNumber > 1;

  // Track lesson opened
  useEffect(() => {
    if (lesson) {
      trackEvent("lesson_started", {
        lesson: `${moduleSlug}/${lessonSlug}`,
        module: moduleNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleSlug, lessonSlug]);

  useEffect(() => {
    if (!isPaidModule) {
      setHasAccess(true);
      return;
    }

    // Check subscription
    const email = session?.user?.email;
    if (email) {
      fetch(`/api/subscription?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((data) => {
          setHasAccess(data.hasSubscription);
          if (!data.hasSubscription) {
            trackEvent("paywall_viewed", {
              module: moduleNumber,
              lesson: `${moduleSlug}/${lessonSlug}`,
            });
          }
        })
        .catch(() => setHasAccess(false));
    } else {
      setHasAccess(false);
      trackEvent("paywall_viewed", {
        module: moduleNumber,
        lesson: `${moduleSlug}/${lessonSlug}`,
        reason: "not_logged_in",
      });
    }
  }, [isPaidModule, session?.user?.email]);

  async function handleQuizComplete(score: number, passed: boolean) {
    setQuizCompleted(true);
    setQuizScore(score);

    // Track quiz result
    trackEvent(passed ? "quiz_passed" : "quiz_failed", {
      lesson: `${moduleSlug}/${lessonSlug}`,
      score,
    });
    if (passed) {
      trackEvent("lesson_completed", { lesson: `${moduleSlug}/${lessonSlug}` });
    }

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: `${moduleSlug}/${lessonSlug}`,
          status: passed ? "COMPLETED" : "IN_PROGRESS",
        }),
      });

      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: `${moduleSlug}/${lessonSlug}`,
          score,
          passed,
          answers: [],
        }),
      });
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  }

  // Lesson not found
  if (!lesson) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="card max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Coming Soon</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This lesson is being prepared and will be available shortly.
            </p>
            <Link href="/courses" className="btn-primary">
              ← Back to Courses
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Paywall — paid module without subscription
  if (isPaidModule && hasAccess === false) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="card max-w-lg mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Premium Content</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Module {moduleNumber} is part of the paid course.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
              Upgrade to access all 6 modules, 30+ lessons, projects, and your verified certificate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/pricing" className="btn-primary gap-2">
                View Plans & Pricing
              </Link>
              <Link href="/checkout/eft?plan=standard" className="btn-secondary gap-2">
                Pay via EFT (R899)
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Module 1 is free.{" "}
              <Link href="/courses/module-1/lesson-1.1" className="text-primary-600 hover:underline">
                Continue learning for free →
              </Link>
            </p>
          </div>
        </main>
      </>
    );
  }

  // Loading access check
  if (isPaidModule && hasAccess === null) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-gray-500">Checking access...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8 flex-wrap">
          <Link href="/courses" className="hover:text-primary-600 transition-colors">
            Courses
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link href="/courses" className="hover:text-primary-600 transition-colors">
            Module {lesson.module.number}
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {lesson.number}
          </span>
        </nav>

        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold">
              <BookOpen className="h-3 w-3" />
              Lesson {lesson.number}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              <Clock className="h-3 w-3" />
              ~15 min
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {lesson.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Module {lesson.module.number}: {lesson.module.title}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl mb-8 max-w-xs">
          <button
            onClick={() => setShowQuiz(false)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              !showQuiz
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Lesson
          </button>
          <button
            onClick={() => startQuiz()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              showQuiz
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
            }`}
          >
            <Target className="h-4 w-4" />
            Quiz
            {quizCompleted && (
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            )}
          </button>
        </div>

        {/* Content */}
        {!showQuiz ? (
          <>
            <article className="lesson-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(lesson.content),
                }}
              />
            </article>

            {/* Take Quiz CTA */}
            <div className="mt-14 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/30 dark:via-gray-900 dark:to-purple-950/20 border border-primary-100 dark:border-primary-900/50 p-8 text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/20 dark:bg-primary-800/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Test Your Knowledge
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 max-w-md mx-auto">
                  5 randomized questions from a pool of 10. Pass with 60% to unlock the next lesson.
                </p>
                <button
                  onClick={startQuiz}
                  className="btn-primary gap-2"
                >
                  <Target className="h-4 w-4" />
                  Take Quiz
                </button>
              </div>
            </div>
          </>
        ) : (
          <QuizPlayer
            title={`Quiz ${lesson.number}: ${lesson.title}`}
            questions={(() => {
              const bankQuestions = getQuestionsForLesson(`${moduleSlug}/${lessonSlug}`);
              if (bankQuestions.length > 0) return bankQuestions;
              return lesson.quiz.questions;
            })()}
            passingScore={lesson.quiz.passingScore}
            questionsPerAttempt={5}
            onComplete={handleQuizComplete}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-14 pt-6 border-t border-gray-100 dark:border-gray-800">
          {lesson.prevLesson ? (
            <Link
              href={`/courses/${lesson.prevLesson.slug}`}
              className="group flex items-center gap-3 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <div className="hidden sm:block text-start">
                <span className="text-xs text-gray-400">Previous</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                  {lesson.prevLesson.title}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/courses"
              className="group flex items-center gap-3 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">All Modules</span>
            </Link>
          )}

          {lesson.nextLesson ? (
            <Link
              href={`/courses/${lesson.nextLesson.slug}`}
              className="group flex items-center gap-3 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <div className="hidden sm:block text-end">
                <span className="text-xs text-gray-400">Next</span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                  {lesson.nextLesson.title}
                </p>
              </div>
              <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ) : (
            <Link
              href="/courses"
              className="group flex items-center gap-3 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <span className="text-sm font-medium">All Modules</span>
              <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}

/**
 * Markdown-to-HTML renderer for lesson content
 */
function renderMarkdown(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || ""}">${escapeHtml(code.trim())}</code></pre>`;
    })
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Inline code (after code blocks)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Tables
    .replace(
      /(?:^\|.+\|$\n?)+/gm,
      (tableBlock) => {
        const rows = tableBlock.trim().split("\n");
        let tableHtml = "<table>";
        for (const row of rows) {
          const cells = row.split("|").filter((c) => c.trim());
          // Skip separator rows
          if (cells.every((c) => /^[\s-:]+$/.test(c))) continue;
          tableHtml += "<tr>";
          for (const cell of cells) {
            tableHtml += `<td>${cell.trim()}</td>`;
          }
          tableHtml += "</tr>";
        }
        tableHtml += "</table>";
        return tableHtml;
      }
    )
    // Ordered lists
    .replace(
      /(?:^\d+\. .+$\n?)+/gm,
      (listBlock) => {
        const items = listBlock.trim().split("\n");
        let listHtml = "<ol>";
        for (const item of items) {
          const text = item.replace(/^\d+\.\s*/, "");
          listHtml += `<li>${text}</li>`;
        }
        listHtml += "</ol>";
        return listHtml;
      }
    )
    // Unordered lists
    .replace(
      /(?:^- .+$\n?)+/gm,
      (listBlock) => {
        const items = listBlock.trim().split("\n");
        let listHtml = "<ul>";
        for (const item of items) {
          const text = item.replace(/^-\s*/, "");
          listHtml += `<li>${text}</li>`;
        }
        listHtml += "</ul>";
        return listHtml;
      }
    )
    // Paragraphs — wrap remaining text lines
    .replace(/^(?!<[hupolt]|$)(.+)$/gm, "<p>$1</p>");

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
