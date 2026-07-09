// SilkierStrands.com — Author Page (/author/:slug)
// Displays pen-name author bio, role, and links to their reviews.
// Photo placeholder shown until a real image is provided.

import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, PenLine } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import { updateDocumentMeta, injectStructuredData, buildPersonSchema } from "@/lib/seo";
import { getAuthorBySlug, getAuthorForProduct } from "@/lib/authors";
import { allProducts } from "@/lib/products";

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>();
  const author = getAuthorBySlug(slug ?? "");

  // Collect all products attributed to this author
  const authoredProducts = author
    ? allProducts.filter(p => getAuthorForProduct(p.slug).id === author.id)
    : [];

  useEffect(() => {
    if (!author) return;
    const title = `${author.name}, ${author.role} | SilkierStrands`;
    updateDocumentMeta({
      title,
      description: author.shortBio,
      canonical: author.url,
      ogType: "profile",
    });
    injectStructuredData(
      buildPersonSchema({
        name: author.name,
        jobTitle: author.role,
        url: author.url,
        description: author.bio,
      }),
      "schema-author"
    );
  }, [author]);

  if (!author) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl" style={{ color: "#2C2C2C" }}>Author Not Found</h1>
          <Link href="/"><button className="btn-primary mt-6 rounded-sm px-6 py-3">Back to Home</button></Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* ── Author Hero ── */}
      <section className="py-14 border-b" style={{ backgroundColor: "#FDF6EE", borderColor: "#E8DDD0" }}>
        <div className="container max-w-3xl">
          <Link href="/">
            <button
              className="flex items-center gap-2 font-label text-xs mb-8 hover:opacity-70 transition-opacity"
              style={{ color: "#8B1A2F", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <ArrowLeft size={13} /> Home
            </button>
          </Link>

          <div className="flex items-start gap-8">
            {/* Photo — shows placeholder icon until a real imageUrl is set in authors.ts */}
            <div
              className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#E8DDD0", border: "3px solid #D4822A" }}
              aria-label={`${author.name} photo`}
            >
              {author.imageUrl ? (
                <img
                  src={author.imageUrl}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PenLine size={32} style={{ color: "#8B1A2F" }} />
              )}
            </div>

            <div className="flex-1">
              <p className="section-label mb-1">SilkierStrands Editorial Team</p>
              <h1
                className="font-display font-bold mb-1 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#2C2C2C" }}
              >
                {author.name}
              </h1>
              <p
                className="font-label text-sm font-semibold mb-5"
                style={{ color: "#D4822A", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {author.role}
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#3D2B1F", fontSize: "1rem" }}>
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews by this author ── */}
      {authoredProducts.length > 0 && (
        <section className="py-14">
          <div className="container">
            <p className="section-label mb-2">Reviews by {author.name.split(" ")[0]}</p>
            <h2
              className="font-display font-bold mb-8"
              style={{ fontSize: "1.8rem", color: "#2C2C2C" }}
            >
              {authoredProducts.length} Product{authoredProducts.length !== 1 ? "s" : ""} Reviewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {authoredProducts.map(p => (
                <ProductCard key={p.id} product={p} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
