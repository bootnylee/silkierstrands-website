// SilkierStrands.com — UserReviewSection
// ─────────────────────────────────────────────────────────────────────────────
// Renders ONLY when USER_REVIEWS_ENABLED === true (feature flag).
// When the flag is false, this component renders nothing — it is imported but
// silently dormant. No UI is shown to visitors until the flag is turned on.
//
// Sections:
//   1. Approved user reviews display
//   2. Submission form (name, 1–5 star rating, review text)
//   3. Hidden moderation panel (accessible at ?moderate=1 in the URL)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Star, CheckCircle, AlertCircle, Trash2, ThumbsUp } from "lucide-react";
import {
  USER_REVIEWS_ENABLED,
  UserReview,
  submitUserReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
  hasAlreadyReviewed,
} from "@/lib/userReviews";

// ─── Star picker sub-component ────────────────────────────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} star${n !== 1 ? "s" : ""}`}
          style={{ background: "none", border: "none", padding: "2px", cursor: "pointer" }}
        >
          <Star
            size={24}
            fill={(hovered || value) >= n ? "#D4822A" : "none"}
            style={{ color: "#D4822A", transition: "fill 0.1s" }}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="font-body text-sm ml-2" style={{ color: "#6C6C6C" }}>
          {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][value]}
        </span>
      )}
    </div>
  );
}

// ─── Single review display ────────────────────────────────────────────────────

function ReviewCard({ review }: { review: UserReview }) {
  return (
    <div
      className="p-5 rounded-sm border"
      style={{ borderColor: "#E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            size={14}
            fill={review.rating >= n ? "#D4822A" : "none"}
            style={{ color: "#D4822A" }}
          />
        ))}
        <span className="font-body font-semibold text-sm ml-1" style={{ color: "#2C2C2C" }}>
          {review.reviewerName}
        </span>
        <span className="font-body text-xs ml-auto" style={{ color: "#B8A99A" }}>
          {new Date(review.submittedAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
          })}
        </span>
      </div>
      <p className="font-body text-sm leading-relaxed" style={{ color: "#3D2B1F" }}>
        {review.reviewText}
      </p>
    </div>
  );
}

// ─── Moderation panel (hidden — URL param ?moderate=1) ────────────────────────

