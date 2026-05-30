import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), "data", "subscriptions.json");
const NOTIFICATIONS_FILE = path.join(process.cwd(), "data", "notifications.json");

/**
 * GET /api/admin/sales — Get all sales data
 * Protected by a simple admin key
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Simple admin auth — check against ADMIN_SECRET env var
  if (key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscriptions = fs.existsSync(SUBSCRIPTIONS_FILE)
    ? JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8"))
    : [];

  const notifications = fs.existsSync(NOTIFICATIONS_FILE)
    ? JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, "utf-8"))
    : [];

  // Calculate stats
  const totalRevenue = subscriptions.reduce(
    (sum: number, s: any) => sum + (s.amountPaid || 0),
    0
  );
  const standardCount = subscriptions.filter((s: any) => s.plan === "standard").length;
  const premiumCount = subscriptions.filter((s: any) => s.plan === "premium").length;

  return NextResponse.json({
    stats: {
      totalSales: subscriptions.length,
      totalRevenue: totalRevenue / 100, // Convert from cents
      standardSales: standardCount,
      premiumSales: premiumCount,
    },
    recentSales: subscriptions.slice(-20).reverse(),
    notifications: notifications.slice(-20).reverse(),
  });
}
