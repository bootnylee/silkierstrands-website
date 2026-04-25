/**
 * NewsletterSignup Component - SilkierStrands.com
 * Design: Bold Magazine - Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
 * Integration: EmailOctopus JavaScript embed
 * Form ID: aeb1d42c-40de-11f1-aa22-35d9c85d0d35
 */

import { useEffect, useRef } from "react";

const EMAILOCTOPUS_FORM_ID = "aeb1d42c-40de-11f1-aa22-35d9c85d0d35";
const EMAILOCTOPUS_SCRIPT_SRC = `https://eocampaign1.com/form/${EMAILOCTOPUS_FORM_ID}.js`;

interface NewsletterSignupProps {
  variant?: "banner" | "footer" | "inline";
  className?: string;
}

function useEmailOctopusEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any stale script first
    const existing = document.querySelector(
      `script[data-eo-form="${EMAILOCTOPUS_FORM_ID}"]`
    );
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = EMAILOCTOPUS_SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-form", EMAILOCTOPUS_FORM_ID);
    script.setAttribute("data-eo-form", EMAILOCTOPUS_FORM_ID);
    document.body.appendChild(script);

    return () => {
      const s = document.querySelector(`script[data-eo-form="${EMAILOCTOPUS_FORM_ID}"]`);
      if (s) s.remove();
    };
  }, []);

  return containerRef;
}

export default function NewsletterSignup({
  variant = "banner",
  className = "",
}: NewsletterSignupProps) {
  const containerRef = useEmailOctopusEmbed();

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

          {/* EmailOctopus renders the form here */}
          <div
            ref={containerRef}
            data-form={EMAILOCTOPUS_FORM_ID}
            className="max-w-lg mx-auto eo-form-container"
            style={{ minHeight: "60px" }}
          />

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
        <div
          ref={containerRef}
          data-form={EMAILOCTOPUS_FORM_ID}
          className="eo-form-container"
          style={{ minHeight: "50px" }}
        />
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
      <p
        className="text-sm mb-4 leading-relaxed"
        style={{ color: "#4A4A4A" }}
      >
        Get new reviews and comparisons in your inbox every Monday.
      </p>
      <div
        ref={containerRef}
        data-form={EMAILOCTOPUS_FORM_ID}
        className="eo-form-container"
        style={{ minHeight: "50px" }}
      />
    </div>
  );
}
