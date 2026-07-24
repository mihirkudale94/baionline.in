import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wbscAwardsData, wbscArchiveData } from "../services/api";
import { FaTrophy, FaCheckCircle, FaClipboardCheck, FaFilePdf, FaEnvelopeOpenText, FaLayerGroup, FaQuoteLeft, FaAward, FaHistory, FaChevronDown, FaUserTie } from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./WBSCAwards.css";

const WBSCAwards = () => {
  const data = wbscAwardsData;
  const archive = wbscArchiveData;
  const [activeGroup, setActiveGroup] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeArchiveYear, setActiveArchiveYear] = useState(null);
  useDocumentTitle("WBSC Awards");

  const filteredTestimonials = data.testimonials
    ? data.testimonials.filter(t => selectedFilter === "all" || t.category === selectedFilter)
    : [];

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
          {data.about.map((para, idx) => (
            <p key={idx} className="wbsc-about-text">{para}</p>
          ))}
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
            {data.eligibilityNote && <p className="wbsc-block-note">{data.eligibilityNote}</p>}
          </div>
          <div>
            <h3 className="wbsc-block-title"><FaClipboardCheck /> Evaluation Criteria</h3>
            <ul className="wbsc-list">
              {data.evaluationCriteria.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {data.evaluationNote && <p className="wbsc-block-note">{data.evaluationNote}</p>}
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

      <section className="wbsc-testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Feedback & Impact</span>
            <h2 className="section-title">What the Community Says</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="wbsc-testimonial-filters">
            {[
              { id: "all", label: "Show All" },
              { id: "winner", label: "Award Winners" },
              { id: "participant", label: "Past Participants" },
              { id: "jury", label: "Jury Members" }
            ].map(filter => (
              <button
                key={filter.id}
                className={`wbsc-testimonial-filter-btn ${selectedFilter === filter.id ? "active" : ""}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="wbsc-testimonials-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="wbsc-testimonial-card glass-card"
                >
                  <div className="wbsc-testimonial-quote-icon">
                    <FaQuoteLeft />
                  </div>
                  
                  <p className="wbsc-testimonial-text">"{t.quote}"</p>
                  
                  <div className="wbsc-testimonial-divider"></div>
                  
                  <div className="wbsc-testimonial-author">
                    <div className="wbsc-testimonial-avatar">
                      {t.avatar}
                    </div>
                    <div className="wbsc-testimonial-info">
                      <h4 className="wbsc-testimonial-name">{t.name}</h4>
                      <p className="wbsc-testimonial-role">
                        {t.role}, <span className="wbsc-testimonial-company">{t.company}</span>
                      </p>
                      {t.category === "winner" && t.award && (
                        <span className="wbsc-testimonial-badge winner-badge">
                          <FaAward /> {t.award} ({t.year})
                        </span>
                      )}
                      {t.category === "participant" && t.project && (
                        <span className="wbsc-testimonial-badge participant-badge">
                          Project: {t.project} ({t.year})
                        </span>
                      )}
                      {t.category === "jury" && (
                        <span className="wbsc-testimonial-badge jury-badge">
                          {t.project} ({t.year})
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="wbsc-archive-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">30 Years of Excellence</span>
            <h2 className="section-title">WBSC Archive</h2>
            <div className="section-title-line"></div>
          </div>

          <p className="wbsc-archive-history">{archive.history}</p>

          <div className="wbsc-archive-timeline">
            {archive.years.map((yr, idx) => (
              <div key={idx} className={`wbsc-archive-year-card ${activeArchiveYear === idx ? "active" : ""}`}>
                <button
                  className="wbsc-archive-year-trigger"
                  onClick={() => setActiveArchiveYear(activeArchiveYear === idx ? null : idx)}
                >
                  <span className="wbsc-archive-year-icon"><FaHistory /></span>
                  <span className="wbsc-archive-year-label">
                    <strong>{yr.year}</strong> — {yr.editionLabel}
                  </span>
                  <FaChevronDown className="wbsc-archive-arrow" />
                </button>
                <AnimatePresence>
                  {activeArchiveYear === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="wbsc-archive-year-panel"
                    >
                      <div className="wbsc-archive-chief-guest">
                        <FaUserTie /> Chief Guest: <strong>{yr.chiefGuest}</strong>
                      </div>
                      <p className="wbsc-archive-highlight">{yr.highlight}</p>
                      {yr.winners.length > 0 && (
                        <ul className="wbsc-archive-winners-list">
                          {yr.winners.map((w, wIdx) => (
                            <li key={wIdx}>
                              <FaAward className="wbsc-archive-winner-icon" />
                              <span><strong>{w.category}</strong> — {w.project} ({w.firm})</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <p className="wbsc-archive-note">{archive.note}</p>
        </div>
      </section>

      <section className="wbsc-cta-section">
        <div className="container wbsc-cta-inner">
          <FaEnvelopeOpenText className="wbsc-cta-icon" />
          <h2>Ready to showcase your best project?</h2>
          <p>Reach out to the BAI Pune Centre WBSC Committee for entry guidance and category clarifications.</p>
          <a href={`mailto:${data.contactEmail}`} className="btn btn-primary">Register for WBSC 2026 Today</a>
        </div>
      </section>
    </div>
  );
};

export default WBSCAwards;
