// SilkierStrands.com - All Comparisons Page

import { useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import ComparisonCard from "@/components/ComparisonCard";
import { comparisons } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";

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
