// Exposed via netlify.toml redirect as: POST /api/subscribe
// ─────────────────────────────────────────────────────────────────────────────
// Subscribes an email address to the Klaviyo list and upserts the HairType
// custom property for hair-type-specific email segmentation. The private API key
// is read only from the Netlify environment and is never committed or returned.
//
// EmailOctopus environment handling remains below for the approved rollback path.
// ─────────────────────────────────────────────────────────────────────────────

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY ?? "";
const KLAVIYO_API_BASE = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2026-07-15";
const KLAVIYO_LIST_ID = "UzgxcH";

// Retained for the EmailOctopus rollback path. Do not remove these environment
// variable reads without an approved rollback-plan change.
const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY ?? "";
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID ?? "";
const EO_BASE = "https://api.emailoctopus.com";

const VALID_HAIR_TYPES = ["fine", "thick", "curly", "coarse", "dry", "normal", "color-treated"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function klaviyoHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    revision: KLAVIYO_REVISION,
  };
}

async function responseData(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function errorCode(response, data) {
  return (
    (typeof data?.errors?.[0]?.code === "string" && data.errors[0].code) ||
    (typeof data?.errors?.[0]?.title === "string" && data.errors[0].title) ||
    String(response.status)
  );
}

function serviceFailure(response, data) {
  const error = errorCode(response, data);
  console.error("[subscribe] Klaviyo error status:", response.status, "code:", error);
  return {
    statusCode: response.status >= 400 && response.status < 500 ? 400 : 502,
    headers: CORS,
    body: JSON.stringify({ ok: false, error }),
  };
}

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
  if (!KLAVIYO_API_KEY) {
    console.error("[subscribe] KLAVIYO_API_KEY is not configured");
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ ok: false, error: "configuration-missing" }),
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Klaviyo's synchronous profile-import endpoint upserts the custom property
  // without requiring a profile-read scope. Consent is set by the separate
  // profile-subscription job below, as required by Klaviyo's API contract.
  let profileResponse;
  try {
    profileResponse = await fetch(`${KLAVIYO_API_BASE}/profile-import`, {
      method: "POST",
      headers: klaviyoHeaders(),
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: normalizedEmail,
            properties: { HairType: hairType },
          },
        },
      }),
    });
  } catch (err) {
    console.error("[subscribe] Klaviyo profile network error:", err.message);
    return { statusCode: 502, headers: CORS, body: JSON.stringify({ ok: false, error: "Network error." }) };
  }

  if (!profileResponse.ok) {
    return serviceFailure(profileResponse, await responseData(profileResponse));
  }

  let subscriptionResponse;
  try {
    subscriptionResponse = await fetch(`${KLAVIYO_API_BASE}/profile-subscription-bulk-create-jobs/`, {
      method: "POST",
      headers: klaviyoHeaders(),
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: normalizedEmail,
                    subscriptions: {
                      email: {
                        marketing: { consent: "SUBSCRIBED" },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: { type: "list", id: KLAVIYO_LIST_ID },
            },
          },
        },
      }),
    });
  } catch (err) {
    console.error("[subscribe] Klaviyo subscription network error:", err.message);
    return { statusCode: 502, headers: CORS, body: JSON.stringify({ ok: false, error: "Network error." }) };
  }

  if (subscriptionResponse.ok) {
    // Consume the upstream acknowledgement before the serverless invocation
    // resolves so Netlify serializes the existing client-facing JSON body.
    try {
      await subscriptionResponse.arrayBuffer();
    } catch {
      // A successful subscription remains successful if an empty upstream body
      // cannot be read.
    }
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
  }

  return serviceFailure(subscriptionResponse, await responseData(subscriptionResponse));
};
