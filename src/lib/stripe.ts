import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set — Stripe features will be disabled");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    })
  : null;

/**
 * Plan configuration mapping
 */
export const PLANS = {
  free: {
    name: "Free",
    description: "Get started with Module 1",
    price: 0,
    priceId: null,
    features: [
      "Module 1 complete access",
      "Partial Module 2",
      "Community forum access",
      "Code playground",
    ],
    limits: {
      modules: [1],
      partialModules: [2],
    },
  },
  standard: {
    name: "Standard",
    description: "Full course access",
    price: 49,
    priceId: process.env.STRIPE_PRICE_STANDARD || "",
    features: [
      "All 6 modules",
      "All quizzes & final exam",
      "E-certificate on completion",
      "Project reviews",
      "Forum access",
    ],
    limits: {
      modules: [1, 2, 3, 4, 5, 6],
      partialModules: [],
    },
  },
  premium: {
    name: "Premium",
    description: "Full course + mentoring",
    price: 149,
    priceId: process.env.STRIPE_PRICE_PREMIUM || "",
    features: [
      "Everything in Standard",
      "1-on-1 mentoring sessions",
      "GPU compute access",
      "Priority support",
      "Career guidance",
    ],
    limits: {
      modules: [1, 2, 3, 4, 5, 6],
      partialModules: [],
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;
