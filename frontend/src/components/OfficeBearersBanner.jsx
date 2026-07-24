import React from "react";
import "./OfficeBearersBanner.css";

const OfficeBearersBanner = ({ leadership }) => {
  if (!leadership) return null;

  const bearers = [
    { person: leadership.president, designation: "Chairman" },
    { person: leadership.imm_past_president, designation: "Vice Chairman" },
    { person: leadership.hon_secretary, designation: "Secretary" },
    { person: leadership.hon_joint_secretary, designation: "Joint Secretary" },
    { person: leadership.hon_treasurer, designation: "Treasurer" }
  ].filter((b) => b.person);

  if (bearers.length === 0) return null;

  const renderChip = (b, idx) => (
    <div className="bearer-banner-chip" key={idx}>
      <img src={b.person.image} alt={b.person.name} className="bearer-banner-avatar" />
      <div className="bearer-banner-text">
        <span className="bearer-banner-name">{b.person.name}</span>
        <span className="bearer-banner-designation">{b.designation}</span>
      </div>
    </div>
  );

  return (
    <section className="bearers-banner-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">Pune Centre Leadership</span>
          <h2 className="section-title">Governing Council <span className="gradient-text">2026-27</span></h2>
          <div className="section-title-line"></div>
        </div>
      </div>

      <div className="bearers-banner-track">
        <div className="bearers-banner-content" aria-hidden="false">
          {bearers.map(renderChip)}
          {bearers.map((b, idx) => renderChip(b, `dup-${idx}`))}
        </div>
      </div>
    </section>
  );
};

export default OfficeBearersBanner;
