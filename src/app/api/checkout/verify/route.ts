import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "reference is required" }, { status: 400 });
  }

  try {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 503 });
    }

    const result = await verifyTransaction(reference);
    const { data } = result;

    if (data.status !== "success") {
      return NextResponse.json(
        { error: "Payment not completed", status: data.status },
        { status: 400 }
      );
    }

    return NextResponse.json({
      plan: data.metadata?.custom_fields?.[0]?.value || "standard",
      email: data.customer?.email,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      reference: data.reference,
    });
  } catch (error: any) {
    console.error("Transaction verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify transaction" },
      { status: 500 }
    );
  }
}
