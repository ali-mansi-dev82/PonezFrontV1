import React from "react";
import MainContainer from "../../../shared/components/container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { UserSavedFn } from "../../user/query";
import SavedPostCard from "../../bookmark/components/saved_post_card";
import SidePanel from "./side_panel";

const Index = () => {
  const myPostQuery = useQuery({
    queryKey: ["my_saved"],
    queryFn: UserSavedFn.bind(this),
  });

  const onDeletHandle = (data) => {
    myPostQuery.refetch();
    // myPostQuery.data = myPostQuery.data.filter(
    //   (value, index, array) => value._id !== data._id
    // );
  };

  return (
    <MainContainer
      className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
    >
      <SidePanel selected="saved" />
      <div className="grid grid-cols-2 h-full w-4/5 gap-5">
        {!myPostQuery?.isPending ? (
          <>
            {myPostQuery?.data?.length > 0 ? (
              myPostQuery?.data?.map((value, index) => (
                <SavedPostCard
                  onDelete={onDeletHandle.bind(this, value)}
                  key={index}
                  {...value}
                />
              ))
            ) : (
              <div className="col-span-3 py-[30vh] flex flex-col justify-center gap-4 items-center">
                <span className="text-xs text-gray-400">
                  در حال حاضر آگهی ثبت‌ شده ندارید.
                </span>
                <Link to={`/new`} className="pt-3">
                  <Button variant="contained">ثبت اگهی</Button>
                </Link>
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
  );
};

export default Index;
