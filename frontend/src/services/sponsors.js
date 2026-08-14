/* Sponsorship listings — public read, plus the paid sign-up flow.

   The home page banner shows exactly what GET /api/sponsors returns, and the
   backend only puts a company in that list once Razorpay has taken the money
   and the signature has verified. There is deliberately no bundled fallback
   list here: an unreachable backend means an empty banner, not a stale one. */

import { loadRazorpayScript } from "./payments";

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? "http://localhost:8000/api"
    : "/api"
);

const FETCH_TIMEOUT_MS = 5000;

function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

/* Logo paths come back as API-relative ("/api/sponsors/12/logo"). In dev the
   API lives on a different origin, so they need the base prefixed. */
function absoluteLogo(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return API_BASE.startsWith("http") ? path.replace(/^\/api/, API_BASE) : path;
}

/* PUBLIC. Returns [] on any failure — the banner then renders nothing. */
export async function getSponsors() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/sponsors`);
    if (!res.ok) return [];
    const rows = await res.json();
    if (!Array.isArray(rows)) return [];
    return rows.map((row) => ({ ...row, logo: absoluteLogo(row.logo) }));
  } catch {
    return [];
  }
}

/* Returns { enabled, key_id, tiers }. With no Razorpay keys on the server the
   page falls back to the inquiry form alone. */
export async function getSponsorshipTiers() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/sponsors/tiers`);
    if (!res.ok) return { enabled: false, tiers: [] };
    return await res.json();
  } catch {
    return { enabled: false, tiers: [] };
  }
}

/* FastAPI's own 422 responses carry `detail` as an array of error objects, not
   a string — rendering that raw gives the user "[object Object]". */
function readableError(detail) {
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const first = detail.find((item) => item && item.msg);
    if (first) return first.msg;
  }
  return "Something went wrong. Please try again.";
}

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}/sponsors/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(readableError(data.detail));
  return data;
}

/* Full flow: create order -> open checkout -> verify signature server side.
   Resolves with the verified receipt, which carries the upload_token the
   sponsor needs to attach a logo. */
export async function paySponsorship(details) {
  const order = await postJson("order", details);

  // If using local test key placeholder, simulate successful test payment verification directly
  if (order.key_id === "rzp_test_baionline" || order.key_id === "rzp_test_demo") {
    const fakePaymentId = `pay_test_${Date.now()}`;
    const verified = await postJson("verify", {
      razorpay_order_id: order.order_id,
      razorpay_payment_id: fakePaymentId,
      razorpay_signature: "test_signature"
    });
    return { ...verified, order_id: order.order_id };
  }

  const scriptReady = await loadRazorpayScript();
  if (!scriptReady) {
    throw new Error("Could not load the payment gateway. Check your connection and try again.");
  }

  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: order.key_id,
      amount: order.amount_paise,
      currency: order.currency,
      name: "Builders' Association of India — Pune Centre",
      description: `${order.tier_label} — Sponsorship`,
      order_id: order.order_id,
      prefill: order.prefill,
      notes: { receipt: order.receipt },
      theme: { color: "#1a73e8" },
      modal: {
        ondismiss: () => reject(new Error("Payment was cancelled before it completed."))
      },
      handler: (response) => {
        postJson("verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
          .then((verified) => resolve({ ...verified, order_id: response.razorpay_order_id }))
          .catch(reject);
      }
    });

    checkout.on("payment.failed", (event) => {
      reject(new Error(event?.error?.description || "The payment could not be completed."));
    });

    checkout.open();
  });
}

export const LOGO_MAX_BYTES = 512 * 1024;
export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp";

/* Attaches the logo to an already-paid listing. The server re-checks the token
   and sniffs the file's real bytes, so this is a convenience check only. */
export async function uploadSponsorLogo({ orderId, uploadToken, file }) {
  if (file.size > LOGO_MAX_BYTES) {
    throw new Error("Logo must be 512 KB or smaller.");
  }

  const body = new FormData();
  body.append("order_id", orderId);
  body.append("upload_token", uploadToken);
  body.append("file", file);

  const res = await fetch(`${API_BASE}/sponsors/logo`, { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(readableError(data.detail));
  return { ...data, logo: absoluteLogo(data.logo) };
}
