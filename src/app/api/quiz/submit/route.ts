import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

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

// File-based quiz attempts store
const ATTEMPTS_FILE = path.join(process.cwd(), "data", "quiz-attempts.json");

interface QuizAttemptRecord {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  passed: boolean;
  answers: any[];
  completedAt: string;
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getAttempts(): QuizAttemptRecord[] {
  ensureDataDir();
  if (!fs.existsSync(ATTEMPTS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(ATTEMPTS_FILE, "utf-8"));
}

function saveAttempts(attempts: QuizAttemptRecord[]) {
  ensureDataDir();
  fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify(attempts, null, 2));
}

/**
 * POST /api/quiz/submit — Save a quiz attempt
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lessonId, score, passed, answers } = submitSchema.parse(body);

    const attempts = getAttempts();
    const attempt: QuizAttemptRecord = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: "default-user",
      lessonId,
      score,
      passed,
      answers,
      completedAt: new Date().toISOString(),
    };

    attempts.push(attempt);
    saveAttempts(attempts);

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
 * GET /api/quiz/submit?lessonId=xxx — Get quiz attempts for a lesson
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    const attempts = getAttempts();
    const filtered = lessonId
      ? attempts.filter((a) => a.lessonId === lessonId)
      : attempts;

    return NextResponse.json({
      attempts: filtered,
      totalAttempts: filtered.length,
      bestScore: filtered.length > 0 ? Math.max(...filtered.map((a) => a.score)) : 0,
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
