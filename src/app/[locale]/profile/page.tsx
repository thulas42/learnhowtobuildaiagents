"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { User, Save, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [locale, setLocale] = useState("en");
  const [learningPath, setLearningPath] = useState("STANDARD");
  const [provider, setProvider] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch profile data
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setName(data.name || "");
            setEmail(data.email || "");
            setLocale(data.locale || "en");
            setLearningPath(data.learningPath || "STANDARD");
            setProvider(data.provider || "credentials");
            setImage(data.image || "");
            setCreatedAt(data.createdAt || "");
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session?.user?.email]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, locale, learningPath }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSaving(false);
  }

  if (status === "loading" || loading) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500">Loading profile...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Profile
        </h1>

        {/* Avatar & Info */}
        <div className="card p-6 mb-6 flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Signed up via {provider} • Member since{" "}
              {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="card p-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="input opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label htmlFor="locale" className="block text-sm font-medium mb-1">
              Preferred Language
            </label>
            <select
              id="locale"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="input"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt-BR">Português (Brasil)</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="zh-CN">中文 (简体)</option>
              <option value="ru">Русский</option>
              <option value="ar">العربية</option>
              <option value="hi">हिन्दी</option>
              <option value="it">Italiano</option>
              <option value="nl">Nederlands</option>
              <option value="tr">Türkçe</option>
              <option value="pl">Polski</option>
              <option value="vi">Tiếng Việt</option>
              <option value="th">ไทย</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="uk">Українська</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          <div>
            <label htmlFor="learningPath" className="block text-sm font-medium mb-1">
              Learning Path
            </label>
            <select
              id="learningPath"
              value={learningPath}
              onChange={(e) => setLearningPath(e.target.value)}
              className="input"
            >
              <option value="STANDARD">Standard — Balanced pace</option>
              <option value="ACCELERATED">Accelerated — Fast track</option>
              <option value="DEEP_DIVE">Deep Dive — Extra detail</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              This affects lesson recommendations and pacing
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </main>
    </>
  );
}
