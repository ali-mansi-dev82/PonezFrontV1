import React from "react";
import { ReactComponent as Empty } from "../../../../svgs/Empty State Search.svg";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Empty />
      <p className="text-base text-gray-800 mt-2">نتیجه ای یافت نشد !</p>
      <p className="text-sm text-gray-300">با این فیلتر ها موردی یافت نشد.</p>
    </div>
  );
};
export default EmptyState;
