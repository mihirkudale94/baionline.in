import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getContactData, submitForm } from "../services/api";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Contact.css";

const MAX_MESSAGE = 5000;

// Build-time key from frontend/.env. Left blank — in development, or before
// the keys are issued — the widget is skipped and the form still works; the
// backend skips verification in the same way when its secret is unset.
const RECAPTCHA_SITE_KEY =
  (import.meta.env && import.meta.env.VITE_RECAPTCHA_SITE_KEY) || "";

// One script tag per page, shared by every caller, resolving once grecaptcha
// is ready to render.
let recaptchaScript = null;

function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve(null);
  if (!recaptchaScript) {
    recaptchaScript = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
      script.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
      document.head.appendChild(script);
    });
  }
  return recaptchaScript;
}

const Contact = () => {
  useDocumentTitle("Contact");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isMember, setIsMember] = useState(true);
  const [membershipNo, setMembershipNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Honeypot. A visitor never sees this field, so anything in it came from a
  // bot filling every input on the page.
  const [website, setWebsite] = useState("");
  const recaptchaBox = useRef(null);
  const recaptchaWidget = useRef(null);

  useEffect(() => {
    getContactData().then((res) => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      // The form and its container just unmounted behind the thank-you panel,
      // so the next mount needs a brand new widget.
      recaptchaWidget.current = null;
      return undefined;
    }
    if (!RECAPTCHA_SITE_KEY || loading) return undefined;

    let cancelled = false;
    loadRecaptcha()
      .then((grecaptcha) => {
        // StrictMode runs effects twice in development; render only once.
        if (cancelled || !grecaptcha || !recaptchaBox.current) return;
        if (recaptchaWidget.current !== null) return;
        recaptchaWidget.current = grecaptcha.render(recaptchaBox.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
      })
      .catch(() => {
        if (!cancelled) setSubmitError("Could not load the captcha. Please reload the page.");
      });

    return () => {
      cancelled = true;
    };
  }, [formSubmitted, loading]);

  const resetRecaptcha = () => {
    if (!RECAPTCHA_SITE_KEY || recaptchaWidget.current === null) return;
    try {
      window.grecaptcha.reset(recaptchaWidget.current);
    } catch {
      // The widget went away with the form; the next mount makes a new one.
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    // Report success to the honeypot filler without storing anything. A bot
    // that gets an error simply tries again.
    if (website) {
      setFormSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    let recaptchaToken = "";
    if (RECAPTCHA_SITE_KEY) {
      recaptchaToken =
        window.grecaptcha && recaptchaWidget.current !== null
          ? window.grecaptcha.getResponse(recaptchaWidget.current)
          : "";
      if (!recaptchaToken) {
        setSubmitError("Please confirm that you are not a robot.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await submitForm("contact", {
        recaptcha_token: recaptchaToken,
        membership: isMember ? "member" : "non-member",
        membership_no: isMember ? membershipNo : "",
        name,
        email,
        phone,
        organization,
        area,
        subject,
        message,
      });
      setFormSubmitted(true);
      setMembershipNo("");
      setName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setArea("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setSubmitError("Failed to send message. Please try again later or contact us directly.");
    } finally {
      // A token is single-use, so clear the checkbox either way.
      resetRecaptcha();
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Contact details...</span>
      </div>
    );
  }

  return (
    <div className="contact-page-wrapper">
      {/* 1. Header Banner */}
      <section className="contact-banner">
        <div className="contact-banner-art" aria-hidden="true">
          <svg
            className="contact-banner-skyline"
            viewBox="0 0 900 300"
            preserveAspectRatio="xMaxYMax slice"
            focusable="false"
          >
            {/* Skyline blocks — the city the association builds */}
            <g className="contact-banner-blocks">
              <rect x="300" y="170" width="86" height="130" />
              <rect x="398" y="118" width="64" height="182" />
              <rect x="474" y="196" width="104" height="104" />
              <rect x="590" y="86" width="78" height="214" />
              <rect x="680" y="152" width="58" height="148" />
              <rect x="750" y="112" width="112" height="188" />
            </g>
            {/* Floor lines */}
            <g className="contact-banner-floors">
              <path d="M300 206h86M300 242h86M300 278h86" />
              <path d="M398 154h64M398 190h64M398 226h64M398 262h64" />
              <path d="M474 232h104M474 268h104" />
              <path d="M590 122h78M590 158h78M590 194h78M590 230h78M590 266h78" />
              <path d="M680 188h58M680 224h58M680 260h58" />
              <path d="M750 148h112M750 184h112M750 220h112M750 256h112" />
            </g>
            {/* Tower crane */}
            <g className="contact-banner-crane">
              <path d="M548 300V44" />
              <path d="M470 56h210" />
              <path d="M548 44 470 56M548 44l132 12" />
              <path d="M548 56v18h-14v-18M548 74h14v-18" />
              <path d="M640 56v46" />
              <rect x="630" y="102" width="20" height="16" />
            </g>
            <path className="contact-banner-ground" d="M0 300h900" />
          </svg>
        </div>

        <div className="container contact-banner-inner">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-banner-copy"
          >
            <h1 className="contact-banner-title">{data.title}</h1>
            <span className="contact-banner-rule" aria-hidden="true"></span>
            <p className="contact-banner-subtitle">{data.office.name}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Contact Row */}
      <section className="contact-main-section">
        <div className="container contact-grid">
          {/* Contact Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-info-col"
          >
            <h2 className="contact-section-title">Pune Centre Office</h2>
            <div className="title-line"></div>
            
            <div className="info-cards-stack">
              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h3>Address</h3>
                  <p>{data.office.name}</p>
                  <p>{data.office.address}</p>
                </div>
              </div>

              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaPhoneAlt /></div>
                <div>
                  <h3>Telephone & Fax</h3>
                  <p>Tel: {data.office.tel.map((num, i) => (
                    <React.Fragment key={i}>
                      <a href={`tel:${num.replace(/[^\d+]/g, '')}`}>{num}</a>{i < data.office.tel.length - 1 && ", "}
                    </React.Fragment>
                  ))}</p>
                  <p>Fax: <a href={`tel:${data.office.phone.replace(/[^\d+]/g, '')}`}>{data.office.phone}</a></p>
                </div>
              </div>

              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaEnvelope /></div>
                <div>
                  <h3>Email</h3>
                  <p><a href={`mailto:${data.office.email}`}>{data.office.email}</a></p>
                </div>
              </div>
            </div>

            {/* The map sits under the three cards so it takes up the depth the
                form makes on the other side of the row, instead of leaving
                this column blank and repeating the gap further down. */}
            <div className="contact-map-block">
              <h2 className="contact-section-title">Find Us on the Map</h2>
              <div className="title-line"></div>
              <div className="contact-map-frame glass-card">
                <iframe
                  title="BAI Pune Centre Office Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${data.office.name}, ${data.office.address}`
                  )}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-form-col"
          >
            <div className="form-card glass-card">
              <h2 className="form-title">Send us a Message</h2>
              
              {formSubmitted ? (
                <div className="form-success-alert animate-fadeInUp">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. Our Pune Centre representatives will get in touch with you shortly.</p>
                  <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-feedback-form" onSubmit={handleFormSubmit}>
                  <fieldset className="form-membership">
                    <legend>Are You a BAI Member?</legend>
                    <div className="membership-options">
                      <label className="membership-option">
                        <input
                          type="radio"
                          name="membership"
                          checked={isMember}
                          onChange={() => setIsMember(true)}
                        />
                        <span>I am a member of BAI</span>
                      </label>
                      <label className="membership-option">
                        <input
                          type="radio"
                          name="membership"
                          checked={!isMember}
                          onChange={() => setIsMember(false)}
                        />
                        <span>I am not a member of BAI</span>
                      </label>
                    </div>
                  </fieldset>

                  {isMember && (
                    <div className="form-group">
                      <label htmlFor="contact-membership-no">BAI Membership No.</label>
                      <input
                        id="contact-membership-no"
                        type="text"
                        value={membershipNo}
                        onChange={(e) => setMembershipNo(e.target.value)}
                        placeholder="Optional — helps us pull up your record"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name*</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address*</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone">Mobile Number*</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      pattern="[6-9][0-9]{9}"
                      inputMode="numeric"
                      title="Enter a 10-digit Indian mobile number"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-organization">Company / Organization*</label>
                    <input
                      id="contact-organization"
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Enter your firm&rsquo;s name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-area">Area / Locality</label>
                    <input
                      id="contact-area"
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Shivajinagar, Pimpri-Chinchwad, Baramati"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject*</label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject of query"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      maxLength={MAX_MESSAGE}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your query..."
                    ></textarea>
                    <span className="form-char-count">
                      {message.length} / {MAX_MESSAGE} characters
                    </span>
                  </div>

                  <div className="form-honeypot" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  
                  {RECAPTCHA_SITE_KEY && (
                    <div className="form-recaptcha" ref={recaptchaBox}></div>
                  )}

                  {submitError && <div className="form-error-banner">{submitError}</div>}

                  <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} {!isSubmitting && <FaPaperPlane className="submit-icon" />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
