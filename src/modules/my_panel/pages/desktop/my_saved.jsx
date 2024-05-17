import React from "react";
import SavedPostCard from "../../../bookmark/components/saved_post_card";
import SidePanel from "../side_panel";
import BasicLayoutDesktop from "../../../../layouts/desktop/basic_layout";

const MySavedDesktop = ({ isPending, data, handleOnDelete }) => {
  return (
    <BasicLayoutDesktop>
        <SidePanel />
        <div className="grid grid-cols-2 h-max w-4/5 gap-5">
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
    </BasicLayoutDesktop>
  );
};

export default MySavedDesktop;
