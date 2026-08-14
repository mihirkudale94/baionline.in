import React, { useEffect, useRef, useState } from "react";
import {
  FaTimes,
  FaLock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaRupeeSign,
  FaFileAlt
} from "react-icons/fa";
import { payForMembership } from "../services/payments";
import { generateGSTInvoice } from "../utils/gstInvoice";
import "./MembershipPaymentModal.css";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* Collects the applicant details Razorpay needs, opens checkout, and reports
   the verified receipt. The plan's amount is display-only — the backend
   charges from its own fee table keyed by plan.id. */
const MembershipPaymentModal = ({ plan, onClose }) => {
  const [form, setForm] = useState({
    applicant_name: "",
    contact_person: "",
    email: "",
    phone: ""
  });
  const [status, setStatus] = useState("form"); // form | processing | success | error
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && status !== "processing") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, status]);

  if (!plan) return null;

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    if (form.applicant_name.trim().length < 2) return "Enter the applicant or company name.";
    if (!EMAIL_RE.test(form.email.trim())) return "Enter a valid e-mail address.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Enter a valid 10-digit phone number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setMessage(problem);
      setStatus("error");
      return;
    }

    setStatus("processing");
    setMessage("");
    try {
      const verified = await payForMembership({
        category: plan.id,
        applicant_name: form.applicant_name.trim(),
        contact_person: form.contact_person.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, "")
      });
      setReceipt(verified);
      setStatus("success");
    } catch (err) {
      setMessage(err.message || "The payment could not be completed.");
      setStatus("error");
    }
  };

  const handlePrintGSTInvoice = () => {
    if (!receipt) return;
    generateGSTInvoice({
      title: "BAI MEMBERSHIP SUBSCRIPTION",
      category: receipt.category || plan.name,
      applicantName: form.applicant_name.trim() || "Registered Member",
      email: form.email.trim(),
      phone: form.phone.trim(),
      paymentId: receipt.payment_id,
      orderId: receipt.order_id,
      amountDisplay: receipt.amount_display || plan.total
    });
  };

  return (
    <div className="pay-modal-backdrop" onClick={status === "processing" ? undefined : onClose}>
      <div
        className="pay-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="pay-modal-close"
          onClick={onClose}
          disabled={status === "processing"}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {status === "success" ? (
          <div className="pay-modal-result">
            <FaCheckCircle className="pay-modal-result-icon is-success" />
            <h2 id="pay-modal-title">Payment Verified</h2>
            <p>
              Your {receipt.category} subscription of &#8377; {receipt.amount_display} has been
              received and verified via Razorpay.
            </p>
            <dl className="pay-modal-receipt">
              <div>
                <dt>Payment Ref ID</dt>
                <dd>{receipt.payment_id}</dd>
              </div>
              <div>
                <dt>Order ID</dt>
                <dd>{receipt.order_id}</dd>
              </div>
            </dl>
            <div className="pay-modal-actions-grid">
              <button type="button" className="pay-modal-btn-invoice" onClick={handlePrintGSTInvoice}>
                <FaFileAlt /> Download GST Tax Invoice
              </button>
            </div>
            <p className="pay-modal-note">
              Please quote your Payment Ref ID on your membership application form.
            </p>
            <button type="button" className="pay-modal-submit" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="pay-modal-head">
              <span className="pay-modal-eyebrow">Subscription Payment</span>
              <h2 id="pay-modal-title">{plan.name}</h2>
              <div className="pay-modal-amount">
                <FaRupeeSign />
                <strong>{plan.total}</strong>
                <span>{plan.cycle}</span>
              </div>
            </div>

            <form className="pay-modal-form" onSubmit={handleSubmit}>
              <div className="pay-modal-field">
                <label htmlFor="pay-applicant">Applicant / Company Name *</label>
                <input
                  id="pay-applicant"
                  type="text"
                  value={form.applicant_name}
                  onChange={setField("applicant_name")}
                  disabled={status === "processing"}
                  required
                />
              </div>
              <div className="pay-modal-field">
                <label htmlFor="pay-contact">Contact Person</label>
                <input
                  id="pay-contact"
                  type="text"
                  value={form.contact_person}
                  onChange={setField("contact_person")}
                  disabled={status === "processing"}
                />
              </div>
              <div className="pay-modal-row">
                <div className="pay-modal-field">
                  <label htmlFor="pay-email">E-mail *</label>
                  <input
                    id="pay-email"
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    disabled={status === "processing"}
                    required
                  />
                </div>
                <div className="pay-modal-field">
                  <label htmlFor="pay-phone">Phone *</label>
                  <input
                    id="pay-phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={setField("phone")}
                    disabled={status === "processing"}
                    required
                  />
                </div>
              </div>

              {status === "error" && message && (
                <p className="pay-modal-error">
                  <FaExclamationTriangle /> {message}
                </p>
              )}

              <div className="pay-modal-methods">
                <span className="pay-modal-methods-label">Accepted Indian Payment Modes:</span>
                <div className="pay-modal-chips">
                  <span>BHIM / UPI</span>
                  <span>GPay / PhonePe</span>
                  <span>Paytm</span>
                  <span>RuPay / Cards</span>
                  <span>NetBanking (50+ Banks)</span>
                </div>
              </div>

              <button type="submit" className="pay-modal-submit" disabled={status === "processing"}>
                {status === "processing" ? (
                  <>
                    <FaSpinner className="pay-modal-spin" /> Opening Razorpay Secure Checkout…
                  </>
                ) : (
                  <>
                    <FaLock /> Pay &#8377; {plan.total} via Razorpay
                  </>
                )}
              </button>

              <p className="pay-modal-secure">
                <FaLock /> 256-Bit SSL Encrypted & PCI-DSS Compliant. Powered by Razorpay. Card and bank details are entered directly on Razorpay's secure checkout.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipPaymentModal;
