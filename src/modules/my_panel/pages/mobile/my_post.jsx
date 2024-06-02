import { Button } from "@mui/material";
import React from "react";

import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import MyPostCard from "../../../post/components/my_post_card";
import EmptyState from "../empty_state";

const MyPostMobile = ({ isPending, data, handleOnDelete, mySpecials }) => {
  return (
    <SingleLayoutMobile buttonNavigation="off" title="آگهی ها من">
      <div className="grid grid-cols-1 h-max w-full gap-5">
        {!isPending ? (
          <>
            {data?.length > 0 ? (
              data?.map((value, index) => {
                const special = mySpecials?.filter(
                  (item) => value._id === item.post
                )?.length;
                return (
                  <MyPostCard
                    onDelete={handleOnDelete}
                    key={index}
                    {...value}
                    special={special}
                  />
                );
              })
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[20vh]">
                <EmptyState
                  title={"آگهی یافت نشد!"}
                  action={
                    <Button href={`/new`} variant="contained">
                      ثبت آگهی جدید
                    </Button>
                  }
                />
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

export default MyPostMobile;
