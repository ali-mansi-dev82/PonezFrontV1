import React from "react";
import MainContainer from "../../../../shared/components/container";
import { Button } from "@mui/material";
import MyPostCard from "../../../post/components/my_post_card";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";

const MyPostMobile = ({ isPending, data, handleOnDelete }) => {
  return (
    <SingleLayoutMobile buttonNavigation='off' title="آگهی ها من">
      <MainContainer
        className={`w-full flex justify-between gap-8 py-4 h-max`}
      >
        <div className="grid grid-cols-1 h-max w-full gap-5">
          {!isPending ? (
            <>
              {data?.length > 0 ? (
                data?.map((value, index) => (
                  <MyPostCard
                    onDelete={handleOnDelete}
                    key={index}
                    {...value}
                  />
                ))
              ) : (
                <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[30vh]">
                  <span className="text-xs text-gray-400">
                    در حال حاضر آگهی ثبت‌ شده ندارید.
                  </span>
                  <Button href={`/new`} variant="contained">
                    ثبت اگهی
                  </Button>
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

export default MyPostMobile;
