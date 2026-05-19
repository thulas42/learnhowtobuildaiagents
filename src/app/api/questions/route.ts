import { NextRequest, NextResponse } from "next/server";
import { getQuestionsForLesson, getRandomizedQuiz, getQuestionCountByLesson } from "@/data/question-bank";

/**
 * GET /api/questions?lessonId=module-1/lesson-1.1&count=5
 * 
 * Returns a randomized set of questions for a quiz attempt.
 * Each call returns different questions in different order with shuffled answers.
 * Correct answers are NOT included in the response (grading happens server-side).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");
  const count = parseInt(searchParams.get("count") || "5", 10);

  if (!lessonId) {
    return NextResponse.json(
      { error: "lessonId query parameter is required" },
      { status: 400 }
    );
  }

  // Get randomized questions (different each call)
  const questions = getRandomizedQuiz(lessonId, count);

  if (questions.length === 0) {
    return NextResponse.json(
      { error: "No questions found for this lesson", lessonId },
      { status: 404 }
    );
  }

  // Strip correct answers from response (security: grading is server-side)
  const clientQuestions = questions.map((q) => ({
    id: q.id,
    type: q.type,
    question: q.question,
    codeSnippet: q.codeSnippet || null,
    diagram: q.diagram || null,
    options: q.options,
    difficulty: q.difficulty,
    // correctAnswers intentionally omitted
  }));

  return NextResponse.json({
    lessonId,
    totalInPool: getQuestionsForLesson(lessonId).length,
    questionsServed: clientQuestions.length,
    questions: clientQuestions,
  });
}

/**
 * POST /api/questions/grade
 * 
 * Grade a quiz attempt server-side.
 * Client sends question IDs and selected answers; server checks against bank.
 */
export async function POST(request: NextRequest) {
  try {
    const { lessonId, answers } = await request.json();

    if (!lessonId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "lessonId and answers array are required" },
        { status: 400 }
      );
    }

    const allQuestions = getQuestionsForLesson(lessonId);
    let correctCount = 0;

    const gradedAnswers = answers.map((answer: { questionId: string; selectedOptions: string[] }) => {
      const question = allQuestions.find((q) => q.id === answer.questionId);
      if (!question) {
        return { ...answer, correct: false, explanation: "Question not found" };
      }

      const isCorrect =
        question.correctAnswers.every((a) => answer.selectedOptions.includes(a)) &&
        answer.selectedOptions.every((a) => question.correctAnswers.includes(a));

      if (isCorrect) correctCount++;

      return {
        questionId: answer.questionId,
        selectedOptions: answer.selectedOptions,
        correct: isCorrect,
        correctAnswers: question.correctAnswers,
        explanation: question.explanation,
      };
    });

    const totalQuestions = answers.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    return NextResponse.json({
      lessonId,
      score,
      correctCount,
      totalQuestions,
      passed: score >= 60,
      gradedAnswers,
    });
  } catch (error) {
    console.error("Grading error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
