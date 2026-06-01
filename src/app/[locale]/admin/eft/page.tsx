"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface EftEntry {
  id: string;
  email: string;
  plan: string;
  amount: number;
  status: "pending" | "verified";
  submittedAt: string;
  verifiedAt?: string;
}

export default function AdminEftPage() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<{ pending: EftEntry[]; verified: EftEntry[] } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  async function fetchData() {
    if (!key) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/eft", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) {
        setError("Unauthorized. Check your admin key.");
        setData(null);
      } else {
        setData(await res.json());
      }
    } catch {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  }

  async function verifyPayment(entry: EftEntry) {
    if (!confirm(`Activate access for ${entry.email} (${entry.plan} plan)?`)) return;

    setVerifying(entry.id);
    try {
      const res = await fetch("/api/admin/eft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          eftId: entry.id,
          email: entry.email,
          plan: entry.plan,
        }),
      });

      if (res.ok) {
        // Refresh data
        await fetchData();
      } else {
        alert("Failed to verify. Try again.");
      }
    } catch {
      alert("Network error.");
    }
    setVerifying(null);
  }

  function timeSince(dateStr: string) {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          EFT Payment Verification
        </h1>
        <p className="text-gray-500 mb-6">
          Verify pending EFT payments and activate customer access with one click.
        </p>

        {/* Auth */}
        <div className="flex gap-3 mb-8">
          <input
            type="password"
            placeholder="Admin secret key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            className="flex-1 max-w-sm px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button onClick={fetchData} disabled={loading} className="btn-primary px-6 py-2">
            {loading ? "Loading..." : "Load Payments"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {data && (
          <>
            {/* Pending Payments */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pending Verification ({data.pending.length})
                </h2>
              </div>

              {data.pending.length === 0 ? (
                <div className="card p-6 text-center text-gray-500">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  No pending payments. All caught up!
                </div>
              ) : (
                <div className="space-y-3">
                  {data.pending.map((entry) => {
                    const mins = Math.floor(
                      (Date.now() - new Date(entry.submittedAt).getTime()) / 60000
                    );
                    const isUrgent = mins > 10;

                    return (
                      <div
                        key={entry.id}
                        className={`card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isUrgent ? "border-amber-300 dark:border-amber-700" : ""
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {isUrgent && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                            <p className="font-medium text-gray-900 dark:text-white">
                              {entry.email}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span className="capitalize">{entry.plan} plan</span>
                            <span>R{entry.amount}</span>
                            <span>{timeSince(entry.submittedAt)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => verifyPayment(entry)}
                          disabled={verifying === entry.id}
                          className="btn-primary text-sm px-4 py-2 gap-2 whitespace-nowrap"
                        >
                          <CheckCircle className="h-4 w-4" />
                          {verifying === entry.id ? "Activating..." : "Verify & Activate"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recently Verified */}
            {data.verified.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recently Verified ({data.verified.length})
                  </h2>
                </div>
                <div className="space-y-2">
                  {data.verified.slice(-10).reverse().map((entry) => (
                    <div
                      key={entry.id}
                      className="card p-3 flex items-center justify-between opacity-75"
                    >
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                          {entry.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {entry.plan} • Verified {entry.verifiedAt ? timeSince(entry.verifiedAt) : ""}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
