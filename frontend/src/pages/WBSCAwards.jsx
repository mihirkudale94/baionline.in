import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wbscAwardsData, wbscArchiveData, nirmanRatnaData } from "../services/api";
import { FaTrophy, FaCheckCircle, FaClipboardCheck, FaFilePdf, FaFileWord, FaDownload, FaEnvelopeOpenText, FaLayerGroup, FaAward, FaHistory, FaChevronDown, FaUserTie, FaCalendarAlt, FaRegCalendarCheck, FaListUl, FaCrown, FaBookmark, FaLock } from "react-icons/fa";
import StepFlow from "../components/StepFlow";
import MembershipPaymentModal from "../components/MembershipPaymentModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./WBSCAwards.css";

const WBSCAwards = () => {
  const data = wbscAwardsData;
  const archive = wbscArchiveData;
  const nirman = nirmanRatnaData;
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeArchiveYear, setActiveArchiveYear] = useState(null);
  const [wbscPayModalOpen, setWbscPayModalOpen] = useState(false);
  useDocumentTitle("WBSC Awards");

  /* The two circulars are the primary call to action on this page —
     everything an applicant needs is inside them. */
  const entryForm = data.downloads.find((d) => d.key === "entry-form");
  const invitation = data.downloads.find((d) => d.key === "invitation");

  return (
    <div className="wbsc-page-wrapper">
      {/* Purpose-built WBSC 2026 banner: clean brand surface, no photographic
          scrim, with the competition roundel and the trophy carrying the
          identity rather than stock imagery. */}
      <section className="wbsc-hero-section">
        <div className="wbsc-hero-banner-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="wbsc-banner-card"
          >
            <img
              src={data.banner || "/images/wbsc/wbsc-2026-banner.jpg"}
              alt="Well Built Structure Competition 2026 Official Banner"
              className="wbsc-hero-banner-img"
            />
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
          {data.mastersCategoryNote && (
            <div className="wbsc-masters-note">
              <FaCrown className="wbsc-masters-icon" />
              <p>{data.mastersCategoryNote}</p>
            </div>
          )}
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

      {/* Tentative programme from the invitation circular. Only the entry
          form date is fixed; the rest are conveyed to applicants directly. */}
      <section className="wbsc-schedule-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Programme</span>
            <h2 className="section-title">Schedule for WBSC 2026</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-schedule-list">
            {data.schedule.milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`wbsc-schedule-item ${m.confirmed ? "confirmed" : ""}`}
              >
                <span className="wbsc-schedule-marker">
                  {m.confirmed ? <FaRegCalendarCheck /> : <FaCalendarAlt />}
                </span>
                <div className="wbsc-schedule-body">
                  <span className="wbsc-schedule-date">{m.date}</span>
                  <p className="wbsc-schedule-desc">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="wbsc-schedule-note">{data.schedule.note}</p>
        </div>
      </section>

      <section className="wbsc-downloads-section" id="wbsc-downloads">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Resources</span>
            <h2 className="section-title">Downloads</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-downloads-grid">
            {data.downloads.map((dl, idx) => {
              const available = dl.status === "available" && dl.file;
              const Icon = dl.format === "DOCX" ? FaFileWord : FaFilePdf;
              return (
                <motion.div
                  key={dl.key || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`wbsc-download-card glass-card ${available ? "" : "is-pending"}`}
                >
                  <Icon className="wbsc-download-icon" />
                  <h4>{dl.label}</h4>
                  {dl.desc && <p className="wbsc-download-desc">{dl.desc}</p>}
                  {dl.note && <p className="wbsc-download-note">{dl.note}</p>}
                  {available ? (
                    <>
                      <span className="wbsc-download-meta">{dl.format} · {dl.size}</span>
                      <a href={dl.file} download className="wbsc-download-btn">
                        <FaDownload /> Download {dl.format}
                      </a>
                    </>
                  ) : (
                    <span className="wbsc-download-status">Download coming soon</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to assemble before opening the entry form. */}
      <section className="wbsc-checklist-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Before you apply</span>
            <h2 className="section-title">What the Entry Form Asks For</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="wbsc-checklist-grid">
            {data.entryChecklist.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="wbsc-checklist-card"
              >
                <h3 className="wbsc-checklist-heading"><FaListUl /> {block.heading}</h3>
                <ul className="wbsc-checklist-items">
                  {block.items.map((item, i) => (
                    <li key={i}><FaCheckCircle className="wbsc-checklist-icon" /> {item}</li>
                  ))}
                </ul>
              </motion.div>
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

          <div style={{ textAlign: "center", margin: "2rem 0 1rem" }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ borderRadius: "30px", padding: "0.9rem 2rem", fontSize: "1rem", fontWeight: "700", boxShadow: "0 4px 15px rgba(26,115,232,0.3)" }}
              onClick={() => setWbscPayModalOpen(true)}
            >
              <FaLock style={{ marginRight: "0.5rem" }} /> Pay WBSC 2026 Entry Fee Online (₹29,500 via Razorpay)
            </button>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Includes ₹25,000 Entry Fee + 18% GST. Instant Razorpay verification &amp; GST Tax Invoice receipt.
            </p>
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

      {/* Advance reservation for the next two editions — new with the
          2026 circular, and the reason entries stay open year-round. */}
      <section className="wbsc-advance-section">
        <div className="container">
          <div className="wbsc-advance-card">
            <span className="wbsc-advance-badge"><FaBookmark /> Now open</span>
            <h2 className="wbsc-advance-title">{data.advanceRegistration.title}</h2>
            <p className="wbsc-advance-body">{data.advanceRegistration.body}</p>
            <ul className="wbsc-advance-list">
              {data.advanceRegistration.points.map((p, idx) => (
                <li key={idx}><FaCheckCircle className="wbsc-advance-icon" /> {p}</li>
              ))}
            </ul>
            {entryForm?.file && (
              <a href={entryForm.file} download className="btn btn-primary wbsc-advance-btn">
                <FaDownload /> Download Reservation Form
              </a>
            )}
          </div>
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

      {wbscPayModalOpen && (
        <MembershipPaymentModal
          plan={{
            id: "annual",
            name: "WBSC 2026 Competition Entry Fee",
            total: "29,500",
            cycle: "per entry (incl. 18% GST)"
          }}
          onClose={() => setWbscPayModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WBSCAwards;