function ModerationPanel({ productSlug }: { productSlug: string }) {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setReviews(getAllReviews().filter(r => r.productSlug === productSlug));
  }, [productSlug, refreshKey]);

  if (reviews.length === 0) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}>
        <p className="font-body text-sm" style={{ color: "#6C6C6C" }}>No reviews submitted for this product yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map(r => (
        <div
          key={r.id}
          className="p-4 rounded-sm border flex items-start gap-4"
          style={{
            borderColor: r.approved ? "#4CAF50" : "#E8DDD0",
            backgroundColor: r.approved ? "#F0FFF0" : "white",
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-body font-semibold text-sm" style={{ color: "#2C2C2C" }}>
                {r.reviewerName}
              </span>
              <span className="font-body text-xs" style={{ color: "#B8A99A" }}>
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </span>
              <span
                className="font-label text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: r.approved ? "#4CAF50" : "#D4822A",
                  color: "white",
                  letterSpacing: "0.05em",
                }}
              >
                {r.approved ? "Approved" : "Pending"}
              </span>
            </div>
            <p className="font-body text-sm" style={{ color: "#3D2B1F" }}>{r.reviewText}</p>
            <p className="font-body text-xs mt-1" style={{ color: "#B8A99A" }}>
              {new Date(r.submittedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            {!r.approved && (
              <button
                onClick={() => { approveReview(r.id); setRefreshKey(k => k + 1); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold"
                style={{ backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
              >
                <ThumbsUp size={12} /> Approve
              </button>
            )}
            <button
              onClick={() => { deleteReview(r.id); setRefreshKey(k => k + 1); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold"
              style={{ backgroundColor: "#E53935", color: "white", border: "none", cursor: "pointer" }}
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface UserReviewSectionProps {
  productSlug: string;
}

export default function UserReviewSection({ productSlug }: UserReviewSectionProps) {
  // Feature flag guard — renders nothing when flag is off
  if (!USER_REVIEWS_ENABLED) return null;

  return <UserReviewSectionInner productSlug={productSlug} />;
}

function UserReviewSectionInner({ productSlug }: UserReviewSectionProps) {
  const [approvedReviews, setApprovedReviews] = useState<UserReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Refresh key to re-read localStorage after submit/approve/delete
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setApprovedReviews(getApprovedReviews(productSlug));
    setAlreadyReviewed(hasAlreadyReviewed(productSlug));
    // Moderation panel: visible only when ?moderate=1 is in the URL
    setIsModerator(new URLSearchParams(window.location.search).get("moderate") === "1");
  }, [productSlug, refreshKey]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (rating < 1) { setError("Please select a star rating."); return; }
    if (text.trim().length < 20) { setError("Please write at least 20 characters."); return; }
    setSubmitting(true);
    try {
      submitUserReview(productSlug, name, rating, text);
      setSubmitted(true);
      setShowForm(false);
      setRefreshKey(k => k + 1);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-14 pt-10 border-t" style={{ borderColor: "#E8DDD0" }}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label mb-1">Community</p>
          <h2 className="font-display font-bold" style={{ fontSize: "1.6rem", color: "#2C2C2C" }}>
            Reader Reviews
            {approvedReviews.length > 0 && (
              <span className="font-body text-base font-normal ml-2" style={{ color: "#6C6C6C" }}>
                ({approvedReviews.length})
              </span>
            )}
          </h2>
        </div>
        {!alreadyReviewed && !submitted && (
          <button
            onClick={() => setShowForm(f => !f)}
            className="px-5 py-2.5 rounded-sm font-body font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE", border: "none", cursor: "pointer" }}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {/* Thank-you message after submission */}
      {submitted && (
        <div
          className="flex items-start gap-3 p-4 rounded-sm mb-6"
          style={{ backgroundColor: "#F0FFF0", border: "1px solid #4CAF5044" }}
        >
          <CheckCircle size={18} style={{ color: "#4CAF50", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p className="font-body font-semibold text-sm" style={{ color: "#2C6B2F" }}>
              Thank you — your review has been submitted.
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: "#4A3A3A" }}>
              It will appear here once our team has reviewed it, usually within 24–48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Submission form */}
      {showForm && !alreadyReviewed && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-sm mb-8"
          style={{ backgroundColor: "#FFF8F0", border: "1px solid #E8DDD0" }}
        >
          <h3 className="font-display font-bold mb-5" style={{ fontSize: "1.2rem", color: "#2C2C2C" }}>
            Share your experience
          </h3>

          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-sm mb-4"
              style={{ backgroundColor: "#FFF5F5", border: "1px solid #E5393544" }}
            >
              <AlertCircle size={15} style={{ color: "#E53935", flexShrink: 0 }} />
              <p className="font-body text-sm" style={{ color: "#C62828" }}>{error}</p>
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="reviewer-name"
              className="font-label text-xs font-semibold block mb-1.5"
              style={{ color: "#2C2C2C", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Your Name <span style={{ color: "#E53935" }}>*</span>
            </label>
            <input
              id="reviewer-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={80}
              placeholder="e.g. Sarah M."
              className="w-full px-4 py-2.5 rounded-sm font-body text-sm"
              style={{
                border: "1px solid #E8DDD0",
                backgroundColor: "white",
                color: "#2C2C2C",
                outline: "none",
              }}
            />
          </div>

          {/* Star rating */}
          <div className="mb-4">
            <p
              className="font-label text-xs font-semibold mb-1.5"
              style={{ color: "#2C2C2C", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Rating <span style={{ color: "#E53935" }}>*</span>
            </p>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          {/* Review text */}
          <div className="mb-5">
            <label
              htmlFor="review-text"
              className="font-label text-xs font-semibold block mb-1.5"
              style={{ color: "#2C2C2C", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Your Review <span style={{ color: "#E53935" }}>*</span>
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="What did you think of this product? What hair type do you have?"
              className="w-full px-4 py-2.5 rounded-sm font-body text-sm resize-y"
              style={{
                border: "1px solid #E8DDD0",
                backgroundColor: "white",
                color: "#2C2C2C",
                outline: "none",
                minHeight: "100px",
              }}
            />
            <p className="font-body text-xs mt-1" style={{ color: "#B8A99A" }}>
              {text.length}/1000 characters
            </p>
          </div>

          <p className="font-body text-xs mb-4" style={{ color: "#B8A99A" }}>
            Reviews are moderated before publication. We do not accept sponsored or incentivised reviews.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-sm font-body font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE", border: "none", cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      )}

      {/* Already reviewed notice */}
      {alreadyReviewed && !submitted && (
        <p className="font-body text-sm mb-6" style={{ color: "#6C6C6C" }}>
          You have already submitted a review for this product. Thank you!
        </p>
      )}

      {/* Approved reviews list */}
      {approvedReviews.length > 0 ? (
        <div className="space-y-4">
          {approvedReviews.map(r => <ReviewCard key={r.id} review={r} />)}
        </div>
      ) : (
        <div
          className="p-6 rounded-sm text-center"
          style={{ backgroundColor: "#FDF6EE", border: "1px dashed #E8DDD0" }}
        >
          <p className="font-body text-sm" style={{ color: "#6C6C6C" }}>
            No reader reviews yet — be the first to share your experience.
          </p>
        </div>
      )}

      {/* Moderation panel — only visible at ?moderate=1 */}
      {isModerator && (
        <div className="mt-10 pt-8 border-t" style={{ borderColor: "#E8DDD0" }}>
          <p
            className="font-label text-xs font-semibold mb-4"
            style={{ color: "#8B1A2F", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Moderation Panel (visible only at ?moderate=1)
          </p>
          <ModerationPanel productSlug={productSlug} />
        </div>
      )}
    </section>
  );
}
