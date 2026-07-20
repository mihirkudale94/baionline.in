import React, { useState } from "react";
import { motion } from "framer-motion";
import { patronMembershipData, submitForm } from "../services/api";
import { FaCrown, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./PatronMembership.css";

const PatronMembership = () => {
  const data = patronMembershipData;
  useDocumentTitle("Patron Membership");
  const [formData, setFormData] = useState({ company: "", name: "", email: "", mobile: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    submitForm("patron_membership_application", formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ company: "", name: "", email: "", mobile: "", category: "" });
      })
      .catch(() => setError("Something went wrong submitting your form. Please try again or contact us directly."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="patron-page-wrapper">
      <section className="patron-hero-section">
        <div className="patron-hero-overlay"></div>
        <div className="container patron-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="patron-hero-content"
          >
            <span className="patron-tag">Highest Membership Tier</span>
            <h1 className="patron-title">{data.title}</h1>
            <p className="patron-subtitle">{data.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="patron-whatis-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Overview</span>
            <h2 className="section-title">What is Patron Membership</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="patron-whatis-text">{data.whatIs}</p>
        </div>
      </section>

      <section className="patron-benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Advantages</span>
            <h2 className="section-title">Patron Benefits</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="patron-benefits-grid">
            {data.benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="patron-benefit-card glass-card"
              >
                <FaCrown className="patron-benefit-icon" />
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="patron-directory-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Directory</span>
            <h2 className="section-title">Patron Member Directory</h2>
            <div className="section-title-line"></div>
          </div>
          {data.directory.length > 0 ? (
            <div className="patron-directory-table-wrapper">
              <table className="patron-directory-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Representative</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Website</th>
                  </tr>
                </thead>
                <tbody>
                  {data.directory.map((row, idx) => (
                    <tr key={idx}>
                      <td><img src={row.logo} alt={row.name} className="patron-directory-logo" /></td>
                      <td>{row.name}</td>
                      <td>{row.representative}</td>
                      <td>{row.category}</td>
                      <td>{row.location}</td>
                      <td><a href={row.website} className="patron-directory-link"><FaGlobe /></a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="patron-directory-empty glass-card">
              <FaCrown className="patron-directory-empty-icon" />
              <h4>No Patron Members Listed Yet</h4>
              <p>Be among the first to support BAI Pune Centre as a Patron Member — apply below.</p>
            </div>
          )}
        </div>
      </section>

      <section className="patron-apply-section">
        <div className="container patron-apply-grid">
          <div className="patron-apply-info glass-card">
            <h3>Become a Patron Member</h3>
            <div className="patron-apply-block">
              <h4>Eligibility</h4>
              <ul>
                {data.becomePatron.eligibility.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="patron-apply-block">
              <h4>Fee</h4>
              <p>{data.becomePatron.fee}</p>
            </div>
            <div className="patron-apply-block">
              <h4>Benefits</h4>
              <ul>
                {data.becomePatron.benefits.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="patron-contact-row">
              <span><FaEnvelope /> {data.contactEmail}</span>
              <span><FaPhone /> {data.contactPhone}</span>
            </div>
          </div>

          <div className="patron-apply-form-card glass-card">
            <h3>Application Form</h3>
            {submitted ? (
              <div className="form-success-banner">
                <span className="success-icon">✓</span>
                <h4>Application Submitted!</h4>
                <p>Our Patron Membership desk will review your application and reach out shortly.</p>
                <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Submit Another Application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="patron-apply-form">
                <div className="form-group">
                  <label>Company/Organization*</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Organization name" />
                </div>
                <div className="form-group">
                  <label>Representative Name*</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label>Mobile Number*</label>
                  <input type="tel" required value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} placeholder="10-digit number" />
                </div>
                <div className="form-group">
                  <label>Business Category*</label>
                  <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Residential Developer" />
                </div>
                {error && <p className="form-error-text">{error}</p>}
                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatronMembership;
