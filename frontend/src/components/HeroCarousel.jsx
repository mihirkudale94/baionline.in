import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./HeroCarousel.css";

const HeroCarousel = ({ slides, intro }) => {
  /* Tracks which photograph is showing so the caption under the headline can
     follow it. `realIndex` is used rather than `activeIndex` because the
     carousel loops and Swiper pads the loop with cloned slides. */
  const [active, setActive] = useState(0);

  if (!slides || slides.length === 0) return null;

  const caption = slides[active]?.caption;

  return (
    <>
      <div className="hero-carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
          speed={900}
          loop={true}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          className="hero-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              {/* Blurred copy of the same photo fills the frame so the
                  photo itself can be shown whole, never cropped. */}
              <div className="hero-slide">
                <div
                  className="hero-slide-backdrop"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  aria-hidden="true"
                ></div>
                <img
                  src={slide.image}
                  alt={slide.alt || ""}
                  className="hero-slide-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* The photographs are shown clean, with no text over them. The headline
          and the caption for the photo on screen read in the band below. */}
      {intro && (
        <section className="hero-intro">
          <div className="container">
            {intro.tag && <span className="hero-tag">{intro.tag}</span>}
            <h1 className="hero-title">{intro.title}</h1>
            {intro.subtitle && <p className="hero-sub">{intro.subtitle}</p>}
            {caption && (
              <p className="hero-caption" key={active}>
                {caption}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default HeroCarousel;
