import React from "react";
import MainContainer from "../../../shared/components/container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { UserSeenFn } from "../../user/query";
import SidePanel from "./side_panel";
import MyRecentPostCard from "../components/recent_post_card";

const Index = () => {
  const myPostQuery = useQuery({
    queryKey: ["my_seen"],
    queryFn: UserSeenFn.bind(this),
  });

  return (
    <MainContainer
      className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
    >
      <SidePanel selected="recent" />
      <div className="grid grid-cols-3 h-full w-4/5 gap-5">
        {!myPostQuery?.isPending ? (
          <>
            {myPostQuery?.data?.length > 0 ? (
              myPostQuery?.data?.map((value, index) => (
                <MyRecentPostCard key={index} {...value} />
              ))
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center">
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
