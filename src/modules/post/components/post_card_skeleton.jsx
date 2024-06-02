import React from "react";
import { Skeleton } from "@mui/material";

const PostCardSkeleton = () => {
  return (
    <div className="flex p-4 border border-gray-200 justify-between rounded-md gap-2 cursor-pointer min-w-[310px]">
      <div className="flex flex-col h-full w-1/2 gap-2">
        <Skeleton variant="rounded" className="w-full" height={30} />
        <Skeleton variant="rounded" className="w-full" height={20} />
        <Skeleton variant="rounded" className="w-full" height={10} />
      </div>
      <Skeleton variant="rounded" width={130} height={130} />
    </div>
  );
};
export default PostCardSkeleton;
