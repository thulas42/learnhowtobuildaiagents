import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// File-based progress store for local development
const PROGRESS_FILE = path.join(process.cwd(), "data", "progress.json");

interface ProgressEntry {
  userId: string;
  lessonId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completedAt: string | null;
  updatedAt: string;
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getProgress(): ProgressEntry[] {
  ensureDataDir();
  if (!fs.existsSync(PROGRESS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
}

function saveProgress(entries: ProgressEntry[]) {
  ensureDataDir();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(entries, null, 2));
}

/**
 * GET /api/progress — Get user's course progress
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default-user";

    const allProgress = getProgress();
    const userProgress = allProgress.filter((p) => p.userId === userId);

    const completedLessons = userProgress.filter(
      (p) => p.status === "COMPLETED"
    ).length;

    const totalLessons = 30; // Total lessons in the course

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
 * POST /api/progress — Update lesson progress
 */
export async function POST(request: NextRequest) {
  try {
    const { lessonId, status, userId } = await request.json();

    if (!lessonId || !status) {
      return NextResponse.json(
        { error: "lessonId and status are required" },
        { status: 400 }
      );
    }

    const effectiveUserId = userId || "default-user";
    const allProgress = getProgress();

    // Find existing entry
    const existingIndex = allProgress.findIndex(
      (p) => p.userId === effectiveUserId && p.lessonId === lessonId
    );

    const entry: ProgressEntry = {
      userId: effectiveUserId,
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
