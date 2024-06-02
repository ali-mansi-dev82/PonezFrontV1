import React from "react";

import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import MyRecentPostCard from "../../components/recent_post_card";
import EmptyState from "../empty_state";

const MyRecentMobile = ({ isPending, data }) => {
  return (
    <SingleLayoutMobile buttonNavigation="off" title="نشان های من">
      <div className="grid grid-cols-1 w-full  gap-5">
        {!isPending ? (
          <>
            {data?.length > 0 ? (
              data?.map((value, index) => (
                <MyRecentPostCard key={index} {...value} />
              ))
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[20vh]">
                <EmptyState title={"بازدیدی یافت نشد !"} />
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center items-center py-56 col-span-3">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>
    </SingleLayoutMobile>
  );
};

export default MyRecentMobile;
