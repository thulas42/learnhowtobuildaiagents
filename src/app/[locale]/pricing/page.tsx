"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Sparkles, Shield, Globe, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { trackEvent } from "@/lib/analytics";
import { PLANS, type PlanId } from "@/lib/paystack";

const PAYSTACK_ENABLED =
  process.env.NEXT_PUBLIC_PAYSTACK_ENABLED === "true";

const plans = (["free", "standard", "premium"] as PlanId[]).map((id) => ({
  id,
  name: PLANS[id].name,
  price: PLANS[id].price === 0 ? "$0" : `$${PLANS[id].price}`,
  period: id === "free" ? "forever" : "one-time",
  description: PLANS[id].description,
  features: PLANS[id].features,
  cta: id === "free" ? "Start Free" : `Get ${PLANS[id].name}`,
  popular: PLANS[id].popular ?? false,
}));

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    trackEvent("pricing_viewed");
  }, []);

  async function handleCheckout(planId: string) {
    if (planId === "free") {
      trackEvent("signup_started", { source: "pricing_free" });
      router.push("/auth/signup");
      return;
    }

    trackEvent("checkout_started", { plan: planId });

    if (PAYSTACK_ENABLED) {
      setLoading(planId);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ planId }),
        });
        const data = await res.json();
        if (res.ok && data.authorizationUrl) {
          window.location.href = data.authorizationUrl;
          return;
        }
      } catch {
        // Fall through to EFT
      }
      setLoading(null);
    }

    router.push(`/checkout/eft?plan=${planId}`);
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 mb-6">
            <Globe className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              PPP pricing available — adjusted for your region
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Fair Pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            One-time payment. Lifetime access. No subscriptions, no hidden fees.
            Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular
                  ? "border-primary-200 dark:border-primary-800 shadow-xl shadow-primary-100/50 dark:shadow-none md:scale-105 md:-my-4"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`w-full ${plan.popular ? "btn-primary" : "btn-secondary"}`}
              >
                {loading === plan.id ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">30-Day Guarantee</h4>
              <p className="text-sm text-gray-500">Full refund if you're not satisfied, no questions asked.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Instant Access</h4>
              <p className="text-sm text-gray-500">Start learning immediately after payment. No waiting.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">PPP Pricing</h4>
              <p className="text-sm text-gray-500">Prices adjusted for your country's purchasing power.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this a one-time payment or subscription?",
                a: "One-time payment. You get lifetime access to the course content, including future updates.",
              },
              {
                q: "Can I start with Free and upgrade later?",
                a: "Absolutely. Start with the free tier, and upgrade to Standard or Premium whenever you're ready. Your progress is preserved.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards and regional payment methods through Paystack, including Visa, Mastercard, and bank transfers.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
              },
              {
                q: "Is the certificate recognized?",
                a: "The e-certificate is verifiable via a unique URL and QR code. It can be added to LinkedIn and shared with employers.",
              },
            ].map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
