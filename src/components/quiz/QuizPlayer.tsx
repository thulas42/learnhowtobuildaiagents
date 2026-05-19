"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Shuffle } from "lucide-react";
import { DiagramRenderer } from "@/components/quiz/DiagramRenderer";
import type { DiagramData } from "@/data/question-bank";

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "multiple_select" | "code_comprehension";
  question: string;
  codeSnippet?: string;
  diagram?: DiagramData;
  options: { id: string; text: string }[];
  correctAnswers: string[];
  explanation: string;
}

interface ShuffledQuestion extends QuizQuestion {
  shuffledOptions: { id: string; text: string; displayLabel: string }[];
}

interface QuizPlayerProps {
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  questionsPerAttempt?: number; // How many questions to randomly select per attempt
  onComplete: (score: number, passed: boolean) => void;
}

/**
 * Fisher-Yates shuffle algorithm for true randomization
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Randomly select N items from an array
 */
function selectRandom<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Prepare questions: randomly select from pool and shuffle option positions
 */
function prepareQuestions(
  allQuestions: QuizQuestion[],
  questionsPerAttempt: number
): ShuffledQuestion[] {
  const displayLabels = ["A", "B", "C", "D", "E", "F"];

  // Randomly select questions from the pool
  const selectedQuestions = selectRandom(allQuestions, questionsPerAttempt);

  // Shuffle the order of selected questions
  const shuffledQuestions = shuffleArray(selectedQuestions);

  // For each question, shuffle the answer options
  return shuffledQuestions.map((question) => {
    const shuffledOptions = shuffleArray(question.options).map((opt, index) => ({
      ...opt,
      displayLabel: displayLabels[index] || String(index + 1),
    }));

    return {
      ...question,
      shuffledOptions,
    };
  });
}

export function QuizPlayer({
  title,
  questions,
  passingScore,
  questionsPerAttempt,
  onComplete,
}: QuizPlayerProps) {
  const t = useTranslations("quiz");
  const [attemptKey, setAttemptKey] = useState(0); // Forces re-randomization on retry

  // Memoize the randomized questions per attempt
  // Re-randomizes when attemptKey changes (on retry)
  const preparedQuestions = useMemo(
    () => prepareQuestions(questions, questionsPerAttempt || questions.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, questionsPerAttempt, attemptKey]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = preparedQuestions[currentIndex];

  const isCorrect = submitted && currentQuestion
    ? currentQuestion.correctAnswers.every((a) => selectedAnswers.includes(a)) &&
      selectedAnswers.every((a) => currentQuestion.correctAnswers.includes(a))
    : null;

  function handleSelect(optionId: string) {
    if (submitted) return;

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

  function handleSubmit() {
    if (selectedAnswers.length === 0) return;
    setSubmitted(true);
    setResults((prev) => [
      ...prev,
      currentQuestion.correctAnswers.every((a) => selectedAnswers.includes(a)) &&
        selectedAnswers.every((a) => currentQuestion.correctAnswers.includes(a)),
    ]);
  }

  function handleNext() {
    if (currentIndex < preparedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
    } else {
      // Quiz complete
      const correctCount = [...results].filter(Boolean).length;
      const score = Math.round((correctCount / preparedQuestions.length) * 100);
      const passed = score >= passingScore;
      setShowResults(true);
      onComplete(score, passed);
    }
  }

  function handleRetry() {
    // Increment attemptKey to trigger re-randomization of questions and options
    setAttemptKey((prev) => prev + 1);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSubmitted(false);
    setResults([]);
    setShowResults(false);
  }

  // Results screen
  if (showResults) {
    const correctCount = results.filter(Boolean).length;
    const score = Math.round((correctCount / preparedQuestions.length) * 100);
    const passed = score >= passingScore;

    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div
          className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
            passed
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-red-100 dark:bg-red-900/30"
          }`}
        >
          {passed ? (
            <CheckCircle className="h-10 w-10 text-green-600" />
          ) : (
            <XCircle className="h-10 w-10 text-red-600" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{t("result")}</h2>
        <p
          className={`text-lg mb-2 ${
            passed ? "text-green-600" : "text-red-600"
          }`}
        >
          {passed ? t("passed") : t("failed")}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {t("score", { score })} • {t("passingScore", { score: passingScore })}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {correctCount} / {preparedQuestions.length} correct
        </p>

        <div className="flex justify-center gap-4">
          {!passed && (
            <button onClick={handleRetry} className="btn-secondary gap-2">
              <RotateCcw className="h-4 w-4" />
              {t("tryAgain")}
            </button>
          )}
          {passed && (
            <button onClick={handleRetry} className="btn-secondary gap-2">
              <Shuffle className="h-4 w-4" />
              Practice Again
            </button>
          )}
          <button className="btn-primary">{t("reviewAnswers")}</button>
        </div>

        {/* Randomization notice */}
        <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <Shuffle className="h-3 w-3" />
          Questions and answers are randomized each attempt
        </p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="card max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">
          {t("question", {
            current: currentIndex + 1,
            total: preparedQuestions.length,
          })}
        </span>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-6">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentIndex + 1) / preparedQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>

        {/* Code snippet */}
        {currentQuestion.codeSnippet && (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto mb-4 font-mono">
            <code>{currentQuestion.codeSnippet}</code>
          </pre>
        )}

        {/* Diagram */}
        {currentQuestion.diagram && (
          <DiagramRenderer diagram={currentQuestion.diagram} />
        )}

        {/* Options (shuffled) */}
        <div className="space-y-3">
          {currentQuestion.shuffledOptions.map((option) => {
            const isSelected = selectedAnswers.includes(option.id);
            const isCorrectOption =
              currentQuestion.correctAnswers.includes(option.id);

            let optionStyle =
              "border-gray-200 dark:border-gray-700 hover:border-primary-300";
            if (submitted) {
              if (isCorrectOption) {
                optionStyle =
                  "border-green-500 bg-green-50 dark:bg-green-900/20";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-red-500 bg-red-50 dark:bg-red-900/20";
              }
            } else if (isSelected) {
              optionStyle =
                "border-primary-500 bg-primary-50 dark:bg-primary-900/20";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={submitted}
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

      {/* Explanation */}
      {submitted && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            isCorrect
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p className="text-sm font-medium mb-1">
            {isCorrect ? t("correct") : t("incorrect")}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Shuffle className="h-3 w-3" />
          Randomized
        </p>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0}
            className="btn-primary"
          >
            {t("submit")}
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary gap-2">
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
