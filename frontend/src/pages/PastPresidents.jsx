import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPastPresidentsData } from "../services/api";
import { FaAward } from "react-icons/fa";
import "./PastPresidents.css";

const PastPresidents = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPastPresidentsData().then((res) => {
      setList(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Presidents Archive...</span>
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
            <span className="presidents-tag">BAI Archives</span>
            <h1 className="presidents-title">Past Presidents</h1>
            <p className="presidents-subtitle">Honor roll of our association leaders since 1941</p>
          </motion.div>
        </div>
      </section>

      <section className="presidents-list-section">
        <div className="container">
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
