import React, { useState } from "react";
import logo from "./logo.svg";
import AuthModal from "../../modal";
import { MapPinIcon } from "lucide-react";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import SelectCity from "./select_city";
import Categories from "./categories";
import MuiButton from "@mui/material/Button";
import Button from "../../../../../shared/components/button";

const NavbarDektop = ({
  isAuthenticated,
  userData,
  city,
  selectCity,
  setSelectCity,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 w-max">
        <div className="w-[44px]">
          <Link to={`/s/`}>
            <img src={logo} alt="" className="w-[44px]" />
          </Link>
        </div>
        <div className="flex w-[3px] h-[30px] border-r border-r-gray-300"></div>
        <Button
          size="small"
          variant="textonly"
          className="w-max"
          leftIcon={<MapPinIcon size={"16px"} />}
          onClick={() => setSelectCity(true)}
        >
          {city && city !== "" ? city : "شهر"}
        </Button>
        {selectCity && <SelectCity onClose={() => setSelectCity(false)} />}
        <Categories />
        <Search />
      </div>
      <div className="flex items-center gap-4 w-max">
        <UserDropDown
          isAuth={isAuthenticated}
          mobile={userData?.mobile}
          loginFn={() => setShowModal(true)}
        />
        <Button size="small" variant="textonly" type="link" link="/support">
          پشتیبانی
        </Button>
        {isAuthenticated ? (
          <Link to={"/new"}>
            <MuiButton sx={{ paddingY: "0.7rem" }} variant="contained">
              ثبت آگهی
            </MuiButton>
          </Link>
        ) : (
          <MuiButton
            sx={{ paddingY: "0.7rem" }}
            variant="contained"
            onClick={() => setShowModal(true)}
          >
            ثبت آگهی
          </MuiButton>
        )}
        <AuthModal open={showModal} closeModal={() => setShowModal(false)} />
      </div>
    </>
  );
};
export default NavbarDektop;
