import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "../components/ImageLightbox";
import { FaDownload, FaEnvelopeOpenText } from "react-icons/fa";
import "./Publications.css";

const Publications = () => {
  const issues = [
    { month: "June 2026", cover: "https://www.baionline.in/public/frontend/images/Banner-3-1.jpg", title: "Special Issue on Infrastructure Developments" },
    { month: "May 2026", cover: "https://www.baionline.in/public/frontend/images/21.jpg", title: "Modern Concrete Foundations & Technologies" },
    { month: "April 2026", cover: "https://www.baionline.in/public/frontend/images/Banner-1.jpg", title: "Real Estate Growth & Regulatory Environment" },
    { month: "March 2026", cover: "https://www.baionline.in/public/frontend/images/Banner-2-11.jpg", title: "Smart City Civil Engineering Advancements" }
  ];

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  const handleOpenLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <div className="publications-page-wrapper">
      {/* Banner */}
      <section className="pub-hero-section">
        <div className="pub-hero-overlay"></div>
        <div className="container pub-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pub-hero-content"
          >
            <span className="pub-tag">BAI Publications</span>
            <h1 className="pub-title">Indian Construction Journal</h1>
            <p className="pub-subtitle">Official monthly publication of Builders Association of India</p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pub-list-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Monthly Journals</span>
            <h2 className="section-title">Recent Journal Issues</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="journals-grid">
            {issues.map((issue, idx) => (
              <motion.div
                key={idx}
                className="journal-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div 
                  className="journal-cover-wrapper" 
                  onClick={() => handleOpenLightbox(issue.cover, `${issue.title} (${issue.month})`)}
                  style={{ cursor: "zoom-in" }}
                >
                  <div
                    className="journal-cover-bg"
                    style={{ backgroundImage: `url(${issue.cover})` }}
                  ></div>
                  <div className="journal-overlay-gradient"></div>
                  <span className="journal-badge">{issue.month}</span>
                </div>
                <div className="journal-info">
                  <h3 className="journal-title">{issue.title}</h3>
                  <a href="#" className="btn btn-outline download-btn">
                    Download PDF <FaDownload className="btn-icon" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscription Box */}
          <div className="subscription-box glass-card text-center">
            <div className="sub-icon-wrapper"><FaEnvelopeOpenText /></div>
            <h2>Subscribe to Indian Construction</h2>
            <p>Get our official print or digital monthly journal delivered directly to your firm's mailbox.</p>
            <div className="sub-input-row">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-primary">Subscribe Now</button>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox 
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default Publications;
