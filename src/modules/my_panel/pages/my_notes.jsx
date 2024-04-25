import React from "react";
import MainContainer from "../../../shared/components/container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { UserNoteFn } from "../../user/query";
import SidePanel from "./side_panel";
import MyNotePostCard from "../../note/components/note_post_card";

const Index = () => {
  const myNotesQuery = useQuery({
    queryKey: ["my_notes"],
    queryFn: UserNoteFn.bind(this),
  });

  const onDelete = () => {
    myNotesQuery.refetch();
  };

  return (
    <MainContainer
      className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
    >
      <SidePanel selected="notes" />
      <div className="grid grid-cols-3 h-full w-4/5 gap-5">
        {!myNotesQuery?.isPending ? (
          <>
            {myNotesQuery?.data?.length > 0 ? (
              myNotesQuery?.data?.map((value, index) => (
                <MyNotePostCard
                  onDelete={onDelete}
                  savedContent={value.content}
                  key={index}
                  {...value.post}
                />
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
