// SilkierStrands.com — User Review System
// ─────────────────────────────────────────────────────────────────────────────
// FEATURE FLAG: USER_REVIEWS_ENABLED
//
// Set this to `true` to activate the user-review UI and AggregateRating schema.
// While `false` (default), no review form or user-review section is rendered,
// and AggregateRating is never emitted in structured data.
//
// HOW TO ENABLE (see full instructions in ENABLE_USER_REVIEWS.md):
//   1. Change USER_REVIEWS_ENABLED to `true` below.
//   2. Run `pnpm build` and deploy.
//
// ─────────────────────────────────────────────────────────────────────────────
export const USER_REVIEWS_ENABLED = false;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UserReview {
  id: string;
  productSlug: string;
  reviewerName: string;
  rating: number;          // 1–5 integer
  reviewText: string;
  submittedAt: string;     // ISO 8601
  approved: boolean;       // false until manually approved via moderation
}

// ─── Storage key ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "silkierstrands_user_reviews";

// ─── Read / Write helpers ─────────────────────────────────────────────────────

function readAll(): UserReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserReview[]) : [];
  } catch {
    return [];
  }
}

function writeAll(reviews: UserReview[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {}
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Submit a new user review. It is stored with `approved: false` until moderated. */
export function submitUserReview(
  productSlug: string,
  reviewerName: string,
  rating: number,
  reviewText: string
): UserReview {
  const review: UserReview = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productSlug,
    reviewerName: reviewerName.trim().substring(0, 80),
    rating: Math.min(5, Math.max(1, Math.round(rating))),
    reviewText: reviewText.trim().substring(0, 1000),
    submittedAt: new Date().toISOString(),
    approved: false,
  };
  const all = readAll();
  writeAll([...all, review]);
  return review;
}

/** Return all approved reviews for a given product slug. */
export function getApprovedReviews(productSlug: string): UserReview[] {
  return readAll().filter(r => r.productSlug === productSlug && r.approved);
}

/** Return all reviews (approved + pending) — used by the moderation panel. */
export function getAllReviews(): UserReview[] {
  return readAll();
}

/** Approve a review by id. */
export function approveReview(id: string): void {
  const all = readAll();
  writeAll(all.map(r => r.id === id ? { ...r, approved: true } : r));
}

/** Delete a review by id. */
export function deleteReview(id: string): void {
  writeAll(readAll().filter(r => r.id !== id));
}

/** Compute AggregateRating from approved reviews. Returns null if < 3 reviews. */
export function computeAggregateRating(
  productSlug: string
): { ratingValue: number; reviewCount: number } | null {
  const approved = getApprovedReviews(productSlug);
  if (approved.length < 3) return null;  // require at least 3 genuine reviews
  const avg = approved.reduce((sum, r) => sum + r.rating, 0) / approved.length;
  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: approved.length,
  };
}

/** Check whether a user has already submitted a review for this product (rate-limit). */
export function hasAlreadyReviewed(productSlug: string): boolean {
  return readAll().some(r => r.productSlug === productSlug);
}
