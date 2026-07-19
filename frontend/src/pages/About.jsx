import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAboutData } from "../services/api";
import { FaHistory, FaBullseye, FaUsers, FaMapMarkerAlt, FaAward, FaChevronDown, FaFilePdf, FaEnvelopeOpenText } from "react-icons/fa";
import "./About.css";

const About = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Accordion active index
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // Membership form state
  const [formData, setFormData] = useState({ name: "", city: "", email: "", mobile: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    getAboutData().then((res) => {
      setContent(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading About details...</span>
      </div>
    );
  }

  const values = [
    {
      icon: <FaHistory />,
      title: "Our History",
      desc: "Founded in 1941, BAI has weathered the trials and tribulations of India's pre-and-post independence years, growing from 3 centres to a massive apex network."
    },
    {
      icon: <FaBullseye />,
      title: "Our Purpose",
      desc: "To protect, support and promote the collective interests of developers, civil engineering contractors and construction companies in India."
    },
    {
      icon: <FaUsers />,
      title: "Our Community",
      desc: "Comprised of more than 25,000 direct members and over 2,00,000 indirect members via affiliated regional builder bodies."
    }
  ];

  const handleToggleAccordion = (idx) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormData({ name: "", city: "", email: "", mobile: "" });
    }, 1200);
  };

  return (
    <div className="about-page-wrapper">
      {/* 1. Header Banner */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-content"
          >
            <span className="about-tag">Since {content.founded}</span>
            <h1 className="about-title">{content.title}</h1>
            <p className="about-subtitle">{content.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main History Content */}
      <section className="about-history-section">
        <div className="container history-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="history-content-col"
          >
            <h2 className="history-section-title">The Foundation of BAI</h2>
            <div className="title-line"></div>
            {content.paragraphs.map((para, idx) => (
              <p key={idx} className="history-paragraph">{para}</p>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="history-meta-col"
          >
            <div className="jackson-monument-card glass-card">
              <div className="monument-icon"><FaMapMarkerAlt /></div>
              <h3>The Jackson Hut</h3>
              <p>
                Brig. C.V.S. Jackson of Military Engineering Services suggested building contractors form an association. He provided land within Southern Command Headquarters in Pune, on which an office was constructed and aptly named <strong>'Jackson Hut'</strong>, which stands even today as a monument in BAI's name.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Pillars Grid */}
      <section className="about-values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Core Pillars</span>
            <h2 className="section-title">What Drives BAI</h2>
            <div className="section-title-line"></div>
          </div>
          
          <div className="values-grid">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="value-card glass-card"
              >
                <div className="value-icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Key Achievements Section */}
      <section className="about-achievements-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Milestones</span>
            <h2 className="section-title">Key Historical Achievements</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="achievements-timeline-list">
            {content.achievements.map((ach, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="achievement-timeline-card glass-card"
              >
                <div className="achievement-icon-wrapper"><FaAward /></div>
                <p className="achievement-text">{ach}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Vision, Constitution & Brochure Accordions */}
      <section className="about-accordions-section">
        <div className="container accordion-grid-layout">
          
          {/* Accordion column */}
          <div className="accordions-col">
            <h3 className="grid-col-title">Association Directives</h3>
            
            {/* Vision accordion */}
            <div className={`accordion-card-item ${activeAccordion === 0 ? "active" : ""}`}>
              <button className="accordion-trigger-btn" onClick={() => handleToggleAccordion(0)}>
                <span>BAI’s Vision</span>
                <FaChevronDown className="arrow-icon" />
              </button>
              <AnimatePresence>
                {activeAccordion === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="accordion-content-panel"
                  >
                    <ul className="vision-points-list">
                      {content.vision.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Constitution Accordion */}
            <div className={`accordion-card-item ${activeAccordion === 1 ? "active" : ""}`}>
              <button className="accordion-trigger-btn" onClick={() => handleToggleAccordion(1)}>
                <span>BAI Constitution (Rules & Regulations)</span>
                <FaChevronDown className="arrow-icon" />
              </button>
              <AnimatePresence>
                {activeAccordion === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="accordion-content-panel"
                  >
                    <p className="accordion-doc-desc">Read or download the complete revised rules and regulations amendments document approved by the Governing Council.</p>
                    <a href={content.constitution_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm doc-download-btn">
                      <FaFilePdf style={{ marginRight: "6px" }} /> Download Rules (PDF)
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Brochure Accordion */}
            <div className={`accordion-card-item ${activeAccordion === 2 ? "active" : ""}`}>
              <button className="accordion-trigger-btn" onClick={() => handleToggleAccordion(2)}>
                <span>BAI Profile Brochure</span>
                <FaChevronDown className="arrow-icon" />
              </button>
              <AnimatePresence>
                {activeAccordion === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="accordion-content-panel"
                  >
                    <p className="accordion-doc-desc">Download our detailed corporate brochure showing regional centres distributions and membership benefits details.</p>
                    <a href={content.brochure_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm doc-download-btn">
                      <FaFilePdf style={{ marginRight: "6px" }} /> Download Brochure (PDF)
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Membership application request column */}
          <div className="membership-form-col">
            <div className="membership-form-card glass-card">
              <div className="header-icon-wrapper"><FaEnvelopeOpenText /></div>
              <h3>Join the BAI Movement</h3>
              <p>Fill out the form below to receive a printed copy of the Builders Association of India Membership Application Form.</p>

              {formSubmitted ? (
                <div className="form-success-banner">
                  <span className="success-icon">✓</span>
                  <h4>Request Submitted!</h4>
                  <p>We will email the registration brochures and contact forms to you shortly.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setFormSubmitted(false)}>Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="membership-request-form">
                  <div className="form-group">
                    <label>Full Name*</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
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
                    <label>Mobile Number*</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="10-digit number" 
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary submit-btn" disabled={formLoading}>
                    {formLoading ? "Submitting..." : "Request Application Details"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
