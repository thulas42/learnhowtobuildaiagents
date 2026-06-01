"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Shuffle,
  Loader2,
} from "lucide-react";
import { DiagramRenderer } from "@/components/quiz/DiagramRenderer";
import type { DiagramData } from "@/data/question-bank";

export interface ClientQuizQuestion {
  id: string;
  type: "multiple_choice" | "multiple_select" | "code_comprehension";
  question: string;
  codeSnippet?: string | null;
  diagram?: DiagramData | null;
  options: { id: string; text: string }[];
}

interface ShuffledQuestion extends ClientQuizQuestion {
  shuffledOptions: { id: string; text: string; displayLabel: string }[];
}

interface QuizPlayerProps {
  title: string;
  lessonId: string;
  passingScore: number;
  questionsPerAttempt?: number;
  onComplete: (
    score: number,
    passed: boolean,
    gradedAnswers: {
      questionId: string;
      selectedOptions: string[];
      correct: boolean;
    }[]
  ) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareQuestions(questions: ClientQuizQuestion[]): ShuffledQuestion[] {
  const displayLabels = ["A", "B", "C", "D", "E", "F"];
  return shuffleArray(questions).map((question) => {
    const shuffledOptions = shuffleArray(question.options).map((opt, index) => ({
      ...opt,
      displayLabel: displayLabels[index] || String(index + 1),
    }));
    return { ...question, shuffledOptions };
  });
}

export function QuizPlayer({
  title,
  lessonId,
  passingScore,
  questionsPerAttempt = 5,
  onComplete,
}: QuizPlayerProps) {
  const t = useTranslations("quiz");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const [preparedQuestions, setPreparedQuestions] = useState<ShuffledQuestion[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);
  const [recordedAnswers, setRecordedAnswers] = useState<
    { questionId: string; selectedOptions: string[] }[]
  >([]);
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalPassed, setFinalPassed] = useState(false);
  const [grading, setGrading] = useState(false);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(
        `/api/questions?lessonId=${encodeURIComponent(lessonId)}&count=${questionsPerAttempt}`
      );
      if (!res.ok) {
        throw new Error("Failed to load questions");
      }
      const data = await res.json();
      if (!data.questions?.length) {
        throw new Error("No questions available");
      }
      setPreparedQuestions(prepareQuestions(data.questions));
      setCurrentIndex(0);
      setSelectedAnswers([]);
      setSubmitted(false);
      setQuestionFeedback(null);
      setRecordedAnswers([]);
      setShowResults(false);
    } catch {
      setLoadError("Could not load quiz questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [lessonId, questionsPerAttempt]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions, attemptKey]);

  const currentQuestion = preparedQuestions[currentIndex];

  function handleSelect(optionId: string) {
    if (submitted || !currentQuestion) return;

    if (currentQuestion.type === "multiple_select") {
      setSelectedAnswers((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedAnswers([optionId]);
    }
  }

  async function handleSubmit() {
    if (!currentQuestion || selectedAnswers.length === 0) return;

    setGrading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          answers: [
            {
              questionId: currentQuestion.id,
              selectedOptions: selectedAnswers,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Grading failed");

      const data = await res.json();
      const graded = data.gradedAnswers[0];
      setQuestionFeedback({
        correct: graded.correct,
        explanation: graded.explanation,
      });
      setRecordedAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          selectedOptions: [...selectedAnswers],
        },
      ]);
      setSubmitted(true);
    } catch {
      setQuestionFeedback({
        correct: false,
        explanation: "Could not grade this answer. Please try again.",
      });
      setSubmitted(true);
    } finally {
      setGrading(false);
    }
  }

  async function finishQuiz(allAnswers: { questionId: string; selectedOptions: string[] }[]) {
    setGrading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, answers: allAnswers }),
      });

      if (!res.ok) throw new Error("Grading failed");

      const data = await res.json();
      const passed = data.score >= passingScore;
      setFinalScore(data.score);
      setFinalPassed(passed);
      setShowResults(true);
      onComplete(
        data.score,
        passed,
        data.gradedAnswers.map(
          (a: {
            questionId: string;
            selectedOptions: string[];
            correct: boolean;
          }) => ({
            questionId: a.questionId,
            selectedOptions: a.selectedOptions,
            correct: a.correct,
          })
        )
      );
    } catch {
      setLoadError("Could not submit quiz. Please try again.");
    } finally {
      setGrading(false);
    }
  }

  function handleNext() {
    if (currentIndex < preparedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
      setQuestionFeedback(null);
    } else {
      finishQuiz(recordedAnswers);
    }
  }

  function handleRetry() {
    setAttemptKey((prev) => prev + 1);
  }

  if (loading) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary-600" />
        <p className="mt-4 text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-8">
        <p className="text-red-600 mb-4">{loadError}</p>
        <button onClick={loadQuestions} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div
          className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            finalPassed
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-red-100 dark:bg-red-900/30"
          }`}
        >
          {finalPassed ? (
            <CheckCircle className="h-10 w-10 text-green-600" />
          ) : (
            <XCircle className="h-10 w-10 text-red-600" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{t("result")}</h2>
        <p
          className={`text-lg mb-2 ${
            finalPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {finalPassed ? t("passed") : t("failed")}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t("score", { score: finalScore })} •{" "}
          {t("passingScore", { score: passingScore })}
        </p>

        <button onClick={handleRetry} className="btn-secondary gap-2">
          <RotateCcw className="h-4 w-4" />
          {t("tryAgain")}
        </button>

        <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <Shuffle className="h-3 w-3" />
          Questions and answers are randomized each attempt
        </p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="card max-w-2xl mx-auto" data-testid="quiz-player">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">
          {t("question", {
            current: currentIndex + 1,
            total: preparedQuestions.length,
          })}
        </span>
      </div>

      <div className="progress-bar mb-6">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentIndex + 1) / preparedQuestions.length) * 100}%`,
          }}
        />
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>

        {currentQuestion.codeSnippet && (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto mb-4 font-mono">
            <code>{currentQuestion.codeSnippet}</code>
          </pre>
        )}

        {currentQuestion.diagram && (
          <DiagramRenderer diagram={currentQuestion.diagram} />
        )}

        <div className="space-y-3">
          {currentQuestion.shuffledOptions.map((option) => {
            const isSelected = selectedAnswers.includes(option.id);

            let optionStyle =
              "border-gray-200 dark:border-gray-700 hover:border-primary-300";
            if (submitted && questionFeedback) {
              if (questionFeedback.correct && isSelected) {
                optionStyle =
                  "border-green-500 bg-green-50 dark:bg-green-900/20";
              } else if (!questionFeedback.correct && isSelected) {
                optionStyle = "border-red-500 bg-red-50 dark:bg-red-900/20";
              }
            } else if (isSelected) {
              optionStyle =
                "border-primary-500 bg-primary-50 dark:bg-primary-900/20";
            }

            return (
              <button
                key={option.id}
                type="button"
                data-testid={`quiz-option-${option.id}`}
                onClick={() => handleSelect(option.id)}
                disabled={submitted || grading}
                className={`w-full text-start p-4 rounded-lg border-2 transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium shrink-0">
                    {option.displayLabel}
                  </span>
                  <span className="text-sm">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {submitted && questionFeedback && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            questionFeedback.correct
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p className="text-sm font-medium mb-1">
            {questionFeedback.correct ? t("correct") : t("incorrect")}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {questionFeedback.explanation}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Shuffle className="h-3 w-3" />
          Randomized
        </p>
        {!submitted ? (
          <button
            type="button"
            data-testid="quiz-submit"
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0 || grading}
            className="btn-primary"
          >
            {grading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("submit")
            )}
          </button>
        ) : (
          <button
            type="button"
            data-testid="quiz-next"
            onClick={handleNext}
            disabled={grading}
            className="btn-primary gap-2"
          >
            {currentIndex < preparedQuestions.length - 1
              ? t("next")
              : t("finish")}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
