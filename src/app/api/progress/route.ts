import { NextRequest, NextResponse } from "next/server";
import { allLessonsMeta } from "@/data/lesson-generator";
import {
  getProgress,
  saveProgress,
  type ProgressEntry,
} from "@/lib/data-store";
import { getSessionUser, unauthorizedResponse } from "@/lib/session";

/**
 * GET /api/progress — Get authenticated user's course progress
 */
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return unauthorizedResponse();

    const allProgress = getProgress();
    const userProgress = allProgress.filter((p) => p.userId === user.id);

    const completedLessons = userProgress.filter(
      (p) => p.status === "COMPLETED"
    ).length;

    const totalLessons = allLessonsMeta.length;

    return NextResponse.json({
      overallProgress: Math.round((completedLessons / totalLessons) * 100),
      completedLessons,
      totalLessons,
      progress: userProgress,
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/progress — Update lesson progress for authenticated user
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return unauthorizedResponse();

    const { lessonId, status } = await request.json();

    if (!lessonId || !status) {
      return NextResponse.json(
        { error: "lessonId and status are required" },
        { status: 400 }
      );
    }

    const allProgress = getProgress();

    const existingIndex = allProgress.findIndex(
      (p) => p.userId === user.id && p.lessonId === lessonId
    );

    const entry: ProgressEntry = {
      userId: user.id,
      lessonId,
      status,
      completedAt: status === "COMPLETED" ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      allProgress[existingIndex] = entry;
    } else {
      allProgress.push(entry);
    }

    saveProgress(allProgress);

    return NextResponse.json({ progress: entry });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
