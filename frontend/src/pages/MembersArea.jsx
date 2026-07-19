import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUnlockAlt, FaCheckCircle, FaFileDownload, FaTable } from "react-icons/fa";
import "./MembersArea.css";

const MembersArea = () => {
  const [memberId, setMemberId] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Index tables content
  const indexData = [
    { month: "June 2026", cement: "148.5", steel: "162.2", bricks: "135.0", sand: "141.8" },
    { month: "May 2026", cement: "146.2", steel: "161.0", bricks: "132.8", sand: "140.5" },
    { month: "April 2026", cement: "145.0", steel: "158.4", bricks: "131.5", sand: "138.0" }
  ];

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1000);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setMemberId("");
    setPhone("");
    setOtpCode("");
  };

  return (
    <div className="members-page-wrapper">
      <section className="members-hero-section">
        <div className="members-hero-overlay"></div>
        <div className="container members-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="members-hero-content"
          >
            <span className="members-tag">Private Portal</span>
            <h1 className="members-title">Members Area</h1>
            <p className="members-subtitle">Access exclusive indices, notifications and circulars for registered developers</p>
          </motion.div>
        </div>
      </section>

      <section className="members-main-section">
        <div className="container">
          {!isLoggedIn ? (
            <div className="login-card-container animate-fadeInUp">
              <div className="login-card glass-card">
                <div className="login-icon-box"><FaUnlockAlt /></div>
                
                {!otpSent ? (
                  <form onSubmit={handleSendOtp}>
                    <h2>Member Verification</h2>
                    <p className="login-desc">Enter your credentials to receive a one-time passcode (OTP)</p>
                    
                    <div className="form-group">
                      <label>Membership Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BAI/MEM/9088"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Registered Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                      {loading ? "Sending..." : "Request OTP Code"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp}>
                    <h2>Enter Security Code</h2>
                    <p className="login-desc">A 6-digit code has been simulated and sent to {phone}</p>
                    
                    <div className="form-group">
                      <label>One-Time Passcode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="XXXXXX"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                      {loading ? "Verifying..." : "Verify Code & Sign In"}
                    </button>

                    <button type="button" className="btn-resend-otp" onClick={() => setOtpSent(false)}>
                      Go Back
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="dashboard-container animate-fadeInUp">
              {/* Top Row Welcome card */}
              <div className="dashboard-welcome-card glass-card">
                <div className="welcome-left">
                  <FaCheckCircle className="success-icon" />
                  <div>
                    <h2>Welcome Back Member!</h2>
                    <span className="member-id-badge">ID: {memberId}</span>
                  </div>
                </div>
                <button className="btn btn-outline logout-btn" onClick={handleLogOut}>
                  Sign Out
                </button>
              </div>

              {/* Grid content columns */}
              <div className="dashboard-grid">
                {/* Cement/Steel Indices */}
                <div className="dashboard-col col-table glass-card">
                  <div className="col-header">
                    <FaTable className="header-icon" />
                    <h3>Material Cost Index Numbers</h3>
                  </div>
                  
                  <div className="table-wrapper">
                    <table className="index-table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Cement Index</th>
                          <th>Steel Index</th>
                          <th>Bricks Index</th>
                          <th>Sand Index</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indexData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="row-month">{row.month}</td>
                            <td>{row.cement}</td>
                            <td>{row.steel}</td>
                            <td>{row.bricks}</td>
                            <td>{row.sand}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <span className="index-note">*Index values calculated against base year 2015-16. Approved by Materials & Price Index Committee.</span>
                </div>

                {/* Circulars list */}
                <div className="dashboard-col col-circulars glass-card">
                  <div className="col-header">
                    <FaFileDownload className="header-icon" />
                    <h3>Recent Circulars & Judgements</h3>
                  </div>

                  <ul className="circulars-list">
                    <li>
                      <div className="circular-meta">
                        <span className="badge-new">NEW</span>
                        <span className="circular-date">July 10, 2026</span>
                      </div>
                      <h4 className="circular-title">Supreme Court Ruling on Infrastructure Contract Clauses</h4>
                      <a href="#" className="download-link">Download PDF</a>
                    </li>
                    <li>
                      <div className="circular-meta">
                        <span className="circular-date">June 22, 2026</span>
                      </div>
                      <h4 className="circular-title">Update to GST Rates on Prefabricated Concrete Columns</h4>
                      <a href="#" className="download-link">Download PDF</a>
                    </li>
                    <li>
                      <div className="circular-meta">
                        <span className="circular-date">May 15, 2026</span>
                      </div>
                      <h4 className="circular-title">BAI National Safety & Security Guidelines Checklist</h4>
                      <a href="#" className="download-link">Download PDF</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MembersArea;
