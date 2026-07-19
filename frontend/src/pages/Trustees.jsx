import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrusteesData } from "../services/api";
import { FaUserShield } from "react-icons/fa";
import "./Trustees.css";

const Trustees = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrusteesData().then((res) => {
      setList(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Trustees...</span>
      </div>
    );
  }

  return (
    <div className="trustees-page-wrapper">
      <section className="trustees-hero-section">
        <div className="trustees-hero-overlay"></div>
        <div className="container trustees-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="trustees-hero-content"
          >
            <span className="trustees-tag">Governing Council</span>
            <h1 className="trustees-title">Board of Trustees</h1>
            <p className="trustees-subtitle">Guardians of Builders Association of India assets and trusts</p>
          </motion.div>
        </div>
      </section>

      <section className="trustees-list-section">
        <div className="container">
          <div className="trustees-grid animate-fadeInUp">
            {list.map((trustee, idx) => (
              <div key={idx} className="trustee-card glass-card">
                <div className="trustee-icon-box"><FaUserShield /></div>
                <h3 className="trustee-name">{trustee.name}</h3>
                <span className="trustee-role">{trustee.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trustees;
