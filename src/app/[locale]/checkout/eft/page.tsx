"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Copy, CheckCircle, Mail, ArrowLeft } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const BANK_DETAILS = {
  bank: "Standard Bank",
  accountHolder: "AI Agent Academy",
  accountNumber: "10217646067",
  accountType: "Prestige Current Account",
  branch: "Glenwood",
  branchCode: "051001",
  swift: "SBZA ZA JJ",
};

const PLANS: Record<string, { name: string; amount: string; amountNum: number }> = {
  standard: { name: "Standard", amount: "R899.00", amountNum: 899 },
  premium: { name: "Premium", amount: "R2,749.00", amountNum: 2749 },
};

export default function EFTCheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "standard";
  const plan = PLANS[planId] || PLANS.standard;

  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    trackEvent("checkout_submitted", { plan: planId, amount: plan.amountNum });

    // Notify admin about pending EFT payment
    try {
      await fetch("/api/checkout/eft-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: planId, amount: plan.amountNum }),
      });
    } catch {}

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="card text-center p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Payment Details Received!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Once we confirm your EFT payment of <strong>{plan.amount}</strong>, we&apos;ll
              activate your <strong>{plan.name}</strong> plan and send a confirmation email to{" "}
              <strong>{email}</strong>.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> Use your email address ({email}) as the payment
              reference when making the EFT. Payment verification takes a maximum of <strong>15 minutes</strong> after submission.
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/courses" className="btn-primary gap-2">
                Browse Courses
              </Link>
              <Link href="/" className="btn-secondary gap-2">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to pricing
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pay via EFT / Bank Transfer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Transfer <strong>{plan.amount}</strong> for the{" "}
          <strong>{plan.name} Plan</strong> to the account below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Details Card */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Banking Details
            </h2>
            <div className="space-y-3">
              {[
                { label: "Bank", value: BANK_DETAILS.bank, key: "bank" },
                { label: "Account Holder", value: BANK_DETAILS.accountHolder, key: "holder" },
                { label: "Account Number", value: BANK_DETAILS.accountNumber, key: "account" },
                { label: "Account Type", value: BANK_DETAILS.accountType, key: "type" },
                { label: "Branch", value: BANK_DETAILS.branch, key: "branch" },
                { label: "Branch Code", value: BANK_DETAILS.branchCode, key: "code" },
              ].map(({ label, value, key }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === key ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
              <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                Amount: {plan.amount}
              </p>
            </div>
          </div>

          {/* Instructions & Email Form */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How it works
              </h2>
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Transfer <strong>{plan.amount}</strong> to the account on the left</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Use your <strong>email address</strong> as the payment reference</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Enter your email below so we know to look for your payment</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>We&apos;ll activate your account within <strong>15 minutes</strong> of receiving payment</span>
                </li>
              </ol>
            </div>

            <form onSubmit={handleSubmit} className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Your Email
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter the email you&apos;ll use for your account. We&apos;ll notify you once payment is confirmed.
              </p>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
              />
              <button type="submit" className="btn-primary w-full py-3">
                I&apos;ve Made the Payment
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                You can also click this after making the transfer
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
