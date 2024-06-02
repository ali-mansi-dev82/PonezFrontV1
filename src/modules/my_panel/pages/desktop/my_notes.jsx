import React from "react";

import BasicLayoutDesktop from "../../../../layouts/desktop/basic_layout";
import MyNotePostCard from "../../../note/components/note_post_card";
import SidePanel from "../side_panel";

const MyNotesDesktop = ({ isPending, data, handleOnDelete }) => {
  return (
    <BasicLayoutDesktop>
      <SidePanel />
      <div className="grid grid-cols-2 h-full w-4/5 gap-5">
        {!isPending ? (
          <>
            {data?.length > 0 ? (
              data?.map((value, index) => (
                <MyNotePostCard
                  onDelete={handleOnDelete}
                  savedContent={value.content}
                  key={index}
                  {...value.post}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center col-span-3">
                <span className="text-xs text-gray-400">
                  هیچ یادداشتی یافت نشد.
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

export default MyNotesDesktop;
