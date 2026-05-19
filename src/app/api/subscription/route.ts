import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), "data", "subscriptions.json");

interface Subscription {
  id: string;
  email: string;
  plan: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  amountPaid: number;
  currency: string;
  status: "active" | "cancelled";
  purchasedAt: string;
}

function getSubscriptions(): Subscription[] {
  if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8"));
}

/**
 * GET /api/subscription?email=user@example.com
 * Check if a user has an active subscription
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "email query parameter is required" },
      { status: 400 }
    );
  }

  const subs = getSubscriptions();
  const userSub = subs.find(
    (s) => s.email.toLowerCase() === email.toLowerCase() && s.status === "active"
  );

  if (!userSub) {
    return NextResponse.json({
      hasSubscription: false,
      plan: "free",
      accessibleModules: [1],
    });
  }

  const accessibleModules =
    userSub.plan === "premium" || userSub.plan === "standard"
      ? [1, 2, 3, 4, 5, 6]
      : [1];

  return NextResponse.json({
    hasSubscription: true,
    plan: userSub.plan,
    purchasedAt: userSub.purchasedAt,
    accessibleModules,
  });
}
