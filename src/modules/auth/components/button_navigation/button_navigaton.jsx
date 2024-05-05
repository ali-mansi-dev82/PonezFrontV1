import React from "react";
import { CirclePlus, HomeIcon, ListIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ButtonNavigation = ({ buttonNavigation }) => {
  return (
    <div className="fixed flex flex-row items-center justify-around bottom-0 left-0 right-0 bg-white shadow-bottomNavigate h-[65px] text-gray-400 px-3 gap-3">
      {buttonNavigation ? (
        buttonNavigation
      ) : (
        <>
          <Link to={`/s/`} className="flex flex-col items-center gap-1">
            <HomeIcon size={16} />
            <span className="text-xs">آگهی ها</span>
          </Link>
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <ListIcon size={16} />
            <span className="text-xs">دسته ها</span>
          </div>
          <Link to={`/new`} className="flex flex-col items-center gap-1">
            <CirclePlus size={16} />
            <span className="text-xs">ثبت آگهی</span>
          </Link>
          <Link to={`/my-panel`} className="flex flex-col items-center gap-1">
            <UserIcon size={16} />
            <span className="text-xs">پروفایل من</span>
          </Link>
        </>
      )}
    </div>
  );
};
export default ButtonNavigation;
