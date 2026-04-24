// SilkierStrands.com — Comparison Page

import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { Trophy, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { StarRatingDisplay } from "@/components/ProductCard";
import { comparisons, getProductById, amazonLink } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = comparisons.find(c => c.slug === slug);
  const product1 = comparison ? getProductById(comparison.product1Id) : undefined;
  const product2 = comparison ? getProductById(comparison.product2Id) : undefined;

  useEffect(() => {
    if (comparison) {
      updateDocumentMeta({
        title: `${comparison.title} | SilkierStrands`,
        description: `${comparison.subtitle}. ${comparison.verdict.substring(0, 150)}`,
        canonical: `https://silkierstrands.com/comparison/${comparison.slug}`,
        ogType: "article",
      });
    }
  }, [comparison]);

  if (!comparison || !product1 || !product2) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl" style={{ color: "#2C2C2C" }}>Comparison Not Found</h1>
          <Link href="/comparisons"><button className="btn-primary mt-6 rounded-sm px-6 py-3">All Comparisons</button></Link>
        </div>
      </SiteLayout>
    );
  }

  const winner = comparison.winnerId === product1.id ? product1 : product2;
  const runnerUp = comparison.winnerId === product1.id ? product2 : product1;

  return (
    <SiteLayout>
      <div className="container py-10 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/"><span className="font-body text-sm cursor-pointer hover:text-red-800" style={{ color: "#B8A99A" }}>Home</span></Link>
          <span style={{ color: "#B8A99A" }}>/</span>
          <Link href="/comparisons"><span className="font-body text-sm cursor-pointer hover:text-red-800" style={{ color: "#B8A99A" }}>Comparisons</span></Link>
          <span style={{ color: "#B8A99A" }}>/</span>
          <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>{comparison.title}</span>
        </div>

        {/* Header */}
        <p className="section-label mb-2">{comparison.category} · Head-to-Head</p>
        <h1 className="font-display font-bold mb-3 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C" }}>
          {comparison.title}
        </h1>
        <p className="font-body text-lg mb-6" style={{ color: "#6C6C6C" }}>{comparison.subtitle}</p>
        <hr className="editorial-rule w-16 mb-10" />

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {[product1, product2].map((product) => {
            const isWinner = product.id === comparison.winnerId;
            return (
              <div key={product.id} className={`rounded-sm overflow-hidden border-2 ${isWinner ? "comparison-winner" : ""}`}
                style={{ borderColor: isWinner ? "#D4822A" : "#E8DDD0" }}>
                {isWinner && (
                  <div className="flex items-center justify-center gap-2 py-2"
                    style={{ backgroundColor: "#D4822A" }}>
                    <Trophy size={14} style={{ color: "white" }} />
                    <span className="font-label font-bold text-xs" style={{ color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Our Winner
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="h-40 flex items-center justify-center mb-4 rounded-sm" style={{ backgroundColor: "#F5EBE0" }}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop`;
                      }}
                    />
                  </div>
                  <p className="section-label text-xs mb-1">{product.brand}</p>
                  <h3 className="font-display font-bold mb-2 leading-snug" style={{ fontSize: "1.1rem", color: "#2C2C2C" }}>
                    {product.name}
                  </h3>
                  <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} />
                  <p className="font-label font-bold mt-3 mb-4" style={{ color: "#8B1A2F", fontSize: "1.3rem" }}>
                    {product.priceDisplay}
                  </p>
                  <div className="space-y-1 mb-4">
                    {product.pros.slice(0, 3).map((pro, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#4CAF50" }} />
                        <span className="font-body text-xs" style={{ color: "#2C2C2C" }}>{pro}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1 mb-5">
                    {product.cons.slice(0, 2).map((con, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#E53935" }} />
                        <span className="font-body text-xs" style={{ color: "#6C6C6C" }}>{con}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={amazonLink(product.asin)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn-amazon rounded-sm w-full flex items-center justify-center gap-2 py-2.5 text-xs"
                  >
                    View on Amazon <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Winner Explanation */}
        <div className="p-6 rounded-sm mb-8" style={{ backgroundColor: "#FFF8F0", border: "2px solid #D4822A" }}>
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={18} style={{ color: "#D4822A" }} />
            <p className="section-label">Why {winner.name} Wins</p>
          </div>
          <p className="font-body leading-relaxed" style={{ color: "#2C2C2C" }}>{comparison.winnerReason}</p>
        </div>

        {/* Full Verdict */}
        <div className="mb-8">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "1.8rem", color: "#2C2C2C" }}>Our Full Verdict</h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: "#2C2C2C" }}>{comparison.verdict}</p>
        </div>

        {/* Bottom CTAs */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t" style={{ borderColor: "#E8DDD0" }}>
          {[winner, runnerUp].map((product, i) => (
            <div key={product.id} className="p-4 rounded-sm border" style={{ borderColor: "#E8DDD0" }}>
              <p className="section-label text-xs mb-1">{i === 0 ? "🏆 Winner" : "Runner-Up"}</p>
              <p className="font-body font-semibold text-sm mb-2" style={{ color: "#2C2C2C" }}>{product.name}</p>
              <p className="font-label font-bold mb-3" style={{ color: "#8B1A2F" }}>{product.priceDisplay}</p>
              <div className="flex gap-2">
                <Link href={`/review/${product.slug}`}>
                  <button className="btn-primary text-xs py-2 px-3 rounded-sm">Review</button>
                </Link>
                <a href={amazonLink(product.asin)} target="_blank" rel="noopener noreferrer nofollow"
                  className="btn-amazon text-xs py-2 px-3 rounded-sm inline-flex items-center gap-1">
                  Amazon <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-xs mt-6" style={{ color: "#B8A99A" }}>
          Published: {new Date(comparison.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · 
          Prices subject to change. Amazon affiliate links — we earn a commission at no extra cost to you.
        </p>
      </div>
    </SiteLayout>
  );
}
