import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContactData } from "../services/api";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Contact.css";

const Contact = () => {
  useDocumentTitle("Contact");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    getContactData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate API form post
    setTimeout(() => {
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 800);
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Contact details...</span>
      </div>
    );
  }

  return (
    <div className="contact-page-wrapper">
      {/* 1. Header Banner */}
      <section className="contact-hero-section">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-hero-content"
          >
            <span className="contact-tag">Get in Touch</span>
            <h1 className="contact-title">{data.title}</h1>
            <p className="contact-subtitle">Builders Association of India Headquarters</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Contact Row */}
      <section className="contact-main-section">
        <div className="container contact-grid">
          {/* Contact Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-info-col"
          >
            <h2 className="contact-section-title">Head Office Location</h2>
            <div className="title-line"></div>
            
            <div className="info-cards-stack">
              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h3>Address</h3>
                  <p>{data.office.name}</p>
                  <p>{data.office.address}</p>
                </div>
              </div>

              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaPhoneAlt /></div>
                <div>
                  <h3>Telephone & Fax</h3>
                  <p>Tel: {data.office.tel.join(", ")}</p>
                  <p>Fax: {data.office.phone}</p>
                </div>
              </div>

              <div className="info-detail-card glass-card">
                <div className="detail-icon"><FaEnvelope /></div>
                <div>
                  <h3>Email</h3>
                  <p><a href={`mailto:${data.office.email}`}>{data.office.email}</a></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-form-col"
          >
            <div className="form-card glass-card">
              <h2 className="form-title">Send us a Message</h2>
              
              {formSubmitted ? (
                <div className="form-success-alert animate-fadeInUp">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. Our head office representatives will get in touch with you shortly.</p>
                  <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-feedback-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject of query"
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your query..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary form-submit-btn">
                    Send Message <FaPaperPlane className="submit-icon" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Google Map */}
      <section className="contact-map-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="contact-section-title">Find Us on the Map</h2>
            <div className="title-line"></div>
            <div className="contact-map-frame glass-card">
              <iframe
                title="BAI Head Office Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${data.office.name}, ${data.office.address}`
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
