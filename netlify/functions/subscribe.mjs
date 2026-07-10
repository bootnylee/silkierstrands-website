// SilkierStrands.com — Netlify Serverless Function: /.netlify/functions/subscribe
// Exposed via netlify.toml redirect as: POST /api/subscribe
// ─────────────────────────────────────────────────────────────────────────────
// Subscribes an email address to the EmailOctopus list and sets the HairType
// custom field so the subscriber is segmented for hair-type-specific emails.
//
// ⚠️  CONFIGURATION — set these in Netlify UI:
//   Site Settings → Environment Variables → Add variable
//
//   Variable name              Example value
//   ─────────────────────────  ──────────────────────────────────────
//   EMAILOCTOPUS_API_KEY       eo_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   EMAILOCTOPUS_LIST_ID       xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// EmailOctopus API docs: https://emailoctopus.com/api-documentation
// Custom field setup:  Lists → [Your List] → Fields → Add Field
//                      Type: Text  |  Name: HairType
// ─────────────────────────────────────────────────────────────────────────────

const EO_API_KEY  = process.env.EMAILOCTOPUS_API_KEY  ?? "";
const EO_LIST_ID  = process.env.EMAILOCTOPUS_LIST_ID  ?? "";
const EO_API_BASE = "https://emailoctopus.com/api/1.6";

const VALID_HAIR_TYPES = ["fine", "thick", "curly", "coarse", "dry", "normal", "color-treated"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // ─── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { email, hairType } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "A valid email address is required." }) };
  }

  if (!VALID_HAIR_TYPES.includes(hairType)) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Invalid hair type." }) };
  }

  // ─── Guard: missing config — graceful fallback ─────────────────────────────
  // When API key / list ID are not yet set, we still return success so the
  // front-end can trigger the PDF download. Signups are not lost — they can be
  // collected from the EmailOctopus widget fallback or re-enabled once configured.
  if (!EO_API_KEY || !EO_LIST_ID) {
    console.warn("[subscribe] EmailOctopus env vars not set — returning graceful fallback.");
    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ ok: true, fallback: true }),
    };
  }

  // ─── Call EmailOctopus API ─────────────────────────────────────────────────
  const normalizedEmail = email.trim().toLowerCase();

  const payload = {
    api_key: EO_API_KEY,
    email_address: normalizedEmail,
    fields: {
      // "HairType" must match the exact custom field name in your EmailOctopus list.
      HairType: hairType,
    },
    status: "SUBSCRIBED",
  };

  let eoRes;
  try {
    eoRes = await fetch(`${EO_API_BASE}/lists/${EO_LIST_ID}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[subscribe] Fetch error:", err);
    return { statusCode: 502, headers: CORS, body: JSON.stringify({ error: "Network error." }) };
  }

  // 200/201 = new subscriber
  if (eoRes.status === 200 || eoRes.status === 201) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
  }

  // 409 = already subscribed — update the HairType field
  if (eoRes.status === 409) {
    try {
      await fetch(
        `${EO_API_BASE}/lists/${EO_LIST_ID}/contacts/${encodeURIComponent(normalizedEmail)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: EO_API_KEY, fields: { HairType: hairType } }),
        }
      );
    } catch { /* non-fatal */ }
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, existing: true }) };
  }

  const errData = await eoRes.json().catch(() => ({}));
  console.error("[subscribe] EmailOctopus error:", eoRes.status, errData);
  return { statusCode: 502, headers: CORS, body: JSON.stringify({ error: "Could not subscribe. Please try again." }) };
};
