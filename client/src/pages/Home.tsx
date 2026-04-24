// SilkierStrands.com — Home Page
// Design: Refined Magazine Meets Bold Lifestyle
// Hero: Split-screen with editorial headline and product photography

import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import ComparisonCard from "@/components/ComparisonCard";
import { categories, getEditorPicks, comparisons, allProducts } from "@/lib/products";
import { useEffect } from "react";
import { updateDocumentMeta } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663596051047/8Zc7R6kvi3WyqwPfKsGujc/hero_banner-mpcLHZ6E4Ht3HkvUJsAi4e.webp";

export default function Home() {
  useEffect(() => {
    updateDocumentMeta({
      title: "SilkierStrands — Expert Hair Product Reviews & Recommendations",
      description: "Expert hair product reviews, head-to-head comparisons, and recommendations for the best shampoos, conditioners, hair masks, serums, and styling tools for women.",
      keywords: "hair product reviews, best shampoo, best conditioner, hair mask, hair serum, hair dryer reviews, flat iron, curling iron, hair care women",
      canonical: "https://silkierstrands.com/",
      ogImage: HERO_IMAGE,
    });
  }, []);

  const editorPicks = getEditorPicks().slice(0, 4);
  const featuredComparisons = comparisons.slice(0, 3);
  const recentReviews = allProducts.filter(p => !p.editorPick).slice(0, 6);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "560px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "560px" }}>
          {/* Left: Editorial Text */}
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20"
            style={{ backgroundColor: "#FDF6EE" }}>
            <p className="section-label mb-4 animate-fade-in-up">The Hair Authority for Women</p>
            <h1 className="font-display font-bold leading-none mb-6 animate-fade-in-up-delay-1"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: "#2C2C2C", lineHeight: "0.95" }}>
              Beautiful Hair<br />
              <span style={{ color: "#8B1A2F" }}>Starts With</span><br />
              Better Choices
            </h1>
            <hr className="editorial-rule w-16 mb-6 animate-fade-in-up-delay-2" />
            <p className="font-body text-lg leading-relaxed mb-8 animate-fade-in-up-delay-2"
              style={{ color: "#6C6C6C", maxWidth: "420px" }}>
              We test every product so you don't have to. Expert reviews, honest comparisons, and curated recommendations for every hair type.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up-delay-3">
              <Link href="/reviews">
                <button className="btn-primary rounded-sm px-6 py-3 flex items-center gap-2">
                  Explore Reviews <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/comparisons">
                <button className="rounded-sm px-6 py-3 font-label font-semibold text-sm flex items-center gap-2 border-2 transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#8B1A2F", color: "#8B1A2F", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Head-to-Head
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
            <img
              src={HERO_IMAGE}
              alt="Luxury hair care products and beautiful hair"
              className="w-full h-full object-cover"
              style={{ minHeight: "400px" }}
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, #FDF6EE 0%, transparent 15%)"
            }} />
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-12 border-y" style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-label mb-1">Browse by Category</p>
              <h2 className="font-display font-bold" style={{ fontSize: "2rem", color: "#2C2C2C" }}>
                Find Your Perfect Match
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <div className="group cursor-pointer text-center">
                  <div className="relative overflow-hidden rounded-sm mb-3" style={{ height: "120px", backgroundColor: "#F5EBE0" }}>
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "rgba(139,26,47,0.15)" }}>
                      <span style={{ fontSize: "2rem" }}>{cat.icon}</span>
                    </div>
                  </div>
                  <p className="font-label font-semibold text-xs leading-tight group-hover:text-red-800 transition-colors"
                    style={{ color: "#2C2C2C", letterSpacing: "0.05em" }}>
                    {cat.name}
                  </p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "#B8A99A" }}>
                    {cat.type === "product" ? "Hair Products" : "Styling Tools"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-1">Tested & Approved</p>
              <h2 className="font-display font-bold" style={{ fontSize: "2.2rem", color: "#2C2C2C" }}>
                Editor's Picks
              </h2>
            </div>
            <Link href="/reviews">
              <button className="font-label font-semibold text-xs flex items-center gap-1 hover:text-red-800 transition-colors"
                style={{ color: "#8B1A2F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                All Reviews <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorPicks.map((product) => (
              <ProductCard key={product.id} product={product} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-16" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-1">Head-to-Head</p>
              <h2 className="font-display font-bold" style={{ fontSize: "2.2rem", color: "#2C2C2C" }}>
                Product Comparisons
              </h2>
            </div>
            <Link href="/comparisons">
              <button className="font-label font-semibold text-xs flex items-center gap-1 hover:text-red-800 transition-colors"
                style={{ color: "#8B1A2F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                All Comparisons <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredComparisons.map((comparison) => (
              <ComparisonCard key={comparison.id} comparison={comparison} />
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote / Brand Statement */}
      <section className="py-16 border-y" style={{ borderColor: "#E8DDD0" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <blockquote className="font-display font-medium italic leading-relaxed"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#2C2C2C" }}>
            "We believe every woman deserves to know exactly what she's putting on her hair — and whether it's actually worth it."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <hr className="editorial-rule w-12" />
            <p className="font-label font-semibold text-xs" style={{ color: "#8B1A2F", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              The SilkierStrands Editorial Team
            </p>
            <hr className="editorial-rule w-12" />
          </div>
        </div>
      </section>

      {/* Recent Reviews Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-1">Latest from the Lab</p>
              <h2 className="font-display font-bold" style={{ fontSize: "2.2rem", color: "#2C2C2C" }}>
                Recent Reviews
              </h2>
            </div>
            <Link href="/reviews">
              <button className="font-label font-semibold text-xs flex items-center gap-1 hover:text-red-800 transition-colors"
                style={{ color: "#8B1A2F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.map((product) => (
              <ProductCard key={product.id} product={product} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16" style={{ backgroundColor: "#8B1A2F" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <p className="font-label font-bold text-xs mb-3" style={{ color: "#F2C4CE", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Stay in the Know
          </p>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "2.2rem", color: "#FDF6EE" }}>
            New Reviews Every Week
          </h2>
          <p className="font-body mb-8 leading-relaxed" style={{ color: "#F2C4CE" }}>
            We publish new head-to-head comparisons and product reviews every Monday. Bookmark us and check back weekly for the latest.
          </p>
          <Link href="/reviews">
            <button className="rounded-sm px-8 py-4 font-label font-bold text-sm"
              style={{ backgroundColor: "#D4822A", color: "#FDF6EE", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Browse All Reviews
            </button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
