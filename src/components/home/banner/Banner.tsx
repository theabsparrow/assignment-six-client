"use client";

import FoodDiateryBanner from "./FoodDiateryBanner";
import FoodCuisineBanner from "./FoodCuisineBanner";
import FoodCategoryBanner from "./FoodCategoryBanner";
import FoodPreferanceBanner from "./FoodPreferanceBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <section>
      {/* <Swiper
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <FoodCategoryBanner />
        </SwiperSlide>
        <SwiperSlide>
          <FoodCuisineBanner />
        </SwiperSlide>
        <SwiperSlide>
          <FoodPreferanceBanner />
        </SwiperSlide>  
      </Swiper> */}
      {/* <FoodCategoryBanner /> */}
      <FoodCuisineBanner />
    </section>
  );
};

export default Banner;
