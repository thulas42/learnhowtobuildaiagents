import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PENDING_FILE = path.join(process.cwd(), "data", "pending-eft.json");

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * POST /api/checkout/eft-notify
 * Records a pending EFT payment and notifies admin
 */
export async function POST(request: NextRequest) {
  try {
    const { email, plan, amount } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    ensureDataDir();

    // Save pending payment
    const pending = fs.existsSync(PENDING_FILE)
      ? JSON.parse(fs.readFileSync(PENDING_FILE, "utf-8"))
      : [];

    pending.push({
      id: `eft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      plan: plan || "standard",
      amount: amount || 899,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2));

    // Try to send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "AI Agent Academy <notifications@learnhowtobuildaiagents.com>",
          to: process.env.ADMIN_EMAIL || "thulanizondo42@gmail.com",
          subject: `🏦 Pending EFT Payment — ${email} (${plan} plan)`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 500px;">
              <h2 style="color: #d97706;">Pending EFT Payment 🏦</h2>
              <p>A customer has indicated they've made an EFT payment:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="font-weight: bold;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Plan</td><td style="font-weight: bold; text-transform: capitalize;">${plan}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Amount</td><td style="font-weight: bold;">R${amount}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Time</td><td>${new Date().toLocaleString()}</td></tr>
              </table>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
              <p style="color: #666; font-size: 14px;">
                <strong>Action needed:</strong> Check your Standard Bank account for a deposit with reference "${email}". 
                Once confirmed, activate their account.
              </p>
            </div>
          `,
        });
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
