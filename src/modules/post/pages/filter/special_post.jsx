import React from "react";
import { FindSpecailFn } from "../../../special/query";
import { useQuery } from "@tanstack/react-query";
import SpecialPostCard from "../../../special/components/special_post_card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import PostCardSkeleton from "../../components/post_card_skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SpecialPost = () => {
  const specialPostQuery = useQuery({
    queryKey: ["special_post"],
    queryFn: FindSpecailFn,
  });
  const skeleton = "0".repeat(12).split("");
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h6>جایگاه ویژه</h6>
      <div className="slider-container z-10">
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
          {specialPostQuery?.isPending
            ? skeleton.map((value, index) => <PostCardSkeleton key={index} />)
            : specialPostQuery?.data?.length > 0 &&
              specialPostQuery?.data?.map((value, index) => (
                <SwiperSlide>
                  <SpecialPostCard key={index} {...value} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};
export default SpecialPost;
