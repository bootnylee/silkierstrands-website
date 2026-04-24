// SilkierStrands.com — Product Card Component
// Design: Refined Magazine Meets Bold Lifestyle

import { Link } from "wouter";
import { ExternalLink, Star } from "lucide-react";
import { type Product, amazonLink } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.round(rating) ? "#D4822A" : "none"}
          stroke={star <= Math.round(rating) ? "#D4822A" : "#B8A99A"}
        />
      ))}
      <span className="font-body text-xs ml-1" style={{ color: "#8C8C8C" }}>
        {rating.toFixed(1)} ({product_review_count_format(0)})
      </span>
    </div>
  );
}

function product_review_count_format(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function StarRatingDisplay({ rating, reviewCount, size = 14 }: { rating: number; reviewCount: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.round(rating) ? "#D4822A" : "none"}
          stroke={star <= Math.round(rating) ? "#D4822A" : "#B8A99A"}
        />
      ))}
      <span className="font-body text-xs ml-1" style={{ color: "#8C8C8C" }}>
        {rating.toFixed(1)} ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount})
      </span>
    </div>
  );
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "compact") {
    return (
      <div className="product-card flex gap-4 p-4 rounded-sm">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-50 rounded-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="section-label text-xs mb-1">{product.brand}</p>
          <Link href={`/review/${product.slug}`}>
            <h3 className="font-display font-semibold leading-tight mb-1 hover:text-red-800 transition-colors cursor-pointer"
              style={{ fontSize: "1rem", color: "#2C2C2C" }}>
              {product.name}
            </h3>
          </Link>
          <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} size={12} />
          <div className="flex items-center justify-between mt-2">
            <span className="font-label font-bold" style={{ color: "#8B1A2F", fontSize: "0.9rem" }}>
              {product.priceDisplay}
            </span>
            <a
              href={amazonLink(product.asin)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-amazon text-xs py-1.5 px-3 rounded-sm inline-flex items-center gap-1"
            >
              Amazon <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="product-card rounded-sm overflow-hidden group">
        <div className="relative overflow-hidden" style={{ height: "220px", backgroundColor: "#F5EBE0" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop`;
            }}
          />
          {product.editorPick && (
            <div className="absolute top-3 left-3">
              <span className="editor-pick-badge text-xs px-2 py-1">Editor's Pick</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="section-label text-xs mb-1">{product.brand}</p>
          <Link href={`/review/${product.slug}`}>
            <h3 className="font-display font-semibold mb-2 hover:text-red-800 transition-colors cursor-pointer leading-snug"
              style={{ fontSize: "1.1rem", color: "#2C2C2C" }}>
              {product.name}
            </h3>
          </Link>
          <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} />
          <p className="font-body text-sm mt-2 line-clamp-2 leading-relaxed" style={{ color: "#6C6C6C" }}>
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#F0E8DE" }}>
            <div>
              <span className="font-label font-bold" style={{ color: "#8B1A2F", fontSize: "1.1rem" }}>
                {product.priceDisplay}
              </span>
              <p className="font-body text-xs mt-0.5" style={{ color: "#B8A99A" }}>on Amazon</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/review/${product.slug}`}>
                <button className="btn-primary text-xs py-2 px-3 rounded-sm">
                  Read Review
                </button>
              </Link>
              <a
                href={amazonLink(product.asin)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-amazon text-xs py-2 px-3 rounded-sm inline-flex items-center gap-1"
              >
                Buy <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div className="product-card rounded-sm overflow-hidden group">
      <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#F5EBE0" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop`;
          }}
        />
        {product.editorPick && (
          <div className="absolute top-2 left-2">
            <span className="editor-pick-badge text-xs px-2 py-0.5">Editor's Pick</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="section-label text-xs mb-1">{product.brand}</p>
        <Link href={`/review/${product.slug}`}>
          <h3 className="font-display font-semibold mb-1 hover:text-red-800 transition-colors cursor-pointer leading-snug"
            style={{ fontSize: "1rem", color: "#2C2C2C" }}>
            {product.name}
          </h3>
        </Link>
        <StarRatingDisplay rating={product.rating} reviewCount={product.reviewCount} size={12} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#F0E8DE" }}>
          <span className="font-label font-bold" style={{ color: "#8B1A2F", fontSize: "1rem" }}>
            {product.priceDisplay}
          </span>
          <a
            href={amazonLink(product.asin)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-amazon text-xs py-1.5 px-3 rounded-sm inline-flex items-center gap-1"
          >
            View on Amazon <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}
