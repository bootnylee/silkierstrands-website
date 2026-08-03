// SilkierStrands.com — Analytics Utility
// ─────────────────────────────────────────────────────────────────────────────
// Thin wrapper around GA4 gtag.js.
//
// The Measurement ID is set in client/index.html (G-EMS5M8LTSM).
// Measurement ID is live — do not replace or revert.
//
// Usage:
//   import { trackAffiliateClick } from "@/lib/analytics";
//   <a onClick={() => trackAffiliateClick(product.name, href)} href={href}>
//
// ─────────────────────────────────────────────────────────────────────────────

// Extend the Window type to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a GA4 custom event.
 * Safe to call even if gtag hasn't loaded yet — silently no-ops.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params ?? {});
    }
  } catch {
    // Never throw — analytics must never break the page
  }
}

/**
 * Fire the "affiliate_click" GA4 custom event.
 * Call this in the onClick handler of every outbound Amazon / buy button.
 *
 * @param productName  Human-readable product name, e.g. "Olaplex No.8 Bond Intense Moisture Mask"
 * @param destination  Full destination URL, e.g. "https://www.amazon.com/dp/B08J4KPQR9?tag=silkierstrands-20"
 */
export function trackAffiliateClick(productName: string, destination: string): void {
  trackEvent("affiliate_click", {
    product_name: productName,
    destination_url: destination,
    // GA4 recommended param for outbound links
    link_url: destination,
    link_text: productName,
  });
}

/**
 * Fire a "quiz_complete" GA4 custom event when the hair quiz is finished.
 *
 * @param hairType  The primary hair type result, e.g. "fine"
 */
export function trackQuizComplete(hairType: string): void {
  trackEvent("quiz_complete", { hair_type: hairType });
}

/**
 * Fire an "email_signup" GA4 custom event on successful newsletter subscription.
 *
 * @param hairType  The hair type the subscriber was tagged with
 * @param source    Where the signup happened, e.g. "quiz_result"
 */
export function trackEmailSignup(hairType: string, source: string): void {
  trackEvent("email_signup", { hair_type: hairType, signup_source: source });
}
