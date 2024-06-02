import React from "react";

import PostCardSkeleton from "../../components/post_card_skeleton";
import PostCard from "../../components/post_card";
import EmptyState from "./empty_state";

const CardsPreview = ({ categoryData, isPending, data, city }) => {
  const skeleton = "0".repeat(12).split("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full gap-5">
      {categoryData?.name && (
        <div className="text-xs col-span-1 lg:col-span-3 text-gray-800">
          {categoryData?.name} در <span className="text-gray-400">{city}</span>
        </div>
      )}
      {isPending ? (
        skeleton.map((_, index) => <PostCardSkeleton key={index} />)
      ) : data?.result?.length > 0 ? (
        data?.result?.map((value, index) => <PostCard key={index} {...value} />)
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
export default CardsPreview;
