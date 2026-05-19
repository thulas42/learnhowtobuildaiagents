import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type Stripe from "stripe";

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), "data", "subscriptions.json");

interface Subscription {
  id: string;
  email: string;
  plan: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  amountPaid: number;
  currency: string;
  status: "active" | "cancelled";
  purchasedAt: string;
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getSubscriptions(): Subscription[] {
  ensureDataDir();
  if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8"));
}

function saveSubscriptions(subs: Subscription[]) {
  ensureDataDir();
  fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subs, null, 2));
}

/**
 * POST /api/webhooks/stripe — Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    const { stripe } = await import("@/lib/stripe");

    if (process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_WEBHOOK_SECRET !== "whsec_placeholder" && stripe) {
      event = stripe.webhooks.constructEvent(
        body,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // In development without webhook secret, parse directly
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case "payment_intent.succeeded": {
      console.log("Payment succeeded:", event.data.object);
      break;
    }

    case "payment_intent.payment_failed": {
      console.log("Payment failed:", event.data.object);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const plan = session.metadata?.plan || "standard";
  const email = session.customer_email || session.customer_details?.email || "unknown";

  const subscription: Subscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    plan,
    stripeSessionId: session.id,
    stripeCustomerId: (session.customer as string) || "",
    amountPaid: session.amount_total || 0,
    currency: session.currency || "usd",
    status: "active",
    purchasedAt: new Date().toISOString(),
  };

  const subs = getSubscriptions();
  subs.push(subscription);
  saveSubscriptions(subs);

  console.log(`✅ New ${plan} subscription for ${email}`);
}
