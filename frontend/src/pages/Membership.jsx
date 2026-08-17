import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { membershipPageData } from "../services/api";
import { getPaymentConfig } from "../services/payments";
import {
  FaFilePdf,
  FaArrowRight,
  FaDownload,
  FaRupeeSign,
  FaRegCheckSquare,
  FaUniversity,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFileSignature,
  FaLock,
  FaBolt
} from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import MembershipPaymentModal from "../components/MembershipPaymentModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import "./Membership.css";

const CENTRES_PREVIEW = 48;

const Membership = () => {
  const data = membershipPageData;
  useDocumentTitle("Membership");

  const [showAllCentres, setShowAllCentres] = useState(false);

  // Online payment enabled by default so Razorpay Pay Online buttons are always visible.
  const [payEnabled, setPayEnabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    let active = true;
    getPaymentConfig().then((config) => {
      if (active && config && typeof config.enabled === "boolean") {
        setPayEnabled(config.enabled);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="membership-page-wrapper">
      <PageHero
        image="/images/events/event_pmc-courtesy-visit-2.jpg"
        alt="BAI Pune Centre office bearers on a courtesy visit"
        focal="center 25%"
        tag={data.headOffice.established}
        title={data.title}
        subtitle={data.subtitle}
      >
        <a href={data.applicationForm.file} download className="membership-hero-cta">
          <FaDownload /> Download Application Form
          <span>{data.applicationForm.size}</span>
        </a>
      </PageHero>

      <section className="membership-letterhead-section">
        <div className="container">
          <div className="membership-letterhead">
            <div className="membership-letterhead-identity">
              <h2>{data.headOffice.name}</h2>
              <p>{data.headOffice.tagline}</p>
              <span className="membership-letterhead-network">{data.headOffice.network}</span>
            </div>
            <div className="membership-letterhead-contact">
              <div>
                <FaMapMarkerAlt />
                <span>{data.headOffice.address}</span>
              </div>
              <div>
                <FaPhoneAlt />
                <span>{data.headOffice.phones}</span>
              </div>
              <div>
                <FaEnvelope />
                <span>{data.headOffice.email}</span>
              </div>
              <div>
                <FaGlobe />
                <span>
                  {data.headOffice.website} &middot; GSTIN {data.headOffice.gstin}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="membership-centres-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">National Network</span>
            <h2 className="section-title">{data.centres.length} Centres Across India</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="membership-centres-intro">
            Every Centre listed on the Head Office application form. Applications from Pune are
            recommended to Head Office through BAI Pune Centre.
          </p>
          <ul className="membership-centres-list">
            {(showAllCentres ? data.centres : data.centres.slice(0, CENTRES_PREVIEW)).map((centre) => (
              <li key={centre} className={centre === "Pune" ? "is-own" : undefined}>
                {centre}
              </li>
            ))}
          </ul>
          {data.centres.length > CENTRES_PREVIEW && (
            <div className="membership-centres-toggle">
              <button type="button" onClick={() => setShowAllCentres((open) => !open)}>
                {showAllCentres
                  ? "Show fewer Centres"
                  : `Show all ${data.centres.length} Centres`}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="membership-fees-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Subscription</span>
            <h2 className="section-title">Membership Categories &amp; Fees</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="membership-fees-grid">
            {data.feeStructure.plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="membership-fee-card"
              >
                <h3>{plan.name}</h3>
                <div className="membership-fee-amount">
                  <FaRupeeSign />
                  <strong>{plan.total}</strong>
                  <span>{plan.cycle}</span>
                </div>
                <ul className="membership-fee-breakup">
                  {plan.breakup.map((row, i) => (
                    <li key={i}>
                      <span>{row.label}</span>
                      <span>&#8377; {row.value}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="membership-fee-pay"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <FaLock /> Pay &#8377; {plan.total} Online
                </button>
              </motion.div>
            ))}
          </div>
          <p className="membership-fees-secure">
            <FaBolt /> Pay instantly by UPI, card, net banking or wallet through Razorpay — or use
            the Demand Draft / NEFT route below. Either way, the completed application form must
            still reach Head Office through BAI Pune Centre.
          </p>
          <p className="membership-fees-note">
            <FaInfoCircle /> {data.feeStructure.note}
          </p>
        </div>
      </section>

      <section className="membership-eligibility-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Eligibility</span>
            <h2 className="section-title">Who Can Apply</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="membership-eligibility-intro">{data.eligibility.intro}</p>
          <div className="membership-eligibility-grid">
            {data.eligibility.trades.map((trade, idx) => (
              <div key={idx} className="membership-eligibility-item">
                <FaRegCheckSquare />
                <span>{trade}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-formparts-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Inside the Form</span>
            <h2 className="section-title">What the Form Asks</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="membership-formparts-intro">{data.formSections.intro}</p>
          <div className="membership-formparts-grid">
            {data.formSections.parts.map((part, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="membership-formpart-card"
              >
                <div className="membership-formpart-head">
                  <span className="membership-formpart-num">{String(idx + 1).padStart(2, "0")}</span>
                  <h3>{part.title}</h3>
                </div>
                <ul>
                  {part.fields.map((field, i) => (
                    <li key={i}>{field}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-declaration-section">
        <div className="container">
          <div className="membership-declaration-card">
            <div className="membership-declaration-head">
              <FaFileSignature />
              <div>
                <h2>{data.declaration.title}</h2>
                <p>{data.declaration.intro}</p>
              </div>
            </div>
            <ul className="membership-declaration-list">
              {data.declaration.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="membership-howtojoin-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Process</span>
            <h2 className="section-title">How to Join</h2>
            <div className="section-title-line"></div>
          </div>
          <StepFlow steps={data.howToJoin} />
          <ul className="membership-important-notes">
            {data.importantNotes.map((note, idx) => (
              <li key={idx}>
                <FaInfoCircle /> <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="membership-downloads-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Submit &amp; Pay</span>
            <h2 className="section-title">Download the Form</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="membership-submit-layout">
            <div className="membership-form-banner">
              <div className="membership-form-banner-icon">
                <FaFilePdf />
              </div>
              <div className="membership-form-banner-text">
                <h3>{data.applicationForm.label}</h3>
                <p>{data.applicationForm.note}</p>
                <span className="membership-form-banner-meta">
                  PDF · {data.applicationForm.size} · {data.applicationForm.pages}
                </span>
              </div>
              <div className="membership-form-banner-actions">
                <a href={data.applicationForm.file} download className="membership-form-banner-btn">
                  <FaDownload /> Download Form
                </a>
                <a
                  href={data.applicationForm.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="membership-form-banner-link"
                >
                  View Online <FaArrowRight />
                </a>
              </div>
            </div>

            <div className="membership-payment-card">
              <h3>{data.payment.title}</h3>
              {payEnabled && (
                <div className="membership-payment-row">
                  <FaBolt />
                  <div>
                    <span className="membership-payment-label">Pay Online</span>
                    <p>UPI, Card, Net Banking or Wallet</p>
                    <p className="membership-payment-sub">
                      Processed securely by Razorpay. Choose your category above and pay instantly.
                    </p>
                  </div>
                </div>
              )}
              <div className="membership-payment-row">
                <FaUniversity />
                <div>
                  <span className="membership-payment-label">Payable To</span>
                  <p>{data.payment.beneficiary}</p>
                  <p className="membership-payment-sub">{data.payment.modes}</p>
                </div>
              </div>
              <div className="membership-payment-row">
                <FaMapMarkerAlt />
                <div>
                  <span className="membership-payment-label">Submit To</span>
                  <p>{data.payment.addressee}</p>
                  <p className="membership-payment-sub">{data.payment.address}</p>
                  <p className="membership-payment-sub">GSTIN: {data.payment.gstin}</p>
                </div>
              </div>
              <ul className="membership-payment-notes">
                {data.payment.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <MembershipPaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
};

export default Membership;
