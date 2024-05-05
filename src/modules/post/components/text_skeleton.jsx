import { Skeleton } from "@mui/material";
import React from "react";

const TextSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full gap-3">
      <Skeleton variant="rounded" className="w-full" height={30} />
      <Skeleton variant="rounded" className="w-full" height={20} />
      <Skeleton variant="rounded" className="w-full" height={10} />
    </div>
  );
};
export default TextSkeleton;
