// SilkierStrands.com - Product Review Page

import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { ExternalLink, ArrowLeft, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { QUIZ_RESULT_KEY } from "./HairQuiz";
import SiteLayout from "@/components/SiteLayout";
import { StarRatingDisplay } from "@/components/ProductCard";
import { allProducts, amazonLink, getProductsByCategory, getComparisonsForProduct } from "@/lib/products";
import { updateDocumentMeta, buildReviewSchema, injectStructuredData } from "@/lib/seo";
import { FreshCatalogPrice, VerifiedAmazonCta, catalogIsFresh } from "@/components/ProductCommerce";
import { commerceFaqSchema, commerceItemListSchema, editorialProductSchema } from "@/lib/commerceSeo";
import { getAuthorForProduct } from "@/lib/authors";
import UserReviewSection from "@/components/UserReviewSection";
import { USER_REVIEWS_ENABLED, computeAggregateRating } from "@/lib/userReviews";
import ProductCard from "@/components/ProductCard";
import { trackAffiliateClick } from "@/lib/analytics";

// ─── Recently Viewed Key ────────────────────────────────────────────────────
export const RECENTLY_VIEWED_KEY = "silkierstrands_recently_viewed";
const MAX_RECENTLY_VIEWED = 4;

/** Record a product slug as recently viewed (keeps the last MAX_RECENTLY_VIEWED unique slugs). */
export function trackRecentlyViewed(slug: string) {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    const updated = [slug, ...existing.filter(s => s !== slug)].slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  } catch {}
}

// ─── Quiz Prompt Banner ──────────────────────────────────────────────────────
function QuizPromptBanner() {
  const [hasResult, setHasResult] = useState(false);
  const [hairTypeName, setHairTypeName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(QUIZ_RESULT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const names: Record<string, string> = {
          fine: "Fine Hair", thick: "Thick Hair", curly: "Curly Hair",
          coarse: "Coarse Hair", dry: "Dry Hair", normal: "Normal Hair",
          "color-treated": "Color-Treated Hair"
        };
        setHairTypeName(names[data.primary] || "");
        setHasResult(true);
      } catch {}
    }
  }, []);

  return (
    <div
      className="mt-14 rounded-xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
      style={{ background: "linear-gradient(135deg, #2C1810 0%, #8B1A2F 100%)", border: "1px solid #8B1A2F44" }}
    >
      <div className="flex items-start gap-4">
        <Sparkles size={28} style={{ color: "#D4822A", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p className="font-display font-bold text-lg leading-tight" style={{ color: "#FDF6EE" }}>
            {hasResult && hairTypeName
              ? `Not sure this is right for your ${hairTypeName}?`
              : "Not sure this product is right for your hair?"}
          </p>
          <p className="font-body text-sm mt-1" style={{ color: "rgba(253,246,238,0.7)" }}>
            {hasResult
              ? "Retake the quiz to refresh your personalized recommendations."
              : "Take our 2-minute quiz to get personalized product recommendations for your exact hair type."}
          </p>
        </div>
      </div>
      <Link href="/hair-quiz">
        <button
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: "#D4822A", color: "#FDF6EE" }}
        >
          {hasResult ? <><Sparkles size={14} /> Retake Quiz</> : <><Sparkles size={14} /> Take the Hair Quiz</>}
        </button>
      </Link>
    </div>
  );
}

