"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-7 w-7 text-primary-600" />
              <span className="text-lg font-bold">{t("appName")}</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/courses" className="hover:text-primary-600">Courses</Link></li>
              <li><Link href="/pricing" className="hover:text-primary-600">Pricing</Link></li>
              <li><Link href="/certificate/verify" className="hover:text-primary-600">Verify Certificate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-600">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="hover:text-primary-600">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Agent Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
