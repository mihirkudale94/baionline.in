import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPastPresidentsData, puneOfficeBearersData } from "../services/api";
import { FaAward, FaInfoCircle } from "react-icons/fa";
import "./PastPresidents.css";

const PastPresidents = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState(puneOfficeBearersData.roles[0].id);

  useEffect(() => {
    getPastPresidentsData().then((res) => {
      setList(res);
      setLoading(false);
    });
  }, []);

  const activeRoleData = puneOfficeBearersData.roles.find((r) => r.id === activeRole);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Office Bearers Archive...</span>
      </div>
    );
  }

  return (
    <div className="presidents-page-wrapper">
      <section className="presidents-hero-section">
        <div className="presidents-hero-overlay"></div>
        <div className="container presidents-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="presidents-hero-content"
          >
            <span className="presidents-tag">Pune Centre Archives</span>
            <h1 className="presidents-title">Past Office Bearers</h1>
            <p className="presidents-subtitle">Honor roll of BAI Pune Centre's own leaders through the years</p>
          </motion.div>
        </div>
      </section>

      <section className="pune-bearers-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Pune Centre Legacy</span>
            <h2 className="section-title">BAI Pune Centre — Past Office Bearers</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="pune-bearers-notice">
            <FaInfoCircle /> <span>{puneOfficeBearersData.note}</span>
          </div>

          <div className="pune-bearers-role-tabs">
            {puneOfficeBearersData.roles.map((role) => (
              <button
                key={role.id}
                className={`pune-bearers-role-tab ${activeRole === role.id ? "active" : ""}`}
                onClick={() => setActiveRole(role.id)}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div className="pune-bearers-grid animate-fadeInUp">
            {activeRoleData.members.map((m, idx) => (
              <div key={idx} className="pune-bearer-card glass-card">
                <span className="pune-bearer-tenure">{m.year}</span>
                <h4 className="pune-bearer-name">{m.name}</h4>
              </div>
            ))}
          </div>

          <div className="pune-bearers-photo-note glass-card">
            <FaAward className="pune-bearers-photo-icon" />
            <p>Photographs of the Pune Centre office bearer display boards will be added here once provided.</p>
          </div>
        </div>
      </section>

      <section className="presidents-list-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Historical Reference</span>
            <h2 className="section-title">BAI National — Past Presidents</h2>
            <div className="section-title-line"></div>
            <p className="section-intro">
              Pune is the founding city of the Builders' Association of India — the national body BAI Pune Centre belongs to. Shown below for historical reference is the national Presidents' lineage since 1941.
            </p>
          </div>
          <div className="presidents-grid animate-fadeInUp">
            {list.map((item, idx) => (
              <div key={idx} className="president-archive-card glass-card">
                <div className="card-badge"><FaAward /></div>
                <span className="president-tenure">{item.year}</span>
                <h3 className="president-archive-name">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastPresidents;
