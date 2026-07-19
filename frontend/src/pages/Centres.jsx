import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCentresData } from "../services/api";
import { FaMapMarkerAlt, FaGlobe, FaSearch, FaTimes } from "react-icons/fa";
import "./Centres.css";

const Centres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Local filter states
  const [regionFilter, setRegionFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getCentresData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  // Update filters when search params or data changes
  useEffect(() => {
    if (!data) return;

    const regionParam = searchParams.get("region") || "";
    const stateParam = searchParams.get("state") || "";
    const cityParam = searchParams.get("city") || "";
    const keywordParam = searchParams.get("keyword") || "";

    setRegionFilter(regionParam);
    setStateFilter(stateParam);
    setSearchKeyword(keywordParam || cityParam);
  }, [searchParams, data]);

  // Run filtering logic
  useEffect(() => {
    if (!data) return;

    let results = [];

    data.regions.forEach((region) => {
      // Check region filter
      if (regionFilter && region.slug !== regionFilter) return;

      region.states.forEach((state) => {
        // Check state filter
        if (stateFilter && state.slug !== stateFilter) return;

        state.centres.forEach((centre) => {
          const name = centre.name.toLowerCase();
          const slug = centre.slug.toLowerCase();
          const sName = state.name.toLowerCase();
          const rName = region.name.toLowerCase();
          const kw = searchKeyword.toLowerCase().trim();

          const matchesKeyword =
            !kw ||
            name.includes(kw) ||
            slug.includes(kw) ||
            sName.includes(kw) ||
            rName.includes(kw);

          if (matchesKeyword) {
            results.push({
              name: centre.name,
              slug: centre.slug,
              state: state.name,
              region: region.name
            });
          }
        });
      });
    });

    setFilteredResults(results);
  }, [data, regionFilter, stateFilter, searchKeyword]);

  const handleClearFilters = () => {
    setSearchParams({});
    setRegionFilter("");
    setStateFilter("");
    setSearchKeyword("");
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading Regional Centres...</span>
      </div>
    );
  }

  // Get list of all states for filter dropdown
  const getStatesForDropdown = () => {
    let statesList = [];
    data.regions.forEach((r) => {
      if (regionFilter && r.slug !== regionFilter) return;
      r.states.forEach((s) => {
        statesList.push({ name: s.name, slug: s.slug });
      });
    });
    return statesList;
  };

  return (
    <div className="centres-page-wrapper">
      {/* 1. Header Banner */}
      <section className="centres-hero-section">
        <div className="centres-hero-overlay"></div>
        <div className="container centres-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="centres-hero-content"
          >
            <span className="centres-tag">National Directory</span>
            <h1 className="centres-title">BAI Centres Network</h1>
            <p className="centres-subtitle">Connecting builders across 264+ local directories</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Search & Filters Area */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-bar-card glass-card">
            <div className="filter-item search-box">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by city or keyword..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            
            <div className="filter-item select-box">
              <select
                value={regionFilter}
                onChange={(e) => {
                  setRegionFilter(e.target.value);
                  setStateFilter(""); // Clear state when region changes
                }}
              >
                <option value="">All Regions</option>
                {data.regions.map((region, idx) => (
                  <option key={idx} value={region.slug}>{region.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-item select-box">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                <option value="">All States</option>
                {getStatesForDropdown().map((state, idx) => (
                  <option key={idx} value={state.slug}>{state.name}</option>
                ))}
              </select>
            </div>

            {(regionFilter || stateFilter || searchKeyword) && (
              <button className="clear-filters-btn" onClick={handleClearFilters}>
                <FaTimes /> Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Results listing */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h3>Found {filteredResults.length} Centre(s)</h3>
          </div>

          {filteredResults.length > 0 ? (
            <div className="results-grid animate-fadeInUp">
              {filteredResults.map((centre, idx) => (
                <div key={idx} className="centre-result-card glass-card">
                  <div className="card-top">
                    <div className="centre-marker"><FaMapMarkerAlt /></div>
                    <h3 className="centre-card-name">{centre.name}</h3>
                  </div>
                  <div className="card-bottom">
                    <span className="meta-badge state">{centre.state}</span>
                    <span className="meta-badge region">{centre.region}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-card text-center">
              <FaGlobe className="no-results-icon" />
              <h3>No Centres Found</h3>
              <p>We couldn't find any centres matching your search criteria. Try modifying your filters or search keywords.</p>
              <button className="btn btn-primary" onClick={handleClearFilters}>Show All Centres</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Centres;
