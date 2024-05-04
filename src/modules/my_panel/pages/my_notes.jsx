import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserNoteFn } from "../../user/query";
import MyNotesMobile from "./mobile/my_notes";
import MyNotesDesktop from "./desktop/my_notes";

const Index = ({isMobile}) => {
  const myNotesQuery = useQuery({
    queryKey: ["my_notes"],
    queryFn: UserNoteFn.bind(this),
  });

  const onDelete = () => {
    myNotesQuery.refetch();
  };
  return isMobile ? (
    <MyNotesMobile
      isPending={myNotesQuery?.isPending}
      data={myNotesQuery?.data}
      handleOnDelete={onDelete}
    />
  ) : (
    <MyNotesDesktop
      isPending={myNotesQuery?.isPending}
      data={myNotesQuery?.data}
      handleOnDelete={onDelete}
    />
  );
  // return (
  //   <MainContainer
  //     className={`w-full flex justify-between gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
  //   >
  //     <SidePanel selected="notes" />
  //     <div className="grid grid-cols-3 h-full w-4/5 gap-5">
  //       {!myNotesQuery?.isPending ? (
  //         <>
  //           {myNotesQuery?.data?.length > 0 ? (
  //             myNotesQuery?.data?.map((value, index) => (
  //               <MyNotePostCard
  //                 onDelete={onDelete}
  //                 savedContent={value.content}
  //                 key={index}
  //                 {...value.post}
  //               />
  //             ))
  //           ) : (
  //             <div className="flex flex-col justify-center gap-4 items-center col-span-3">
  //               <span className="text-xs text-gray-400">
  //                 هیچ یادداشتی یافت نشد.
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

export default Index;
