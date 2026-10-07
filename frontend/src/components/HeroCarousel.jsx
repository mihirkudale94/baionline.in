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
     follow it. `rewind` rather than `loop` wraps back to the first photo
     without cloned slides, so it works however few photos there are. */
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
          autoHeight
          rewind
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide">
                <img
                  src={slide.image}
                  alt={slide.alt || ""}
                  className="hero-slide-img"
                  /* The banner takes each photo's height, so re-measure once
                     the photo has loaded and its height is known. */
                  onLoad={(e) =>
                    e.currentTarget.closest(".swiper")?.swiper?.updateAutoHeight(0)
                  }
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
