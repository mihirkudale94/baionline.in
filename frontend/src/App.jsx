import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AIChatbot from "./components/AIChatbot";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Centres from "./pages/Centres";
import Contact from "./pages/Contact";
import Publications from "./pages/Publications";
import Tenders from "./pages/Tenders";
import Media from "./pages/Media";
import Trustees from "./pages/Trustees";
import Committees from "./pages/Committees";
import PastPresidents from "./pages/PastPresidents";
import MembersArea from "./pages/MembersArea";

import SponsorsInquiry from "./pages/SponsorsInquiry";
import Links from "./pages/Links";
import NonMembersArea from "./pages/NonMembersArea";
import WheelingDealing from "./pages/WheelingDealing";

// Simple fallback wrappers for secondary links
const PlaceholderPage = ({ title }) => (
  <div className="container" style={{ padding: "8rem 2rem", minHeight: "60vh" }}>
    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px" }}>BAI Portal</span>
    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--navy)", margin: "0.5rem 0 1.5rem 0" }}>{title}</h1>
    <div style={{ width: "50px", height: "3px", background: "var(--gold)", marginBottom: "2rem" }}></div>
    <p style={{ color: "var(--gray-800)", fontSize: "1rem", lineHeight: "1.7", maxWidth: "600px", marginBottom: "2rem" }}>
      This portal page is currently under structural maintenance. Builders Association of India is updating membership indexes, price lists and circular records for the 2026-27 session.
    </p>
    <Link to="/" className="btn btn-primary" style={{ borderRadius: "30px" }}>Return to Home</Link>
  </div>
);

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/media" element={<Media />} />
            
            {/* secondary routes */}
            <Route path="/services" element={<PlaceholderPage title="BAI Services" />} />
            <Route path="/sponsors-inquiry" element={<SponsorsInquiry />} />
            <Route path="/members-area" element={<MembersArea />} />
            <Route path="/non-members-area" element={<NonMembersArea />} />
            <Route path="/membership" element={<NonMembersArea />} />
            <Route path="/activities" element={<PlaceholderPage title="BAI Activities" />} />
            <Route path="/judgements" element={<PlaceholderPage title="Judgements" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/circular" element={<PlaceholderPage title="Circulars" />} />
            <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" />} />
            <Route path="/disclaimer" element={<PlaceholderPage title="Disclaimer" />} />
            <Route path="/up-email" element={<PlaceholderPage title="Update Email Records" />} />
            <Route path="/up-meeting" element={<PlaceholderPage title="Meeting Updates" />} />
            <Route path="/up-news" element={<PlaceholderPage title="News Updates" />} />
            
            <Route path="/wd-member" element={<WheelingDealing defaultTab="member" />} />
            <Route path="/wd-non-member" element={<WheelingDealing defaultTab="nonmember" />} />
            <Route path="/wd-display" element={<WheelingDealing defaultTab="listings" />} />
            <Route path="/links" element={<Links />} />
            
            <Route path="/trustees" element={<Trustees />} />
            <Route path="/past-presidents" element={<PastPresidents />} />
            <Route path="/committees" element={<Committees />} />
            
            {/* catch-all */}
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
};

export default App;
