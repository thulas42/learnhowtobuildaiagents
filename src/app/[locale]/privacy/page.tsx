import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AI Agent Academy privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Last updated: May 28, 2026
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              AI Agent Academy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our website and learning platform
              (the &quot;Service&quot;). By using the Service, you agree to the collection and use
              of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (display name, profile picture)</li>
              <li>Payment information (processed securely via Paystack; we do not store card details)</li>
              <li>Course progress and quiz responses</li>
              <li>Communications you send to us (support requests, feedback)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Device and browser information (type, version, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              2.3 Information from Third Parties
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Google OAuth: name, email, and profile picture (when you sign in with Google)</li>
              <li>Payment provider: transaction confirmation and subscription status</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Track your learning progress and issue certificates</li>
              <li>Send you course updates, reminders, and administrative notices</li>
              <li>Personalize your learning experience and recommend content</li>
              <li>Respond to your support requests and communications</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. How We Share Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>
                <strong>Service providers:</strong> hosting, analytics, payment processing,
                and email delivery partners who assist in operating the Service
              </li>
              <li>
                <strong>Certificate verification:</strong> your name and certificate ID are
                publicly accessible on the verification page when you earn a certificate
              </li>
              <li>
                <strong>Legal requirements:</strong> when required by law, regulation, or
                legal process
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a merger, acquisition,
                or sale of assets
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use cookies and similar technologies to maintain your session, remember
              your preferences, and understand how you use the Service. You can control
              cookie settings through your browser. Disabling cookies may limit some
              features of the Service.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We implement industry-standard security measures including encryption in
              transit (TLS/SSL), secure password hashing, and access controls. However,
              no method of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain your personal information for as long as your account is active or
              as needed to provide the Service. You may request deletion of your account
              and associated data at any time by contacting us. Some data may be retained
              as required by law or for legitimate business purposes (e.g., certificate
              verification records).
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@aiagentacademy.com"
                className="text-primary-600 hover:underline"
              >
                privacy@aiagentacademy.com
              </a>.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service is not intended for children under 13 years of age. We do not
              knowingly collect personal information from children under 13. If we become
              aware that we have collected data from a child under 13, we will take steps
              to delete it promptly.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than
              your own. We ensure appropriate safeguards are in place to protect your data
              in accordance with applicable data protection laws.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of
              material changes by posting the updated policy on this page and updating the
              &quot;Last updated&quot; date. Your continued use of the Service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 mt-3 space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@aiagentacademy.com"
                  className="text-primary-600 hover:underline"
                >
                  privacy@aiagentacademy.com
                </a>
              </li>
              <li>Website: https://aiagentacademy.com/privacy</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
