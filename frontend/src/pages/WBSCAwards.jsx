import React, { useState } from "react";
import { motion } from "framer-motion";
import { wbscAwardsData } from "../services/api";
import { FaTrophy, FaCheckCircle, FaClipboardCheck, FaFilePdf, FaEnvelopeOpenText, FaLayerGroup } from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./WBSCAwards.css";

const WBSCAwards = () => {
  const data = wbscAwardsData;
  const [activeGroup, setActiveGroup] = useState(0);
  useDocumentTitle("WBSC Awards");

  return (
    <div className="wbsc-page-wrapper">
      <section className="wbsc-hero-section">
        <div className="wbsc-hero-overlay"></div>
        <div className="container wbsc-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="wbsc-hero-content"
          >
            <span className="wbsc-tag">{data.edition}</span>
            <h1 className="wbsc-title">{data.title}</h1>
            <p className="wbsc-subtitle">{data.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="wbsc-about-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">About</span>
            <h2 className="section-title">What is WBSC?</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="wbsc-about-text">{data.about}</p>
        </div>
      </section>

      <section className="wbsc-why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Benefits</span>
            <h2 className="section-title">Why Participate</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-why-grid">
            {data.whyParticipate.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="wbsc-why-card glass-card"
              >
                <FaTrophy className="wbsc-why-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="wbsc-categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">17 Categories</span>
            <h2 className="section-title">Award Categories</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-category-tabs">
            {data.categoryGroups.map((g, idx) => (
              <button
                key={idx}
                className={`wbsc-category-tab ${activeGroup === idx ? "active" : ""}`}
                onClick={() => setActiveGroup(idx)}
              >
                <FaLayerGroup /> {g.group}
              </button>
            ))}
          </div>
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="wbsc-category-list glass-card"
          >
            {data.categoryGroups[activeGroup].categories.map((cat, idx) => (
              <div key={idx} className="wbsc-category-item">
                <FaCheckCircle className="wbsc-cat-icon" /> {cat}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="wbsc-eligibility-section">
        <div className="container wbsc-eligibility-grid">
          <div>
            <h3 className="wbsc-block-title"><FaClipboardCheck /> Eligibility</h3>
            <ul className="wbsc-list">
              {data.eligibility.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="wbsc-block-title"><FaClipboardCheck /> Evaluation Criteria</h3>
            <ul className="wbsc-list">
              {data.evaluationCriteria.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wbsc-process-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Process</span>
            <h2 className="section-title">Competition Process</h2>
            <div className="section-title-line"></div>
          </div>
          <StepFlow steps={data.process} />
        </div>
      </section>

      <section className="wbsc-downloads-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Resources</span>
            <h2 className="section-title">Downloads</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-downloads-grid">
            {data.downloads.map((dl, idx) => (
              <div key={idx} className="wbsc-download-card glass-card">
                <FaFilePdf className="wbsc-download-icon" />
                <h4>{dl.label}</h4>
                <span className="wbsc-download-status">Download coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wbsc-cta-section">
        <div className="container wbsc-cta-inner">
          <FaEnvelopeOpenText className="wbsc-cta-icon" />
          <h2>Have questions about WBSC 2026?</h2>
          <p>Reach out to the BAI Pune Centre WBSC Committee for entry guidance and category clarifications.</p>
          <a href={`mailto:${data.contactEmail}`} className="btn btn-primary">Contact WBSC Committee</a>
        </div>
      </section>
    </div>
  );
};

export default WBSCAwards;
