import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getHomeData } from "../services/api";
import HeroCarousel from "../components/HeroCarousel";
import StatsBar from "../components/StatsBar";
import LeadershipTabs from "../components/LeadershipTabs";
import ImageLightbox from "../components/ImageLightbox";
import TiltCard from "../components/TiltCard";
import { FaBuilding, FaGlobe, FaArrowRight, FaBullhorn, FaBookOpen, FaCalendarAlt, FaNewspaper, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lightbox overlay state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  useEffect(() => {
    getHomeData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleOpenLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Builders Association of India...</span>
      </div>
    );
  }

  return (
    <div className="home-page-wrapper">
      {/* 1. Hero Carousel */}
      <HeroCarousel slides={data.heroSlides} />

      {/* 2. News Alert Marquee Bar */}
      <div className="news-ticker-bar">
        <div className="ticker-label">
          <FaBullhorn className="ticker-icon" />
          <span>Latest Update:</span>
        </div>
        <div className="ticker-track">
          <div className="ticker-content">
            {data.newsTicker.map((item, idx) => (
              <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="ticker-item">
                • {item.text} <span className="ticker-readmore">(Read PDF)</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Stats Bar */}
      <StatsBar stats={data.stats} />

      {/* 4. Split Layout: Main Content (Left) & Widgets (Right) */}
      <section className="home-main-layout">
        <div className="container split-grid">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="left-content-column">
            
            {/* History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="welcome-text-block glass-card"
            >
              <span className="subtitle">Welcome to BAI Pune Centre</span>
              <h2 className="welcome-title">Building Better Infrastructure. Empowering the Construction Industry.</h2>
              <div className="title-line"></div>
              <p className="welcome-desc">
                Founded in 1941 right here in Pune under the guidance of Brig. C.V.S. Jackson of Military Engineering Services, the Builders' Association of India (BAI) began as a body to find solutions to builders' problems — and Pune Centre carries that founding legacy forward today, representing builders, contractors, consultants, engineers and developers in and around the city. As a constituent centre of BAI's nationwide network, Pune Centre also connects its members to India's largest construction industry body — 264+ regional centres strong across the country.
              </p>
              <div className="welcome-features-list">
                <div className="feature-item">
                  <div className="feature-icon-wrapper"><FaBuilding /></div>
                  <div>
                    <h4>Since 1941</h4>
                    <p>Pune Centre — the birthplace of BAI, still active and growing.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper"><FaGlobe /></div>
                  <div>
                    <h4>Part of BAI's National Network</h4>
                    <p>264+ regional centres across India, organized in 5 zones.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary welcome-cta">
                Read Our History <FaArrowRight style={{ marginLeft: "6px" }} />
              </Link>
            </motion.div>

            {/* Indian Construction Bulletin Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bulletin-section glass-card"
            >
              <div className="bulletin-header">
                <FaBookOpen className="header-icon" />
                <h3>{data.indianConstruction.title}</h3>
              </div>
              <p className="bulletin-subtitle">{data.indianConstruction.subtitle}</p>
              
              <div className="bulletin-body-grid">
                <div className="bulletin-cover-col">
                  <img 
                    src={data.indianConstruction.cover_image} 
                    alt="Indian Construction Bulletin Cover" 
                    className="bulletin-cover-img"
                    loading="lazy"
                    onClick={() => handleOpenLightbox(data.indianConstruction.cover_image, data.indianConstruction.title)}
                    style={{ cursor: "zoom-in" }}
                  />
                </div>
                <div className="bulletin-info-col">
                  <p className="bulletin-desc">{data.indianConstruction.desc}</p>
                  <div className="bulletin-buttons">
                    <a href={data.indianConstruction.links.advertise} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Advertise</a>
                    <a href={data.indianConstruction.links.archives} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Archives</a>
                    <a href={data.indianConstruction.links.subscribe} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">Subscribe Form</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Announcements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="announcements-layout glass-card"
            >
              <div className="section-header-box">
                <FaBullhorn className="header-icon" />
                <h3>Active Announcements</h3>
              </div>
              <div className="announcements-grid">
                {data.announcements.map((ann, idx) => (
                  <div key={idx} className="announcement-item-card">
                    {ann.image && (
                      <img 
                        src={ann.image} 
                        alt={ann.title} 
                        className="ann-thumbnail"
                        loading="lazy"
                        onClick={() => handleOpenLightbox(ann.image, ann.title)}
                        style={{ cursor: "zoom-in" }}
                      />
                    )}
                    <div className="ann-text-details">
                      <h4>{ann.title}</h4>
                      <p>{ann.desc}</p>
                      <a href={ann.pdf} target="_blank" rel="noreferrer" className="btn btn-primary btn-xs">
                        <FaFilePdf style={{ marginRight: "6px" }} /> View PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map Presence Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="presence-map-layout glass-card"
            >
              <div className="section-header-box">
                <FaGlobe className="header-icon" />
                <h3>BAI's National Network</h3>
              </div>
              <p className="map-desc">BAI Pune Centre is part of a nationwide network present in more than 264+ city centres across the country. Click on any map image below to view it in full resolution.</p>
              
              <div className="presence-maps-grid">
                <div className="map-card">
                  <img 
                    src="/images/map-171.png" 
                    alt="Permanent Regional Offices Map" 
                    className="india-map-img"
                    loading="lazy"
                    onClick={() => handleOpenLightbox("/images/map-171.png", "Permanent Regional Offices Map")}
                    style={{ cursor: "zoom-in" }}
                  />
                  <span>Permanent Regional Offices</span>
                </div>
                <div className="map-card">
                  <img 
                    src="/images/map-new-bg-full.png" 
                    alt="National Coverage Boundaries Map" 
                    className="india-map-img"
                    loading="lazy"
                    onClick={() => handleOpenLightbox("/images/map-new-bg-full.png", "National Coverage Boundaries Map")}
                    style={{ cursor: "zoom-in" }}
                  />
                  <span>National Coverage Boundaries</span>
                </div>
              </div>
            </motion.div>

            {/* Events Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="events-gallery-layout glass-card"
            >
              <div className="section-header-box">
                <FaCalendarAlt className="header-icon" />
                <h3>Recent Events & Conventions</h3>
              </div>
              
              <div className="events-grid-cards">
                {data.events.map((evt, idx) => (
                  <TiltCard key={idx} className="event-item-card">
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      className="event-flyer-img"
                      loading="lazy"
                      onClick={() => handleOpenLightbox(evt.image, evt.title)}
                      style={{ cursor: "zoom-in" }}
                    />
                    <div className="event-info-pane">
                      <h4>{evt.title}</h4>
                      <span className="evt-date">{evt.date}</span>
                      <p className="evt-venue">{evt.venue}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE WIDGETS COLUMN */}
          <div className="right-widgets-column">
            
            {/* Nitin Gadkari Widget */}
            <TiltCard className="widget-card minister-widget" maxTilt={6}>
              <div 
                className="minister-avatar" 
                style={{ backgroundImage: "url(/images/nitin-gadkari.jpg)", cursor: "zoom-in" }}
                onClick={() => handleOpenLightbox("/images/nitin-gadkari.jpg", "Shri Nitin Gadkari Interaction")}
              ></div>
              <div className="minister-details">
                <h4>Ministerial Interaction</h4>
                <p>Hon'ble Shri Nitin Gadkari (Union Minister of Road Transport & Highways) interactive session details with BAI leadership board.</p>
                <Link to="/media" className="btn btn-secondary btn-sm">Read Details</Link>
              </div>
            </TiltCard>

            {/* Youtube Channel Widget */}
            <div className="widget-card youtube-widget">
              <a href="https://youtube.com/user/baihqmumbai" target="_blank" rel="noreferrer">
                <img src="/images/bai-on-youtube.gif" alt="BAI YouTube Channel" className="yt-gif-banner" loading="lazy" />
              </a>
            </div>

            {/* Latest News Feed Widget */}
            <div className="widget-card news-feed-widget glass-card">
              <div className="widget-header">
                <FaNewspaper className="widget-icon" />
                <h3>Communique Feed</h3>
              </div>
              
              <ul className="communique-links-list">
                {data.newsTicker.map((item, idx) => (
                  <li key={idx}>
                    <p>{item.text}</p>
                    <a href={item.link} target="_blank" rel="noreferrer" className="feed-download-link">
                      Download document (PDF)
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cloud Partner / Sponsor Ad */}
            <div className="widget-card sponsor-ad-widget">
              <span className="ad-label">SPONSOR PARTNER</span>
              <img 
                src="/images/sponsor_ad.png" 
                alt="BAI Cloud Sponsor Partner" 
                className="sponsor-ad-logo" 
                onClick={() => handleOpenLightbox("/images/sponsor_ad.png", "BAI Cloud Sponsor Partner")}
                style={{ cursor: "zoom-in" }}
              />
            </div>

          </div>

        </div>
      </section>

      {/* 5. Leadership Section */}
      <LeadershipTabs leadership={data.leadership} />

      {/* 6. Quick Links CTA Area */}
      <section className="cta-action-section">
        <div className="container action-grid">
          <TiltCard className="action-card glass-card" maxTilt={5}>
            <h3>Become a Pune Centre Member</h3>
            <p>Join BAI Pune Centre and connect with builders, contractors and developers across the city — and BAI's nationwide network.</p>
            <Link to="/membership" className="btn btn-primary">Become a Member</Link>
          </TiltCard>
          <TiltCard className="action-card orange-card" maxTilt={5}>
            <h3>Get In Touch</h3>
            <p>Have questions about sponsorship, tenders, publications or Pune Centre membership? We are here to assist you.</p>
            <Link to="/contact" className="btn btn-secondary">Contact Pune Centre</Link>
          </TiltCard>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <ImageLightbox 
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default Home;
