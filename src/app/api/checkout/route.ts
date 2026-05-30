import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction, PLANS, type PlanId } from "@/lib/paystack";

/**
 * POST /api/checkout — Create a Paystack transaction
 *
 * Body: { plan: "standard" | "premium", email: string }
 * Returns: { url: string } — the Paystack checkout URL to redirect to
 */
export async function POST(request: NextRequest) {
  try {
    const { plan, email } = await request.json();

    if (!plan || !["standard", "premium"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'standard' or 'premium'" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      );
    }

    const selectedPlan = PLANS[plan as PlanId];
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const result = await initializeTransaction({
      email,
      amount: selectedPlan.amountInKobo,
      currency: selectedPlan.currency,
      plan: selectedPlan.id,
      callbackUrl: `${baseUrl}/checkout/success?reference={reference}`,
      metadata: { plan, planName: selectedPlan.name },
    });

    return NextResponse.json({ url: result.data.authorization_url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
