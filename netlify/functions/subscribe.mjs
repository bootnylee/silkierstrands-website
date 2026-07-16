// SilkierStrands.com — Netlify Serverless Function: /.netlify/functions/subscribe
// Exposed via netlify.toml redirect as: POST /api/subscribe
// ─────────────────────────────────────────────────────────────────────────────
// Subscribes an email address to the EmailOctopus list and sets the HairType
// custom field so the subscriber is segmented for hair-type-specific emails.
//
// API v2 docs: https://emailoctopus.com/api-documentation/v2
// Base URL: https://api.emailoctopus.com
// Auth: Authorization: Bearer {EMAILOCTOPUS_API_KEY} header — key never in body.
//
// ⚠️  CONFIGURATION — set these in Netlify UI:
//   Site Settings → Environment Variables → Add variable
//
//   Variable name              Example value
//   ─────────────────────────  ──────────────────────────────────────
//   EMAILOCTOPUS_API_KEY       eo_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx   (v2 key, not legacy)
//   EMAILOCTOPUS_LIST_ID       xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// Custom field setup:  Lists → [Your List] → Fields → Add Field
//                      Type: Text  |  Name: HairType
// ─────────────────────────────────────────────────────────────────────────────

const EO_API_KEY  = process.env.EMAILOCTOPUS_API_KEY  ?? "";
const EO_LIST_ID  = process.env.EMAILOCTOPUS_LIST_ID  ?? "";
const EO_BASE     = "https://api.emailoctopus.com";

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
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ ok: false, error: "Method not allowed" }) };
  }

  // ─── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ ok: false, error: "Invalid JSON" }) };
  }

  const { email, hairType } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ ok: false, error: "A valid email address is required." }) };
  }

  if (!VALID_HAIR_TYPES.includes(hairType)) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ ok: false, error: "Invalid hair type." }) };
  }

  // ─── Guard: missing config — return configuration-missing error ────────────
  // Never silently succeed when env vars are absent; the caller must know.
  if (!EO_API_KEY || !EO_LIST_ID) {
    console.error("[subscribe] EMAILOCTOPUS_API_KEY or EMAILOCTOPUS_LIST_ID not set");
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ ok: false, error: "configuration-missing" }),
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const authHeader = { "Authorization": `Bearer ${EO_API_KEY}` };

  // ─── Call EmailOctopus API v2 — create contact ─────────────────────────────
  // POST /lists/{list_id}/contacts
  // Auth: Bearer token in header — API key is never placed in the request body.
  let eoRes;
  try {
    eoRes = await fetch(`${EO_BASE}/lists/${EO_LIST_ID}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify({
        email_address: normalizedEmail,
        fields: { HairType: hairType },
        status: "subscribed",
      }),
    });
  } catch (err) {
    console.error("[subscribe] Fetch error:", err.message);
    return { statusCode: 502, headers: CORS, body: JSON.stringify({ ok: false, error: "Network error." }) };
  }

  let eoData;
  try {
    eoData = await eoRes.json();
  } catch {
    eoData = {};
  }

  // ─── 2xx → success ────────────────────────────────────────────────────────
  if (eoRes.ok) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
  }

  // ─── 409 already-exists → update HairType field, then return success ───────
  // v2 already-exists: HTTP 409, type URL contains "already-exists"
  const isAlreadyExists =
    eoRes.status === 409 &&
    typeof eoData?.type === "string" &&
    eoData.type.includes("already-exists");

  if (isAlreadyExists) {
    // Best-effort PUT to update the HairType field for the existing contact.
    try {
      const contactId = encodeURIComponent(normalizedEmail);
      await fetch(
        `${EO_BASE}/lists/${EO_LIST_ID}/contacts/${contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeader },
          body: JSON.stringify({ fields: { HairType: hairType } }),
        }
      );
    } catch { /* non-fatal */ }
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, existing: true }) };
  }

  // ─── All other non-2xx → return ok:false with EO error type slug ───────────
  // Never log or return the API key, list ID, or request body.
  const errorSlug =
    (typeof eoData?.type === "string"
      ? eoData.type.split("/").pop()
      : null) ||
    String(eoRes.status);
  console.error("[subscribe] EmailOctopus error status:", eoRes.status, "type:", errorSlug);
  return {
    statusCode: eoRes.status >= 400 && eoRes.status < 500 ? 400 : 502,
    headers: CORS,
    body: JSON.stringify({ ok: false, error: errorSlug }),
  };
};
