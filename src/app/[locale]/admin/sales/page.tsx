"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";

interface SalesData {
  stats: {
    totalSales: number;
    totalRevenue: number;
    standardSales: number;
    premiumSales: number;
  };
  recentSales: Array<{
    id: string;
    email: string;
    plan: string;
    amountPaid: number;
    currency: string;
    paystackReference: string;
    purchasedAt: string;
    status: string;
  }>;
  platform?: {
    users: {
      total: number;
      thisWeek: number;
      today: number;
      byProvider: { google: number; github: number; email: number };
    };
    learning: {
      activeLearners: number;
      completedLessons: number;
    };
    revenue: {
      total: number;
      paidSubscriptions: number;
      pendingEft: number;
    };
  };
}

export default function AdminSalesPage() {
  const [data, setData] = useState<SalesData | null>(null);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchSales() {
    if (!key) return;
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: `Bearer ${key}` };
      const [salesRes, statsRes] = await Promise.all([
        fetch("/api/admin/sales", { headers }),
        fetch("/api/admin/stats", { headers }),
      ]);
      if (!salesRes.ok) {
        setError("Unauthorized. Check your admin key.");
        setData(null);
      } else {
        const salesData = await salesRes.json();
        const statsData = await statsRes.json();
        setData({ ...salesData, platform: statsData });
      }
    } catch {
      setError("Failed to fetch sales data.");
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Sales Dashboard
        </h1>

        {/* Auth */}
        <div className="flex gap-3 mb-8">
          <input
            type="password"
            placeholder="Admin secret key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchSales()}
            className="flex-1 max-w-sm px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={fetchSales}
            disabled={loading}
            className="btn-primary px-6 py-2"
          >
            {loading ? "Loading..." : "View Sales"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {data && (
          <>
            {/* Platform Stats */}
            {data.platform && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Platform Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="card p-6">
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.platform.users.total}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      +{data.platform.users.thisWeek} this week / +{data.platform.users.today} today
                    </p>
                  </div>
                  <div className="card p-6">
                    <p className="text-sm text-gray-500">Active Learners</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {data.platform.learning.activeLearners}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {data.platform.learning.completedLessons} lessons completed
                    </p>
                  </div>
                  <div className="card p-6">
                    <p className="text-sm text-gray-500">Sign-up Methods</p>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Google: <strong>{data.platform.users.byProvider.google}</strong></p>
                      <p>GitHub: <strong>{data.platform.users.byProvider.github}</strong></p>
                      <p>Email: <strong>{data.platform.users.byProvider.email}</strong></p>
                    </div>
                  </div>
                  <div className="card p-6">
                    <p className="text-sm text-gray-500">Pending EFT</p>
                    <p className="text-3xl font-bold text-amber-600">
                      {data.platform.revenue.pendingEft}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">awaiting confirmation</p>
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card p-6">
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.stats.totalSales}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  R{data.stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm text-gray-500">Standard Plans</p>
                <p className="text-3xl font-bold text-blue-600">
                  {data.stats.standardSales}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm text-gray-500">Premium Plans</p>
                <p className="text-3xl font-bold text-purple-600">
                  {data.stats.premiumSales}
                </p>
              </div>
            </div>

            {/* Recent Sales Table */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Sales
            </h2>
            {data.recentSales.length === 0 ? (
              <p className="text-gray-500">No sales yet. They&apos;ll appear here when someone pays.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Email</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Plan</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Reference</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="border-b border-gray-100 dark:border-gray-800"
                      >
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                          {new Date(sale.purchasedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">
                          {sale.email}
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              sale.plan === "premium"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {sale.plan}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium text-green-600">
                          R{(sale.amountPaid / 100).toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-gray-500 font-mono text-xs">
                          {sale.paystackReference}
                        </td>
                        <td className="py-3 px-2">
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
