import React from "react";
import { CirclePlus, ShapesIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from './Logo.svg';

const ButtonNavigationItem = ({ selected, icon, link, title }) => {
  return (
    <Link
      to={link}
      className={`flex flex-col items-center gap-1  ${
        selected && `text-primary-default`
      }`}
    >
      <div
        className={`px-5 py-[6px] rounded-full ${selected && `bg-primary-0`}`}
      >
        {icon}
      </div>
      <span className="text-xs">{title}</span>
    </Link>
  );
};
const items = [
  {
    icon: <Logo className="stroke-[1.3px]" size={20} />,
    title: "آگهی ها",
    link: `/s/`,
    key: "posts",
  },
  {
    icon: <ShapesIcon className="stroke-[1.3px]" size={20} />,
    title: "دسته ها",
    link: `/category`,
    key: "category",
  },
  {
    icon: <CirclePlus className="stroke-[1.3px]" size={20} />,
    title: "ثبت آگهی",
    link: `/new`,
    key: "new",
  },
  {
    icon: <UserIcon className="stroke-[1.3px]" size={20} />,
    title: "پنل من",
    link: `/my-panel`,
    key: "my-panel",
  },
];

const ButtonNavigation = ({ buttonNavigation, selected = "posts" }) => {
  return (
    <div className="fixed flex flex-row items-center justify-around bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[65px] text-gray-400 px-3 gap-3">
      {buttonNavigation
        ? buttonNavigation
        : items.map((value) => (
            <ButtonNavigationItem
              key={value.key}
              {...value}
              selected={selected === value.key}
            />
          ))}
    </div>
  );
};
export default ButtonNavigation;
