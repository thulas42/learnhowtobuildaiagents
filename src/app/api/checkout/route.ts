import { NextRequest, NextResponse } from "next/server";
import { PLANS, type PlanId } from "@/lib/stripe";

/**
 * POST /api/checkout — Create a Stripe Checkout session
 * 
 * Body: { plan: "standard" | "premium", email?: string }
 * Returns: { url: string } — the Stripe Checkout URL to redirect to
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

    const { stripe } = await import("@/lib/stripe");
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      );
    }

    const selectedPlan = PLANS[plan as PlanId];
    if (!selectedPlan.priceId) {
      return NextResponse.json(
        { error: "This plan does not require payment" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: {
        plan,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
