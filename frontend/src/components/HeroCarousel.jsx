import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./HeroCarousel.css";

const HeroCarousel = ({ slides }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="hero-carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide-wrapper">
              <div
                className="hero-slide-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-slide-overlay"></div>
              </div>
              
              <div className="hero-3d-layer" aria-hidden="true">
                <span className="hero-shape hero-shape-1"></span>
                <span className="hero-shape hero-shape-2"></span>
                <span className="hero-shape hero-shape-3"></span>
              </div>

              <div className="container hero-slide-content-container">
                <div className="hero-slide-content">
                  <span className="hero-eyebrow">Builders' Association of India · Since 1941</span>
                  <h1 className="hero-slide-title">{slide.title}</h1>
                  {slide.link && (
                    slide.link.startsWith("http") ? (
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary hero-slide-btn"
                      >
                        {slide.linkText || slide.link_text || "Learn More"}
                      </a>
                    ) : (
                      <Link to={slide.link} className="btn btn-primary hero-slide-btn">
                        {slide.linkText || slide.link_text || "Learn More"}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
