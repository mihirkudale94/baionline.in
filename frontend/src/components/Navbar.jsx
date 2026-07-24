import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { navLinks } from "../services/api";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

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

              return (
                <li
                  key={idx}
                  className={`nav-item ${hasChildren ? "has-dropdown" : ""}`}
                  onMouseEnter={() => !mobileMenuOpen && setActiveDropdown(idx)}
                  onMouseLeave={() => !mobileMenuOpen && setActiveDropdown(null)}
                >
                  {hasChildren ? (
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
                  {hasChildren && activeDropdown === idx && (
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
