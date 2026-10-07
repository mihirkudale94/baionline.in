import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CommitteePicker.css";

// "S. B. Thorave" -> "ST", "Madhur Daga" -> "MD"
const initials = (name) => {
  const words = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (words[0][0] + last).toUpperCase();
};

/* Committee names as tabs on the left, the selected committee's members on
   the right. On mobile the names become a scrolling row of pills. */
const CommitteePicker = ({ committees }) => {
  const [active, setActive] = useState(0);
  const current = committees[active];

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const handleTabKeys = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next;
    if (step) next = (active + step + committees.length) % committees.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = committees.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`committee-tab-${next}`)?.focus();
  };

  if (!current) return null;

  return (
    <div className="committee-picker">
      <div
        className="committee-tabs"
        role="tablist"
        aria-label="Committees"
        onKeyDown={handleTabKeys}
      >
        {committees.map((committee, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            id={`committee-tab-${idx}`}
            aria-controls="committee-panel"
            aria-selected={idx === active}
            tabIndex={idx === active ? 0 : -1}
            className={`committee-tab${idx === active ? " is-active" : ""}`}
            onClick={() => setActive(idx)}
          >
            <span className="committee-tab-name">{committee.name}</span>
            <span className="committee-tab-count">{committee.members.length}</span>
          </button>
        ))}
      </div>

      <div
        className="committee-panel"
        id="committee-panel"
        role="tabpanel"
        aria-labelledby={`committee-tab-${active}`}
      >
        <div className="committee-panel-head">
          <h3 className="committee-panel-title">{current.name}</h3>
          <span className="committee-panel-count">
            {current.members.length} {current.members.length === 1 ? "member" : "members"}
          </span>
        </div>
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="committee-member-grid"
        >
          {current.members.map((m, mIdx) => (
            <li key={mIdx} className="committee-member-card">
              <span className="committee-member-avatar" aria-hidden="true">
                {initials(m)}
              </span>
              <span className="committee-member-name">{m}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default CommitteePicker;
