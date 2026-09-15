# SilkierStrands Editorial Notebook

## Owner feedback — verbatim

No site-owner feedback has yet been added to this portable pipeline notebook.

## Rejected patterns and reasons

Do not create a product record with an absent or empty `reviewBody` equivalent. The site renders `fullReview` directly in customer-facing review and comparison experiences, so incomplete records can surface literal missing-value text. Do not emit static Amazon ratings, review counts, merchandising badges, fake testing statements, or unverified price claims. Do not select a different product variant simply because it has a similar name or a more convenient Amazon listing. Do not bypass the canonical record renderer.

## What has worked

Specific trade-off-driven review copy, exact product identity, direct ASIN destinations, meaningful pros and cons, hair-type fit, published-index duplicate avoidance, and clear disclosure coverage are expected. The current application uses the full product record and comparison record formats in `client/src/lib/products.ts`; generated records must remain compatible with those formats and must validate before any renderer is invoked.
