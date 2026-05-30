import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");
const PENDING_EFT_FILE = path.join(DATA_DIR, "pending-eft.json");

function readJson(file: string): any[] {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

/**
 * GET /api/admin/stats?key=xxx
 * Returns comprehensive platform stats
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = readJson(USERS_FILE);
  const progress = readJson(PROGRESS_FILE);
  const subscriptions = readJson(SUBSCRIPTIONS_FILE);
  const pendingEft = readJson(PENDING_EFT_FILE);

  // Users stats
  const totalUsers = users.length;
  const usersThisWeek = users.filter((u: any) => {
    const created = new Date(u.createdAt);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return created > weekAgo;
  }).length;
  const usersToday = users.filter((u: any) => {
    const created = new Date(u.createdAt);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;

  // Provider breakdown
  const googleUsers = users.filter((u: any) => u.provider === "google").length;
  const githubUsers = users.filter((u: any) => u.provider === "github").length;
  const emailUsers = users.filter((u: any) => !u.provider || u.provider === "credentials").length;

  // Active learners (users with progress)
  const uniqueLearners = new Set(progress.map((p: any) => p.userId || p.email)).size;

  // Course progress stats
  const completedLessons = progress.filter((p: any) => p.completed).length;

  // Revenue
  const totalRevenue = subscriptions.reduce((sum: number, s: any) => sum + (s.amountPaid || 0), 0) / 100;
  const pendingPayments = pendingEft.filter((p: any) => p.status === "pending").length;

  return NextResponse.json({
    users: {
      total: totalUsers,
      thisWeek: usersThisWeek,
      today: usersToday,
      byProvider: { google: googleUsers, github: githubUsers, email: emailUsers },
    },
    learning: {
      activeLearners: uniqueLearners,
      completedLessons,
    },
    revenue: {
      total: totalRevenue,
      paidSubscriptions: subscriptions.length,
      pendingEft: pendingPayments,
    },
    recentUsers: users.slice(-10).reverse().map((u: any) => ({
      name: u.name,
      email: u.email,
      provider: u.provider || "email",
      createdAt: u.createdAt,
    })),
  });
}
