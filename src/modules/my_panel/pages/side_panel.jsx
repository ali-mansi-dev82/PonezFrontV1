import React from "react";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ClipboardPenLineIcon,
  Clock2Icon,
  LogOutIcon,
  NotebookPenIcon,
  UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const SidePanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate(`/s/`);
  };
  const url = window.location.pathname;
  const items = [
    {
      title: "اگهی های من",
      icon: <ClipboardPenLineIcon size={20} />,
      link: "/my-panel/my-post",
    },
    {
      title: "نشان ها",
      icon: <BookmarkIcon size={20} />,
      link: "/my-panel/saved",
    },
    {
      title: "یادداشت ها",
      icon: <NotebookPenIcon size={20} />,
      link: "/my-panel/notes",
    },
    {
      title: "بازدید های اخیر",
      icon: <Clock2Icon size={20} />,
      link: "/my-panel/recent",
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full w-full lg:w-1/5 sticky top-28 lg:ml-8">
      <ul className="w-full flex flex-col gap-2 text-gray-500 select-none">
        <li className="text-sm flex flex-col gap-2 pb-0">
          <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
            <UserIcon size={20} />
            <span className="text-base">کاربر پونز</span>
          </div>
          <span className="Fanum text-xs text-gray-400 px-[26px]">
            {user?.mobile}
          </span>
        </li>
        <hr />
        {items?.map((value, index, array) => (
          <li key={index} className="text-sm py-4">
            <Link
              to={value.link}
              className={`w-full flex flex-row items-center justify-between gap-2 ${
                url === value?.link && ` text-primary-40`
              }`}
            >
              <div className="flex flex-row items-center gap-2">
                {value.icon}
                <span
                  className={`text-sm ${url === value?.link && `font-bold`}`}
                >
                  {value.title}
                </span>
              </div>
              <span>
                <span className="lg:hidden">
                  <ChevronLeftIcon size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
        <hr className="text-sm" />
        <li
          onClick={handleLogout}
          to={"/my-panel/saved"}
          className={`w-full flex flex-row items-center justify-between gap-2 py-4 cursor-pointer`}
        >
          <div className="flex flex-row items-center gap-2">
            <LogOutIcon size={20} />
            <span className="text-sm">خروج</span>
          </div>
          <span>
            <span className="lg:hidden">
              <ChevronLeftIcon size={16} />
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
