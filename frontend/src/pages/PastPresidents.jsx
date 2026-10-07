import React, { useEffect, useState } from "react";
import {
  getPastPresidentsData,
  getPuneOfficeBearersData,
  puneOfficeBearersData,
  platinumJubileeData
} from "../services/api";
import { FaAward, FaChevronDown, FaInfoCircle } from "react-icons/fa";
import PageHero from "../components/PageHero";
import "./PastPresidents.css";

const PastPresidents = () => {
  const [list, setList] = useState([]);
  const [bearers, setBearers] = useState(puneOfficeBearersData);
  const [loading, setLoading] = useState(true);
  const [openSet, setOpenSet] = useState(null);
  const [activeRole, setActiveRole] = useState(puneOfficeBearersData.roles[0].id);

  useEffect(() => {
    Promise.all([getPastPresidentsData(), getPuneOfficeBearersData()]).then(
      ([presidents, puneBearers]) => {
        setList(presidents);
        setBearers(puneBearers);
        setActiveRole(puneBearers.roles[0].id);
        setLoading(false);
      }
    );
  }, []);

  // Group the presidents by the decade their term began, keeping the data's
  // newest-first order. "1946-1948" -> 1940.
  const decades = [];
  list.forEach((item) => {
    const decade = Math.floor(parseInt(item.year, 10) / 10) * 10;
    const last = decades[decades.length - 1];
    if (last && last.decade === decade) last.items.push(item);
    else decades.push({ decade, items: [item] });
  });
  // null = untouched: open only the most recent decade.
  const openDecades = openSet || new Set(decades.length ? [decades[0].decade] : []);
  const allOpen = decades.length > 0 && openDecades.size === decades.length;
  const toggleDecade = (decade) => {
    const next = new Set(openDecades);
    if (next.has(decade)) next.delete(decade);
    else next.add(decade);
    setOpenSet(next);
  };

  const activeRoleData = bearers.roles.find((r) => r.id === activeRole);
  const jubilee = bearers.platinum_jubilee || platinumJubileeData;

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Office Bearers Archive...</span>
      </div>
    );
  }

  return (
    <div className="presidents-page-wrapper">
      <PageHero
        image="/images/heritage/founding-members-bai.jpg"
        alt="Founding members of the Builders' Association of India, photographed in 1941"
        tag="Pune Centre Archives"
        title="Past Office Bearers"
        subtitle="Honor roll of BAI Pune Centre's own leaders through the years"
      />

      <section className="pune-bearers-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Pune Centre Legacy</span>
            <h2 className="section-title">BAI Pune Centre — Past Office Bearers</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="pune-bearers-notice">
            <FaInfoCircle /> <span>{bearers.note}</span>
          </div>

          <div className="pune-bearers-role-tabs">
            {bearers.roles.map((role) => (
              <button
                key={role.id}
                className={`pune-bearers-role-tab ${activeRole === role.id ? "active" : ""}`}
                onClick={() => setActiveRole(role.id)}
              >
                {role.label}
              </button>
            ))}
          </div>

          {activeRoleData.members.length > 0 ? (
            <div key={activeRole} className="pune-bearers-grid animate-fadeInUp">
              {activeRoleData.members.map((m, idx) => (
                <div key={idx} className="pune-bearer-card glass-card">
                  <span className="pune-bearer-tenure">{m.year}</span>
                  <h4 className="pune-bearer-name">{m.name}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="pune-bearers-empty glass-card">
              <FaInfoCircle className="pune-bearers-photo-icon" />
              <p>Records for {activeRoleData.label} are being compiled from the Centre's archives and will be published here shortly.</p>
            </div>
          )}

          <div className="pune-bearers-photo-note glass-card">
            <FaAward className="pune-bearers-photo-icon" />
            <p>Transcribed from the office bearer display boards at BAI Pune Centre.</p>
          </div>
        </div>
      </section>

      <section className="jubilee-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{jubilee.subtitle}</span>
            <h2 className="section-title">{jubilee.title}</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="jubilee-grid">
            {jubilee.office_bearers.map((m, idx) => (
              <div key={idx} className="jubilee-bearer-card glass-card">
                <h4 className="jubilee-bearer-name">{m.name}</h4>
                <span className="jubilee-bearer-role">{m.role}</span>
              </div>
            ))}
          </div>

          <div className="jubilee-committee glass-card">
            <h4 className="jubilee-committee-title">Organising Committee</h4>
            <ul className="jubilee-committee-list">
              {jubilee.organising_committee.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="presidents-list-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">Historical Reference</span>
            <h2 className="section-title">BAI National — Past Presidents</h2>
            <div className="section-title-line"></div>
            <p className="section-intro">
              Pune is the founding city of the Builders' Association of India — the national body BAI Pune Centre belongs to. Shown below for historical reference is the national Presidents' lineage since 1941.
            </p>
          </div>
          <ol className="decade-timeline">
            {decades.map(({ decade, items }) => {
              const isOpen = openDecades.has(decade);
              return (
                <li key={decade} className={`decade-group${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="decade-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`decade-${decade}`}
                    onClick={() => toggleDecade(decade)}
                  >
                    <span className="decade-dot" aria-hidden="true"></span>
                    <span className="decade-label">{decade}s</span>
                    <span className="decade-count">
                      {items.length} {items.length === 1 ? "President" : "Presidents"}
                    </span>
                    <FaChevronDown className="decade-chevron" aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <ul id={`decade-${decade}`} className="decade-list animate-fadeInUp">
                      {items.map((item, idx) => (
                        <li key={idx} className="decade-entry">
                          <span className="decade-entry-year">{item.year}</span>
                          <span className="decade-entry-name">{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="decade-actions">
            <button
              type="button"
              className="decade-expand-all"
              onClick={() =>
                setOpenSet(
                  allOpen ? new Set() : new Set(decades.map((d) => d.decade))
                )
              }
            >
              {allOpen ? "Collapse all decades" : "Show all decades"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PastPresidents;
