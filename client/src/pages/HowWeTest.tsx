// SilkierStrands.com — How We Test Page
// Priority 4: E-E-A-T — methodology transparency page linked from every review
import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, FlaskConical, Star, Clock, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { updateDocumentMeta, injectStructuredData } from "@/lib/seo";

export default function HowWeTest() {
  useEffect(() => {
    updateDocumentMeta({
      title: "How We Test Hair Products | SilkierStrands",
      description: "Learn how SilkierStrands tests and reviews hair products. Our hands-on methodology covers shampoos, conditioners, masks, serums, and styling tools across all hair types.",
      canonical: "https://silkierstrands.com/how-we-test",
    });
    injectStructuredData({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How We Test Hair Products",
      description: "Learn how SilkierStrands tests and reviews hair products across all hair types.",
      author: {
        "@type": "Organization",
        name: "SilkierStrands Editorial Team",
        url: "https://silkierstrands.com",
      },
      publisher: {
        "@type": "Organization",
        name: "SilkierStrands",
        url: "https://silkierstrands.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://silkierstrands.com/how-we-test",
      },
    }, "how-we-test-schema");
  }, []);

  return (
    <SiteLayout>
      <div className="container py-16 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/"><span className="font-body text-sm cursor-pointer hover:text-red-800" style={{ color: "#B8A99A" }}>Home</span></Link>
          <span style={{ color: "#B8A99A" }}>/</span>
          <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>How We Test</span>
        </div>

        <p className="section-label mb-2">Our Methodology</p>
        <h1 className="font-display font-bold mb-6 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C" }}>
          How We Test Hair Products
        </h1>
        <hr className="editorial-rule w-16 mb-8" />

        <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "#2C2C2C" }}>
          Every review on SilkierStrands is the result of hands-on testing — not press releases, not manufacturer claims. Here is exactly how we evaluate every product before we publish a verdict.
        </p>

        {/* Testing Process */}
        <section className="mb-12">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: "1.6rem", color: "#2C2C2C" }}>
            Our Testing Process
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4 p-5 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
              <Clock size={24} style={{ color: "#D4822A", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h3 className="font-body font-semibold mb-2" style={{ color: "#2C2C2C" }}>Minimum Two-Week Testing Window</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#6C6C6C" }}>
                  We test every product for a minimum of two weeks of consistent use before writing a verdict. For shampoos and conditioners, that means at least six to eight wash cycles. For styling tools, it means daily use across multiple styling sessions. Short-term impressions are noted but never drive our final rating.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
              <Users size={24} style={{ color: "#D4822A", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h3 className="font-body font-semibold mb-2" style={{ color: "#2C2C2C" }}>Tested Across Seven Hair Types</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#6C6C6C" }}>
                  We evaluate products across the seven hair types we cover: fine, thick, curly, coarse, dry, normal, and color-treated. Each review specifies which hair types were included in testing. Our hair-type ratings reflect real performance differences — a product that excels on fine hair may underperform on coarse hair, and we say so.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
              <FlaskConical size={24} style={{ color: "#D4822A", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h3 className="font-body font-semibold mb-2" style={{ color: "#2C2C2C" }}>Six Evaluation Criteria</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#6C6C6C" }}>
                  Every product is scored on six criteria: performance (does it do what it claims?), ingredient quality, value for money, sensory experience (scent, texture, application), ease of use, and hair-type suitability. Our star ratings (1–5) reflect the weighted aggregate of these scores, with performance weighted most heavily.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
              <Star size={24} style={{ color: "#D4822A", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h3 className="font-body font-semibold mb-2" style={{ color: "#2C2C2C" }}>Head-to-Head Comparisons Are Simultaneous</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#6C6C6C" }}>
                  For our vs. comparison articles, both products are tested simultaneously on the same hair type over the same two-week period. This eliminates seasonal variation, hair condition changes, and other confounding factors. The winner is determined by overall performance across the six criteria — not by price alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rating Scale */}
        <section className="mb-12">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: "1.6rem", color: "#2C2C2C" }}>
            Our Rating Scale
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F5EBE0" }}>
                  <th className="text-left p-3 font-semibold" style={{ color: "#2C2C2C", border: "1px solid #E8DDD0" }}>Rating</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "#2C2C2C", border: "1px solid #E8DDD0" }}>What It Means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5.0 ★★★★★", "Exceptional — best in class, worth every penny, we'd buy it with our own money"],
                  ["4.5 ★★★★½", "Excellent — minor flaws only, strong recommendation for the right hair type"],
                  ["4.0 ★★★★", "Very good — solid performer with some trade-offs worth knowing about"],
                  ["3.5 ★★★½", "Good — works as advertised but better options exist at this price"],
                  ["3.0 ★★★", "Average — not bad, but not a standout; situational recommendation only"],
                  ["Below 3.0", "Below average — we do not recommend; included for comparison context only"],
                ].map(([rating, meaning], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FFF8F0" }}>
                    <td className="p-3 font-semibold" style={{ color: "#D4822A", border: "1px solid #E8DDD0", whiteSpace: "nowrap" }}>{rating}</td>
                    <td className="p-3" style={{ color: "#2C2C2C", border: "1px solid #E8DDD0" }}>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs mt-3" style={{ color: "#B8A99A" }}>
            Our ratings are editorial verdicts only. They do not incorporate Amazon customer review counts or star averages.
          </p>
        </section>

        {/* What We Don't Do */}
        <section className="mb-12">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: "1.6rem", color: "#2C2C2C" }}>
            What We Don't Do
          </h2>
          <div className="space-y-3">
            {[
              "We do not accept free products in exchange for positive reviews.",
              "We do not let affiliate commission rates influence our ratings or recommendations.",
              "We do not publish reviews based on press materials alone — hands-on testing is required.",
              "We do not fabricate user review counts or aggregate ratings. Our star ratings are editorial only.",
              "We do not recommend products we would not use ourselves.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={16} style={{ color: "#4A7C59", flexShrink: 0, marginTop: "3px" }} />
                <p className="font-body text-sm leading-relaxed" style={{ color: "#2C2C2C" }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="mb-12 p-6 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "1.4rem", color: "#2C2C2C" }}>
            Affiliate Disclosure
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#2C2C2C" }}>
            SilkierStrands participates in the Amazon Services LLC Associates Program (affiliate tag: <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "#F5EBE0" }}>silkierstrands-20</code>). When you click an Amazon link and make a purchase, we may earn a small commission at no additional cost to you. This never influences our ratings or which products we recommend — our editorial independence is non-negotiable.
          </p>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link href="/reviews">
            <button className="btn-primary rounded-sm px-6 py-3">Browse All Reviews</button>
          </Link>
          <Link href="/about">
            <button className="rounded-sm px-6 py-3 font-body font-semibold text-sm" style={{ border: "1px solid #D4822A", color: "#D4822A", background: "transparent" }}>
              About SilkierStrands
            </button>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
