// SilkierStrands.com — Newsletter Signup Component
// Design: Bold magazine aesthetic — Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
// Integration: Works with Mailchimp embed forms or ConvertKit
// Usage: <NewsletterSignup variant="banner" /> or <NewsletterSignup variant="footer" /> or <NewsletterSignup variant="inline" />

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

type Variant = "banner" | "footer" | "inline";

interface NewsletterSignupProps {
  variant?: Variant;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — Update these values when you connect your email provider
// ─────────────────────────────────────────────────────────────────────────────
//
// Option A — Mailchimp:
//   1. Go to Mailchimp → Audience → Signup forms → Embedded forms
//   2. Copy the action URL from the <form> tag (looks like:
//      https://silkierstrands.us1.list-manage.com/subscribe/post?u=XXXX&id=YYYY)
//   3. Replace MAILCHIMP_ACTION_URL below with that URL
//
// Option B — ConvertKit:
//   1. Go to ConvertKit → Grow → Landing Pages & Forms → your form → Embed
//   2. Copy the form action URL (looks like:
//      https://app.convertkit.com/forms/XXXXXXX/subscriptions)
//   3. Replace MAILCHIMP_ACTION_URL below with that URL
//
// Option C — Leave as-is for now:
//   The form will show a success message without actually submitting.
//   Replace the URL when you're ready to connect your email provider.
//
const EMAIL_PROVIDER_ACTION_URL: string = ""; // ← Paste your Mailchimp or ConvertKit URL here
const EMAIL_FIELD_NAME = "EMAIL"; // Mailchimp uses "EMAIL"; ConvertKit uses "email_address"
// ─────────────────────────────────────────────────────────────────────────────

type SubmitState = "idle" | "loading" | "success" | "error";

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

    // If no provider URL is configured, simulate success
    if (!EMAIL_PROVIDER_ACTION_URL) {
      setTimeout(() => setSubmitState("success"), 800);
      return;
    }

    try {
      // Use a hidden iframe trick for Mailchimp CORS-free submission
      const formData = new FormData();
      formData.append(EMAIL_FIELD_NAME, email);

      // For ConvertKit, use fetch with JSON
      if (EMAIL_PROVIDER_ACTION_URL.includes("convertkit")) {
        const response = await fetch(EMAIL_PROVIDER_ACTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_address: email }),
        });
        if (response.ok || response.status === 200) {
          setSubmitState("success");
        } else {
          throw new Error("Subscription failed");
        }
      } else {
        // For Mailchimp — submit via hidden form to avoid CORS
        const mailchimpUrl = EMAIL_PROVIDER_ACTION_URL.replace(
          "/post?",
          "/post-json?"
        ) + `&${EMAIL_FIELD_NAME}=${encodeURIComponent(email)}&c=?`;

        // Create a hidden iframe for submission
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.name = "mc-iframe";
        document.body.appendChild(iframe);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = EMAIL_PROVIDER_ACTION_URL;
        form.target = "mc-iframe";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = EMAIL_FIELD_NAME;
        input.value = email;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
          setSubmitState("success");
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 1500);
      }
    } catch {
      setSubmitState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (variant === "footer") {
    return (
      <div>
        <p
          className="font-label font-semibold text-xs mb-3"
          style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Weekly Updates
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#C8B8C0" }}>
          New reviews and comparisons every Monday.
        </p>

        {submitState === "success" ? (
          <div className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color: "#D4822A" }} />
            <span className="font-body text-sm" style={{ color: "#D4822A" }}>
              You're subscribed!
            </span>
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
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "#FDF6EE",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="px-4 py-2 rounded-sm flex-shrink-0 flex items-center gap-1.5 font-label font-semibold text-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#D4822A",
                color: "#FFF",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {submitState === "loading" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <ArrowRight size={13} />
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

  if (variant === "inline") {
    return (
      <div
        className="rounded-sm p-6"
        style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Mail size={16} style={{ color: "#8B1A2F" }} />
          <p
            className="font-label font-semibold text-xs"
            style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Get Weekly Reviews
          </p>
        </div>
        <p className="font-body text-sm mb-4" style={{ color: "#4A4A4A" }}>
          New reviews and comparisons delivered every Monday.
        </p>

        {submitState === "success" ? (
          <div className="flex items-center gap-2 py-2">
            <CheckCircle size={16} style={{ color: "#D4822A" }} />
            <span className="font-body text-sm font-semibold" style={{ color: "#D4822A" }}>
              You're subscribed — see you Monday!
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-3 py-2 text-sm font-body rounded-sm border"
              style={{
                backgroundColor: "#FFF",
                borderColor: "#D4C5B5",
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

  // Banner variant (default) — full-width section for homepage
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "#8B1A2F" }}
    >
      {/* Decorative background pattern */}
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
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
