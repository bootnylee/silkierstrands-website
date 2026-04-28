// SilkierStrands.com - All Comparisons Page

import { useEffect, useState } from "react";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import ComparisonCard from "@/components/ComparisonCard";
import { comparisons } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";
import { QUIZ_RESULT_KEY } from "@/pages/HairQuiz";
import { Sparkles, ArrowRight, X } from "lucide-react";

// Hair type labels for the personalized banner
const HAIR_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  fine:            { label: "Fine Hair",          color: "#6B4E9B", bg: "#F5F0FF" },
  thick:           { label: "Thick Hair",         color: "#2C6B2F", bg: "#EDFAEE" },
  curly:           { label: "Curly Hair",         color: "#D4822A", bg: "#FFF8EE" },
  coarse:          { label: "Coarse Hair",        color: "#8B4513", bg: "#FFF5EE" },
  dry:             { label: "Dry Hair",           color: "#C0392B", bg: "#FFF5F5" },
  normal:          { label: "Normal Hair",        color: "#2C6B2F", bg: "#EDFAEE" },
  "color-treated": { label: "Color-Treated Hair", color: "#8B1A2F", bg: "#FFF5F7" },
};

function QuizEntryBanner() {
  const [savedHairType, setSavedHairType] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(QUIZ_RESULT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.primary) setSavedHairType(parsed.primary);
      }
    } catch {}
  }, []);

  if (dismissed) return null;

  const meta = savedHairType ? HAIR_LABELS[savedHairType] : null;

  // Returning visitor: personalized banner
  if (meta && savedHairType) {
    return (
      <div className="border-b px-6 py-4" style={{ backgroundColor: meta.bg, borderColor: `${meta.color}33` }}>
        <div className="container flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={16} style={{ color: meta.color, flexShrink: 0 }} />
            <div>
              <span className="font-body font-semibold text-sm" style={{ color: meta.color }}>
                Comparing products for {meta.label}?
              </span>
              <span className="font-body text-xs ml-2 hidden sm:inline" style={{ color: "#6B5B4E" }}>
                Your hair type profile can help narrow down the winner.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/hair-quiz">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded font-body font-semibold text-xs transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: meta.color, color: "#FDF6EE" }}
              >
                View My Profile <ArrowRight size={12} />
              </span>
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "#8C8C8C", background: "none", border: "none", padding: 0 }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // First-time visitor: generic quiz entry
  return (
    <div className="border-b px-6 py-4" style={{ backgroundColor: "#FFF8F0", borderColor: "#E8DDD0" }}>
      <div className="container flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={16} style={{ color: "#8B1A2F", flexShrink: 0 }} />
          <div>
            <span className="font-body font-semibold text-sm" style={{ color: "#8B1A2F" }}>
              Not sure which product is right for you?
            </span>
            <span className="font-body text-xs ml-2 hidden sm:inline" style={{ color: "#6B5B4E" }}>
              Your hair type can help — take our 2-minute quiz to find out.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/hair-quiz">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded font-body font-semibold text-xs transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
            >
              Take the Hair Type Quiz <ArrowRight size={12} />
            </span>
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="hover:opacity-60 transition-opacity"
            style={{ color: "#8C8C8C", background: "none", border: "none", padding: 0 }}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AllComparisons() {
  useEffect(() => {
    updateDocumentMeta({
      title: "Hair Product Head-to-Head Comparisons | SilkierStrands",
      description: "Expert head-to-head comparisons of the best hair products and styling tools. Find out which product wins in each category.",
      canonical: "https://silkierstrands.com/comparisons",
    });
  }, []);

  return (
    <SiteLayout>
      {/* Quiz Entry Banner */}
      <QuizEntryBanner />

      {/* Header */}
      <section className="py-16 border-b" style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}>
        <div className="container">
          <p className="section-label mb-2">Head-to-Head</p>
          <h1 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C" }}>
            Product Comparisons
          </h1>
          <p className="font-body text-lg mt-3" style={{ color: "#6C6C6C", maxWidth: "600px" }}>
            We put the top products head-to-head so you know exactly which one to buy. New comparisons added every Monday.
          </p>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map(c => <ComparisonCard key={c.id} comparison={c} variant="featured" />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
