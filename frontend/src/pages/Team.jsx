import React, { useEffect, useState } from "react";
import {
  getTeamData,
  getExecutiveCommitteeData,
  getCommitteesData
} from "../services/api";
import ImageLightbox from "../components/ImageLightbox";
import PageHero from "../components/PageHero";
import CommitteePicker from "../components/CommitteePicker";
import useHashScroll from "../hooks/useHashScroll";
import "./Team.css";
import "./Committees.css";

const Team = () => {
  const [team, setTeam] = useState(null);
  const [exec, setExec] = useState(null);
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wait for the rosters before jumping to #executive / #standing.
  useHashScroll(!loading);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  useEffect(() => {
    Promise.all([
      getTeamData(),
      getExecutiveCommitteeData(),
      getCommitteesData()
    ]).then(([teamData, execData, committeesData]) => {
      setTeam(teamData);
      setExec(execData);
      setCommittees(committeesData);
      setLoading(false);
    });
  }, []);

  const handleOpenLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Governing Council...</span>
      </div>
    );
  }

  // Members whose photograph hasn't been supplied yet get an initials tile
  // instead of a broken image, and the tile isn't click-to-zoom.
  const initialsOf = (name) =>
    name.split(/\s+/).filter((w) => !/^(dr\.?|shri|mr\.?|ms\.?|er\.?)$/i.test(w))
      .slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const renderCard = (person, subtitle) => (
    <div className="team-member-card">
      {person.image ? (
        <div className="team-member-img-wrapper" onClick={() => handleOpenLightbox(person.image, `${person.name} (${subtitle})`)} style={{ cursor: "zoom-in" }}>
          <img src={person.image} alt={person.name} className="team-member-img" />
          <div className="team-member-overlay"></div>
        </div>
      ) : (
        <div className="team-member-img-wrapper team-member-img-fallback" aria-hidden="true">
          <span className="team-member-initials">{initialsOf(person.name)}</span>
        </div>
      )}
      <div className="team-member-info">
        <span className="team-member-role">{subtitle}</span>
        <h4 className="team-member-name">{person.name}</h4>
      </div>
    </div>
  );

  return (
    <div className="team-page-wrapper">
      {/* 1. Header Banner */}
      <PageHero
        image="/images/events/event_office-meeting-2.jpg"
        alt="BAI Pune Centre office bearers at the Centre office, below the honour boards of past chairmen and secretaries"
        tag="Governing Council"
        title="BAI Pune Centre Team 2026-27"
        subtitle="Office Bearers of BAI Pune Centre"
      />

      {/* 2. Office Bearers Sections */}
      <section className="team-roster-section">
        <div className="container">
          
          {/* Governing Council Office Bearers */}
          <div className="roster-section-block">
            <h2 className="roster-section-title text-center">Governing Council Office Bearers</h2>
            <div className="title-line center"></div>
            <div className="roster-grid grid-5">
              {team.president && renderCard(team.president, "Chairman")}
              {team.imm_past_president && renderCard(team.imm_past_president, "Vice Chairman")}
              {team.hon_secretary && renderCard(team.hon_secretary, "Secretary")}
              {team.hon_joint_secretary && renderCard(team.hon_joint_secretary, "Joint Secretary")}
              {team.hon_treasurer && renderCard(team.hon_treasurer, "Treasurer")}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Executive Committee 2026–27 */}
      <section className="exec-committee-section" id="executive">
        <div className="container">
          <h2 className="committees-section-title">Executive Committee 2026–27</h2>
          <div className="section-title-line"></div>

          <ol className="exec-members-roster">
            {((exec && exec.members) || []).map((m, idx) => (
              <li key={idx} className="roster-item">
                <span className="roster-index">{idx + 1}.</span>
                <span className="roster-name">{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Committees and Members */}
      <section className="committees-list-section" id="standing">
        <div className="container">
          <h2 className="committees-section-title">Committees and Members</h2>
          <div className="section-title-line"></div>

          <CommitteePicker committees={committees} />
        </div>
      </section>

      {/* Portrait Lightbox Modal */}
      <ImageLightbox 
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default Team;
