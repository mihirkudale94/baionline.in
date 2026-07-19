import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaCalendarAlt } from "react-icons/fa";
import "./Media.css";

const Media = () => {
  const news = [
    {
      title: "BAI representation on rising input materials cost discussed in Ministry",
      desc: "Our delegation led by President Ravindra Tyagi met union representatives to address concrete, steel and bitumens price trends affecting developers.",
      date: "July 15, 2026",
      image: "https://www.baionline.in/public/frontend/images/22.png",
      tag: "Press Release"
    },
    {
      title: "Builders Association calls for unified regulatory compliance system",
      desc: "BAI members discuss structural development permissions, environmental certifications and tax index compliance across states during the 2026 conference.",
      date: "June 20, 2026",
      image: "https://www.baionline.in/public/frontend/images/Banner-1.jpg",
      tag: "Conference"
    },
    {
      title: "National safety standards compliance workshop organized at Jackson Hut",
      desc: "Providing builders and site construction companies with structural safety checklists, materials validation metrics and workers security guidelines.",
      date: "May 10, 2026",
      image: "https://www.baionline.in/public/frontend/images/21.jpg",
      tag: "Workshop"
    }
  ];

  return (
    <div className="media-page-wrapper">
      {/* Banner */}
      <section className="media-hero-section">
        <div className="media-hero-overlay"></div>
        <div className="container media-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="media-hero-content"
          >
            <span className="media-tag">News & Press</span>
            <h1 className="media-title">BAI in Media</h1>
            <p className="media-subtitle">Latest updates, press releases and news coverage of Builders Association of India</p>
          </motion.div>
        </div>
      </section>

      {/* Main List */}
      <section className="media-list-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Press Coverage</span>
            <h2 className="section-title">Latest Media Updates</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="media-news-grid">
            {news.map((item, idx) => (
              <motion.div
                key={idx}
                className="news-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="news-img-wrapper">
                  <div
                    className="news-img-bg"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <span className="news-badge">{item.tag}</span>
                </div>
                
                <div className="news-content">
                  <div className="news-date">
                    <FaCalendarAlt className="date-icon" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-desc">{item.desc}</p>
                  <a href="#" className="read-more-link">
                    Read Full Article <FaPlay className="link-arrow" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
