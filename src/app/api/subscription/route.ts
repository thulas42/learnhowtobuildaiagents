import { NextResponse } from "next/server";
import { getSubscriptions } from "@/lib/data-store";
import { getSessionUser, unauthorizedResponse } from "@/lib/session";

/**
 * GET /api/subscription — Check authenticated user's subscription
 */
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return unauthorizedResponse();

    const subs = getSubscriptions();
    const userSub = subs.find(
      (s) =>
        s.email.toLowerCase() === user.email.toLowerCase() &&
        s.status === "active"
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
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
