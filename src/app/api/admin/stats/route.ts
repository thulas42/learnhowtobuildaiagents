import { NextRequest, NextResponse } from "next/server";
import { DATA_FILES, readJsonFile } from "@/lib/data-store";
import { adminUnauthorizedResponse, isAdminAuthorized } from "@/lib/admin-auth";

/**
 * GET /api/admin/stats
 */
export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthorized(request)) {
      return adminUnauthorizedResponse();
    }

    const users = readJsonFile<Record<string, unknown>[]>(DATA_FILES.users, []);
    const progress = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.progress,
      []
    );
    const subscriptions = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.subscriptions,
      []
    );
    const pendingEft = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.pendingEft,
      []
    );

    const totalUsers = users.length;
    const usersThisWeek = users.filter((u) => {
      const created = new Date(u.createdAt as string);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return created > weekAgo;
    }).length;
    const usersToday = users.filter((u) => {
      const created = new Date(u.createdAt as string);
      const today = new Date();
      return created.toDateString() === today.toDateString();
    }).length;

    const googleUsers = users.filter((u) => u.provider === "google").length;
    const githubUsers = users.filter((u) => u.provider === "github").length;
    const emailUsers = users.filter(
      (u) => !u.provider || u.provider === "credentials"
    ).length;

    const uniqueLearners = new Set(
      progress.map((p) => p.userId || p.email)
    ).size;

    const completedLessons = progress.filter(
      (p) => p.status === "COMPLETED" || p.completed
    ).length;

    const totalRevenue =
      subscriptions.reduce(
        (sum, s) => sum + ((s.amountPaid as number) || 0),
        0
      ) / 100;
    const pendingPayments = pendingEft.filter(
      (p) => p.status === "pending"
    ).length;

    return NextResponse.json({
      users: {
        total: totalUsers,
        thisWeek: usersThisWeek,
        today: usersToday,
        byProvider: {
          google: googleUsers,
          github: githubUsers,
          email: emailUsers,
        },
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
      recentUsers: users.slice(-10).reverse().map((u) => ({
        name: u.name,
        email: u.email,
        provider: u.provider || "email",
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
