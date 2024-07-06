import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { User } from "lucide-react";
import React from "react";
import { bindActionCreators } from "redux";

import useToggle from "../../../../../hooks/useToggle";
import { log_out } from "../../../../../features/auth/authSlice";

const UserDropDown = ({ loginFn, auth, log_out }) => {
  const [open, toggleOpen] = useToggle(false);

  const handleClick = () => {
    if (auth?.isAuthed) {
      return toggleOpen();
    }
    loginFn();
  };

  const handleLogout = () => {
    log_out();
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
    <div>
      <div className="relative">
        <Button
          size="small"
          className={`${open && `!bg-gray-100`}`}
          variant="textonly"
          startIcon={<User size={16} />}
          onClick={handleClick}
        >
          پنل من
        </Button>
        {auth?.isAuthed && open && (
          <ul
            className="absolute bg-white border border-gray-300 rounded-md w-[170px] mt-1 overflow-hidden shadow"
            onBlur={toggleOpen}
          >
            <DropItemComponent
              className="border-b"
              title="کاربر پونز"
              link={`/my-panel/my-post`}
              secondary={auth?.userInfo?.mobile}
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ log_out }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserDropDown);
