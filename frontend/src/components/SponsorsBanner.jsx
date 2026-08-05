import React from "react";
import { sponsors } from "../services/api";
import "./SponsorsBanner.css";

const SponsorsBanner = () => {
  if (!sponsors || sponsors.length === 0) return null;

  // The marquee animates by -50%, so the list is rendered twice to loop
  // seamlessly. A short list is repeated further to fill the track.
  const minChips = 6;
  const reps = Math.max(1, Math.ceil(minChips / sponsors.length));
  const single = Array.from({ length: reps }, () => sponsors).flat();

  const renderChip = (sponsor, idx) => {
    const inner = (
      <>
        {sponsor.logo && (
          <img src={sponsor.logo} alt="" className="sponsor-chip-logo" loading="lazy" />
        )}
        <span className="sponsor-chip-name">{sponsor.name}</span>
      </>
    );

    return sponsor.url ? (
      <a
        key={idx}
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-chip"
      >
        {inner}
      </a>
    ) : (
      <div key={idx} className="sponsor-chip">
        {inner}
      </div>
    );
  };

  return (
    <section className="sponsors-banner-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">In Association With</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Sponsors</span>
          </h2>
          <div className="section-title-line"></div>
        </div>
      </div>

      <div className="sponsors-banner-track">
        <div className="sponsors-banner-content">
          {single.map(renderChip)}
          {single.map((s, idx) => renderChip(s, `dup-${idx}`))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsBanner;
