/* Razorpay checkout helpers.
   The browser never decides the amount — it sends a category key and the
   backend looks up the authoritative fee. Success is only confirmed after the
   backend verifies Razorpay's signature. */

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || (
  typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? "http://localhost:8000/api"
    : "/api"
);

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/* FastAPI's own 422 responses carry `detail` as an array of error objects, not
   a string — rendering that raw gives the user "[object Object]". */
export function readableError(detail) {
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const first = detail.find((item) => item && item.msg);
    if (first) return first.msg;
  }
  return "Something went wrong. Please try again.";
}

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}/payments/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(readableError(data.detail));
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
function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(Boolean(window.Razorpay)));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => {
      // Drop the failed tag so the next attempt injects a fresh one instead of
      // waiting on a load event that will never fire.
      script.remove();
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/* Opens Razorpay checkout for a server-created order and resolves with the
   backend's verified receipt. Shared by the membership and sponsorship flows.

   Razorpay keeps its modal open after a failed attempt so the payer can retry
   with another method, so `payment.failed` must not end the flow — a retry can
   still succeed. The flow only ends on success (handler) or when the payer
   closes the modal, and then with the last failure reason if there was one. */
export async function openCheckout(order, { name, description, verify }) {
  const scriptReady = await loadRazorpayScript();
  if (!scriptReady) {
    throw new Error("Could not load the payment gateway. Check your connection and try again.");
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let lastFailure = "";

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      fn(value);
    };

    const checkout = new window.Razorpay({
      key: order.key_id,
      amount: order.amount_paise,
      currency: order.currency,
      name,
      description,
      order_id: order.order_id,
      prefill: order.prefill,
      notes: { receipt: order.receipt },
      theme: { color: "#1a73e8" },
      modal: {
        // Stop a stray backdrop click from abandoning a payment in progress.
        backdropclose: false,
        ondismiss: () =>
          finish(reject, new Error(lastFailure || "Payment was cancelled before it completed."))
      },
      handler: (response) => {
        verify(response)
          .then((verified) => finish(resolve, { ...verified, order_id: response.razorpay_order_id }))
          .catch((err) => {
            // The money has most likely been taken at this point, so the payer
            // needs a reference to quote rather than a bare error.
            finish(
              reject,
              new Error(
                `${err.message} If money was debited, contact the BAI Pune Centre office quoting Payment ID ${response.razorpay_payment_id}.`
              )
            );
          });
      }
    });

    checkout.on("payment.failed", (event) => {
      lastFailure = event?.error?.description || "The payment could not be completed.";
    });

    checkout.open();
  });
}

function verifyPayment(response) {
  return postJson("verify", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
  });
}

/* Full flow: create order -> open checkout -> verify signature.
   Resolves with the verified receipt, or rejects with a readable message. */
export async function payForMembership(applicant) {
  const order = await postJson("order", applicant);
  return openCheckout(order, {
    name: "Builders' Association of India",
    description: order.category_label,
    verify: verifyPayment
  });
}
