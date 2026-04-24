// SilkierStrands.com — Hair Type Landing Page
// Design: Bold magazine aesthetic — Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
// SEO: Optimized for "best hair products for [type] hair" keywords

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import {
  hairTypes,
  getHairTypeBySlug,
  getProductsForHairType,
  getTopProductsForHairType,
} from "@/lib/hairTypes";
import { updateDocumentMeta } from "@/lib/seo";
import { ArrowRight, CheckCircle, Lightbulb, ChevronRight } from "lucide-react";
import { categories } from "@/lib/products";

export default function HairTypePage() {
  const { slug } = useParams<{ slug: string }>();
  const hairType = getHairTypeBySlug(slug || "");
  const allMatchingProducts = getProductsForHairType(slug || "");
  const topProducts = getTopProductsForHairType(slug || "", 6);

  useEffect(() => {
    if (hairType) {
      updateDocumentMeta({
        title: hairType.metaTitle,
        description: hairType.metaDescription,
        canonical: `https://silkierstrands.com/hair-type/${hairType.slug}`,
      });
    }
  }, [hairType]);

  if (!hairType) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "#2C2C2C" }}>
            Hair Type Not Found
          </h1>
          <p className="font-body text-lg mb-8" style={{ color: "#6C6C6C" }}>
            We couldn't find that hair type. Browse all our hair type guides below.
          </p>
          <Link href="/reviews">
            <button
              className="px-6 py-3 font-label font-semibold text-xs rounded-sm"
              style={{
                backgroundColor: "#8B1A2F",
                color: "#FDF6EE",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Browse All Reviews
            </button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const relatedTypes = hairTypes.filter((ht) =>
    hairType.relatedHairTypes.includes(ht.slug)
  );

  // Group products by category for the "Shop by Category" section
  const productsByCategory = categories
    .map((cat) => ({
      category: cat,
      products: allMatchingProducts
        .filter((p) => p.categorySlug === cat.slug)
        .slice(0, 3),
    }))
    .filter((g) => g.products.length > 0);

  return (
    <SiteLayout>
      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#1A0A0F", minHeight: "420px" }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${hairType.heroImageUrl})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,10,15,0.95) 0%, rgba(139,26,47,0.7) 100%)" }} />

        <div className="relative container py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link href="/">
              <span className="font-label text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: "#D4822A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Home
              </span>
            </Link>
            <ChevronRight size={12} style={{ color: "#D4822A" }} />
            <Link href="/reviews">
              <span className="font-label text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: "#D4822A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Reviews
              </span>
            </Link>
            <ChevronRight size={12} style={{ color: "#D4822A" }} />
            <span className="font-label text-xs font-semibold"
              style={{ color: "#F2C4CE", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {hairType.name}
            </span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{hairType.icon}</span>
              <span
                className="font-label font-semibold text-xs px-3 py-1 rounded-sm"
                style={{
                  backgroundColor: hairType.accentColor,
                  color: "#FFF",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Hair Type Guide
              </span>
            </div>

            <h1
              className="font-display font-bold mb-4 leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FDF6EE" }}
            >
              {hairType.name}
            </h1>

            <p
              className="font-body text-lg mb-6 leading-relaxed"
              style={{ color: "#E8D5C0", maxWidth: "560px" }}
            >
              {hairType.tagline}
            </p>

            <div className="flex items-center gap-4">
              <span
                className="font-label font-semibold text-sm"
                style={{ color: "#D4822A" }}
              >
                {allMatchingProducts.length} products reviewed
              </span>
              <span style={{ color: "#6C4A5A" }}>·</span>
              <span
                className="font-label font-semibold text-sm"
                style={{ color: "#D4822A" }}
              >
                Expert tested
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About This Hair Type ── */}
      <section className="py-14 border-b" style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <p
                className="font-label font-semibold text-xs mb-3"
                style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Understanding {hairType.name}
              </p>
              <h2
                className="font-display font-bold mb-4"
                style={{ fontSize: "1.75rem", color: "#2C2C2C" }}
              >
                What Makes {hairType.name} Unique
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
                {hairType.description}
              </p>

              {/* Common Challenges */}
              <div className="mt-6">
                <p
                  className="font-label font-semibold text-xs mb-3"
                  style={{ color: "#8B1A2F", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Common Challenges
                </p>
                <ul className="space-y-2">
                  {hairType.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "#8B1A2F" }}
                      />
                      <span className="font-body text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div
              className="rounded-sm p-8"
              style={{ backgroundColor: "#FDF6EE", border: "1px solid #E8DDD0" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Lightbulb size={18} style={{ color: "#D4822A" }} />
                <p
                  className="font-label font-semibold text-xs"
                  style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Expert Tips for {hairType.name}
                </p>
              </div>
              <ul className="space-y-4">
                {hairType.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#D4822A" }}
                    />
                    <span className="font-body text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Related Hair Types */}
              {relatedTypes.length > 0 && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E8DDD0" }}>
                  <p
                    className="font-label font-semibold text-xs mb-3"
                    style={{ color: "#8B1A2F", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Related Hair Types
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedTypes.map((rt) => (
                      <Link key={rt.id} href={`/hair-type/${rt.slug}`}>
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-label font-semibold rounded-sm cursor-pointer transition-colors hover:opacity-80"
                          style={{
                            backgroundColor: "#FFF",
                            color: "#8B1A2F",
                            border: "1px solid #8B1A2F",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          {rt.icon} {rt.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Picks ── */}
      <section className="py-14 border-b" style={{ borderColor: "#E8DDD0" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-sm" style={{ backgroundColor: "#D4822A" }} />
                <p
                  className="font-label font-semibold text-xs"
                  style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Editor's Top Picks
                </p>
              </div>
              <h2
                className="font-display font-bold"
                style={{ fontSize: "1.75rem", color: "#2C2C2C" }}
              >
                Best Products for {hairType.name}
              </h2>
            </div>
            <Link href={`/reviews?hairType=${hairType.id}`}>
              <button
                className="hidden md:flex items-center gap-2 font-label font-semibold text-xs"
                style={{ color: "#8B1A2F", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                See All {allMatchingProducts.length} Products
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {topProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 rounded-sm"
              style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}
            >
              <p className="font-display text-xl font-semibold mb-2" style={{ color: "#2C2C2C" }}>
                More reviews coming soon
              </p>
              <p className="font-body text-sm" style={{ color: "#6C6C6C" }}>
                We're testing products specifically for {hairType.name.toLowerCase()} right now.
              </p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/reviews">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 font-label font-semibold text-xs rounded-sm"
                style={{
                  backgroundColor: "#8B1A2F",
                  color: "#FDF6EE",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                See All {allMatchingProducts.length} Products
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      {productsByCategory.length > 0 && (
        <section className="py-14 border-b" style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}>
          <div className="container">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-sm" style={{ backgroundColor: "#8B1A2F" }} />
              <p
                className="font-label font-semibold text-xs"
                style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Shop by Category
              </p>
            </div>
            <h2
              className="font-display font-bold mb-8"
              style={{ fontSize: "1.75rem", color: "#2C2C2C" }}
            >
              {hairType.name} Products by Category
            </h2>

            <div className="space-y-12">
              {productsByCategory.map(({ category, products }) => (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <h3
                        className="font-display font-semibold"
                        style={{ fontSize: "1.2rem", color: "#2C2C2C" }}
                      >
                        {category.name}
                      </h3>
                    </div>
                    <Link href={`/category/${category.slug}`}>
                      <span
                        className="font-label font-semibold text-xs flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
                        style={{ color: "#8B1A2F", letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        All {category.name} <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} variant="default" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Hair Types Navigation ── */}
      <section className="py-14" style={{ backgroundColor: "#1A0A0F" }}>
        <div className="container">
          <p
            className="font-label font-semibold text-xs mb-2"
            style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Find Your Hair Type
          </p>
          <h2
            className="font-display font-bold mb-8"
            style={{ fontSize: "1.75rem", color: "#FDF6EE" }}
          >
            Browse All Hair Type Guides
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hairTypes.map((ht) => (
              <Link key={ht.id} href={`/hair-type/${ht.slug}`}>
                <div
                  className="p-5 rounded-sm cursor-pointer transition-all hover:scale-105"
                  style={{
                    backgroundColor: ht.id === hairType.id ? ht.accentColor : "rgba(255,255,255,0.05)",
                    border: `1px solid ${ht.id === hairType.id ? ht.accentColor : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  <span className="text-2xl mb-2 block">{ht.icon}</span>
                  <p
                    className="font-display font-semibold"
                    style={{ fontSize: "1rem", color: ht.id === hairType.id ? "#FFF" : "#FDF6EE" }}
                  >
                    {ht.name}
                  </p>
                  <p
                    className="font-body text-xs mt-1"
                    style={{ color: ht.id === hairType.id ? "rgba(255,255,255,0.8)" : "#9A7A8A" }}
                  >
                    {getProductsForHairType(ht.id).length} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
