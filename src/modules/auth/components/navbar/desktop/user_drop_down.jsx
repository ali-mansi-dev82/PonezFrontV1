import React, { useState } from "react";
import { User } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const UserDropDown = ({ isAuth, mobile, loginFn }) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    if (isAuth) {
      return setOpen(!open);
    }
    loginFn();
  };

  const handleLogout = () => {
    logout();
  };

  const DropItemComponent = ({
    title,
    link,
    secondary,
    className,
    onClick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      return;
    },
  }) => {
    return (
      <li
        onClick={onClick}
        className={`flex border-gray-200 text-gray-800 Fanum cursor-pointer hover:bg-gray-50 ${className}`}
      >
        {link && link !== "" ? (
          <Link
            className="Fanum w-full flex flex-col justify-start gap-1 px-3 py-3"
            to={link}
          >
            <div className="text-sm">{title}</div>
            {secondary && (
              <div className="Fanum text-xs text-gray-400">{secondary}</div>
            )}
          </Link>
        ) : (
          <div
            className="Fanum flex flex-col justify-start gap-1 px-3 py-3"
            onClick={onClick}
          >
            <div className="text-sm">{title}</div>
            {secondary && (
              <div className="Fanum text-xs text-gray-400">{secondary}</div>
            )}
          </div>
        )}
      </li>
    );
  };

  const authDropDownItems = [
    { title: "آگهی ها من", link: `/my-panel/my-post` },
    { title: "یادداشت ها", link: `/my-panel/notes` },
    { title: "نشان ها", link: `/my-panel/saved` },
    { title: "بازدید های اخیر", link: `/my-panel/recent` },
  ];

  return (
    <>
      <div className="relative">
        <Button
          size="small"
          className={`${open&&`!bg-gray-100`}`}
          variant="textonly"
          startIcon={<User size={16} />}
          onClick={handleClick}
        >
          پنل من
        </Button>
        {isAuth && open && (
          <ul className="absolute bg-white border border-gray-300 rounded-md w-[170px] mt-1 overflow-hidden shadow" onBlur={setOpen.bind(this, false)}>
            <DropItemComponent
              className="border-b"
              title="کاربر پونز"
              link={`/my-panel/my-post`}
              secondary={mobile}
            />
            {authDropDownItems.map((value, index) => {
              return <DropItemComponent key={index} {...value} />;
            })}
            <DropItemComponent
              className="border-t"
              title="خروج"
              onClick={handleLogout}
            />
          </ul>
        )}
      </div>
    </>
  );
};
export default UserDropDown;
