// SilkierStrands.com — All Reviews Page

import { useEffect, useState } from "react";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";

export default function AllReviews() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    updateDocumentMeta({
      title: "All Hair Product Reviews | SilkierStrands",
      description: "Browse all 36 expert hair product reviews across shampoos, conditioners, hair masks, serums, hair dryers, flat irons, and curling irons.",
      canonical: "https://silkierstrands.com/reviews",
    });
  }, []);

  const filtered = selectedCategory === "all"
    ? allProducts
    : allProducts.filter(p => p.categorySlug === selectedCategory);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="py-16 border-b" style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}>
        <div className="container">
          <p className="section-label mb-2">Expert Tested</p>
          <h1 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C" }}>
            All Hair Product Reviews
          </h1>
          <p className="font-body text-lg mt-3" style={{ color: "#6C6C6C", maxWidth: "600px" }}>
            {allProducts.length} products reviewed across {categories.length} categories. Updated weekly with new reviews every Monday.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 border-b sticky top-[73px] z-40" style={{ borderColor: "#E8DDD0", backgroundColor: "#FDF6EE" }}>
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className="font-label font-semibold text-xs px-4 py-2 rounded-sm transition-colors"
              style={{
                backgroundColor: selectedCategory === "all" ? "#8B1A2F" : "transparent",
                color: selectedCategory === "all" ? "#FDF6EE" : "#8B1A2F",
                border: "1px solid #8B1A2F",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              All ({allProducts.length})
            </button>
            {categories.map(cat => {
              const count = allProducts.filter(p => p.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="font-label font-semibold text-xs px-4 py-2 rounded-sm transition-colors"
                  style={{
                    backgroundColor: selectedCategory === cat.slug ? "#8B1A2F" : "transparent",
                    color: selectedCategory === cat.slug ? "#FDF6EE" : "#8B1A2F",
                    border: "1px solid #8B1A2F",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} variant="featured" />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
