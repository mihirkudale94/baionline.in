import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLink, FaBuilding, FaTools } from "react-icons/fa";
import "./Links.css";

const Links = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const constructionCompanies = [
    { name: "NCC Limited", url: "http://www.ncclindia.com" },
    { name: "Mayflower Enterprises", url: "http://www.mayflowerenterprises.com" },
    { name: "Deepika Infratech", url: "http://www.deepikainfratech.com" },
    { name: "Progressive Estate", url: "http://www.progressiveestate.co.in" },
    { name: "D.P. Jain & Co.", url: "http://www.dpjaingroup.com" },
    { name: "DLF Laing O'Rourke", url: "http://www.dlflaingorourke.com" },
    { name: "Ascent Constructions", url: "http://www.ascentconstructions.com" },
    { name: "Techno Builders", url: "http://www.technobuilders.co.in" },
    { name: "Rachakonda Constructions", url: "http://www.rachakondaconstructions.com" },
    { name: "ITF Builder", url: "http://www.itfbuilder.com" },
    { name: "Sri Kumaran Construction", url: "http://www.srikumaranconstruction.com" },
    { name: "Mahavir Construction", url: "http://www.mahavirconstruction.com" }
  ];

  const serviceProviders = [
    { name: "Bull Machines", url: "http://www.bullindia.com/" },
    { name: "C.R.I. Pumps", url: "http://www.cripumps.com/" },
    { name: "Putzmeister India", url: "http://www.putzmeister.com/" },
    { name: "Ritchie Bros. Auctioneers", url: "http://www.rbauction.com/" },
    { name: "Schnell Group", url: "http://www.schnell.it/" },
    { name: "Tekla Structure Solutions", url: "http://www.tekla.com/" },
    { name: "LVD Laser Systems", url: "http://www.lvd.cc/en" },
    { name: "Anytime Property", url: "http://www.anytimeproperty.com" },
    { name: "Ranson India Concrete", url: "http://www.ransonindia.com" },
    { name: "GCI Wall Forms", url: "http://www.gciwallforms.com" },
    { name: "JR Machinery India", url: "http://www.jrmachineryindia.com" },
    { name: "Orient Bell Tiles", url: "http://www.orienttiles.com" },
    { name: "AIM Corporation", url: "http://www.aimcorp.in" },
    { name: "Morbi Elegance", url: "http://www.morbielegance.in" },
    { name: "Sunflag Iron & Steel", url: "http://www.sunflagsteel.com" },
    { name: "Apurva Buildcare", url: "http://www.apurvabuildcare.com" }
  ];

  const worksAuthorities = [
    { name: "National Portal of India", url: "http://www.india.gov.in", desc: "One-stop source for information and services from the Indian Government." },
    { name: "Directory of Government Websites", url: "http://www.goidirectory.nic.in", desc: "Contains comprehensive index of central ministries and state websites." },
    { name: "Indian Government Tenders Portal", url: "http://www.tenders.gov.in", desc: "Centralized procurement notifications for public sector works across India." },
    { name: "Military Engineer Services (MES)", url: "http://www.mes.gov.in", desc: "One of India's largest construction agencies covering Army, Navy and Air Force works." },
    { name: "Central Public Works Department (CPWD)", url: "http://cpwd.gov.in", desc: "Premier central government authority for building public sector infrastructure." },
    { name: "Ministry of Housing and Urban Affairs", url: "http://www.mhupa.gov.in", desc: "Formulates urban development policy and infrastructure frameworks." },
    { name: "Union Ministry of Railways", url: "http://www.indianrailways.gov.in", desc: "Tracks railway construction, project bidding, and line expansion plans." },
    { name: "Housing & Urban Development Corp (HUDCO)", url: "http://www.hudco.org", desc: "Assets finance and infrastructure planning corporation." },
    { name: "Delhi Metro Rail Corporation (DMRC)", url: "http://www.delhimetrorail.com", desc: "Metro rail construction authority updates and bids." }
  ];

  const toggleAccordion = (idx) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  return (
    <div className="links-page-wrapper">
      <section className="links-hero-section">
        <div className="links-hero-overlay"></div>
        <div className="container links-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="links-hero-content"
          >
            <span className="links-tag">Directory</span>
            <h1 className="links-title">Useful Reference Links</h1>
            <p className="links-subtitle">Directory of civil engineering companies, machinery suppliers, and government works departments</p>
          </motion.div>
        </div>
      </section>

      <section className="links-directory-section">
        <div className="container">
          <div className="accordion-list-layout">
            
            {/* Accordion 1: Construction Companies */}
            <div className={`accordion-link-item ${activeAccordion === 0 ? "open" : ""}`}>
              <button className="accordion-head-btn" onClick={() => toggleAccordion(0)}>
                <span className="icon-title"><FaBuilding className="head-icon" /> Construction Companies</span>
                <span className="arrow">▼</span>
              </button>
              {activeAccordion === 0 && (
                <div className="accordion-body-panel">
                  <div className="links-cards-grid">
                    {constructionCompanies.map((comp, idx) => (
                      <a href={comp.url} target="_blank" rel="noreferrer" key={idx} className="link-card-box glass-card">
                        <h4>{comp.name}</h4>
                        <span className="link-url-text">{comp.url}</span>
                        <span className="visit-badge">Visit Website <FaLink /></span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Service & Equipment Providers */}
            <div className={`accordion-link-item ${activeAccordion === 1 ? "open" : ""}`}>
              <button className="accordion-head-btn" onClick={() => toggleAccordion(1)}>
                <span className="icon-title"><FaTools className="head-icon" /> Service & Equipment Providers</span>
                <span className="arrow">▼</span>
              </button>
              {activeAccordion === 1 && (
                <div className="accordion-body-panel">
                  <div className="links-cards-grid">
                    {serviceProviders.map((serv, idx) => (
                      <a href={serv.url} target="_blank" rel="noreferrer" key={idx} className="link-card-box glass-card">
                        <h4>{serv.name}</h4>
                        <span className="link-url-text">{serv.url}</span>
                        <span className="visit-badge">Visit Website <FaLink /></span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Government Works Authorities */}
            <div className={`accordion-link-item ${activeAccordion === 2 ? "open" : ""}`}>
              <button className="accordion-head-btn" onClick={() => toggleAccordion(2)}>
                <span className="icon-title"><FaLink className="head-icon" /> Works & Government Authorities</span>
                <span className="arrow">▼</span>
              </button>
              {activeAccordion === 2 && (
                <div className="accordion-body-panel">
                  <p className="section-intro-text">
                    Reference links to Central and State Government departments and Public Sector Undertakings. To submit details of a missing department, contact us at <strong>baihq.mumbai@gmail.com</strong>.
                  </p>
                  <div className="gov-links-table-container">
                    <table className="gov-links-custom-table">
                      <thead>
                        <tr>
                          <th>Department / Ministry Name</th>
                          <th>Description & Scope</th>
                          <th>Official Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {worksAuthorities.map((auth, idx) => (
                          <tr key={idx}>
                            <td className="table-dept-name">{auth.name}</td>
                            <td className="table-dept-desc">{auth.desc}</td>
                            <td>
                              <a href={auth.url} target="_blank" rel="noreferrer" className="table-link-btn">
                                Visit site
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Links;
