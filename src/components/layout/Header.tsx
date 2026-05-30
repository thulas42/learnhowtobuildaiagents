"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User } from "lucide-react";
import Image from "next/image";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export function Header() {
  const t = useTranslations("common");
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = status === "authenticated" && !!session?.user;
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/icon.svg"
              alt="AI Agent Academy"
              width={36}
              height={36}
              className="rounded-xl shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow"
            />
            <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
              {t("appName")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/courses"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all"
            >
              {t("courses")}
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all"
            >
              {t("dashboard")}
            </Link>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
            <LanguageSelector />

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt={user?.name || "User"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn-secondary text-sm px-3 py-2 gap-1.5"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary text-sm px-4 py-2">
                  {t("login")}
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">
                  {t("signup")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <Link
              href="/courses"
              className="block px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("courses")}
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("dashboard")}
            </Link>
            <div className="pt-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user?.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.name || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-secondary text-sm text-center w-full gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-secondary text-sm text-center w-full">
                    {t("login")}
                  </Link>
                  <Link href="/auth/signup" className="btn-primary text-sm text-center w-full">
                    {t("signup")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

