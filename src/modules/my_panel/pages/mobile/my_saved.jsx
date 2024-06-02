import React from "react";

import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import SavedPostCard from "../../../bookmark/components/saved_post_card";
import EmptyState from "../empty_state";

const MySavedMobile = ({ isPending, data, handleOnDelete }) => {
  return (
    <SingleLayoutMobile buttonNavigation="off" title="نشان های من">
      <div className="grid grid-cols-1 h-max w-full gap-5">
        {!isPending ? (
          <>
            {data?.length > 0 ? (
              data?.map((value, index) => (
                <SavedPostCard
                  key={index}
                  onDelete={handleOnDelete.bind(this, value)}
                  {...value}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[20vh]">
                <EmptyState title={"آگهی نشان شده ای یافت نشد!"} />
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

export default MySavedMobile;
