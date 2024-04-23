import React, { useState } from "react";
import MainContainer from "../../../../shared/components/container";
import logo from "./logo.svg";
import AuthModal from "../modal/index";
import { MessageCircle, MapPinIcon } from "lucide-react";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import SelectCity from "./select_city";
import Categories from "./categories";
import Button from "../../../../shared/components/button";
import { useCity } from "../../../../context/CityContext";
import MuiButton from "@mui/material/Button";

const Navbar = ({ userData, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const { city } = useCity();
  const [selectCity, setSelectCity] = useState(false);

  return (
    <>
      <div className="navbar bg-white shadow-md sticky h-[64px] top-0 z-[9999]">
        <MainContainer>
          <div className="flex items-center flex-1 gap-6">
            <Link to={`/s/`}>
              <img src={logo} alt="" className="w-10" />
            </Link>

            <div className="flex w-[3px] h-[30px] border-r border-r-gray-300"></div>
            <Button
              size="small"
              styleVariant="textonly"
              leftIcon={<MapPinIcon size={"16px"} />}
              onClick={() => setSelectCity(true)}
            >
              {city && city !== "" ? city : "شهر"}
            </Button>
            {selectCity && <SelectCity onClose={() => setSelectCity(false)} />}
            <Categories />
            <Search />
          </div>
          <div className="flex gap-4">
            <UserDropDown
              isAuth={isAuthenticated}
              mobile={userData?.mobile}
              loginFn={() => setShowModal(true)}
            />
            {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
            <Button
              size="small"
              styleVariant="textonly"
              type="link"
              link="/chat"
              leftIcon={<MessageCircle size={"15px"} />}
            >
              چت
            </Button>
            <Button
              size="small"
              styleVariant="textonly"
              type="link"
              link="/support"
            >
              پشتیبانی
            </Button>
            {!isAuthenticated ? (
              <MuiButton  variant="contained" size="small" onClick={() => setShowModal(true)}>
                ثبت آگهی
              </MuiButton>
            ) : (
              <Link to={"/new"}>
                <MuiButton variant="contained" >
                  ثبت آگهی
                </MuiButton>
              </Link>
            )}
          </div>
        </MainContainer>
      </div>
    </>
  );
};
export default Navbar;
