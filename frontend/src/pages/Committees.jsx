import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCommitteesData } from "../services/api";
import { FaUserCircle, FaBookOpen } from "react-icons/fa";
import "./Committees.css";

const Committees = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <span className="committees-tag">Governing Council</span>
            <h1 className="committees-title">Standing Committees</h1>
            <p className="committees-subtitle">National committees executing BAI objectives across sectors</p>
          </motion.div>
        </div>
      </section>

      <section className="committees-list-section">
        <div className="container">
          <div className="committees-grid animate-fadeInUp">
            {list.map((committee, idx) => (
              <div key={idx} className="committee-card glass-card">
                <div className="committee-card-header">
                  <div className="header-icon"><FaBookOpen /></div>
                  <h3 className="committee-name">{committee.name}</h3>
                </div>
                <div className="committee-card-body">
                  <p className="committee-desc">{committee.desc}</p>
                </div>
                <div className="committee-card-footer">
                  <FaUserCircle className="footer-icon" />
                  <div>
                    <span className="footer-label">Committee Chairman</span>
                    <h4 className="chairman-name">{committee.chairman}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Committees;
