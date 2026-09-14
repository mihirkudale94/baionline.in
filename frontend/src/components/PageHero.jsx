import React from "react";
import { motion } from "framer-motion";
import { FaRegImage } from "react-icons/fa";
import "./PageHero.css";

/*
  Standard page header used by every inner page.

  The photograph is always shown clean — no scrim and no text sitting on top
  of it — and the tag / title / subtitle read as ordinary page content in the
  band directly below. Anything extra a page needs in its header (a download
  button, say) goes in as children and lands under the subtitle.

  The photo is shown whole (`object-fit: contain`) so no face is cropped. A
  blurred, darkened copy of the same photo fills whatever the picture does not
  cover, so the band still reads as a solid frame — `focal` frames that
  backdrop.

  A page whose banner photograph is not ready yet passes `placeholder` and no
  `image`, and the band keeps its shape with a "coming soon" card in it rather
  than collapsing and leaving the header sitting straight under the navbar.
*/
const PageHero = ({
  image,
  alt = "",
  focal = "center 25%",
  placeholder,
  tag,
  title,
  subtitle,
  children
}) => (
  <>
    {image && (
      <div className="page-hero-photo">
        <div
          className="page-hero-photo-backdrop"
          style={{ backgroundImage: `url(${image})`, backgroundPosition: focal }}
          aria-hidden="true"
        ></div>
        <img src={image} alt={alt} className="page-hero-photo-img" />
      </div>
    )}
    {!image && placeholder && (
      <div className="page-hero-photo page-hero-photo--placeholder">
        <FaRegImage className="page-hero-placeholder-icon" aria-hidden="true" />
        <span className="page-hero-placeholder-text">{placeholder}</span>
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
