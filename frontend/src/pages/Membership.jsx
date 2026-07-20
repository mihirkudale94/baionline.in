import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { membershipPageData } from "../services/api";
import { FaCheckCircle, FaIdCard, FaFilePdf, FaArrowRight } from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Membership.css";

const Membership = () => {
  const data = membershipPageData;
  useDocumentTitle("Membership");

  return (
    <div className="membership-page-wrapper">
      <section className="membership-hero-section">
        <div className="membership-hero-overlay"></div>
        <div className="container membership-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="membership-hero-content"
          >
            <span className="membership-tag">Since 1941</span>
            <h1 className="membership-title">{data.title}</h1>
            <p className="membership-subtitle">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="membership-why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Value</span>
            <h2 className="section-title">Why Become a Member</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="membership-why-grid">
            {data.whyJoin.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="membership-why-item"
              >
                <FaCheckCircle className="membership-why-icon" />
                <span>{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Choose Your Fit</span>
            <h2 className="section-title">Membership Categories</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="membership-categories-grid">
            {data.categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="membership-category-card glass-card"
              >
                <FaIdCard className="membership-category-icon" />
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                {cat.link && (
                  <Link to={cat.link} className="membership-category-link">
                    Learn More <FaArrowRight />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">What You Get</span>
            <h2 className="section-title">Member Benefits</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="membership-benefits-grid">
            {data.benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="membership-benefit-card glass-card"
              >
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </motion.div>
            ))}
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
        </div>
      </section>

      <section className="membership-downloads-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Resources</span>
            <h2 className="section-title">Download Forms</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="membership-downloads-grid">
            {data.downloads.map((dl, idx) => (
              <div key={idx} className="membership-download-card glass-card">
                <FaFilePdf className="membership-download-icon" />
                <h4>{dl.label}</h4>
                <span className="membership-download-status">Download coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
