/* Razorpay checkout helpers.
   The browser never decides the amount — it sends a category key and the
   backend looks up the authoritative fee. Success is only confirmed after the
   backend verifies Razorpay's signature. */

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== "undefined" && window.location.origin.includes("localhost:5173")
    ? "http://localhost:8000/api"
    : "/api"
);

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}/payments/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || "Something went wrong. Please try again.");
  }
  return data;
}

/* Returns { enabled, key_id }. When the server has no Razorpay keys the page
   hides online payment and shows only the Demand Draft / NEFT route. */
export async function getPaymentConfig() {
  try {
    const res = await fetch(`${API_BASE}/payments/config`);
    if (!res.ok) return { enabled: false };
    return await res.json();
  } catch {
    return { enabled: false };
  }
}

/* Injects checkout.js once and resolves when window.Razorpay is available. */
export function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function createOrder(payload) {
  return postJson("order", payload);
}

export function verifyPayment(response) {
  return postJson("verify", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
  });
}

/* Full flow: create order -> open checkout -> verify signature.
   Resolves with the verified receipt, or rejects with a readable message. */
export async function payForMembership(applicant) {
  const order = await createOrder(applicant);

  // If using local test key placeholder, simulate successful test payment verification directly
  if (order.key_id === "rzp_test_baionline" || order.key_id === "rzp_test_demo") {
    const fakePaymentId = `pay_test_${Date.now()}`;
    const verified = await verifyPayment({
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
      name: "Builders' Association of India",
      description: `${order.category_label} — Subscription`,
      order_id: order.order_id,
      prefill: order.prefill,
      notes: { receipt: order.receipt },
      theme: { color: "#1a73e8" },
      modal: {
        ondismiss: () => reject(new Error("Payment was cancelled before it completed."))
      },
      handler: (response) => {
        verifyPayment(response).then(resolve).catch(reject);
      }
    });

    checkout.on("payment.failed", (event) => {
      const description = event?.error?.description || "The payment could not be completed.";
      reject(new Error(description));
    });

    checkout.open();
  });
}
