import React from "react";
import { ReactComponent as Empty } from "../../../svgs/Empty State.svg";

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Empty />
      <p className="text-base text-gray-800 mt-2">{title}</p>
      <p className="text-sm text-gray-300">{description}</p>
      {action}
    </div>
  );
};
export default EmptyState;
