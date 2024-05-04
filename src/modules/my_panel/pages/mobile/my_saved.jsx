import React from "react";
import MainContainer from "../../../../shared/components/container";
import SavedPostCard from "../../../bookmark/components/saved_post_card";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";

const MySavedMobile = ({ isPending, data, handleOnDelete }) => {
  return (
    <SingleLayoutMobile buttonNavigation='off' title="نشان های من">
      <MainContainer
        className={`w-full flex justify-between gap-8 py-12 h-max min-h-[calc(100vh-65px)]`}
      >
        <div className="grid grid-cols-1 h-max w-full gap-5">
          {!isPending ? (
            <>
              {data?.length > 0 ? (
                data?.map((value, index) => (
                  <SavedPostCard
                    onDelete={handleOnDelete.bind(this, value)}
                    key={index}
                    {...value}
                  />
                ))
              ) : (
                <div className="col-span-3 py-[30vh] flex flex-col justify-center gap-4 items-center">
                  <span className="text-xs text-gray-400">
                    هیچ آگهی را نشان نکرده اید.
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

export default MySavedMobile;
