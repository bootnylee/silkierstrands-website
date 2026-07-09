# How to Enable the User Review Feature

The user-review system is fully built but **dormant** — no form, no display section, and no AggregateRating schema will appear until you follow these steps.

---

## Step 1 — Turn on the feature flag

Open the file:

```
client/src/lib/userReviews.ts
```

Find line 17:

```ts
export const USER_REVIEWS_ENABLED = false;
```

Change it to:

```ts
export const USER_REVIEWS_ENABLED = true;
```

Save the file.

---

## Step 2 — Deploy

Commit and push the change to GitHub. Netlify will automatically rebuild and deploy.

```bash
git add client/src/lib/userReviews.ts
git commit -m "feat: enable user review feature"
git push origin main
```

Once deployed, every product review page will show:

- A **"Write a Review"** button
- A submission form (name, 1–5 star rating, review text)
- A **Reader Reviews** section below the editorial content
- A pending-review notice after submission

---

## Step 3 — Moderate submitted reviews

Reviews are stored in each visitor's browser `localStorage` under the key `silkierstrands_user_reviews`. They are **not** sent to a server.

> **Note:** Because storage is client-side, reviews submitted on one device are only visible on that device. If you later add a backend database, the `submitUserReview`, `getApprovedReviews`, `approveReview`, and `deleteReview` functions in `client/src/lib/userReviews.ts` are the only places you need to change — the UI components will work unchanged.

To moderate reviews on any product page, append `?moderate=1` to the URL, for example:

```
https://silkierstrands.com/review/olaplex-no8-mask-review?moderate=1
```

This reveals the **Moderation Panel** at the bottom of the page. From there you can:

- **Approve** a review (it immediately appears in the public Reader Reviews section)
- **Delete** a review permanently

---

## Step 4 — AggregateRating schema (star snippets in Google)

`AggregateRating` is **only** emitted in structured data when:

1. `USER_REVIEWS_ENABLED` is `true`, AND
2. A product has **3 or more approved reviews**

The rating is computed strictly from genuine approved submissions — never fabricated. This keeps the site compliant with Google's review-snippet guidelines.

---

## Adding a real photo for an author

To replace the pen-name author placeholder icon with a real photo:

1. Upload the photo to `client/public/` (e.g. `client/public/authors/renata-cole.jpg`)
2. Open `client/src/lib/authors.ts`
3. Find the author entry and set `imageUrl`:

```ts
imageUrl: "/authors/renata-cole.jpg",
```

4. Commit and deploy.

---

## Assigning a review to a different author

To change which author is attributed to a product or comparison:

1. Open `client/src/lib/authors.ts`
2. Find the `PRODUCT_AUTHOR_MAP` or `COMPARISON_AUTHOR_MAP` object
3. Change the value for the relevant slug from `"renata-cole"` to `"jamie-lin"` or vice versa
4. Commit and deploy

---

## Adding a new author

1. Add a new entry to the `authors` array in `client/src/lib/authors.ts`
2. Add their slug to `PRODUCT_AUTHOR_MAP` / `COMPARISON_AUTHOR_MAP` entries as needed
3. The `/author/[slug]` page is generated automatically from the data — no new page file needed
4. Add the new author's URL to the prerender script (`scripts/prerender.mjs`) in the `staticPages` block
