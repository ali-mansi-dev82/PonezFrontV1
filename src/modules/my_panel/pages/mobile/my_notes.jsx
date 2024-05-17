import React from "react";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import MyNotePostCard from "../../../note/components/note_post_card";
import EmptyState from "../empty_state";

const MyNotesMobile = ({ isPending, data, handleOnDelete }) => {
  return (
    <SingleLayoutMobile buttonNavigation="off" title="یادداشت ها">
      <title>My Site: Contact Us</title>
      <div className="grid grid-cols-1 h-full w-full gap-5">
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
              <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[20vh]">
                <EmptyState title={"یادداشتی یافت نشد !"} />
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

export default MyNotesMobile;
