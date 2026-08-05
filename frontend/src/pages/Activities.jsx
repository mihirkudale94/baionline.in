import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { activities } from "../services/api";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useHashScroll from "../hooks/useHashScroll";
import "./Activities.css";

const Activities = () => {
  useDocumentTitle("BAI Activities");
  useHashScroll();

  return (
    <div className="activities-page-wrapper">
      <section className="activities-hero-section">
        <div className="activities-hero-overlay"></div>
        <div className="container activities-hero-container">
          <div className="activities-hero-content">
            <span className="activities-tag">Pune Centre</span>
            <h1 className="activities-title">BAI Activities</h1>
            <p className="activities-subtitle">
              What the Pune Centre runs for its members through the year
            </p>
          </div>
        </div>
      </section>

      <section className="activities-list-section">
        <div className="container">
          {activities.map((act, idx) => (
            <motion.article
              key={act.slug}
              id={act.slug}
              className={`activity-row ${idx % 2 === 1 ? "activity-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="activity-media">
                <img src={act.image} alt={act.title} loading="lazy" />
              </div>
              <div className="activity-body">
                <span className="activity-index">{String(idx + 1).padStart(2, "0")}</span>
                <h2 className="activity-heading">{act.title}</h2>
                <p className="activity-summary">{act.summary}</p>
                <Link to="/events" className="btn btn-secondary btn-sm">
                  See related events
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Activities;
