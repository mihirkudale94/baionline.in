import React, { useState } from "react";
import { motion } from "framer-motion";
import { eventsPageData } from "../services/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaAward } from "react-icons/fa";
import ImageLightbox from "../components/ImageLightbox";
import "./Events.css";

const Events = () => {
  const data = eventsPageData;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <div className="events-page-wrapper">
      <section className="events-hero-section">
        <div className="events-hero-overlay"></div>
        <div className="container events-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="events-hero-content"
          >
            <span className="events-tag">BAI Pune Centre</span>
            <h1 className="events-title">{data.title}</h1>
            <p className="events-subtitle">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="events-upcoming-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Sample placeholder entries</span>
            <h2 className="section-title">Upcoming Events</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="events-card-grid">
            {data.upcoming.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="event-card glass-card"
              >
                <div className="event-card-img" style={{ backgroundImage: `url(${ev.image})` }}></div>
                <div className="event-card-body">
                  <h3>{ev.title}</h3>
                  <div className="event-card-meta"><FaCalendarAlt /> {ev.date}</div>
                  <div className="event-card-meta"><FaMapMarkerAlt /> {ev.venue}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-past-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Archive</span>
            <h2 className="section-title">Past Events</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="events-timeline-list">
            {data.past.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="event-timeline-card glass-card"
              >
                <div className="event-timeline-icon"><FaAward /></div>
                <div className="event-timeline-content">
                  <h4>{ev.title}</h4>
                  <div className="event-card-meta"><FaCalendarAlt /> {ev.date} &middot; <FaMapMarkerAlt /> {ev.venue}</div>
                  <div className="event-timeline-links">
                    {ev.links.map((l, lIdx) => (
                      <span key={lIdx} className="event-timeline-link-chip">{l}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-activities-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Ongoing Programs</span>
            <h2 className="section-title">Regular Activities</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="events-activities-list">
            {data.regularActivities.map((act, idx) => (
              <div key={idx} className="events-activity-chip">{act}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-gallery-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Snapshots</span>
            <h2 className="section-title">Photo Gallery</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="events-gallery-grid">
            {data.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                className="news-card glass-card events-gallery-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => openLightbox(img.src, img.caption)}
              >
                <div className="news-img-wrapper">
                  <div className="news-img-bg" style={{ backgroundImage: `url(${img.src})` }}></div>
                </div>
                <div className="news-content">
                  <p className="news-desc">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-calendar-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">At a glance</span>
            <h2 className="section-title">Event Calendar</h2>
            <div className="section-title-line"></div>
          </div>
          <div className="events-calendar-list">
            {data.calendar.map((month, idx) => (
              <div key={idx} className="events-calendar-month glass-card">
                <h4>{month.month}</h4>
                <ul>
                  {month.items.map((item, iIdx) => <li key={iIdx}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default Events;
