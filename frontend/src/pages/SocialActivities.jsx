import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSocialActivitiesData, submitForm } from "../services/api";
import {
  FaHandsHelping,
  FaTools,
  FaGraduationCap,
  FaTint,
  FaLeaf,
  FaHeart,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./SocialActivities.css";

const SocialActivities = () => {
  useDocumentTitle("Social Activities & CSR");
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Volunteer / Partner Form State
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    phone: "",
    interest: "Volunteer",
    message: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    getSocialActivitiesData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching social activities:", err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ type: "", message: "" });

    try {
      await submitForm("social_activities_inquiry", formData);
      setFormStatus({
        type: "success",
        message: "Thank you! Your inquiry has been received. Our team will contact you shortly."
      });
      setFormData({
        name: "",
        org: "",
        email: "",
        phone: "",
        interest: "Volunteer",
        message: ""
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please check your connection and try again."
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Helper to map icon names to actual icon components
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "FaHandsHelping":
        return <FaHandsHelping />;
      case "FaTools":
        return <FaTools />;
      case "FaGraduationCap":
        return <FaGraduationCap />;
      case "FaTint":
        return <FaTint />;
      case "FaLeaf":
        return <FaLeaf />;
      case "FaHeart":
        return <FaHeart />;
      default:
        return <FaHandsHelping />;
    }
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Social Activities...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-screen container">
        <FaExclamationTriangle className="error-icon" />
        <h2>Unable to load page content</h2>
        <p>There was a problem loading the Social Activities. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="social-page-wrapper">
      {/* 1. Hero Section */}
      <section className="social-hero-section">
        <div className="social-hero-overlay"></div>
        <div className="container social-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="social-hero-content"
          >
            <span className="social-tag">Building Society</span>
            <h1 className="social-title">{data.title}</h1>
            <p className="social-subtitle">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Overview & Impact Stats */}
      <section className="social-overview-section">
        <div className="container">
          <div className="overview-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overview-text-col"
            >
              <h2 className="social-section-title">Our Responsibility Beyond Concrete</h2>
              <div className="title-line"></div>
              <p className="overview-desc">{data.overview}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overview-stats-col"
            >
              <div className="stats-glass-grid">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="stat-item-card">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CSR Initiatives (Worker Centric) */}
      <section className="social-csr-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">CSR Initiatives</span>
            <h2 className="section-title">Uplifting Our Workforce</h2>
            <div className="section-title-line"></div>
            <p className="section-intro">
              Construction workers are the backbone of our industry. We commit substantial resources to protect their health, ensure their safety, and educate their families.
            </p>
          </div>

          <div className="csr-cards-grid">
            {data.csrInitiatives.map((init, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="csr-card glass-card"
              >
                <div className="csr-card-icon-wrapper">
                  {renderIcon(init.icon)}
                </div>
                <h3>{init.title}</h3>
                <p>{init.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Community Outreach Programs */}
      <section className="social-outreach-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Outreach & Education</span>
            <h2 className="section-title">Community Engagements</h2>
            <div className="section-title-line"></div>
            <p className="section-intro">
              Fostering close ties with youth, local institutions, and civic bodies to support the community.
            </p>
          </div>

          <div className="outreach-grid">
            {data.outreachPrograms.map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="outreach-card"
              >
                <div className="outreach-card-image">
                  <img src={prog.image} alt={prog.title} />
                  <div className="outreach-card-overlay">
                    <span className="outreach-meta-tag">{prog.duration}</span>
                  </div>
                </div>
                <div className="outreach-card-body">
                  <h3>{prog.title}</h3>
                  <p className="outreach-text">{prog.description}</p>
                  <div className="outreach-footer">
                    <span className="outreach-target">Target: <strong>{prog.target}</strong></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sustainability & Green Campaigns */}
      <section className="social-green-section">
        <div className="container green-container-bg">
          <div className="green-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="green-info-col"
            >
              <div className="green-tag">
                <FaLeaf /> Sustainability
              </div>
              <h2 className="green-title">Green Construction & Ecology</h2>
              <p className="green-subtitle">
                Mitigating development footprint through proactive ecological drives.
              </p>
              
              <div className="green-campaigns-list">
                {data.sustainabilityCampaigns.map((camp, idx) => (
                  <div key={idx} className="green-campaign-item">
                    <h4>{camp.title}</h4>
                    <p>{camp.description}</p>
                    <span className="green-impact-badge">Impact: {camp.impact}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="disaster-relief-card glass-card"
            >
              <div className="disaster-badge">Disaster Response</div>
              <h3>{data.disasterRelief.title}</h3>
              <p>{data.disasterRelief.description}</p>
              <div className="disaster-image-wrapper">
                <img src={data.disasterRelief.image} alt="Disaster Response" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Form - Get Involved */}
      <section className="social-inquiry-section">
        <div className="container">
          <div className="inquiry-grid glass-card">
            <div className="inquiry-info-col">
              <h2>Join Our CSR Initiatives</h2>
              <p>
                We invite corporate members, developers, healthcare partners, NGOs, and individual professionals to join hands with Builders' Association of India, Pune Centre. 
              </p>
              <ul className="inquiry-benefits-list">
                <li>
                  <FaCheckCircle className="check-icon" /> Sponsor a health camp at your site
                </li>
                <li>
                  <FaCheckCircle className="check-icon" /> Co-host training & safety awareness drives
                </li>
                <li>
                  <FaCheckCircle className="check-icon" /> Support worker children scholarships
                </li>
                <li>
                  <FaCheckCircle className="check-icon" /> Volunteer for emergency civic relief
                </li>
              </ul>
            </div>

            <div className="inquiry-form-col">
              <h3>Get In Touch</h3>
              <form onSubmit={handleFormSubmit} className="social-inquiry-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="org">Organization</label>
                    <input
                      type="text"
                      id="org"
                      name="org"
                      value={formData.org}
                      onChange={handleInputChange}
                      placeholder="Company / NGO Name"
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / Mobile *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="interest">Area of Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                  >
                    <option value="Volunteer">Volunteer for Safety/Health Camps</option>
                    <option value="Sponsor CSR">Sponsor a Construction Site CSR Drive</option>
                    <option value="Student Mentor">Host Student Interns (SIP)</option>
                    <option value="Green Drive">Support Tree Plantation & Water Campaigns</option>
                    <option value="Other">Other Social Engagement Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Proposal</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How would you like to collaborate with BAI Pune Centre?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn btn-primary form-submit-btn"
                >
                  {formLoading ? (
                    <>
                      <FaSpinner className="spinner-icon animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Send Request"
                  )}
                </button>

                <AnimatePresence>
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`form-status-msg ${formStatus.type}`}
                    >
                      {formStatus.type === "success" ? (
                        <>
                          <FaCheckCircle className="status-icon" />
                          <span>{formStatus.message}</span>
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="status-icon error" />
                          <span>{formStatus.message}</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialActivities;
