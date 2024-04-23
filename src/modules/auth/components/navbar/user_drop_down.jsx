import React from "react";
import Button from "../../../../shared/components/button";
import { User } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const UserDropDown = ({ isAuth, mobile, loginFn }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const DropItemComponent = ({
    title,
    link,
    onClick = () => {
      return;
    },
  }) => {
    return (
      <>
        {link && link !== "" ? (
          <Link
            className="text-xs hover:bg-gray-50 p-3 px-5 cursor-pointer border-b text-gray-500 border-b-gray-100 last:border-b-0 Fanum "
            to={link}
          >
            {title}
          </Link>
        ) : (
          <li
            onClick={onClick}
            className="text-xs hover:bg-gray-50 p-3 px-5 cursor-pointer border-b text-gray-500 border-b-gray-100 last:border-b-0"
          >
            {title}
          </li>
        )}
      </>
    );
  };

  const authDropDownItems = [
    { title: `تلفن ${mobile}`, link: `/my-panel/my-post` },
    { title: "یادداشت ها", link: `/my-panel/notes` },
    { title: "نشان ها", link: `/my-panel/saved` },
    { title: "بازدید های اخیر", link: `/my-panel/recent` },
    { title: "خروج", onClick: handleLogout },
  ];
  const noAuthDropDownItems = [
    {
      title: "ورود",
      onClick: loginFn,
    },
    { title: "یادداشت ها" },
    { title: "نشان ها" },
    { title: "بازدید های اخیر" },
    { title: "پونز برای کسب و کار ها" },
  ];

  return (
    <>
      <div className="dropdown dropdown-bottom">
        <Button
          size="small"
          styleVariant="textonly"
          leftIcon={<User size={"16px"} />}
        >
          پنل من
        </Button>
        <ul
          tabIndex={0}
          className="dropdown-content bg-white z-[1] menu p-0  rounded-md w-52 drop-shadow-modal"
        >
          {isAuth ? (
            <>
              {authDropDownItems.map((value, index) => {
                return (
                  <DropItemComponent
                    key={index}
                    link={value.link}
                    title={value.title}
                    onClick={value.onClick}
                  />
                );
              })}
            </>
          ) : (
            <>
              {noAuthDropDownItems.map((value, index) => {
                return (
                  <DropItemComponent
                    key={index}
                    link={value.link}
                    title={value.title}
                    onClick={value.onClick}
                  />
                );
              })}
            </>
          )}
        </ul>
      </div>
    </>
  );
};
export default UserDropDown;
