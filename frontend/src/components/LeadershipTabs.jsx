import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import "./LeadershipTabs.css";

const LeadershipTabs = ({ leadership }) => {
  const [activeTab, setActiveTab] = useState("president");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  if (!leadership) return null;

  const tabs = [
    { id: "president", label: "Chairman" },
    { id: "imm_past_president", label: "Vice Chairman" },
    { id: "hon_secretary", label: "Secretary" },
    { id: "hon_joint_secretary", label: "Joint Secretary" },
    { id: "hon_treasurer", label: "Treasurer" }
  ];

  const handleOpenModal = (person) => {
    setModalContent(person);
    setModalOpen(true);
  };

  const renderPresident = (person) => {
    if (!person) return null;
    return (
      <div className="president-card animate-fadeInUp">
        <div className="president-grid">
          <div className="president-img-wrapper">
            <img src={person.image} alt={person.name} className="president-img" />
          </div>
          <div className="president-info">
            <span className="info-badge">{person.title}</span>
            <h2 className="president-name">{person.name}</h2>
            <p className="president-bio-short">{person.bio}</p>
            {person.bio_extended && (
              <button 
                className="btn btn-outline president-read-more"
                onClick={() => handleOpenModal(person)}
              >
                Read Message <FaChevronRight className="btn-arrow" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGridList = (list, type) => {
    if (!list || list.length === 0) return null;
    return (
      <div className="leadership-grid animate-fadeInUp">
        {list.map((person, idx) => (
          <div key={idx} className="member-card">
            <div className="member-img-wrapper">
              <img src={person.image} alt={person.name} className="member-img" />
              <div className="member-overlay"></div>
            </div>
            <div className="member-info">
              <h4 className="member-name">{person.name}</h4>
              <span className="member-role">{person.region || person.state || type}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "president":
        return renderPresident(leadership.president);
      case "imm_past_president":
        return renderPresident(leadership.imm_past_president);
      case "hon_secretary":
        return renderPresident(leadership.hon_secretary);
      case "hon_joint_secretary":
        return renderPresident(leadership.hon_joint_secretary);
      case "hon_treasurer":
        return renderPresident(leadership.hon_treasurer);
      default:
        return null;
    }
  };

  return (
    <section className="leadership-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">BAI National Leadership</span>
          <h2 className="section-title">Pune Governing Council <span className="gradient-text">2026-27</span></h2>
          <div className="section-title-line"></div>
          <p className="leadership-scope-note">
            BAI Pune Centre is a constituent centre of this national body. For Pune Centre's own leadership, see the{" "}
            <Link to="/committees">Executive Committee</Link>.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="tabs-container">
          <div className="tabs-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content-wrapper">
          {renderContent()}
        </div>
      </div>

      {/* Bio Modal Popup */}
      {modalOpen && modalContent && (
        <div className="bio-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="bio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              <FaTimes />
            </button>
            <div className="modal-body-grid">
              <div className="modal-img-col">
                <img src={modalContent.image} alt={modalContent.name} className="modal-img" />
                <span className="modal-title-badge">{modalContent.title}</span>
                <h3 className="modal-name">{modalContent.name}</h3>
              </div>
              <div className="modal-text-col">
                <h4 className="modal-section-title">Chairman's Message</h4>
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
    </section>
  );
};

export default LeadershipTabs;
