import { useId, useState } from "react";

const HAIR_TYPES = [
  { value: "fine", label: "Fine hair" },
  { value: "thick", label: "Thick hair" },
  { value: "curly", label: "Curly hair" },
  { value: "coarse", label: "Coarse hair" },
  { value: "dry", label: "Dry hair" },
  { value: "normal", label: "Normal hair" },
  { value: "color-treated", label: "Color-treated hair" },
] as const;

type HairType = (typeof HAIR_TYPES)[number]["value"];
type SubmitState = "idle" | "submitting" | "success" | "error";

interface NewsletterSignupProps {
  variant?: "banner" | "footer" | "inline";
  className?: string;
}

export default function NewsletterSignup({
  variant = "banner",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [hairType, setHairType] = useState<HairType | "">("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const statusId = useId();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting" || submitState === "success") return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setSubmitState("error");
      return;
    }
    if (!hairType) {
      setErrorMessage("Please select your hair type.");
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, hairType }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setSubmitState("success");
        return;
      }

      setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      setSubmitState("error");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setSubmitState("error");
    }
  }

  const isFooter = variant === "footer";
  const accentColor = isFooter ? "#8B1A2F" : "#D4822A";
  const mutedTextColor = isFooter ? "rgba(253,246,238,0.7)" : "#6B5B6E";

  const form = (
    <form onSubmit={handleSubmit} noValidate aria-describedby={statusId}>
      <div className="flex flex-col gap-2">
        <select
          value={hairType}
          onChange={(event) => setHairType(event.target.value as HairType | "")}
          required
          disabled={submitState === "submitting" || submitState === "success"}
          className="w-full px-4 py-3 rounded font-body text-sm border outline-none transition-all disabled:opacity-70"
          style={{
            borderColor: errorMessage ? "#C0392B" : "#E8DDD0",
            backgroundColor: "#FFFFFF",
            color: hairType ? "#2C2C2C" : "#6B5B6E",
          }}
          aria-label="Your hair type"
        >
          <option value="" disabled>Select your hair type</option>
          {HAIR_TYPES.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className={isFooter ? "flex flex-col gap-2" : "flex flex-col sm:flex-row gap-2"}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            autoComplete="email"
            required
            disabled={submitState === "submitting" || submitState === "success"}
            className="flex-1 px-4 py-3 rounded font-body text-sm border outline-none transition-all disabled:opacity-70"
            style={{
              borderColor: errorMessage ? "#C0392B" : "#E8DDD0",
              backgroundColor: "#FFFFFF",
              color: "#2C2C2C",
            }}
          />
          <button
            type="submit"
            disabled={submitState === "submitting" || submitState === "success"}
            className="px-5 py-3 rounded font-body font-semibold text-sm transition-all duration-200 hover:opacity-80 disabled:opacity-60"
            style={{ backgroundColor: accentColor, color: "#FDF6EE", whiteSpace: "nowrap" }}
          >
            {submitState === "submitting" ? "Joining…" : submitState === "success" ? "You’re In" : "Subscribe"}
          </button>
        </div>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className="font-body text-xs mt-3"
        style={{ color: submitState === "error" ? "#C0392B" : submitState === "success" ? accentColor : mutedTextColor }}
      >
        {submitState === "success"
          ? "Thanks — you’re subscribed to the SilkierStrands Weekly."
          : submitState === "error"
            ? errorMessage
            : "No spam, ever. Unsubscribe at any time."}
      </p>
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
          <div className="max-w-md mx-auto">{form}</div>
        </div>
      </section>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <p
          className="font-semibold text-xs mb-3 uppercase tracking-widest"
          style={{ color: "#F2C4CE" }}
        >
          The SilkierStrands Weekly
        </p>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "rgba(253,246,238,0.7)" }}
        >
          New reviews every Monday. No spam, ever.
        </p>
        {form}
      </div>
    );
  }

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
      {form}
    </div>
  );
}
