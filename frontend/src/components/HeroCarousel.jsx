import React from "react";
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
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        speed={900}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt || ""}
              className="hero-slide-img"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
