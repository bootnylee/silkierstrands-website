// SilkierStrands.com — Newsletter Signup Component
// Design: Bold magazine aesthetic — Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
// Integration: EmailOctopus (primary), Mailchimp, or ConvertKit
// Usage: <NewsletterSignup variant="banner" /> | <NewsletterSignup variant="footer" /> | <NewsletterSignup variant="inline" />

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

type Variant = "banner" | "footer" | "inline";
interface NewsletterSignupProps {
  variant?: Variant;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — Paste your email provider URL here to activate the form
// ─────────────────────────────────────────────────────────────────────────────
//
// ✅ EmailOctopus (recommended — free up to 2,500 subscribers):
//   1. Log in to emailoctopus.com
//   2. Go to Lists → your list → Forms → Embedded form
//   3. Copy the action URL from the <form> tag. It looks like:
//      https://emailoctopus.com/lists/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/members/embedded/1.3s/add
//   4. Paste it below as EMAIL_PROVIDER_ACTION_URL
//   5. Leave EMAIL_FIELD_NAME as "member[email_address]"
//
// ✅ Mailchimp:
//   1. Go to Audience → Signup forms → Embedded forms
//   2. Copy the action URL from the <form> tag
//   3. Paste it below and set EMAIL_FIELD_NAME = "EMAIL"
//
// ✅ ConvertKit:
//   1. Go to Grow → Landing Pages & Forms → your form → Embed
//   2. Copy the form action URL
//   3. Paste it below and set EMAIL_FIELD_NAME = "email_address"
//
// ⚠️  Leave EMAIL_PROVIDER_ACTION_URL as "" to run in demo mode (shows success without sending)
//
const EMAIL_PROVIDER_ACTION_URL: string = ""; // ← Paste your EmailOctopus URL here
const EMAIL_FIELD_NAME = "member[email_address]"; // EmailOctopus field name
// ─────────────────────────────────────────────────────────────────────────────

type SubmitState = "idle" | "loading" | "success" | "error";

/**
 * Detects which email provider is being used based on the action URL
 */
function detectProvider(url: string): "emailoctopus" | "mailchimp" | "convertkit" | "unknown" {
  if (url.includes("emailoctopus.com")) return "emailoctopus";
  if (url.includes("list-manage.com") || url.includes("mailchimp.com")) return "mailchimp";
  if (url.includes("convertkit.com") || url.includes("ck.page")) return "convertkit";
  return "unknown";
}

/**
 * Submit to EmailOctopus via a hidden iframe (avoids CORS issues on static sites)
 */
function submitViaIframe(actionUrl: string, fieldName: string, emailValue: string): Promise<void> {
  return new Promise((resolve) => {
    const iframeName = `eo-iframe-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.name = iframeName;
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = actionUrl;
    form.target = iframeName;

    // Email field
    const emailInput = document.createElement("input");
    emailInput.type = "hidden";
    emailInput.name = fieldName;
    emailInput.value = emailValue;
    form.appendChild(emailInput);

    // EmailOctopus requires a hidden field to confirm it's an embedded form
    const hpInput = document.createElement("input");
    hpInput.type = "hidden";
    hpInput.name = "hpc_1";
    hpInput.value = "";
    form.appendChild(hpInput);

    document.body.appendChild(form);
    form.submit();

    // Give the form 2 seconds to submit, then resolve
    setTimeout(() => {
      try {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      } catch {
        // Elements may already be removed
      }
      resolve();
    }, 2000);
  });
}

export default function NewsletterSignup({ variant = "banner" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setSubmitState("loading");
    setErrorMessage("");

    // Demo mode — no provider configured
    if (!EMAIL_PROVIDER_ACTION_URL) {
      setTimeout(() => setSubmitState("success"), 800);
      return;
    }

    try {
      const provider = detectProvider(EMAIL_PROVIDER_ACTION_URL);

      if (provider === "convertkit") {
        // ConvertKit supports CORS — use fetch with JSON
        const response = await fetch(EMAIL_PROVIDER_ACTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_address: email }),
        });
        if (response.ok) {
          setSubmitState("success");
        } else {
          throw new Error("Subscription failed");
        }
      } else {
        // EmailOctopus and Mailchimp — use hidden iframe to avoid CORS
        await submitViaIframe(EMAIL_PROVIDER_ACTION_URL, EMAIL_FIELD_NAME, email);
        setSubmitState("success");
      }
    } catch {
      setSubmitState("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  };

  // ── Footer Variant ──────────────────────────────────────────────────────────
  if (variant === "footer") {
    return (
      <div>
        <p
          className="font-label font-semibold text-xs mb-3"
          style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          The SilkierStrands Weekly
        </p>
        <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "#9A7A8A" }}>
          New reviews every Monday. No spam, ever.
        </p>
        {submitState === "success" ? (
          <div className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color: "#D4822A" }} />
            <p className="font-body text-sm font-semibold" style={{ color: "#FDF6EE" }}>
              You're subscribed!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-3 py-2 text-sm font-body rounded-sm border"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#FDF6EE",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="px-4 py-2 rounded-sm flex-shrink-0 font-label font-semibold text-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#8B1A2F",
                color: "#FDF6EE",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {submitState === "loading" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                "Join"
              )}
            </button>
          </form>
        )}
        {errorMessage && (
          <p className="font-body text-xs mt-2" style={{ color: "#F2C4CE" }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ── Inline Variant ──────────────────────────────────────────────────────────
  if (variant === "inline") {
    return (
      <div
        className="rounded-sm p-6"
        style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail size={16} style={{ color: "#8B1A2F" }} />
          <p
            className="font-label font-semibold text-xs"
            style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Stay Updated
          </p>
        </div>
        <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "#4A4A4A" }}>
          Get new reviews and comparisons in your inbox every Monday.
        </p>
        {submitState === "success" ? (
          <div className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color: "#D4822A" }} />
            <p className="font-body text-sm font-semibold" style={{ color: "#2C2C2C" }}>
              You're subscribed — see you Monday!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-3 py-2 text-sm font-body rounded-sm border"
              style={{
                borderColor: "#D4C5B5",
                backgroundColor: "#FFFFFF",
                color: "#2C2C2C",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="px-4 py-2 rounded-sm flex-shrink-0 font-label font-semibold text-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#8B1A2F",
                color: "#FDF6EE",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {submitState === "loading" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}
        {errorMessage && (
          <p className="font-body text-xs mt-2" style={{ color: "#8B1A2F" }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ── Banner Variant (default) — full-width section for homepage ──────────────
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "#8B1A2F" }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #FDF6EE 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #D4822A 0%, transparent 50%)`,
        }}
      />
      <div className="relative container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail size={18} style={{ color: "#F2C4CE" }} />
            <p
              className="font-label font-semibold text-xs"
              style={{ color: "#F2C4CE", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              The SilkierStrands Weekly
            </p>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FDF6EE" }}
          >
            New Reviews Every Monday
          </h2>
          <p
            className="font-body text-base mb-8 leading-relaxed"
            style={{ color: "#E8C8D0", maxWidth: "480px", margin: "0 auto 2rem" }}
          >
            Get our latest hair product reviews, head-to-head comparisons, and exclusive deals
            delivered to your inbox every Monday morning.
          </p>

          {submitState === "success" ? (
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <CheckCircle size={20} style={{ color: "#D4822A" }} />
              <div className="text-left">
                <p className="font-display font-semibold" style={{ color: "#FDF6EE", fontSize: "1.1rem" }}>
                  You're in!
                </p>
                <p className="font-body text-sm" style={{ color: "#E8C8D0" }}>
                  See you next Monday with fresh reviews.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 text-sm font-body rounded-sm border-0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#FDF6EE",
                  outline: "none",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
                }}
              />
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="px-6 py-3.5 rounded-sm font-label font-semibold text-xs flex items-center justify-center gap-2 transition-opacity hover:opacity-90 flex-shrink-0"
                style={{
                  backgroundColor: "#D4822A",
                  color: "#FFF",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {submitState === "loading" ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    Subscribe Free
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {errorMessage && (
            <p className="font-body text-sm mt-3" style={{ color: "#F2C4CE" }}>
              {errorMessage}
            </p>
          )}
          <p
            className="font-body text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            No spam, ever. Unsubscribe anytime. Free weekly newsletter.
          </p>
        </div>
      </div>
    </section>
  );
}
