import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTeamData } from "../services/api";
import ImageLightbox from "../components/ImageLightbox";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import "./Team.css";

const Team = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  useEffect(() => {
    getTeamData().then((res) => {
      setTeam(res);
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

  const handleOpenModal = (person) => {
    setModalContent(person);
    setModalOpen(true);
  };

  const renderCard = (person, subtitle) => (
    <div className="team-member-card">
      <div className="team-member-img-wrapper" onClick={() => handleOpenLightbox(person.image, `${person.name} (${subtitle})`)} style={{ cursor: "zoom-in" }}>
        <img src={person.image} alt={person.name} className="team-member-img" />
        <div className="team-member-overlay"></div>
      </div>
      <div className="team-member-info">
        <span className="team-member-role">{subtitle}</span>
        <h4 className="team-member-name">{person.name}</h4>
        {person.bio && (
          <button 
            className="team-member-btn"
            onClick={() => handleOpenModal(person)}
          >
            Read Bio <FaChevronRight className="btn-arrow" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="team-page-wrapper">
      {/* 1. Header Banner */}
      <section className="team-hero-section">
        <div className="team-hero-overlay"></div>
        <div className="container team-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="team-hero-content"
          >
            <span className="team-tag">Governing Council</span>
            <h1 className="team-title">BAI Pune Centre Team 2026-27</h1>
            <p className="team-subtitle">Office Bearers of BAI Pune Centre</p>
          </motion.div>
        </div>
      </section>

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

      {/* Modal Bio Popup */}
      {modalOpen && modalContent && (
        <div className="bio-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="bio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              <FaTimes />
            </button>
            <div className="modal-body-grid">
              <div className="modal-img-col">
                <img src={modalContent.image} alt={modalContent.name} className="modal-img" />
                <span className="modal-title-badge">{modalContent.title || "Leader"}</span>
                <h3 className="modal-name">{modalContent.name}</h3>
              </div>
              <div className="modal-text-col">
                <h4 className="modal-section-title">Biography</h4>
                <div className="modal-text-scroll">
                  <p className="modal-bio-para">{modalContent.bio}</p>
                  {modalContent.bio_extended && (
                    <p className="modal-bio-para">{modalContent.bio_extended}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
