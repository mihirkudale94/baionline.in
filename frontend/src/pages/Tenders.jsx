import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaSearch } from "react-icons/fa";
import "./Tenders.css";

const Tenders = () => {
  const [keyword, setKeyword] = useState("");

  const allTenders = [
    { id: "T-2026-089", title: "Construction of Multi-Storey Commercial Complex in Jamshedpur", authority: "East Zone Office Bearers", date: "July 12, 2026", status: "Active" },
    { id: "T-2026-088", title: "Road Laying & Civil Construction Work in Ahmedabad West", authority: "Gujarat State Chairman", date: "July 08, 2026", status: "Active" },
    { id: "T-2026-087", title: "Jackson Hut Renovation and Landscaping in Pune Head Office", authority: "West Zone Office Bearers", date: "June 28, 2026", status: "Active" },
    { id: "T-2026-086", title: "Drainage and Infrastructure Development in Warangal Centre", region: "VP South I", date: "June 15, 2026", status: "Closed" }
  ];

  const filteredTenders = allTenders.filter((t) =>
    t.title.toLowerCase().includes(keyword.toLowerCase()) ||
    t.id.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="tenders-page-wrapper">
      {/* Banner */}
      <section className="tenders-hero-section">
        <div className="tenders-hero-overlay"></div>
        <div className="container tenders-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="tenders-hero-content"
          >
            <span className="tenders-tag">Procurement Portal</span>
            <h1 className="tenders-title">Active Civil Tenders</h1>
            <p className="tenders-subtitle">Find construction projects and bidding opportunities across India</p>
          </motion.div>
        </div>
      </section>

      {/* Main List */}
      <section className="tenders-list-section">
        <div className="container">
          <div className="search-bar-card glass-card">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by tender ID or project title..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="tenders-table-card glass-card animate-fadeInUp">
            <div className="table-responsive">
              <table className="tenders-table">
                <thead>
                  <tr>
                    <th>Tender ID</th>
                    <th>Project Description</th>
                    <th>Issuing Authority</th>
                    <th>Publish Date</th>
                    <th>Status</th>
                    <th>Document</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenders.length > 0 ? (
                    filteredTenders.map((tender, idx) => (
                      <tr key={idx}>
                        <td className="tender-id">{tender.id}</td>
                        <td className="tender-title-desc">{tender.title}</td>
                        <td className="tender-auth">{tender.authority}</td>
                        <td className="tender-date">{tender.date}</td>
                        <td>
                          <span className={`status-badge ${tender.status.toLowerCase()}`}>
                            {tender.status}
                          </span>
                        </td>
                        <td>
                          <a href="#" className="pdf-download-link">
                            <FaFilePdf /> PDF
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center no-data">
                        No tenders found matching your keywords.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tenders;
