
import React from "react";
import MyRecentPostCard from "../../components/recent_post_card";
import MainContainer from "../../../../shared/components/container";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";

const MyRecentMobile = ({ isPending, data }) => {
  return (
    <SingleLayoutMobile buttonNavigation='off' title="نشان های من">
      <MainContainer
        className={`w-full flex justify-between gap-8 py-12 h-max`}
      >
        <div className="grid grid-cols-1 w-full  gap-5">
          {!isPending ? (
            <>
              {data?.length > 0 ? (
                data?.map((value, index) => (
                  <MyRecentPostCard key={index} {...value} />
                ))
              ) : (
                <div className="flex flex-col justify-center gap-4 items-center col-span-3">
                  <span className="text-xs text-gray-400">
                    هیچ آگهی را بازدید نکرده اید.
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center items-center py-56 col-span-3">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          )}
        </div>
      </MainContainer>
    </SingleLayoutMobile>
  );
};

export default MyRecentMobile;
