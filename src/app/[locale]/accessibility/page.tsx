import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Accessibility Statement | AI Agent Academy",
  description:
    "Our commitment to accessible learning for all students on the AI Agent Academy platform.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose dark:prose-invert">
        <h1>Accessibility Statement</h1>
        <p>
          AI Agent Academy is committed to making our course platform usable by
          as many people as possible. We aim to align with WCAG 2.1 Level AA
          guidelines and improve accessibility on an ongoing basis.
        </p>

        <h2>What we provide</h2>
        <ul>
          <li>Keyboard-navigable menus, forms, and quiz controls</li>
          <li>Semantic HTML structure and descriptive labels on interactive elements</li>
          <li>Support for 25 interface languages via next-intl</li>
          <li>Responsive layouts for mobile, tablet, and desktop</li>
          <li>Dark mode support through system and theme preferences</li>
        </ul>

        <h2>Known limitations</h2>
        <ul>
          <li>
            Some lesson diagrams are visual; we provide text alternatives in quiz
            and lesson content where possible
          </li>
          <li>Third-party payment flows may have separate accessibility profiles</li>
        </ul>

        <h2>Feedback</h2>
        <p>
          If you encounter a barrier while using the platform, please contact us
          at{" "}
          <a href="mailto:support@learnhowtobuildaiagents.com">
            support@learnhowtobuildaiagents.com
          </a>{" "}
          with the page URL and a description of the issue. We will work to
          address it promptly.
        </p>

        <p className="text-sm text-gray-500">
          Last updated: June 2026
        </p>
      </main>
      <Footer />
    </>
  );
}
