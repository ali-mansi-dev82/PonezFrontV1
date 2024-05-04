import React from "react";
import MainContainer from "../../../../shared/components/container";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import MyNotePostCard from "../../../note/components/note_post_card";

const MyNotesMobile = ({ isPending, data, handleOnDelete }) => {
  return (
    <SingleLayoutMobile buttonNavigation='off' title="یادداشت ها">
      <MainContainer
        className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
      >
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
      </MainContainer>
    </SingleLayoutMobile>
  );
};

export default MyNotesMobile;
