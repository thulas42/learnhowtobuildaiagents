import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import {
  DATA_FILES,
  getSubscriptions,
  readJsonFile,
  saveSubscriptions,
  type Subscription,
  writeJsonFile,
} from "@/lib/data-store";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "thulanizondo42@gmail.com";

/**
 * Send email notification to admin about new payment
 */
async function notifyAdmin(subscription: Subscription) {
  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "AI Agent Academy <notifications@learnhowtobuildaiagents.com>",
        to: ADMIN_EMAIL,
        subject: `💰 New ${subscription.plan.toUpperCase()} sale! — R${(subscription.amountPaid / 100).toFixed(2)}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #16a34a;">New Course Purchase! 🎉</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Customer</td><td style="padding: 8px 0; font-weight: bold;">${subscription.email}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Plan</td><td style="padding: 8px 0; font-weight: bold; text-transform: capitalize;">${subscription.plan}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Amount</td><td style="padding: 8px 0; font-weight: bold;">R${(subscription.amountPaid / 100).toFixed(2)} ${subscription.currency}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Reference</td><td style="padding: 8px 0;">${subscription.paystackReference}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0;">${new Date(subscription.purchasedAt).toLocaleString()}</td></tr>
            </table>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #666; font-size: 14px;">
              View all sales: <a href="https://learnhowtobuildaiagents.com/admin/sales">Admin Dashboard</a>
              <br/>Paystack Dashboard: <a href="https://dashboard.paystack.com">dashboard.paystack.com</a>
            </p>
          </div>
        `,
      });
      console.log(`📧 Admin notification sent to ${ADMIN_EMAIL}`);
    } catch (err) {
      console.error("Failed to send email notification:", err);
    }
  }

  const notifications = readJsonFile<Record<string, unknown>[]>(
    DATA_FILES.notifications,
    []
  );
  notifications.push({
    type: "payment",
    email: subscription.email,
    plan: subscription.plan,
    amount: subscription.amountPaid,
    currency: subscription.currency,
    reference: subscription.paystackReference,
    timestamp: subscription.purchasedAt,
    notified: !!process.env.RESEND_API_KEY,
  });
  writeJsonFile(DATA_FILES.notifications, notifications);
}

/**
 * POST /api/webhooks/paystack — Handle Paystack webhook events
 * Docs: https://paystack.com/docs/payments/webhooks/
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  // Verify webhook signature
  if (process.env.PAYSTACK_SECRET_KEY) {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      console.error("Paystack webhook signature verification failed");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }
  }

  const event = JSON.parse(body);

  // Handle the event
  switch (event.event) {
    case "charge.success": {
      await handleChargeSuccess(event.data);
      break;
    }

    case "transfer.success": {
      console.log("Transfer succeeded:", event.data.reference);
      break;
    }

    case "transfer.failed": {
      console.log("Transfer failed:", event.data.reference);
      break;
    }

    default:
      console.log(`Unhandled Paystack event: ${event.event}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function handleChargeSuccess(data: any) {
  const plan =
    data.metadata?.custom_fields?.[0]?.value ||
    data.metadata?.plan ||
    "standard";
  const email = data.customer?.email || "unknown";

  const subscription: Subscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    plan,
    paystackReference: data.reference || "",
    paystackCustomerCode: data.customer?.customer_code || "",
    amountPaid: data.amount || 0,
    currency: data.currency || "ZAR",
    status: "active",
    purchasedAt: new Date().toISOString(),
  };

  const subs = getSubscriptions();
  subs.push(subscription);
  saveSubscriptions(subs);

  // Send notification
  await notifyAdmin(subscription);

  console.log(`✅ New ${plan} subscription for ${email} (Paystack ref: ${data.reference})`);
}
