/**
 * Unified analytics event tracking.
 * Fires events to both Vercel Analytics and Umami (if available).
 *
 * Usage:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("lesson_started", { lesson: "1.1" });
 */

declare global {
  interface Window {
    va?: (event: string, props?: Record<string, any>) => void;
    umami?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}

export type AnalyticsEvent =
  | "cta_start_learning"      // Clicked "Start Learning Free" on hero
  | "cta_view_curriculum"     // Clicked "View Curriculum"
  | "lesson_started"          // Opened a lesson
  | "lesson_completed"        // Finished a lesson (passed quiz)
  | "quiz_started"            // Started a quiz
  | "quiz_passed"             // Passed a quiz
  | "quiz_failed"             // Failed a quiz
  | "paywall_viewed"          // Hit the paid module paywall
  | "pricing_viewed"          // Viewed pricing page
  | "checkout_started"        // Started EFT checkout
  | "checkout_submitted"      // Submitted EFT payment intent
  | "signup_started"          // Opened signup page
  | "signup_completed"        // Created an account
  | "login_completed"         // Logged in
  | "social_share";           // Clicked a social share button

/**
 * Track a custom analytics event across all providers.
 */
export function trackEvent(event: AnalyticsEvent, props?: Record<string, any>) {
  if (typeof window === "undefined") return;

  try {
    // Vercel Analytics custom event
    if (window.va) {
      window.va("event", { name: event, ...props });
    }

    // Umami custom event
    if (window.umami?.track) {
      window.umami.track(event, props);
    }
  } catch {
    // Fail silently — analytics should never break the app
  }
}
