import { NextRequest, NextResponse } from "next/server";
import {
  DATA_FILES,
  generateId,
  getSubscriptions,
  readJsonFile,
  saveSubscriptions,
  writeJsonFile,
} from "@/lib/data-store";
import { adminUnauthorizedResponse, isAdminAuthorized } from "@/lib/admin-auth";

/**
 * GET /api/admin/eft — List pending EFT payments
 */
export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthorized(request)) {
      return adminUnauthorizedResponse();
    }

    const pending = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.pendingEft,
      []
    );
    return NextResponse.json({
      pending: pending.filter((p) => p.status === "pending"),
      verified: pending.filter((p) => p.status === "verified"),
    });
  } catch (error) {
    console.error("Admin EFT list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/eft — Verify a pending EFT payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eftId, email, plan, key } = body;

    if (!isAdminAuthorized(request, key)) {
      return adminUnauthorizedResponse();
    }

    const pending = readJsonFile<Record<string, unknown>[]>(
      DATA_FILES.pendingEft,
      []
    );
    const entry = pending.find((p) => p.id === eftId);
    if (entry) {
      entry.status = "verified";
      entry.verifiedAt = new Date().toISOString();
      writeJsonFile(DATA_FILES.pendingEft, pending);
    }

    const subscriptions = getSubscriptions();
    subscriptions.push({
      id: generateId("sub"),
      email,
      plan: plan || "standard",
      paystackReference: `EFT-${eftId}`,
      paystackCustomerCode: "",
      amountPaid: plan === "premium" ? 274900 : 89900,
      currency: "ZAR",
      status: "active",
      purchasedAt: new Date().toISOString(),
    });
    saveSubscriptions(subscriptions);

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "AI Agent Academy <notifications@learnhowtobuildaiagents.com>",
          to: email,
          subject:
            "Payment Confirmed — Your AI Agent Academy Access is Active!",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #16a34a;">Payment Confirmed!</h1>
              <p>Your EFT payment has been verified. Your ${plan === "premium" ? "Premium" : "Standard"} plan is now active.</p>
              <p><a href="https://learnhowtobuildaiagents.com/courses">Start Learning</a></p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Failed to send activation email:", err);
      }
    }

    return NextResponse.json({ success: true, email, plan });
  } catch (error) {
    console.error("EFT verification error:", error);
    return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
  }
}
