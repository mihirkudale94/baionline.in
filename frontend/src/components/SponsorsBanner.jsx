import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSponsors } from "../services/sponsors";
import "./SponsorsBanner.css";

const DEFAULT_PLACEHOLDER_SPONSORS = [
  { name: "B. G. Shirke Construction Tech", logo: "/images/sponsors/bg-shirke.svg", url: "https://shirke.co.in" },
  { name: "UltraTech Cement", logo: "/images/sponsors/ultratech-cement.svg", url: "" },
  { name: "Tata Steel", logo: "/images/sponsors/tata-steel.svg", url: "" },
  { name: "ACC Limited", logo: "/images/sponsors/acc-limited.svg", url: "" },
  { name: "Ambuja Cements", logo: "/images/sponsors/ambuja-cements.svg", url: "" },
  { name: "JSW Steel", logo: "/images/sponsors/jsw-steel.svg", url: "" },
  { name: "Asian Paints", logo: "/images/sponsors/asian-paints.svg", url: "" },
  { name: "Dr. Fixit", logo: "/images/sponsors/dr-fixit.svg", url: "" },
  { name: "Finolex Industries", logo: "/images/sponsors/finolex-industries.svg", url: "" },
  { name: "Kirloskar Brothers", logo: "/images/sponsors/kirloskar-brothers.svg", url: "" },
  { name: "Otis Elevators", logo: "/images/sponsors/otis-elevators.svg", url: "" },
  { name: "Thermax", logo: "/images/sponsors/thermax.svg", url: "" }
];

/* Shows verified paid sponsors from backend merged with placeholder industry sponsors */
const SponsorsBanner = () => {
  const [sponsors, setSponsors] = useState(DEFAULT_PLACEHOLDER_SPONSORS);

  useEffect(() => {
    let active = true;
    getSponsors().then((rows) => {
      if (active && Array.isArray(rows) && rows.length > 0) {
        // Merge paid sponsors at the front of the marquee
        setSponsors([...rows, ...DEFAULT_PLACEHOLDER_SPONSORS]);
      }
    });
    return () => {
      active = false;
    };
  }, []);

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
        rel="noopener noreferrer sponsored"
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

      <div className="container text-center sponsors-banner-cta">
        <Link to="/sponsors-inquiry#become-a-sponsor" className="sponsor-banner-cta-link">
          Want to feature your company here? <span>Become a Sponsor &rarr;</span>
        </Link>
      </div>
    </section>
  );
};

export default SponsorsBanner;
