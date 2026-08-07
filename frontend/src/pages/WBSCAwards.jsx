import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wbscAwardsData, wbscArchiveData, nirmanRatnaData } from "../services/api";
import { FaTrophy, FaCheckCircle, FaClipboardCheck, FaFilePdf, FaEnvelopeOpenText, FaLayerGroup, FaAward, FaHistory, FaChevronDown, FaUserTie } from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./WBSCAwards.css";

const WBSCAwards = () => {
  const data = wbscAwardsData;
  const archive = wbscArchiveData;
  const nirman = nirmanRatnaData;
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeArchiveYear, setActiveArchiveYear] = useState(null);
  useDocumentTitle("WBSC Awards");

  return (
    <div className="wbsc-page-wrapper">
      {/* Purpose-built WBSC 2026 banner: clean brand surface, no photographic
          scrim, with the competition roundel and the trophy carrying the
          identity rather than stock imagery. */}
      <section className="wbsc-hero-section">
        <div className="container wbsc-hero-container">
          <motion.img
            src={data.logo}
            alt="Well Built Structure Competition — Since 1997"
            className="wbsc-hero-logo"
            width={640}
            height={640}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="wbsc-hero-content"
          >
            <span className="wbsc-tag">{data.edition} · {data.since}</span>
            <h1 className="wbsc-title">{data.title}</h1>
            <p className="wbsc-subtitle">{data.tagline}</p>
            <div className="wbsc-hero-actions">
              <a href={`mailto:${data.contactEmail}`} className="btn btn-primary">Enter WBSC 2026</a>
              <a href="#wbsc-entry-terms" className="btn btn-outline wbsc-hero-btn-ghost">Entry details</a>
            </div>
            {data.openEntriesNote && (
              <p className="wbsc-hero-open">{data.openEntriesNote}</p>
            )}
          </motion.div>
          <motion.img
            src={data.trophy}
            alt="The WBSC trophy"
            className="wbsc-hero-trophy"
            width={334}
            height={720}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
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
            <span className="subtitle">{data.categoryCount} Categories</span>
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

      <section className="wbsc-entry-terms-section" id="wbsc-entry-terms">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Entry</span>
            <h2 className="section-title">Fees & Submission Terms</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-entry-terms-grid">
            {data.entryTerms.map((term, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="wbsc-entry-term-card glass-card"
              >
                <span className="wbsc-entry-term-label">{term.label}</span>
                <p className="wbsc-entry-term-value">{term.value}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="wbsc-block-title wbsc-presentation-title">
            <FaClipboardCheck /> Presentation Guidelines
          </h3>
          <ul className="wbsc-list wbsc-presentation-list">
            {data.presentationGuidelines.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lifetime achievement award presented alongside the WBSC. */}
      <section className="wbsc-nirman-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{nirman.subtitle}</span>
            <h2 className="section-title">
              <FaAward className="wbsc-nirman-title-icon" /> {nirman.title}
            </h2>
            <div className="section-title-line"></div>
          </div>
          <p className="wbsc-nirman-about">{nirman.about}</p>
          <div className="wbsc-nirman-grid">
            {nirman.awardees.map((a, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx, 8) * 0.04 }}
                className="wbsc-nirman-card"
              >
                <span className="wbsc-nirman-year">{a.year}</span>
                <span className="wbsc-nirman-name">{a.name}</span>
              </motion.div>
            ))}
          </div>
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
                      <dl className="wbsc-archive-meta">
                        {yr.chiefGuest && (
                          <div>
                            <dt><FaUserTie /> Chief Guest</dt>
                            <dd>{yr.chiefGuest}</dd>
                          </div>
                        )}
                        {yr.guestOfHonour && (
                          <div>
                            <dt><FaUserTie /> Guest of Honour</dt>
                            <dd>{yr.guestOfHonour}</dd>
                          </div>
                        )}
                        {yr.chairman && (
                          <div>
                            <dt>Chairman</dt>
                            <dd>{yr.chairman}</dd>
                          </div>
                        )}
                        {yr.convenor && (
                          <div>
                            <dt>Convenor</dt>
                            <dd>{yr.convenor}{yr.coConvenor ? ` · Co-Convenor: ${yr.coConvenor}` : ""}</dd>
                          </div>
                        )}
                      </dl>
                      {yr.highlight && <p className="wbsc-archive-highlight">{yr.highlight}</p>}
                      {yr.winners.length > 0 && (
                        <ul className="wbsc-archive-winners-list">
                          {yr.winners.map((w, wIdx) => (
                            <li key={wIdx}>
                              <FaAward className="wbsc-archive-winner-icon" />
                              <span><strong>{w.firm}</strong> — {w.category}</span>
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
