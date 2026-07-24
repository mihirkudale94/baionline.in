import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCommitteesData, executiveCommittee } from "../services/api";
import { FaUserCircle, FaBookOpen, FaChevronDown, FaUsers } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Committees.css";

const Committees = () => {
  useDocumentTitle("Committees");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    getCommitteesData().then((res) => {
      setList(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Committees...</span>
      </div>
    );
  }

  const handleToggle = (idx) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  const execCards = [
    executiveCommittee.chairman,
    executiveCommittee.vice_chairman,
    executiveCommittee.hon_secretary,
    executiveCommittee.hon_joint_secretary,
    executiveCommittee.hon_treasurer
  ].filter(Boolean);

  return (
    <div className="committees-page-wrapper">
      <section className="committees-hero-section">
        <div className="committees-hero-overlay"></div>
        <div className="container committees-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="committees-hero-content"
          >
            <span className="committees-tag">Pune Centre Governance</span>
            <h1 className="committees-title">Committees 2026–27</h1>
            <p className="committees-subtitle">Working Together for Industry Growth</p>
          </motion.div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="exec-committee-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Leadership</span>
            <h2 className="section-title">Executive Committee</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="exec-committee-grid">
            {execCards.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="exec-card glass-card"
              >
                <div className="exec-avatar"><FaUserCircle /></div>
                <h4 className="exec-role">{person.role}</h4>
                <p className={`exec-name ${!person.name ? "tba" : ""}`}>{person.name || "To be announced"}</p>
              </motion.div>
            ))}
          </div>

          {executiveCommittee.members && executiveCommittee.members.length > 0 && (
            <div className="exec-members-card glass-card">
              <div className="exec-members-header">
                <FaUsers className="exec-members-icon" />
                <h4>Executive Members</h4>
              </div>
              <div className="exec-members-list">
                {executiveCommittee.members.map((m, idx) => (
                  <span key={idx} className="exec-member-chip">{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Functional Committees Accordion */}
      <section className="committees-list-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Functional Committees</span>
            <h2 className="section-title">Standing Committees</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="committees-accordion-list">
            {list.map((committee, idx) => (
              <div key={idx} className={`committee-accordion-item ${activeAccordion === idx ? "active" : ""}`}>
                <button className="committee-accordion-trigger" onClick={() => handleToggle(idx)}>
                  <div className="committee-accordion-title">
                    <div className="header-icon"><FaBookOpen /></div>
                    <span>{committee.name}</span>
                  </div>
                  <FaChevronDown className="arrow-icon" />
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="committee-accordion-panel"
                    >
                      <p className="committee-desc">{committee.desc}</p>
                      <div className="committee-chairman-row">
                        <FaUserCircle className="footer-icon" />
                        <div>
                          <span className="footer-label">Chairperson</span>
                          <h4 className="chairman-name">{committee.chairman || "To be announced"}</h4>
                        </div>
                      </div>
                      {committee.members && committee.members.length > 0 && (
                        <div className="committee-members-row">
                          <span className="footer-label">Members</span>
                          <div className="exec-members-list">
                            {committee.members.map((m, mIdx) => (
                              <span key={mIdx} className="exec-member-chip">{m}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Committees;
