import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruckLoading, FaSearch, FaUserAlt, FaUserCheck, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import "./WheelingDealing.css";

const WheelingDealing = ({ defaultTab = "listings" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  
  // Search state for machinery display area
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock available machinery data
  const initialListings = [
    { id: 1, equipment: "JCB 3DX Backhoe Loader", rate: "₹1,200 / hr", firm: "Vardan Construction Co.", contact: "98221-50700", city: "Pune", category: "Earthmovers" },
    { id: 2, equipment: "Putzmeister Concrete Pump", rate: "₹15,000 / day", firm: "Techno Equipment Rental", contact: "93121-84000", city: "Delhi", category: "Concrete" },
    { id: 3, equipment: "Tower Crane 5 Ton", rate: "₹1,80,000 / month", firm: "Ascent Builders", contact: "94440-22100", city: "Chennai", category: "Cranes" },
    { id: 4, equipment: "Volvo EC210 Excavator", rate: "₹2,500 / hr", firm: "Mayflower Infrastructure", contact: "98450-12000", city: "Bangalore", category: "Earthmovers" },
    { id: 5, equipment: "Ajax Fiori Concrete Mixer", rate: "₹8,000 / day", firm: "Deepika Infratech Ltd.", contact: "96112-40200", city: "Hyderabad", category: "Concrete" }
  ];

  // Forms state
  const [memberForm, setMemberForm] = useState({ memberNo: "", firmName: "", tel: "", email: "", details: "" });
  const [nonMemberForm, setNonMemberForm] = useState({ name: "", firmName: "", address: "", tel: "", email: "", details: "" });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setMemberForm({ memberNo: "", firmName: "", tel: "", email: "", details: "" });
    }, 1200);
  };

  const handleNonMemberSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setNonMemberForm({ name: "", firmName: "", address: "", tel: "", email: "", details: "" });
    }, 1200);
  };

  const categories = ["All", "Earthmovers", "Concrete", "Cranes"];

  const filteredListings = initialListings.filter(item => {
    const matchesSearch = item.equipment.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="wd-page-wrapper">
      <section className="wd-hero-section">
        <div className="wd-hero-overlay"></div>
        <div className="container wd-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="wd-hero-content"
          >
            <span className="wd-tag">Wheeling & Dealing</span>
            <h1 className="wd-title">Machinery Exchange</h1>
            <p className="wd-subtitle">Rent heavy machinery, request specialized subcontracts or hire equipments</p>
          </motion.div>
        </div>
      </section>

      <section className="wd-tabs-section">
        <div className="container">
          
          {/* Tab Buttons */}
          <div className="wd-tabs-header">
            <button className={`tab-btn ${activeTab === "listings" ? "active" : ""}`} onClick={() => { setActiveTab("listings"); setSubmitted(false); }}>
              <FaTruckLoading /> Equipment Listings
            </button>
            <button className={`tab-btn ${activeTab === "member" ? "active" : ""}`} onClick={() => { setActiveTab("member"); setSubmitted(false); }}>
              <FaUserCheck /> Member Postings
            </button>
            <button className={`tab-btn ${activeTab === "nonmember" ? "active" : ""}`} onClick={() => { setActiveTab("nonmember"); setSubmitted(false); }}>
              <FaUserAlt /> Non-Member Postings
            </button>
          </div>

          <div className="wd-tab-content-wrapper">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Equipment Listings display */}
              {activeTab === "listings" && (
                <motion.div
                  key="listings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="listings-panel-content"
                >
                  <p className="panel-desc">Machinery and special equipment posted by BAI builders currently available for rent or lease.</p>
                  
                  {/* Filters bar */}
                  <div className="listings-filters-bar glass-card">
                    <div className="search-input-wrapper">
                      <FaSearch className="search-icon" />
                      <input 
                        type="text" 
                        placeholder="Search by equipment, firm or city..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="category-tags-list">
                      {categories.map((cat, idx) => (
                        <button 
                          key={idx} 
                          className={`category-tag-btn ${selectedCategory === cat ? "active" : ""}`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Listings Grid */}
                  <div className="machinery-grid-list">
                    {filteredListings.length > 0 ? (
                      filteredListings.map((item) => (
                        <div key={item.id} className="machinery-card-box glass-card">
                          <span className="machinery-cat-badge">{item.category}</span>
                          <h3>{item.equipment}</h3>
                          <div className="machinery-rate">{item.rate}</div>
                          
                          <div className="machinery-details-list">
                            <p className="firm-detail"><FaUserCheck /> {item.firm}</p>
                            <p className="city-detail"><FaMapMarkerAlt /> {item.city}</p>
                          </div>

                          <a href={`tel:${item.contact}`} className="machinery-call-btn">
                            <FaPhone /> Call Supplier ({item.contact})
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="no-listings-fallback">
                        <p>No equipment matching your search filters was found.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Member Form Post */}
              {activeTab === "member" && (
                <motion.div
                  key="member"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="form-panel-content"
                >
                  <div className="form-card-container glass-card">
                    <h2>Post Equipment (BAI Members)</h2>
                    <p className="form-helper-text">Post your idle cranes, generators or mixers to rent them out to other developer firms.</p>

                    {submitted ? (
                      <div className="success-banner">
                        <span className="success-icon">✓</span>
                        <h3>Post Registered!</h3>
                        <p>Your machinery listing is saved and will appear in the Display Area after authorization.</p>
                        <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Post Another Equipment</button>
                      </div>
                    ) : (
                      <form onSubmit={handleMemberSubmit} className="wd-inputs-form">
                        <div className="form-grid-columns">
                          <div className="form-group">
                            <label>Membership Number*</label>
                            <input 
                              type="text" required placeholder="e.g. BAI/MEM/56100" 
                              value={memberForm.memberNo}
                              onChange={(e) => setMemberForm({ ...memberForm, memberNo: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Member Firm Name*</label>
                            <input 
                              type="text" required placeholder="Firm name" 
                              value={memberForm.firmName}
                              onChange={(e) => setMemberForm({ ...memberForm, firmName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-grid-columns">
                          <div className="form-group">
                            <label>Telephone/Mobile*</label>
                            <input 
                              type="tel" required placeholder="10-digit number" 
                              value={memberForm.tel}
                              onChange={(e) => setMemberForm({ ...memberForm, tel: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address*</label>
                            <input 
                              type="email" required placeholder="email@firm.com" 
                              value={memberForm.email}
                              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Equipment Particulars & Rates*</label>
                          <textarea 
                            rows={3} required placeholder="Detailed specifications, model year, and hire rate expected..." 
                            value={memberForm.details}
                            onChange={(e) => setMemberForm({ ...memberForm, details: e.target.value })}
                          />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                          {loading ? "Submitting post..." : "Register Member Listing"}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Non-Member Form Post */}
              {activeTab === "nonmember" && (
                <motion.div
                  key="nonmember"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="form-panel-content"
                >
                  <div className="form-card-container glass-card">
                    <h2>Post Equipment (Non-Members)</h2>
                    <p className="form-helper-text">Advertise machinery for hire or seek equipment details from BAI's network.</p>

                    {submitted ? (
                      <div className="success-banner">
                        <span className="success-icon">✓</span>
                        <h3>Post Registered!</h3>
                        <p>Your inquiry is saved. A BAI coordinator will contact you shortly regarding the listing terms.</p>
                        <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Post Another Request</button>
                      </div>
                    ) : (
                      <form onSubmit={handleNonMemberSubmit} className="wd-inputs-form">
                        
                        <div className="form-grid-columns">
                          <div className="form-group">
                            <label>Contact Person Name*</label>
                            <input 
                              type="text" required placeholder="Enter contact name" 
                              value={nonMemberForm.name}
                              onChange={(e) => setNonMemberForm({ ...nonMemberForm, name: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Firm Name*</label>
                            <input 
                              type="text" required placeholder="Firm name" 
                              value={nonMemberForm.firmName}
                              onChange={(e) => setNonMemberForm({ ...nonMemberForm, firmName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Office Address*</label>
                          <textarea 
                            rows={2} required placeholder="Enter office mailing address" 
                            value={nonMemberForm.address}
                            onChange={(e) => setNonMemberForm({ ...nonMemberForm, address: e.target.value })}
                          />
                        </div>

                        <div className="form-grid-columns">
                          <div className="form-group">
                            <label>Telephone/Mobile*</label>
                            <input 
                              type="tel" required placeholder="Contact phone" 
                              value={nonMemberForm.tel}
                              onChange={(e) => setNonMemberForm({ ...nonMemberForm, tel: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address*</label>
                            <input 
                              type="email" required placeholder="email@example.com" 
                              value={nonMemberForm.email}
                              onChange={(e) => setNonMemberForm({ ...nonMemberForm, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Particulars of Machinery Required / Offered*</label>
                          <textarea 
                            rows={3} required placeholder="Description of heavy equipment model specifications..." 
                            value={nonMemberForm.details}
                            onChange={(e) => setNonMemberForm({ ...nonMemberForm, details: e.target.value })}
                          />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                          {loading ? "Submitting post..." : "Register Non-Member Listing"}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};

export default WheelingDealing;
