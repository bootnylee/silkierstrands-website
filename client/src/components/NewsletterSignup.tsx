/**
 * NewsletterSignup Component - SilkierStrands.com
 * Design: Bold Magazine - Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
 * Integration: EmailOctopus JavaScript embed
 * Form ID: aeb1d42c-40de-11f1-aa22-35d9c85d0d35
 */

import { useEffect, useRef, useState } from "react";

const EMAILOCTOPUS_FORM_ID = "aeb1d42c-40de-11f1-aa22-35d9c85d0d35";
const EMAILOCTOPUS_SCRIPT_SRC = `https://eocampaign1.com/form/${EMAILOCTOPUS_FORM_ID}.js`;

// Singleton: only load the script once across all component instances
let scriptStatus: "idle" | "loading" | "loaded" | "error" = "idle";
const scriptCallbacks: Array<(success: boolean) => void> = [];

function loadEmailOctopusScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (scriptStatus === "loaded") {
      resolve(true);
      return;
    }
    if (scriptStatus === "error") {
      resolve(false);
      return;
    }

    scriptCallbacks.push(resolve);

    if (scriptStatus === "loading") return;

    scriptStatus = "loading";

    const script = document.createElement("script");
    script.src = EMAILOCTOPUS_SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-form", EMAILOCTOPUS_FORM_ID);
    // crossOrigin allows the browser to report actual errors instead of masking them
    script.crossOrigin = "anonymous";

    script.onload = () => {
      scriptStatus = "loaded";
      scriptCallbacks.forEach((cb) => cb(true));
      scriptCallbacks.length = 0;
    };

    script.onerror = () => {
      scriptStatus = "error";
      scriptCallbacks.forEach((cb) => cb(false));
      scriptCallbacks.length = 0;
    };

    document.body.appendChild(script);
  });
}

interface NewsletterSignupProps {
  variant?: "banner" | "footer" | "inline";
  className?: string;
}

export default function NewsletterSignup({
  variant = "banner",
  className = "",
}: NewsletterSignupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(scriptStatus === "loaded");
  const [scriptFailed, setScriptFailed] = useState(scriptStatus === "error");

  useEffect(() => {
    if (scriptStatus === "loaded") {
      setScriptLoaded(true);
      return;
    }
    if (scriptStatus === "error") {
      setScriptFailed(true);
      return;
    }

    loadEmailOctopusScript().then((success) => {
      if (success) {
        setScriptLoaded(true);
      } else {
        setScriptFailed(true);
      }
    });
  }, []);

  // Fallback form shown if EmailOctopus script fails to load
  const FallbackForm = () => (
    <form
      action={`https://emailoctopus.com/lists/${EMAILOCTOPUS_FORM_ID}/members/embedded/1.3s/add`}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2 max-w-md mx-auto"
    >
      <input
        type="email"
        name="member[email_address]"
        placeholder="Your email address"
        required
        className="flex-1 px-4 py-3 text-sm rounded-sm border"
        style={{
          borderColor: "rgba(255,255,255,0.3)",
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#FDF6EE",
          outline: "none",
        }}
      />
      <input type="hidden" name="hpc_1" value="" />
      <button
        type="submit"
        className="px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider flex-shrink-0"
        style={{ backgroundColor: "#D4822A", color: "#fff" }}
      >
        Subscribe
      </button>
    </form>
  );

  if (variant === "banner") {
    return (
      <section
        className={`relative overflow-hidden ${className}`}
        style={{
          background:
            "linear-gradient(135deg, #8B1A2F 0%, #6B1423 50%, #4A0E1A 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #D4822A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F2C4CE 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
            style={{ background: "#D4822A", color: "#fff" }}
          >
            Join the Community
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#FDF6EE",
            }}
          >
            Get Expert Hair Tips
            <br />
            <span style={{ color: "#F2C4CE" }}>Delivered Weekly</span>
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(253,246,238,0.8)" }}
          >
            Join thousands of women who receive our curated product reviews,
            exclusive deals, and expert styling advice every week.
          </p>

          {scriptFailed ? (
            <FallbackForm />
          ) : (
            <div
              ref={containerRef}
              data-form={EMAILOCTOPUS_FORM_ID}
              className="max-w-lg mx-auto"
              style={{ minHeight: scriptLoaded ? "auto" : "60px" }}
            />
          )}

          <p
            className="text-xs mt-4"
            style={{ color: "rgba(253,246,238,0.5)" }}
          >
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <p
          className="font-semibold text-xs mb-3 uppercase tracking-widest"
          style={{ color: "#D4822A" }}
        >
          The SilkierStrands Weekly
        </p>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "rgba(253,246,238,0.7)" }}
        >
          New reviews every Monday. No spam, ever.
        </p>
        {scriptFailed ? (
          <form
            action={`https://emailoctopus.com/lists/${EMAILOCTOPUS_FORM_ID}/members/embedded/1.3s/add`}
            method="post"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2"
          >
            <input
              type="email"
              name="member[email_address]"
              placeholder="Your email"
              required
              className="flex-1 px-3 py-2 text-sm rounded-sm border"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#FDF6EE",
                outline: "none",
                minWidth: 0,
              }}
            />
            <input type="hidden" name="hpc_1" value="" />
            <button
              type="submit"
              className="px-4 py-2 rounded-sm flex-shrink-0 font-semibold text-xs uppercase tracking-wider"
              style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
            >
              Join
            </button>
          </form>
        ) : (
          <div
            ref={containerRef}
            data-form={EMAILOCTOPUS_FORM_ID}
            style={{ minHeight: "50px" }}
          />
        )}
      </div>
    );
  }

  // inline variant
  return (
    <div
      className={`rounded-sm p-6 ${className}`}
      style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}
    >
      <p
        className="font-semibold text-xs mb-2 uppercase tracking-widest"
        style={{ color: "#8B1A2F" }}
      >
        Stay Updated
      </p>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#4A4A4A" }}>
        Get new reviews and comparisons in your inbox every Monday.
      </p>
      {scriptFailed ? (
        <form
          action={`https://emailoctopus.com/lists/${EMAILOCTOPUS_FORM_ID}/members/embedded/1.3s/add`}
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2"
        >
          <input
            type="email"
            name="member[email_address]"
            placeholder="Your email address"
            required
            className="flex-1 px-3 py-2 text-sm rounded-sm border"
            style={{
              borderColor: "#D4C5B5",
              backgroundColor: "#FFFFFF",
              color: "#2C2C2C",
              outline: "none",
            }}
          />
          <input type="hidden" name="hpc_1" value="" />
          <button
            type="submit"
            className="px-4 py-2 rounded-sm flex-shrink-0 font-semibold text-xs uppercase tracking-wider"
            style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
          >
            Subscribe
          </button>
        </form>
      ) : (
        <div
          ref={containerRef}
          data-form={EMAILOCTOPUS_FORM_ID}
          style={{ minHeight: "50px" }}
        />
      )}
    </div>
  );
}
