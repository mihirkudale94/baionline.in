import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaChevronDown, FaMapMarkerAlt, FaSun, FaMoon } from "react-icons/fa";
import { navLinks, centresData } from "../services/api";
import useTheme from "../hooks/useTheme";
import "./Navbar.css";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  
  const navigate = useNavigate();
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close city suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowCitySuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Collect all unique cities for suggestions
  const getAllCities = () => {
    const cities = [];
    centresData.regions.forEach((region) => {
      region.states.forEach((state) => {
        state.centres.forEach((centre) => {
          cities.push({
            name: centre.name,
            slug: centre.slug,
            state: state.name
          });
        });
      });
    });
    return cities;
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    setSearchCity(val);
    if (val.trim().length > 0) {
      const allCities = getAllCities();
      const filtered = allCities.filter((c) =>
        c.name.toLowerCase().includes(val.toLowerCase())
      );
      setCitySuggestions(filtered.slice(0, 10));
      setShowCitySuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  };

  const handleCitySelect = (city) => {
    setSearchCity(city.name);
    setShowCitySuggestions(false);
    navigate(`/centres?city=${city.slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || searchCity.trim()) {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("keyword", searchQuery.trim());
      if (searchCity.trim()) params.append("city", searchCity.trim());
      navigate(`/centres?${params.toString()}`);
    }
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (e, index) => {
    e.stopPropagation();
    if (activeSubDropdown === index) {
      setActiveSubDropdown(null);
    } else {
      setActiveSubDropdown(index);
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      {/* Top Header Row with Logo & Search */}
      <div className="navbar-top-row">
        <div className="container top-row-container">
          <Link to="/" className="navbar-logo-container">
            <img
              src="/images/logo-bg.png"
              alt="BAI Logo"
              className="navbar-logo"
            />
            <div className="logo-text">
              <span className="logo-title">BUILDERS' ASSOCIATION OF INDIA</span>
              <span className="logo-subtitle">Pune Centre — Building Better Infrastructure. Empowering the Construction Industry.</span>
            </div>
          </Link>

          {/* Search Form */}
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Centres / Keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="city-input-wrapper" ref={suggestionRef}>
              <FaMapMarkerAlt className="location-icon" />
              <input
                type="text"
                placeholder="Find City..."
                value={searchCity}
                onChange={handleCityChange}
                onFocus={() => {
                  if (searchCity.trim().length > 0) setShowCitySuggestions(true);
                }}
              />
              {showCitySuggestions && citySuggestions.length > 0 && (
                <ul className="city-suggestions-dropdown">
                  {citySuggestions.map((city, idx) => (
                    <li key={idx} onClick={() => handleCitySelect(city)}>
                      <span className="city-name">{city.name}</span>
                      <span className="state-name">{city.state}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <button type="submit" className="search-submit-btn">Search</button>
          </form>

          <button
            className="theme-toggle-btn"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="mobile-toggle-btn"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Bottom Main Navigation Menu */}
      <nav className={`navbar-main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="container nav-container">
          <ul className="nav-menu">
            {navLinks.map((link, idx) => {
              const hasChildren = link.children && link.children.length > 0;
              const isMegaMenu = link.mega_menu;

              return (
                <li
                  key={idx}
                  className={`nav-item ${hasChildren ? "has-dropdown" : ""} ${isMegaMenu ? "has-mega-menu" : ""}`}
                  onMouseEnter={() => !mobileMenuOpen && setActiveDropdown(idx)}
                  onMouseLeave={() => !mobileMenuOpen && setActiveDropdown(null)}
                >
                  {hasChildren || isMegaMenu ? (
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={() => toggleDropdown(idx)}
                    >
                      {link.label} <FaChevronDown className="dropdown-arrow" />
                    </button>
                  ) : (
                    <Link to={link.path} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                      {link.label}
                    </Link>
                  )}

                  {/* Standard Dropdown */}
                  {hasChildren && !isMegaMenu && activeDropdown === idx && (
                    <ul className="dropdown-menu">
                      {link.children.map((child, cIdx) => {
                        const hasSubChildren = child.children && child.children.length > 0;
                        return (
                          <li
                            key={cIdx}
                            className={`dropdown-item ${hasSubChildren ? "has-sub-dropdown" : ""}`}
                            onMouseEnter={() => !mobileMenuOpen && setActiveSubDropdown(cIdx)}
                            onMouseLeave={() => !mobileMenuOpen && setActiveSubDropdown(null)}
                          >
                            {hasSubChildren ? (
                              <>
                                <button
                                  className="dropdown-link sub-toggle"
                                  onClick={(e) => toggleSubDropdown(e, cIdx)}
                                >
                                  {child.label} <FaChevronDown className="sub-arrow" />
                                </button>
                                {activeSubDropdown === cIdx && (
                                  <ul className="sub-dropdown-menu">
                                    {child.children.map((subChild, sIdx) => (
                                      <li key={sIdx} className="sub-dropdown-item">
                                        <Link
                                          to={subChild.path}
                                          className="sub-dropdown-link"
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setActiveDropdown(null);
                                          }}
                                        >
                                          {subChild.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ) : (
                              <Link
                                to={child.path}
                                className="dropdown-link"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {child.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Centres Mega Menu */}
                  {isMegaMenu && activeDropdown === idx && (
                    <div className="mega-menu">
                      <div className="mega-menu-grid">
                        {centresData.regions.map((region, rIdx) => (
                          <div key={rIdx} className="mega-menu-column">
                            <h4 className="mega-menu-region-title">
                              <Link to={`/centres?region=${region.slug}`} onClick={() => {
                                setMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}>
                                {region.name}
                              </Link>
                            </h4>
                            <ul className="mega-menu-states-list">
                              {region.states.map((state, sIdx) => (
                                <li key={sIdx} className="mega-menu-state-item">
                                  <Link
                                    to={`/centres?state=${state.slug}`}
                                    className="mega-menu-state-link"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    {state.name}
                                  </Link>
                                  <span className="mega-menu-centre-count">
                                    ({state.centres.length})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
