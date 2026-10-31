import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContactData, submitForm } from "../services/api";
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
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    getContactData().then((res) => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      await submitForm("contact", { name, email, phone, subject, message });
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setSubmitError("Failed to send message. Please try again later or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
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
      <section className="contact-banner">
        <div className="contact-banner-art" aria-hidden="true">
          <svg
            className="contact-banner-skyline"
            viewBox="0 0 900 300"
            preserveAspectRatio="xMaxYMax slice"
            focusable="false"
          >
            {/* Skyline blocks — the city the association builds */}
            <g className="contact-banner-blocks">
              <rect x="300" y="170" width="86" height="130" />
              <rect x="398" y="118" width="64" height="182" />
              <rect x="474" y="196" width="104" height="104" />
              <rect x="590" y="86" width="78" height="214" />
              <rect x="680" y="152" width="58" height="148" />
              <rect x="750" y="112" width="112" height="188" />
            </g>
            {/* Floor lines */}
            <g className="contact-banner-floors">
              <path d="M300 206h86M300 242h86M300 278h86" />
              <path d="M398 154h64M398 190h64M398 226h64M398 262h64" />
              <path d="M474 232h104M474 268h104" />
              <path d="M590 122h78M590 158h78M590 194h78M590 230h78M590 266h78" />
              <path d="M680 188h58M680 224h58M680 260h58" />
              <path d="M750 148h112M750 184h112M750 220h112M750 256h112" />
            </g>
            {/* Tower crane */}
            <g className="contact-banner-crane">
              <path d="M548 300V44" />
              <path d="M470 56h210" />
              <path d="M548 44 470 56M548 44l132 12" />
              <path d="M548 56v18h-14v-18M548 74h14v-18" />
              <path d="M640 56v46" />
              <rect x="630" y="102" width="20" height="16" />
            </g>
            <path className="contact-banner-ground" d="M0 300h900" />
          </svg>
        </div>

        <div className="container contact-banner-inner">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-banner-copy"
          >
            <h1 className="contact-banner-title">{data.title}</h1>
            <span className="contact-banner-rule" aria-hidden="true"></span>
            <p className="contact-banner-subtitle">{data.office.name}</p>
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
                  <p>Tel: {data.office.tel.map((num, i) => (
                    <React.Fragment key={i}>
                      <a href={`tel:${num.replace(/[^\d+]/g, '')}`}>{num}</a>{i < data.office.tel.length - 1 && ", "}
                    </React.Fragment>
                  ))}</p>
                  <p>Fax: <a href={`tel:${data.office.phone.replace(/[^\d+]/g, '')}`}>{data.office.phone}</a></p>
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
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
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
                  
                  {submitError && <div className="form-error-banner">{submitError}</div>}

                  <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} {!isSubmitting && <FaPaperPlane className="submit-icon" />}
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
