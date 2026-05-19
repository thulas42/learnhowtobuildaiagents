import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const { stripe } = await import("@/lib/stripe");
    if (!stripe) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 503 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed", status: session.payment_status },
        { status: 400 }
      );
    }

    return NextResponse.json({
      plan: session.metadata?.plan || "standard",
      email: session.customer_email || session.customer_details?.email,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
    });
  } catch (error: any) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}
