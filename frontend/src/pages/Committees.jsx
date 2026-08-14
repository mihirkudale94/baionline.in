import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getCommitteesData,
  getExecutiveCommitteeData,
  getCommitteeGuidelines
} from "../services/api";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useHashScroll from "../hooks/useHashScroll";
import "./Committees.css";

/* This page renders the Centre's "Constitution of Committees for the Year
   2026-27" circular and nothing else — every heading, name and sentence below
   comes from that document. */
const Committees = () => {
  useDocumentTitle("Committees");
  const [list, setList] = useState([]);
  const [exec, setExec] = useState(null);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wait for the committee data before jumping to #executive / #standing.
  useHashScroll(!loading);

  useEffect(() => {
    Promise.all([
      getCommitteesData(),
      getExecutiveCommitteeData(),
      getCommitteeGuidelines()
    ]).then(([committees, execData, docData]) => {
      setList(committees);
      setExec(execData);
      setDoc(docData);
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

  const execMembers = (exec && exec.members) || [];

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
            <h1 className="committees-title">Committees 2026–27</h1>
            {doc && <p className="committees-subtitle">{doc.subject}</p>}
          </motion.div>
        </div>
      </section>

      {/* Preamble */}
      {doc && (
        <section className="committees-intro-section">
          <div className="container">
            <p className="committees-intro">{doc.intro}</p>
          </div>
        </section>
      )}

      {/* General Guidelines for All Committees */}
      {doc && doc.rules && doc.rules.length > 0 && (
        <section className="committees-guidelines-section" id="guidelines">
          <div className="container">
            <h2 className="committees-section-title">{doc.heading}</h2>
            <div className="section-title-line"></div>
            <p className="committees-lead">{doc.lead}</p>

            <ol className="guideline-list">
              {doc.rules.map((rule, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="guideline-item"
                >
                  <span className="guideline-num">{idx + 1}</span>
                  <span className="guideline-text">{rule}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Committees and Members */}
      <section className="committees-list-section" id="standing">
        <div className="container">
          <h2 className="committees-section-title">Committees and Members</h2>
          <div className="section-title-line"></div>

          <div className="committee-blocks">
            {list.map((committee, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="committee-block"
              >
                <h3 className="committee-block-title">{committee.name}</h3>
                <ul className="committee-member-list">
                  {committee.members.map((m, mIdx) => (
                    <li key={mIdx} className="committee-member">{m}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee 2026–27 */}
      <section className="exec-committee-section" id="executive">
        <div className="container">
          <h2 className="committees-section-title">Executive Committee 2026–27</h2>
          <div className="section-title-line"></div>

          <ol className="exec-members-roster">
            {execMembers.map((m, idx) => (
              <li key={idx} className="roster-item">
                <span className="roster-index">{idx + 1}.</span>
                <span className="roster-name">{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing */}
      {doc && doc.closing && (
        <section className="committees-closing-section">
          <div className="container">
            <p className="committees-closing">{doc.closing}</p>
            <p className="committees-signoff">{doc.signoff}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Committees;
