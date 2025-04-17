import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Removed Navigation
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Carousel.module.css";
import image1 from "../Images/image1.avif";
import image2 from "../Images/image2.avif";
import image3 from "../Images/image3.avif";

const Carousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        spaceBetween={10}
        centeredSlides={true}
        slidesPerView={1.2}
        grabCursor={true}
      >
        {[image1, image2, image3, image1, image2, image3].map((img, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className={styles.slideImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
