import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PENDING_FILE = path.join(DATA_DIR, "pending-eft.json");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson(file: string): any[] {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

/**
 * GET /api/admin/eft?key=xxx — List pending EFT payments
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = readJson(PENDING_FILE);
  return NextResponse.json({
    pending: pending.filter((p: any) => p.status === "pending"),
    verified: pending.filter((p: any) => p.status === "verified"),
  });
}

/**
 * POST /api/admin/eft — Verify a pending EFT payment and activate access
 * Body: { key, eftId, email, plan }
 */
export async function POST(request: NextRequest) {
  try {
    const { key, eftId, email, plan } = await request.json();

    if (key !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    ensureDataDir();

    // Update pending EFT status
    const pending = readJson(PENDING_FILE);
    const entry = pending.find((p: any) => p.id === eftId);
    if (entry) {
      entry.status = "verified";
      entry.verifiedAt = new Date().toISOString();
      fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2));
    }

    // Create subscription
    const subscriptions = readJson(SUBSCRIPTIONS_FILE);
    subscriptions.push({
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      plan: plan || "standard",
      paystackReference: `EFT-${eftId}`,
      paystackCustomerCode: "",
      amountPaid: plan === "premium" ? 274900 : 89900,
      currency: "ZAR",
      status: "active",
      purchasedAt: new Date().toISOString(),
    });
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "AI Agent Academy <notifications@learnhowtobuildaiagents.com>",
          to: email,
          subject: "✅ Payment Confirmed — Your AI Agent Academy Access is Active!",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #16a34a; margin-bottom: 8px;">Payment Confirmed! 🎉</h1>
                <p style="color: #666;">Your EFT payment has been verified.</p>
              </div>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 16px 0;">
                <h3 style="margin: 0 0 8px; color: #166534;">Your ${plan === "premium" ? "Premium" : "Standard"} plan is now active</h3>
                <p style="margin: 0; color: #15803d;">You have full access to all 6 modules, 30+ lessons, projects, and your verified certificate.</p>
              </div>

              <p style="margin-top: 24px; text-align: center;">
                <a href="https://learnhowtobuildaiagents.com/courses" style="display: inline-block; background: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  Start Learning Now →
                </a>
              </p>

              <p style="color: #666; font-size: 13px; margin-top: 24px; text-align: center;">
                If you have any questions, reply to this email. Happy learning!
              </p>
            </div>
          `,
        });
        console.log(`📧 Activation email sent to ${email}`);
      } catch (err) {
        console.error("Failed to send activation email:", err);
      }
    }

    console.log(`✅ EFT verified and access activated for ${email} (${plan})`);

    return NextResponse.json({ success: true, email, plan });
  } catch (error: any) {
    console.error("EFT verification error:", error);
    return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
  }
}
