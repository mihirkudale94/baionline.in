import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { footerData } from "../services/api";
import "./Footer.css";

const Footer = () => {
  if (!footerData) return null;

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF />;
      case "instagram":
        return <FaInstagram />;
      case "youtube":
        return <FaYoutube />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "twitter":
        return <FaTwitter />;
      default:
        return null;
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-gradient-overlay"></div>
      <div className="container footer-content-container">
        {/* Footer Top Grid */}
        <div className="footer-grid">
          {/* Logo and About column */}
          <div className="footer-col col-info">
            <div className="footer-logo-wrapper">
              <img src={footerData.logo} alt="BAI Logo White" className="footer-logo" />
            </div>
            <p className="footer-tagline">
              Building Better Infrastructure. Empowering the Construction Industry — BAI Pune Centre, part of India's nationwide builders' network since 1941.
            </p>
            <div className="footer-social-icons">
              {footerData.social.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon-btn ${soc.platform}`}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Registered Office column */}
          <div className="footer-col col-contact">
            <h3 className="footer-col-title">{footerData.office.title.replace(/:$/, "")}</h3>
            <ul className="footer-contact-list">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span className="contact-text">{footerData.office.address}</span>
              </li>
              <li>
                <FaPhoneAlt className="contact-icon" />
                <span className="contact-text">
                  Tel: {footerData.office.tel} <br />
                  Fax: {footerData.office.phone}
                </span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span className="contact-text">
                  <a href={`mailto:${footerData.office.email}`}>{footerData.office.email}</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links column */}
          <div className="footer-col col-links">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links-list">
              {footerData.quick_links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications column */}
          <div className="footer-col col-links">
            <h3 className="footer-col-title">Notifications</h3>
            <ul className="footer-links-list">
              {footerData.notifications.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom row */}
        <div className="footer-bottom-row">
          <div className="copyright-text">{footerData.copyright}</div>
          <div className="useful-links-row">
            {footerData.useful_links.map((link, idx) => (
              <React.Fragment key={idx}>
                <Link to={link.path}>{link.label}</Link>
                {idx < footerData.useful_links.length - 1 && <span className="link-divider">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
