import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";
import { submitForm } from "../services/api";
import "./SponsorsInquiry.css";

const SponsorsInquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    city: "",
    state: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    submitForm("sponsors_inquiry", formData)
      .then(() => {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          company: "",
          city: "",
          state: "",
          message: ""
        });
      })
      .catch(() => setError("Something went wrong submitting your form. Please try again or contact us directly."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="sponsors-page-wrapper">
      <section className="sponsors-hero-section">
        <div className="sponsors-hero-overlay"></div>
        <div className="container sponsors-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sponsors-hero-content"
          >
            <span className="sponsors-tag">Partnerships</span>
            <h1 className="sponsors-title">Sponsors Inquiry</h1>
            <p className="sponsors-subtitle">Collaborate with India's premier apex construction body</p>
          </motion.div>
        </div>
      </section>

      <section className="sponsors-form-section">
        <div className="container">
          <div className="sponsors-split-grid animate-fadeInUp">
            
            {/* Form Column */}
            <div className="sponsors-form-card glass-card">
              <div className="header-icon-box"><FaHandshake /></div>
              <h2>Partnership Inquiry Form</h2>
              <p className="form-desc">Share details about your brand and products, and our sponsorship committee will contact you.</p>

              {submitted ? (
                <div className="success-banner">
                  <span className="success-icon">✓</span>
                  <h3>Inquiry Submitted!</h3>
                  <p>Thank you for your interest in partnering with Builders Association of India. Our central secretariat will review your form and email you shortly.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sponsors-inquiry-form">
                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Full Name*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address*</label>
                      <input
                        type="email"
                        required
                        placeholder="email@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Mobile Number*</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company/Organization*</label>
                      <input
                        type="text"
                        required
                        placeholder="Organization name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>City*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>State*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Message/Inquiry Comments</label>
                    <textarea
                      rows={4}
                      placeholder="Details of products, booth requests, or digital advertising interest..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {error && <p className="form-error-text">{error}</p>}
                  <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                    {loading ? "Submitting Request..." : "Submit Sponsorship Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Banner Column */}
            <div className="sponsors-info-card glass-card">
              <div className="info-logo-box">
                <img src="/images/logo-bg.png" alt="BAI Logo" className="info-brand-logo" />
              </div>
              <h3>Why partner with BAI?</h3>
              <p>With an active footprint of **264+ local centres** and a community of over **2 Lakh associated developers and construction contractors**, Builders Association of India is the single most powerful marketing and networking platform in the infrastructure and real estate sector.</p>
              
              <ul className="benefits-list">
                <li>• Direct exposure to executive developers decision makers.</li>
                <li>• Display spaces at regional/national conventions.</li>
                <li>• Magazine banner advertisements in 'Indian Construction'.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsInquiry;
