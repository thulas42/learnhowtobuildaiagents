"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (reference) {
      fetch(`/api/checkout/verify?reference=${reference}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [reference]);

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card text-center">
          {/* Success animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30 animate-ping opacity-20" />
            <div className="relative w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Welcome to AI Agent Academy. You now have full access to the course.
            Let's start building AI agents.
          </p>

          {session && (
            <div className="mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm text-start max-w-sm mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium capitalize">{session.plan || "Standard"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">
                  ${((session.amount || 0) / 100).toFixed(2)} {session.currency?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{session.email || "—"}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/courses" className="btn-primary gap-2">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="btn-secondary gap-2">
              <Sparkles className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