export default function ProductReview() {
  const { slug } = useParams<{ slug: string }>();
  const product = allProducts.find(p => p.slug === slug);
  const [savedHairType, setSavedHairType] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(QUIZ_RESULT_KEY);
    if (saved) {
      try { setSavedHairType(JSON.parse(saved).primary || null); } catch {}
    }
  }, []);

  // Build related products: prioritize those matching the user's saved hair type
  const relatedProducts = (() => {
    if (!product) return [];
    const sameCategory = getProductsByCategory(product.categorySlug).filter(p => p.id !== product.id);
    if (savedHairType) {
      const hairTypeMatches = sameCategory.filter(p =>
        Array.isArray(p.hairTypes) && p.hairTypes.includes(savedHairType)
      );
      const rest = sameCategory.filter(p =>
        !(Array.isArray(p.hairTypes) && p.hairTypes.includes(savedHairType))
      );
      return [...hairTypeMatches, ...rest].slice(0, 3);
    }
    return sameCategory.slice(0, 3);
  })();

  const relatedLabel = savedHairType && relatedProducts.some(p =>
    Array.isArray(p.hairTypes) && p.hairTypes.includes(savedHairType)
  ) ? `Recommended for ${savedHairType.charAt(0).toUpperCase() + savedHairType.slice(1).replace("-", "-").replace("treated", "Treated")} Hair` : null;

  // Track this product as recently viewed
  useEffect(() => {
    if (product) trackRecentlyViewed(product.slug);
  }, [product]);

  // Resolve named author for this product
  const author = product ? getAuthorForProduct(product.slug) : null;

  useEffect(() => {
    if (product) {
      // Priority 5: long-tail title targeting hair-type + product + concern
      const htLabel = product.hairTypes && product.hairTypes.length > 0
        ? ` for ${product.hairTypes[0].replace('-', '-').replace('color-treated', 'Color-Treated').replace(/^\w/, c => c.toUpperCase())} Hair`
        : '';
      const rawTitle = `${product.name} Review${htLabel}`;
      const title = rawTitle.length <= 55 ? `${rawTitle} | SilkierStrands` : `${product.name} Review | SilkierStrands`;
      const desc = `${product.shortDescription} Expert-tested for ${product.category.toLowerCase()}. Pros, cons, and our verdict.`.substring(0, 155);
      updateDocumentMeta({
        title,
        description: desc,
        keywords: `${product.name} review, ${product.brand}, ${product.category}${product.hairTypes ? ', ' + product.hairTypes.join(', ') + ' hair' : ''}`,
        canonical: `https://silkierstrands.com/review/${product.slug}`,
        ogImage: product.imageUrl,
        ogType: "article",
      });

      const resolvedAuthor = getAuthorForProduct(product.slug);

      // Product/Review schema uses editorial review data. It deliberately omits
      // AggregateRating unless the approved-user-review feature provides it.
      const productSchema = {
        "@context": "https://schema.org",
        ...editorialProductSchema(product, resolvedAuthor),
      };

      const reviewSchema = {
        ...buildReviewSchema({
          productName: product.name,
          reviewBody: product.fullReview.substring(0, 500),
          rating: product.rating,
          datePublished: product.publishDate,
        }),
        author: {
          "@type": "Person",
          name: resolvedAuthor.name,
          jobTitle: resolvedAuthor.role,
          url: resolvedAuthor.url,
        },
      };

      injectStructuredData({
        "@context": "https://schema.org", "@type": "Article", headline: `${product.name} Review`,
        description: desc, datePublished: product.publishDate, dateModified: product.publishDate,
        author: { "@type": "Person", name: resolvedAuthor.name, url: resolvedAuthor.url },
        publisher: { "@type": "Organization", name: "SilkierStrands", url: "https://silkierstrands.com" },
        mainEntityOfPage: `https://silkierstrands.com/review/${product.slug}`,
      }, "article-schema");
      injectStructuredData({
        "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://silkierstrands.com/" },
          { "@type": "ListItem", position: 2, name: product.category, item: `https://silkierstrands.com/category/${product.categorySlug}` },
          { "@type": "ListItem", position: 3, name: product.name, item: `https://silkierstrands.com/review/${product.slug}` },
        ],
      }, "breadcrumb-schema");
      injectStructuredData(productSchema, "product-schema");
      injectStructuredData(reviewSchema, "review-schema");
      injectStructuredData(commerceItemListSchema([product], resolvedAuthor), "product-itemlist-schema");
      injectStructuredData(commerceFaqSchema(product, `https://silkierstrands.com/review/${product.slug}`), "product-faq-schema");

      // AggregateRating: only injected when feature flag is ON and ≥3 genuine reviews exist.
      // Never fabricated. Computed strictly from approved user submissions.
      if (USER_REVIEWS_ENABLED) {
        const agg = computeAggregateRating(product.slug);
        if (agg) {
          const aggSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: agg.ratingValue,
              reviewCount: agg.reviewCount,
              bestRating: 5,
              worstRating: 1,
            },
          };
          injectStructuredData(aggSchema, "aggregate-rating-schema");
        }
      }
    }
  }, [product]);

  if (!product) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl" style={{ color: "#2C2C2C" }}>Review Not Found</h1>
          <Link href="/reviews"><button className="btn-primary mt-6 rounded-sm px-6 py-3">Browse All Reviews</button></Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container py-10 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/"><span className="font-body text-sm cursor-pointer hover:text-red-800" style={{ color: "#B8A99A" }}>Home</span></Link>
          <span style={{ color: "#B8A99A" }}>/</span>
          <Link href={`/category/${product.categorySlug}`}><span className="font-body text-sm cursor-pointer hover:text-red-800" style={{ color: "#B8A99A" }}>{product.category}</span></Link>
          <span style={{ color: "#B8A99A" }}>/</span>
          <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Product Info */}
          <div className="lg:col-span-1">
            {/* Product Image */}
            <div className="rounded-sm overflow-hidden mb-4" style={{ backgroundColor: "#F5EBE0", height: "280px" }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop`;
                }}
              />
            </div>

            {/* Price & Buy */}
            <div className="p-5 rounded-sm border" style={{ borderColor: "#E8DDD0", backgroundColor: "white" }}>
              {product.editorPick && (
                <div className="mb-3">
                  <span className="editor-pick-badge text-xs px-3 py-1">Editor's Pick</span>
                </div>
              )}
              <div className="mb-3"><FreshCatalogPrice product={product} className="text-2xl" />{(!catalogIsFresh() || Number(product.price) <= 0) && <p className="font-body text-xs" style={{ color: "#B8A99A" }}>Current price unavailable</p>}</div>
              <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} size={16} />
              <VerifiedAmazonCta product={product} label="Check Price on Amazon" className="w-full mt-4" />
              <p className="font-body text-xs text-center mt-2" style={{ color: "#B8A99A" }}>
                Affiliate link - we earn a commission at no extra cost to you
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="mt-6">
              <h3 className="font-display font-bold mb-4" style={{ fontSize: "1.3rem", color: "#2C2C2C" }}>Pros & Cons</h3>
              <div className="space-y-2 mb-4">
                {product.pros.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#4CAF50" }} />
                    <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>{pro}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {product.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#E53935" }} />
                    <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>{con}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div className="mt-6 p-4 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
              <p className="section-label text-xs mb-2">Best For</p>
              <p className="font-body text-sm" style={{ color: "#2C2C2C" }}>{product.bestFor}</p>
            </div>
          </div>

          {/* Right: Review Content */}
          <div className="lg:col-span-2">
            <p className="section-label mb-2">{product.brand}</p>
            <h1 className="font-display font-bold mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C2C2C" }}>
              {product.name}
            </h1>
            {/* Author byline + last-updated date — named pen-name author */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
              <span className="font-body text-xs" style={{ color: "#6C6C6C" }}>
                By{" "}
                {author ? (
                  <Link href={`/author/${author.slug}`}>
                    <strong className="underline cursor-pointer" style={{ color: "#2C2C2C" }}>{author.name}</strong>
                  </Link>
                ) : (
                  <strong style={{ color: "#2C2C2C" }}>SilkierStrands Editorial Team</strong>
                )}
                {author && (
                  <span style={{ color: "#B8A99A" }}>, {author.role}</span>
                )}
              </span>
              <span style={{ color: "#E8DDD0" }}>|</span>
              <time dateTime={product.publishDate} className="font-body text-xs" style={{ color: "#6C6C6C" }}>
                Last updated {new Date(product.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span style={{ color: "#E8DDD0" }}>|</span>
              <Link href="/how-we-test"><span className="font-body text-xs underline cursor-pointer" style={{ color: "#D4822A" }}>How we test</span></Link>
            </div>
            <hr className="editorial-rule w-16 mb-6" />

            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "#6C6C6C" }}>
              {product.shortDescription}
            </p>

            {/* Full Review */}
            <div className="prose max-w-none">
              {product.fullReview.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-body leading-relaxed mb-5" style={{ color: "#2C2C2C", fontSize: "1rem" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Editor's Note */}
            {product.editorNote ? (
              <div className="my-8 relative" style={{ borderLeft: "4px solid #8B1A2F", paddingLeft: "1.5rem" }}>
                <div
                  className="absolute -top-2 -left-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#8B1A2F" }}
                >
                  <span style={{ color: "#FDF6EE", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em" }}>Ed</span>
                </div>
                <p
                  className="font-label text-xs font-semibold mb-2"
                  style={{ color: "#8B1A2F", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Editor's Note
                </p>
                <blockquote
                  className="font-body italic leading-relaxed"
                  style={{ color: "#3D2B1F", fontSize: "1.05rem", fontStyle: "italic" }}
                >
                  &ldquo;{product.editorNote}&rdquo;
                </blockquote>
                <p className="font-body text-xs mt-2" style={{ color: "#B8A99A" }}>
                  —{" "}
                  {author ? (
                    <Link href={`/author/${author.slug}`}>
                      <span className="underline cursor-pointer">{author.name}</span>
                    </Link>
                  ) : "SilkierStrands Editorial Team"}
                </p>
              </div>
            ) : (
              <blockquote className="pull-quote my-8">
                {product.shortDescription}
              </blockquote>
            )}

            {/* Final Verdict */}
            <div className="p-6 rounded-sm mt-8" style={{ backgroundColor: "#FFF8F0", border: "2px solid #D4822A" }}>
              <p className="section-label mb-2">Our Verdict</p>
              <div className="flex items-center gap-3 mb-3">
                <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} size={20} />
              </div>
              <p className="font-body leading-relaxed" style={{ color: "#2C2C2C" }}>
                {product.shortDescription} Best for: <strong>{product.bestFor}</strong>.
              </p>
              <VerifiedAmazonCta product={product} label="Check Price on Amazon" className="mt-4" />
            </div>

            <p className="font-body text-xs mt-4" style={{ color: "#B8A99A" }}>
              Reviewed by{" "}
              {author ? (
                <Link href={`/author/${author.slug}`}>
                  <span className="underline cursor-pointer">{author.name}</span>
                </Link>
              ) : "SilkierStrands Editorial Team"}
              {" "}·{" "}
              <time dateTime={product.publishDate}>
                Last updated {new Date(product.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>{" "}
              · Prices and availability subject to change. ·{" "}
              <Link href="/how-we-test"><span className="underline cursor-pointer" style={{ color: "#D4822A" }}>How we test</span></Link>
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-10 border-t" style={{ borderColor: "#E8DDD0" }}>
            <p className="section-label mb-2">
              {relatedLabel ? "Personalized for You" : `More in ${product.category}`}
            </p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "1.8rem", color: "#2C2C2C" }}>
              {relatedLabel ?? "Related Reviews"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} variant="default" />)}
            </div>
          </section>
        )}

        {/* Priority 5: Internal links — comparisons featuring this product + hair-type pages */}
        {(() => {
          const productComparisons = getComparisonsForProduct(product.id);
          const hairTypeLinks = product.hairTypes && product.hairTypes.length > 0
            ? product.hairTypes.slice(0, 3)
            : [];
          if (productComparisons.length === 0 && hairTypeLinks.length === 0) return null;
          return (
            <section className="mt-10 pt-8 border-t" style={{ borderColor: "#E8DDD0" }}>
              <div className="flex flex-wrap gap-8">
                {productComparisons.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="section-label text-xs mb-3">Head-to-Head Comparisons</p>
                    <ul className="space-y-2">
                      {productComparisons.map(c => (
                        <li key={c.id}>
                          <Link href={`/comparison/${c.slug}`}>
                            <span className="font-body text-sm underline cursor-pointer" style={{ color: "#8B1A2F" }}>
                              {c.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hairTypeLinks.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="section-label text-xs mb-3">Best For Hair Type</p>
                    <ul className="space-y-2">
                      {hairTypeLinks.map(ht => (
                        <li key={ht}>
                          <Link href={`/hair-type/${ht}`}>
                            <span className="font-body text-sm underline cursor-pointer" style={{ color: "#8B1A2F" }}>
                              Best products for {ht.replace('-', '-').replace('color-treated', 'color-treated').replace(/^\w/, c => c.toUpperCase())} hair
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          );
        })()}
        {/* User Reviews — dormant until USER_REVIEWS_ENABLED = true in lib/userReviews.ts */}
        <UserReviewSection productSlug={product.slug} />

        {/* Quiz CTA */}
        <QuizPromptBanner />
      </div>
    </SiteLayout>
  );
}
