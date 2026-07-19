import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearchPlus, FaSearchMinus, FaDownload } from "react-icons/fa";
import "./ImageLightbox.css";

const ImageLightbox = ({ src, alt, isOpen, onClose }) => {
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setScale(1); // Reset zoom on open
      document.body.style.overflow = "hidden"; // Lock page scroll
    } else {
      document.body.style.overflow = "unset"; // Release page scroll
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.25, 0.75));
  };

  const isPng = src && (
    src.endsWith(".png") || 
    src.includes("map-") || 
    src.includes("logo") || 
    src.includes("sponsor")
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lightbox-overlay"
          onClick={onClose}
        >
          {/* Controls Bar */}
          <div className="lightbox-controls" onClick={(e) => e.stopPropagation()}>
            <button className="control-btn" onClick={handleZoomIn} title="Zoom In">
              <FaSearchPlus />
            </button>
            <button className="control-btn" onClick={handleZoomOut} title="Zoom Out">
              <FaSearchMinus />
            </button>
            <a href={src} download className="control-btn" title="Download Image" target="_blank" rel="noreferrer">
              <FaDownload />
            </a>
            <button className="control-btn close-btn" onClick={onClose} title="Close">
              <FaTimes />
            </button>
          </div>

          {/* Image Canvas Container */}
          <div className="lightbox-canvas">
            <motion.img
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: scale, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={src}
              alt={alt || "Lightbox Preview"}
              className={`lightbox-main-img ${isPng ? "lightbox-png-bg" : ""}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {alt && (
            <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              <p>{alt}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
