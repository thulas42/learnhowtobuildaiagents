import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  generateId,
  getQuizAttempts,
  saveQuizAttempts,
  type QuizAttemptRecord,
} from "@/lib/data-store";
import { getSessionUser, unauthorizedResponse } from "@/lib/session";

const submitSchema = z.object({
  lessonId: z.string(),
  score: z.number(),
  passed: z.boolean(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOptions: z.array(z.string()),
      correct: z.boolean(),
    })
  ),
});

/**
 * POST /api/quiz/submit — Save a quiz attempt for authenticated user
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return unauthorizedResponse();

    const body = await request.json();
    const { lessonId, score, passed, answers } = submitSchema.parse(body);

    const attempts = getQuizAttempts();
    const attempt: QuizAttemptRecord = {
      id: generateId("attempt"),
      userId: user.id,
      lessonId,
      score,
      passed,
      answers,
      completedAt: new Date().toISOString(),
    };

    attempts.push(attempt);
    saveQuizAttempts(attempts);

    return NextResponse.json({
      attemptId: attempt.id,
      score,
      passed,
      message: passed ? "Quiz passed!" : "Quiz not passed. Try again!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/quiz/submit?lessonId=xxx — Get quiz attempts for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    const attempts = getQuizAttempts().filter((a) => a.userId === user.id);
    const filtered = lessonId
      ? attempts.filter((a) => a.lessonId === lessonId)
      : attempts;

    return NextResponse.json({
      attempts: filtered,
      totalAttempts: filtered.length,
      bestScore:
        filtered.length > 0
          ? Math.max(...filtered.map((a) => a.score))
          : 0,
      passed: filtered.some((a) => a.passed),
    });
  } catch (error) {
    console.error("Quiz fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
