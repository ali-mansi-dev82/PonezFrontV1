import React from "react";
import Button from "../../../../../shared/components/button";
import { User } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UserDropDown = ({ isAuth, mobile, loginFn }) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    const onClickHandle = () => {
      handleClose();
      onClick();
    };
    return (
      <>
        {link && link !== "" ? (
          <MenuItem sx={{ fontSize: 12 }} dir="rtl" onClick={onClickHandle}>
            <Link className="Fanum" to={link}>
              {title}
            </Link>
          </MenuItem>
        ) : (
          <MenuItem sx={{ fontSize: 12 }} className="Fanum" dir="rtl" onClick={onClickHandle}>
            {title}
          </MenuItem>
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
      <div>
        <Button
          size="small"
          variant="textonly"
          leftIcon={<User size={"16px"} />}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          پنل من
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {isAuth
            ? authDropDownItems.map((value, index) => {
                return (
                  <DropItemComponent
                    key={index}
                    link={value.link}
                    title={value.title}
                    onClick={value.onClick}
                  />
                );
              })
            : noAuthDropDownItems.map((value, index) => {
                return (
                  <DropItemComponent
                    key={index}
                    link={value.link}
                    title={value.title}
                    onClick={value.onClick}
                  />
                );
              })}
        </Menu>
      </div>
    </>
  );
};
export default UserDropDown;
