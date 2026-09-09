import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegImage } from "react-icons/fa";
import "./PageHero.css";

/*
  Standard page header used by every inner page.

  By default the photograph is shown clean — no scrim and no text sitting on
  top of it — and the tag / title / subtitle read as ordinary page content in
  the band directly below. Anything extra a page needs in its header (a
  download button, say) goes in as children and lands under the subtitle.

  With `fullHeight`, the photograph instead fills the viewport below the
  navbar and the same header content sits over it, anchored to the bottom of
  the frame with a scrim behind it so the type stays readable.

  Either way the photo is shown whole (`object-fit: contain`) so no face is
  cropped and any text printed in the picture stays readable. A blurred,
  darkened copy of the same photo fills whatever the picture does not cover,
  so the band still reads as a solid frame — `focal` frames that backdrop.

  A page whose banner photograph is not ready yet passes `placeholder` and no
  `image`, and the band keeps its shape with a "coming soon" card in it rather
  than collapsing and leaving the header sitting straight under the navbar.
*/
/*
  The navbar sits in normal flow above the banner and its height is
  content-driven, so a full-height banner measures it rather than guessing —
  otherwise the photo overshoots the fold by however much the header's
  padding and border add. The CSS keeps per-breakpoint fallbacks for the
  first paint.
*/
const useNavbarHeight = (enabled) => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!enabled) return undefined;

    const navbar = document.querySelector(".navbar-header");
    if (!navbar) return undefined;

    const measure = () => setHeight(navbar.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(navbar);
    return () => observer.disconnect();
  }, [enabled]);

  return height;
};

const PageHero = ({
  image,
  alt = "",
  focal = "center 25%",
  placeholder,
  tag,
  title,
  subtitle,
  fullHeight = false,
  children
}) => {
  const overlay = fullHeight && Boolean(image);
  const navHeight = useNavbarHeight(overlay);

  const backdrop = (
    <div
      className="page-hero-photo-backdrop"
      style={{ backgroundImage: `url(${image})`, backgroundPosition: focal }}
      aria-hidden="true"
    ></div>
  );

  const header = (
    <section className={`page-hero-header${overlay ? " page-hero-header--overlay" : ""}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: overlay ? 16 : -16 }}
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
  );

  if (overlay) {
    return (
      <div
        className="page-hero-photo page-hero-photo--full"
        style={navHeight ? { "--page-hero-nav-h": `${navHeight}px` } : undefined}
      >
        {backdrop}
        <img src={image} alt={alt} className="page-hero-photo-img" />
        <div className="page-hero-photo-scrim" aria-hidden="true"></div>
        {header}
      </div>
    );
  }

  return (
    <>
      {image && (
        <div className="page-hero-photo">
          {backdrop}
          <img src={image} alt={alt} className="page-hero-photo-img" />
        </div>
      )}
      {!image && placeholder && (
        <div className="page-hero-photo page-hero-photo--placeholder">
          <FaRegImage className="page-hero-placeholder-icon" aria-hidden="true" />
          <span className="page-hero-placeholder-text">{placeholder}</span>
        </div>
      )}
      {header}
    </>
  );
};

export default PageHero;
