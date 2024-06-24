import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import React from "react";
import "swiper/css";
import "swiper/css";

import SpecialPostCard from "../../../special/components/special_post_card";
import PostCardSkeleton from "../../components/post_card_skeleton";
import { useGetSpecialsPostsQuery } from "../../../../services/specialPostService";

const SpecialPost = () => {
  const { data, isLoading } = useGetSpecialsPostsQuery();
  const skeleton = "0".repeat(12).split("");
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h6>جایگاه ویژه</h6>
      <div className="slider-container z-10">
        {isLoading ? (
          <div className="flex flex-row gap-4">
            {skeleton.map((value, index) => (
              <PostCardSkeleton key={`${value}-${index}`} />
            ))}
          </div>
        ) : (
          data?.length > 0 && (
            <Swiper
              slidesPerView={4}
              breakpoints={{
                100: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 26,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {data?.map((value, index) => (
                <SwiperSlide>
                  <SpecialPostCard key={index} {...value} />
                </SwiperSlide>
              ))}
            </Swiper>
          )
        )}
      </div>
    </div>
  );
};
export default SpecialPost;
