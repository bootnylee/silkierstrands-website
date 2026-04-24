// SilkierStrands.com — Category Page

import { useEffect } from "react";
import { useParams } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import ComparisonCard from "@/components/ComparisonCard";
import { categories, getProductsByCategory, getComparisonsByCategory } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const products = getProductsByCategory(slug || "");
  const comparisons = getComparisonsByCategory(slug || "");

  useEffect(() => {
    if (category) {
      updateDocumentMeta({
        title: `${category.name} Reviews | SilkierStrands`,
        description: `${category.description} Read our expert reviews and comparisons.`,
        canonical: `https://silkierstrands.com/category/${slug}`,
        ogImage: category.imageUrl,
      });
    }
  }, [category, slug]);

  if (!category) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl" style={{ color: "#2C2C2C" }}>Category Not Found</h1>
          <Link href="/"><button className="btn-primary mt-6 rounded-sm px-6 py-3">Back to Home</button></Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Category Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <div className="absolute inset-0">
          <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(44,44,44,0.85) 0%, rgba(44,44,44,0.4) 60%, transparent 100%)" }} />
        </div>
        <div className="relative container py-16 flex flex-col justify-center" style={{ minHeight: "300px" }}>
          <Link href="/">
            <button className="flex items-center gap-2 font-label text-xs mb-6 hover:opacity-80 transition-opacity"
              style={{ color: "#F2C4CE", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <ArrowLeft size={14} /> Home
            </button>
          </Link>
          <p className="section-label mb-2" style={{ color: "#F2C4CE" }}>
            {category.type === "product" ? "Hair Products" : "Styling Tools"}
          </p>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FDF6EE" }}>
            {category.name}
          </h1>
          <p className="font-body text-lg leading-relaxed" style={{ color: "#F2C4CE", maxWidth: "600px" }}>
            {category.description}
          </p>
        </div>
      </section>

      {/* Comparisons */}
      {comparisons.length > 0 && (
        <section className="py-12" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="container">
            <p className="section-label mb-2">Head-to-Head</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "1.8rem", color: "#2C2C2C" }}>
              {category.name} Comparisons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map(c => <ComparisonCard key={c.id} comparison={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="py-12">
        <div className="container">
          <p className="section-label mb-2">All Reviews</p>
          <h2 className="font-display font-bold mb-8" style={{ fontSize: "1.8rem", color: "#2C2C2C" }}>
            {products.length} {category.name} Reviewed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} variant="featured" />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
