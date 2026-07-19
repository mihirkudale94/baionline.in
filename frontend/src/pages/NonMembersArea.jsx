import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import "./NonMembersArea.css";

const NonMembersArea = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    firmName: "",
    mobile: "",
    address: "",
    telephone: "",
    fax: "",
    email: "",
    website: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        designation: "",
        firmName: "",
        mobile: "",
        address: "",
        telephone: "",
        fax: "",
        email: "",
        website: ""
      });
    }, 1200);
  };

  return (
    <div className="non-member-page-wrapper">
      <section className="non-member-hero-section">
        <div className="non-member-hero-overlay"></div>
        <div className="container non-member-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="non-member-hero-content"
          >
            <span className="non-member-tag">Activities</span>
            <h1 className="non-member-title">Non-Members Area</h1>
            <p className="non-member-subtitle">Stay connected with the Indian civil engineering construction sector</p>
          </motion.div>
        </div>
      </section>

      <section className="non-member-form-section">
        <div className="container">
          <div className="non-member-split-grid animate-fadeInUp">
            
            {/* Form Column */}
            <div className="non-member-form-card glass-card">
              <div className="header-icon-box"><FaUserPlus /></div>
              <h2>Information Request Form</h2>
              <p className="form-desc">
                Not a member of BAI? Fill in the details below to receive updates on construction material indices, event schedules, and circular news briefs.
              </p>

              {submitted ? (
                <div className="success-banner">
                  <span className="success-icon">✓</span>
                  <h3>Request Submitted!</h3>
                  <p>Your record has been saved. We will include you in our email news feeds and notifications.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="non-member-inquiry-form">
                  
                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Name of Contact Person*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter contact name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Designation*</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Director, Partner"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Name of Firm*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter organization name"
                        value={formData.firmName}
                        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      />
                    </div>
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
                  </div>

                  <div className="form-group">
                    <label>Office Address*</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter full office mailing address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Telephone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter telephone number"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Fax Number</label>
                      <input
                        type="text"
                        placeholder="Enter fax number"
                        value={formData.fax}
                        onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Email Address*</label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Website URL</label>
                      <input
                        type="url"
                        placeholder="https://www.example.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                    {loading ? "Submitting details..." : "Subscribe to BAI Notifications"}
                  </button>
                </form>
              )}
            </div>

            {/* Info Card Column */}
            <div className="non-member-info-card glass-card">
              <div className="info-logo-box">
                <img src="/images/logo-bg.png" alt="BAI Logo" className="info-brand-logo" />
              </div>
              <h3>Subscribe & Track Activities</h3>
              <p>While full access to cost directories is reserved for registered corporate partners, non-members can subscribe to receive general announcements, public tenders notices, and national builders conventions invitations.</p>

              <ul className="info-list">
                <li>• Periodic newsletters about infrastructure project exports.</li>
                <li>• Invitation updates to public webinars and summits.</li>
                <li>• Access to download public circular guidelines.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default NonMembersArea;
