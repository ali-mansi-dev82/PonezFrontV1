import React from "react";
import { CirclePlus, HomeIcon, ListIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ButtonNavigation = ({ buttonNavigation, selected = "posts" }) => {
  return (
    <div className="fixed flex flex-row items-center justify-around bottom-0 left-0 right-0 bg-white shadow-bottomNavigate h-[65px] text-gray-400 px-3 gap-3">
      {buttonNavigation ? (
        buttonNavigation
      ) : (
        <>
          <Link
            to={`/s/`}
            className={`flex flex-col items-center gap-1 ${
              selected === "posts" && `text-primary-default`
            }`}
          >
            <HomeIcon size={16} />
            <span className="text-xs">آگهی ها</span>
          </Link>
          <Link
            to={`/category`}
            className={`flex flex-col items-center gap-1 ${
              selected === "category" && `text-primary-default`
            }`}
          >
            <ListIcon size={16} />
            <span className="text-xs">دسته ها</span>
          </Link>
          <Link
            to={`/new`}
            className={`flex flex-col items-center gap-1 ${
              selected === "new" && `text-primary-default`
            }`}
          >
            <CirclePlus size={16} />
            <span className="text-xs">ثبت آگهی</span>
          </Link>
          <Link
            to={`/my-panel`}
            className={`flex flex-col items-center gap-1 ${
              selected === "my-panel" && `text-primary-default`
            }`}
          >
            <UserIcon size={16} />
            <span className="text-xs">پروفایل من</span>
          </Link>
        </>
      )}
    </div>
  );
};
export default ButtonNavigation;
