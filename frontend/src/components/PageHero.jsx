import React from "react";
import { motion } from "framer-motion";
import "./PageHero.css";

/*
  Standard page header used by every inner page.

  The photograph is shown clean — no scrim and no text sitting on top of it —
  and the tag / title / subtitle read as ordinary page content in the band
  directly below. Anything extra a page needs in its header (a download button,
  say) goes in as children and lands under the subtitle.

  `focal` maps to object-position, so a page can keep the framing its old
  background-position gave it.
*/
const PageHero = ({
  image,
  alt = "",
  focal = "center 25%",
  tag,
  title,
  subtitle,
  children
}) => (
  <>
    {image && (
      <div className="page-hero-photo">
        <img
          src={image}
          alt={alt}
          className="page-hero-photo-img"
          style={{ objectPosition: focal }}
        />
      </div>
    )}

    <section className="page-hero-header">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-hero-header-inner"
        >
          {tag && <span className="page-hero-tag">{tag}</span>}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  </>
);

export default PageHero;
