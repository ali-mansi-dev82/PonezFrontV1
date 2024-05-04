import React from "react";
import MainContainer from "../../../../shared/components/container";
import SidePanel from "../side_panel";
import MyRecentPostCard from "../../components/recent_post_card";
import BasicLayoutDesktop from "../../../../layouts/desktop/basic_layout";

const MyRecentDesktop = ({ isPending, data }) => {
  return (
    <BasicLayoutDesktop>
      <MainContainer
        className={`w-full flex justify-between gap-8 py-12 h-max min-h-[calc(100vh-65px)]`}
      >
        <SidePanel selected="recent" />
        <div className="grid grid-cols-3 h-full w-4/5 gap-5">
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
    </BasicLayoutDesktop>
  );
};

export default MyRecentDesktop;
