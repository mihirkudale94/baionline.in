import React from "react";
import { footerData } from "../services/api";
import { getSocialIcon, socialLabels } from "./socialIcons";
import "./FloatingSocials.css";

/* Fixed social bar pinned to the left edge. Sits opposite the chatbot
   launcher (bottom-right) so the two never overlap. */
const FloatingSocials = () => {
  const links = footerData?.social?.filter((s) => getSocialIcon(s.platform)) || [];
  if (links.length === 0) return null;

  return (
    <aside className="floating-socials" aria-label="Social media links">
      <ul className="floating-socials-list">
        {links.map((soc, idx) => (
          <li key={idx}>
            <a
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`floating-social-btn ${soc.platform}`}
              aria-label={socialLabels[soc.platform] || soc.platform}
            >
              {getSocialIcon(soc.platform)}
              <span className="floating-social-label">
                {socialLabels[soc.platform] || soc.platform}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FloatingSocials;
