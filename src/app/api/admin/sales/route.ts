import { NextRequest, NextResponse } from "next/server";
import { DATA_FILES, readJsonFile } from "@/lib/data-store";
import { adminUnauthorizedResponse, isAdminAuthorized } from "@/lib/admin-auth";

/**
 * GET /api/admin/sales — Get all sales data
 */
export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthorized(request)) {
      return adminUnauthorizedResponse();
    }

    const subscriptions = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.subscriptions,
      []
    );

    const notifications = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.notifications,
      []
    );

    const totalRevenue = subscriptions.reduce(
      (sum, s) => sum + ((s.amountPaid as number) || 0),
      0
    );
    const standardCount = subscriptions.filter(
      (s) => s.plan === "standard"
    ).length;
    const premiumCount = subscriptions.filter(
      (s) => s.plan === "premium"
    ).length;

    return NextResponse.json({
      stats: {
        totalSales: subscriptions.length,
        totalRevenue: totalRevenue / 100,
        standardSales: standardCount,
        premiumSales: premiumCount,
      },
      recentSales: subscriptions.slice(-20).reverse(),
      notifications: notifications.slice(-20).reverse(),
    });
  } catch (error) {
    console.error("Admin sales error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
