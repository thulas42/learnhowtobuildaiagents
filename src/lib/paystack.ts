/**
 * Paystack integration for AI Agent Academy
 * Docs: https://paystack.com/docs/api/
 */

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export type PlanId = "free" | "standard" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: number; // in USD
  amountInKobo: number; // Paystack uses lowest currency unit (kobo for NGN, cents for ZAR)
  currency: string;
  features: string[];
  popular?: boolean;
  paystackPlanCode?: string;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    description: "Get started with Module 1",
    price: 0,
    amountInKobo: 0,
    currency: "ZAR",
    features: [
      "Module 1 (5 lessons)",
      "Basic quizzes",
      "Community access",
    ],
  },
  standard: {
    id: "standard",
    name: "Standard",
    description: "Full course access",
    price: 49,
    amountInKobo: 89900, // R899 in cents (≈ $49 USD)
    currency: "ZAR",
    features: [
      "All 6 modules",
      "30+ lessons",
      "All quizzes & projects",
      "Verified certificate",
      "Lifetime access",
    ],
    popular: true,
    paystackPlanCode: process.env.PAYSTACK_PLAN_STANDARD || "",
  },
  premium: {
    id: "premium",
    name: "Premium",
    description: "Full course + mentoring",
    price: 149,
    amountInKobo: 274900, // R2,749 in cents (≈ $149 USD)
    currency: "ZAR",
    features: [
      "Everything in Standard",
      "1-on-1 mentoring sessions",
      "Priority support",
      "GPU cloud credits",
      "Private Discord channel",
      "Career guidance",
    ],
    paystackPlanCode: process.env.PAYSTACK_PLAN_PREMIUM || "",
  },
};

async function paystackRequest(endpoint: string, method: string = "GET", body?: any) {
  const response = await fetch(`${PAYSTACK_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Paystack API error: ${response.status}`);
  }
  return data;
}

/**
 * Initialize a transaction (redirect user to Paystack checkout)
 */
export async function initializeTransaction({
  email,
  amount,
  currency = "USD",
  plan,
  callbackUrl,
  metadata,
}: {
  email: string;
  amount: number; // in lowest currency unit (cents/kobo)
  currency?: string;
  plan?: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
}) {
  return paystackRequest("/transaction/initialize", "POST", {
    email,
    amount,
    currency,
    callback_url: callbackUrl,
    metadata: {
      ...metadata,
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: plan || "standard",
        },
      ],
    },
  });
}

/**
 * Verify a transaction by reference
 */
export async function verifyTransaction(reference: string) {
  return paystackRequest(`/transaction/verify/${reference}`);
}

/**
 * Create a payment page (shareable link)
 */
export async function createPaymentPage({
  name,
  description,
  amount,
  currency = "USD",
}: {
  name: string;
  description: string;
  amount: number;
  currency?: string;
}) {
  return paystackRequest("/page", "POST", {
    name,
    description,
    amount,
    currency,
  });
}

/**
 * List transactions
 */
export async function listTransactions(perPage = 50, page = 1) {
  return paystackRequest(`/transaction?perPage=${perPage}&page=${page}`);
}

export { PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY };
