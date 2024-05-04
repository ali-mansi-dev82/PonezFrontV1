import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSavedFn } from "../../user/query";
import { useResponsive } from "../../../context/ResponsiveContext";
import MySavedMobile from "./mobile/my_saved";
import MySavedDesktop from "./desktop/my_saved";

const MySaved = () => {
  const myPostQuery = useQuery({
    queryKey: ["my_saved"],
    queryFn: UserSavedFn.bind(this),
  });

  const onDeletHandle = () => {
    myPostQuery.refetch();
  };
  const { isTabletOrMobile } = useResponsive();
  return isTabletOrMobile ? (
    <MySavedMobile
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={onDeletHandle}
    />
  ) : (
    <MySavedDesktop
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={onDeletHandle}
    />
  );
  //   <MainContainer
  //     className={`w-full flex justify-between gap-8 py-12 h-max min-h-[calc(100vh-65px)]`}
  //   >
  //     <SidePanel selected="saved" />
  //     <div className="grid grid-cols-2 h-max w-4/5 gap-5">
  //       {!myPostQuery?.isPending ? (
  //         <>
  //           {myPostQuery?.data?.length > 0 ? (
  //             myPostQuery?.data?.map((value, index) => (
  //               <SavedPostCard
  //                 onDelete={onDeletHandle.bind(this, value)}
  //                 key={index}
  //                 {...value}
  //               />
  //             ))
  //           ) : (
  //             <div className="col-span-3 py-[30vh] flex flex-col justify-center gap-4 items-center">
  //               <span className="text-xs text-gray-400">
  //                 هیچ آگهی را نشان نکرده اید.
  //               </span>
  //             </div>
  //           )}
  //         </>
  //       ) : (
  //         <div className="w-full flex justify-center items-center py-56 col-span-3">
  //           <span className="loading loading-spinner loading-md"></span>
  //         </div>
  //       )}
  //     </div>
  //   </MainContainer>
  // );
};

export default MySaved;
