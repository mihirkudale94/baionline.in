import React from "react";
import {
  FaFileSignature,
  FaUserTie,
  FaClipboardCheck,
  FaCertificate,
  FaCalendarPlus,
  FaGavel,
  FaBalanceScale,
  FaChalkboardTeacher,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFilePdf
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import { baiServicesData } from "../services/api";
import "./Services.css";

/* Icon key -> component, so the data file stays plain data. */
const ICONS = {
  register: FaFileSignature,
  agent: FaUserTie,
  compliance: FaClipboardCheck,
  certificate: FaCertificate,
  extension: FaCalendarPlus,
  legal: FaGavel,
  advisory: FaBalanceScale,
  training: FaChalkboardTeacher
};

const Services = () => {
  const { tag, title, subtitle, hero, rera } = baiServicesData;

  return (
    <div className="services-page-wrapper">
      <PageHero
        image={hero.image}
        alt={hero.alt}
        tag={tag}
        title={title}
        subtitle={subtitle}
      />

      <section className="services-section" id={rera.id}>
        <div className="container">
          <div className="services-intro-card glass-card">
            <span className="services-eyebrow">RERA Desk</span>
            <h2 className="services-heading">{rera.title}</h2>
            <p className="services-lead">{rera.lead}</p>
            <p className="services-intro-text">{rera.intro}</p>
          </div>

          <div className="services-grid">
            {rera.services.map((service, idx) => {
              const Icon = ICONS[service.icon] || FaClipboardCheck;
              return (
                <div className="service-card glass-card" key={idx}>
                  <span className="service-card-icon"><Icon /></span>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                </div>
              );
            })}
          </div>

          {rera.documents.length > 0 && (
            <div className="services-docs-card glass-card">
              <h3 className="services-docs-title">Forms & Circulars</h3>
              <ul className="services-docs-list">
                {rera.documents.map((doc, idx) => (
                  <li key={idx}>
                    <a href={doc.file} target="_blank" rel="noreferrer" className="services-doc-link">
                      <FaFilePdf /> <span>{doc.label}</span>
                      {doc.size && <em className="services-doc-size">{doc.size}</em>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="services-contact-card">
            <h3 className="services-contact-title">Reach the RERA Desk</h3>
            <p className="services-contact-note">{rera.contact.note}</p>
            <ul className="services-contact-list">
              <li>
                <FaEnvelope />
                <a href={`mailto:${rera.contact.email}`}>{rera.contact.email}</a>
              </li>
              <li>
                <FaPhoneAlt />
                <a href={`tel:${rera.contact.tel.replace(/[^0-9+]/g, "")}`}>{rera.contact.tel}</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>{rera.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
