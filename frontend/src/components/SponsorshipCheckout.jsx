import React, { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaLock,
  FaRupeeSign,
  FaSpinner,
  FaFileAlt
} from "react-icons/fa";
import {
  LOGO_ACCEPT,
  LOGO_MAX_BYTES,
  getSponsorshipTiers,
  paySponsorship,
  uploadSponsorLogo
} from "../services/sponsors";
import { generateGSTInvoice } from "../utils/gstInvoice";
import "./SponsorshipCheckout.css";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* Tier pick -> details -> Razorpay -> logo upload.

   The tier's price is display-only; the backend charges from its own catalogue
   keyed by tier id, so editing the number in devtools changes nothing. The
   logo step only appears after the payment has been verified server side,
   because the upload token comes back from that verification. */
const SponsorshipCheckout = () => {
  const [config, setConfig] = useState(null);
  const [tierId, setTierId] = useState("");
  const [form, setForm] = useState({
    company_name: "",
    website: "",
    contact_name: "",
    email: "",
    phone: ""
  });
  const [status, setStatus] = useState("form"); // form | processing | paid
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState(null);

  const [logoState, setLogoState] = useState("idle"); // idle | uploading | done | error
  const [logoMessage, setLogoMessage] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    let active = true;
    getSponsorshipTiers().then((data) => {
      if (!active) return;
      setConfig(data);
      if (data.tiers?.length) setTierId(data.tiers[0].id);
    });
    return () => {
      active = false;
    };
  }, []);

  // Nothing to show until we know payments are switched on and priced.
  if (!config || !config.enabled || !config.tiers?.length) return null;

  const tier = config.tiers.find((t) => t.id === tierId) || config.tiers[0];
  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    if (form.company_name.trim().length < 2) return "Enter the company name as it should appear on the banner.";
    if (!EMAIL_RE.test(form.email.trim())) return "Enter a valid e-mail address.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Enter a valid 10-digit phone number.";
    return "";
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setMessage(problem);
      return;
    }

    setStatus("processing");
    setMessage("");
    try {
      const verified = await paySponsorship({
        tier: tier.id,
        company_name: form.company_name.trim(),
        website: form.website.trim(),
        contact_name: form.contact_name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, "")
      });
      setReceipt(verified);
      setStatus("paid");
    } catch (err) {
      setMessage(err.message || "The payment could not be completed.");
      setStatus("form");
    }
  };

  const handleLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > LOGO_MAX_BYTES) {
      setLogoState("error");
      setLogoMessage("Logo must be 512 KB or smaller.");
      return;
    }

    setLogoState("uploading");
    setLogoMessage("");
    try {
      const result = await uploadSponsorLogo({
        orderId: receipt.order_id,
        uploadToken: receipt.upload_token,
        file
      });
      setLogoPreview(`${result.logo}?v=${Date.now()}`);
      setLogoState("done");
    } catch (err) {
      setLogoState("error");
      setLogoMessage(err.message || "The logo could not be uploaded.");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handlePrintGSTInvoice = () => {
    if (!receipt) return;
    generateGSTInvoice({
      title: "BAI PUNE SPONSORSHIP PACKAGE",
      category: receipt.tier || tier.label,
      applicantName: receipt.company_name || form.company_name,
      email: form.email.trim(),
      phone: form.phone.trim(),
      paymentId: receipt.payment_id,
      orderId: receipt.order_id,
      amountDisplay: receipt.amount_display || tier.amount_display
    });
  };

  if (status === "paid" && receipt) {
    return (
      <section className="sponsor-checkout" id="become-a-sponsor">
        <div className="container">
          <div className="sponsor-checkout-card sponsor-checkout-done">
            <FaCheckCircle className="sponsor-checkout-tick" />
            <h2>You&apos;re listed, {receipt.company_name}</h2>
            <p>
              Your {receipt.tier} payment of &#8377; {receipt.amount_display} has been received and
              verified. Your listing is live on the home page banner now.
            </p>

            <dl className="sponsor-checkout-receipt">
              <div>
                <dt>Payment ID</dt>
                <dd>{receipt.payment_id}</dd>
              </div>
              <div>
                <dt>Order ID</dt>
                <dd>{receipt.order_id}</dd>
              </div>
            </dl>

            <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0 1.5rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ borderRadius: "30px", gap: "0.5rem", display: "inline-flex", alignItems: "center", background: "#10b981", borderColor: "#10b981" }}
                onClick={handlePrintGSTInvoice}
              >
                <FaFileAlt /> Download GST Tax Invoice
              </button>
            </div>

            <div className="sponsor-logo-step">
              <h3>Add your logo</h3>
              <p>
                Your listing currently shows the company name on its own. Upload a logo to have it
                appear alongside — PNG, JPEG or WebP, up to 512&nbsp;KB. A wide transparent PNG
                looks best.
              </p>

              {logoPreview && (
                <img src={logoPreview} alt="" className="sponsor-logo-preview" />
              )}

              <label className="sponsor-logo-button">
                {logoState === "uploading" ? (
                  <>
                    <FaSpinner className="sponsor-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt /> {logoState === "done" ? "Replace logo" : "Choose logo file"}
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept={LOGO_ACCEPT}
                  onChange={handleLogo}
                  disabled={logoState === "uploading"}
                  hidden
                />
              </label>

              {logoState === "done" && (
                <p className="sponsor-logo-ok">
                  <FaCheckCircle /> Logo uploaded and live on the banner.
                </p>
              )}
              {logoState === "error" && logoMessage && (
                <p className="sponsor-checkout-error">
                  <FaExclamationTriangle /> {logoMessage}
                </p>
              )}

              <p className="sponsor-checkout-note">
                Keep your Order ID. If you close this page before uploading, e-mail the logo to
                baipune1@gmail.com quoting that ID and the Pune Centre office will attach it.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sponsor-checkout" id="become-a-sponsor">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">Become a Sponsor</span>
          <h2 className="section-title">
            Sponsorship <span className="gradient-text">Packages</span>
          </h2>
          <div className="section-title-line"></div>
          <p className="sponsor-checkout-lede">
            Pay online and your company appears on the BAI Pune Centre home page banner
            straight away.
          </p>
        </div>

        <div className="sponsor-tier-grid">
          {config.tiers.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`sponsor-tier-card${option.id === tier.id ? " is-selected" : ""}`}
              onClick={() => setTierId(option.id)}
              disabled={status === "processing"}
              aria-pressed={option.id === tier.id}
            >
              <span className="sponsor-tier-name">{option.label}</span>
              <span className="sponsor-tier-price">
                <FaRupeeSign />
                {option.amount_display}
              </span>
              <span className="sponsor-tier-blurb">{option.blurb}</span>
            </button>
          ))}
        </div>

        <div className="sponsor-checkout-card">
          <form className="sponsor-checkout-form" onSubmit={handlePay}>
            <div className="sponsor-checkout-field">
              <label htmlFor="sp-company">Company Name *</label>
              <input
                id="sp-company"
                type="text"
                value={form.company_name}
                onChange={setField("company_name")}
                disabled={status === "processing"}
                placeholder="As it should appear on the banner"
                required
              />
            </div>

            <div className="sponsor-checkout-field">
              <label htmlFor="sp-website">Website</label>
              <input
                id="sp-website"
                type="text"
                value={form.website}
                onChange={setField("website")}
                disabled={status === "processing"}
                placeholder="yourcompany.com"
              />
            </div>

            <div className="sponsor-checkout-row">
              <div className="sponsor-checkout-field">
                <label htmlFor="sp-contact">Contact Person</label>
                <input
                  id="sp-contact"
                  type="text"
                  value={form.contact_name}
                  onChange={setField("contact_name")}
                  disabled={status === "processing"}
                />
              </div>
              <div className="sponsor-checkout-field">
                <label htmlFor="sp-email">E-mail *</label>
                <input
                  id="sp-email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  disabled={status === "processing"}
                  required
                />
              </div>
              <div className="sponsor-checkout-field">
                <label htmlFor="sp-phone">Phone *</label>
                <input
                  id="sp-phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={setField("phone")}
                  disabled={status === "processing"}
                  required
                />
              </div>
            </div>

            {message && (
              <p className="sponsor-checkout-error">
                <FaExclamationTriangle /> {message}
              </p>
            )}

            <button type="submit" className="sponsor-checkout-submit" disabled={status === "processing"}>
              {status === "processing" ? (
                <>
                  <FaSpinner className="sponsor-spin" /> Opening secure checkout…
                </>
              ) : (
                <>
                  <FaLock /> Pay &#8377; {tier.amount_display} — {tier.label}
                </>
              )}
            </button>

            <p className="sponsor-checkout-secure">
              <FaLock /> Payments are processed by Razorpay. Card and bank details are entered on
              Razorpay&apos;s secure checkout and are never stored on this website.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipCheckout;
