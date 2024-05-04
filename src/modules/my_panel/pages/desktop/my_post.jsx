import React from "react";
import MainContainer from "../../../../shared/components/container";
import { Button } from "@mui/material";
import SidePanel from "../side_panel";
import MyPostCard from "../../../post/components/my_post_card";
import BasicLayoutDesktop from "../../../../layouts/desktop/basic_layout";

const MyPostDesktop = ({ isPending, data, handleOnDelete }) => {

  return (
    <BasicLayoutDesktop>
      <MainContainer
        className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
      >
        <SidePanel selected="my-post" />
        <div className="grid grid-cols-2 h-max w-4/5 gap-5">
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
    </BasicLayoutDesktop>
  );
};

export default MyPostDesktop;
