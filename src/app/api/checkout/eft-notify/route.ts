import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PENDING_FILE = path.join(process.cwd(), "data", "pending-eft.json");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "thulanizondo42@gmail.com";

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * POST /api/checkout/eft-notify
 * Records a pending EFT payment and notifies admin immediately
 */
export async function POST(request: NextRequest) {
  try {
    const { email, plan, amount } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    ensureDataDir();

    const entry = {
      id: `eft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      plan: plan || "standard",
      amount: amount || 899,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // Save pending payment
    const pending = fs.existsSync(PENDING_FILE)
      ? JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8"))
      : [];
    pending.push(entry);
    fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2));

    // Send email notification to admin
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const baseUrl = process.env.NEXTAUTH_URL || "https://learnhowtobuildaiagents.com";

        await resend.emails.send({
          from: "AI Agent Academy <notifications@learnhowtobuildaiagents.com>",
          to: ADMIN_EMAIL,
          subject: `🏦 ACTION REQUIRED: EFT Payment — ${email} (${plan} R${amount})`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d97706;">🏦 New EFT Payment Submitted</h2>
              <p>A customer has indicated they've made an EFT payment and is waiting for verification.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Customer Email</td><td style="padding: 10px 0; font-weight: bold;">${email}</td></tr>
                <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Plan</td><td style="padding: 10px 0; font-weight: bold; text-transform: capitalize;">${plan}</td></tr>
                <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Amount</td><td style="padding: 10px 0; font-weight: bold;">R${amount}</td></tr>
                <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Payment Reference</td><td style="padding: 10px 0; font-weight: bold;">${email}</td></tr>
                <tr><td style="padding: 10px 0; color: #666;">Submitted</td><td style="padding: 10px 0;">${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}</td></tr>
              </table>

              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 16px 0;">
                <strong style="color: #92400e;">⏱️ Customer expects verification within 15 minutes.</strong>
                <p style="color: #92400e; margin: 8px 0 0;">Check your Standard Bank account for a deposit with reference "${email}".</p>
              </div>

              <p style="margin-top: 20px;">
                <a href="${baseUrl}/admin/eft" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  ✅ Verify & Activate Account
                </a>
              </p>

              <p style="color: #666; font-size: 13px; margin-top: 16px;">
                Once verified, click the button above or go to your admin dashboard to activate their access.
              </p>
            </div>
          `,
        });
        console.log(`📧 EFT notification sent to ${ADMIN_EMAIL} for ${email}`);
      } catch (err) {
        console.error("Failed to send EFT notification email:", err);
      }
    }

    console.log(`🏦 Pending EFT: ${email} — ${plan} plan (R${amount})`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EFT notify error:", error);
    return NextResponse.json({ error: "Failed to record" }, { status: 500 });
  }
}
