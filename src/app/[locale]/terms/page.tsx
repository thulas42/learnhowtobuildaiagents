import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "AI Agent Academy terms of service. Read our terms and conditions for using the platform.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Last updated: May 28, 2026
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Acceptance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing or using AI Agent Academy (&quot;the Service&quot;), you agree to be
              bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these
              Terms, you may not use the Service. We reserve the right to update these
              Terms at any time, and your continued use of the Service constitutes
              acceptance of any changes.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              AI Agent Academy is an online educational platform that provides courses,
              lessons, quizzes, projects, and certificates related to AI agent development.
              The Service includes free and paid tiers with varying levels of access to
              course content and features.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Account Registration
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must be at least 13 years old to create an account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          {/* Payment and Subscriptions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Payment and Subscriptions
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Paid plans are billed in advance on a recurring basis (monthly or annually).</li>
              <li>All payments are processed securely through Paystack. We do not store your payment card details.</li>
              <li>Prices are listed in USD and may be subject to applicable taxes.</li>
              <li>You may cancel your subscription at any time. Access continues until the end of the current billing period.</li>
              <li>Refunds are available within 14 days of initial purchase if you have completed less than 25% of the course content.</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice to existing subscribers.</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Acceptable Use
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Share your account credentials or allow others to access your account.</li>
              <li>Copy, redistribute, or resell course content without written permission.</li>
              <li>Use automated tools to scrape or download course materials.</li>
              <li>Attempt to circumvent access controls or security measures.</li>
              <li>Upload malicious code or interfere with the Service&apos;s operation.</li>
              <li>Use the Service for any illegal or unauthorized purpose.</li>
              <li>Harass, abuse, or harm other users of the Service.</li>
              <li>Misrepresent your identity or affiliation.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              All course content, including text, videos, code examples, quizzes, graphics,
              and the platform itself, is owned by AI Agent Academy and protected by
              copyright and intellectual property laws.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>You are granted a limited, non-exclusive, non-transferable license to access course content for personal educational use.</li>
              <li>Code examples provided in lessons may be used in your own projects (commercial or personal) without attribution.</li>
              <li>You may not reproduce, distribute, or create derivative works from the course content itself.</li>
              <li>Your submissions (projects, quiz answers) remain your intellectual property.</li>
            </ul>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Certificates
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Certificates are issued upon successful completion of all required course modules, quizzes, and the capstone project.</li>
              <li>Certificates are verifiable through our public verification system.</li>
              <li>We reserve the right to revoke certificates obtained through fraud, cheating, or violation of these Terms.</li>
              <li>Certificates represent completion of our curriculum and do not constitute professional licensure or accreditation.</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Disclaimers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
              any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose.</li>
              <li>Guarantees of uninterrupted or error-free service.</li>
              <li>Guarantees of employment or career outcomes after course completion.</li>
              <li>Accuracy or completeness of course content (technology evolves rapidly).</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, AI Agent Academy shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages,
              including loss of profits, data, or business opportunities, arising from your
              use of or inability to use the Service. Our total liability shall not exceed
              the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Termination
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>You may delete your account at any time by contacting us.</li>
              <li>We may suspend or terminate your account for violation of these Terms.</li>
              <li>Upon termination, your access to paid content will cease immediately.</li>
              <li>Provisions that by their nature should survive termination (intellectual property, limitation of liability, indemnification) will survive.</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You agree to indemnify and hold harmless AI Agent Academy, its officers,
              directors, employees, and agents from any claims, damages, losses, or
              expenses (including reasonable attorney&apos;s fees) arising from your use of
              the Service or violation of these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws
              of the United States. Any disputes arising from these Terms or the Service
              shall be resolved through binding arbitration, except where prohibited by law.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              13. Changes to These Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. Material changes will
              be communicated via email or a prominent notice on the Service at least 30
              days before taking effect. Your continued use after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              14. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 mt-3 space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:legal@aiagentacademy.com"
                  className="text-primary-600 hover:underline"
                >
                  legal@aiagentacademy.com
                </a>
              </li>
              <li>Website: https://aiagentacademy.com/terms</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
