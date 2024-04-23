import React from "react";
import {
  BookmarkIcon,
  Clock4Icon,
  LogOutIcon,
  ScrollIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const SidePanel = ({ selected = "" }) => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-6 h-full w-1/5 sticky top-24">
      <ul className="w-full flex flex-col gap-8 text-gray-500">
        <li className="text-sm flex flex-col gap-2 pb-0">
          <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
            <UserIcon size={16} />
            <span>کاربر پونز</span>
          </div>
          <span className="Fanum text-xs text-gray-300 px-3">
            تلفن {user?.mobile}
          </span>
        </li>
        <li className="text-sm">
          <Link
            to={"/my-panel/my-post"}
            className={`w-full flex flex-row items-center justify-start gap-2 ${
              selected === "my-post" && ` text-primary-default`
            }`}
          >
            <ScrollIcon size={16} />
            <span>اگهی های من</span>
          </Link>
        </li>
        <li className="text-sm">
          <Link
            to={"/my-panel/saved"}
            className={`w-full flex flex-row items-center justify-start gap-2 ${
              selected === "saved" && ` text-primary-default`
            }`}
          >
            <BookmarkIcon size={16} />
            <span>نشان ها</span>
          </Link>
        </li>
        <li className="text-sm">
          <Link
            to={"/my-panel/notes"}
            className={`w-full flex flex-row items-center justify-start gap-2 ${
              selected === "notes" && ` text-primary-default`
            }`}
          >
            <ScrollTextIcon size={16} />
            <span>یادداشت ها</span>
          </Link>
        </li>
        <li className="text-sm">
          <Link
            to={"/my-panel/recent"}
            className={`w-full flex flex-row items-center justify-start gap-2 ${
              selected === "recent" && ` text-primary-default`
            }`}
          >
            <Clock4Icon size={16} />
            <span>بازدید های اخیر</span>
          </Link>
        </li>
        <hr />
        <li className="text-sm">
          <Link
            className={`w-full flex flex-row items-center justify-start gap-2`}
          >
            <LogOutIcon size={16} />
            <span>خروج</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
