import React, { useState } from "react";
import MainContainer from "../../../../shared/components/container";
import logo from "./logo.svg";
import AuthModal from "../modal/index";
import { MapPinIcon } from "lucide-react";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import SelectCity from "./select_city";
import Categories from "./categories";
import Button from "../../../../shared/components/button";
import { useCity } from "../../../../context/CityContext";
import MuiButton from "@mui/material/Button";
import { AppBar } from "@mui/material";

const Navbar = ({ userData, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const { city } = useCity();
  const [selectCity, setSelectCity] = useState(false);

  return (
    <>
      <AppBar className="!bg-white !shadow-md" position="sticky">
        <MainContainer
          className={`flex flex-row justify-between items-center h-[64px]`}
        >
          {" "}
          <div className="flex items-center  gap-6">
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
          </div>{" "}
          <div className="flex items-center gap-4 w-max">
            <UserDropDown
              isAuth={isAuthenticated}
              mobile={userData?.mobile}
              loginFn={() => setShowModal(true)}
            />
            {/* <Button
              size="small"
              variant="textonly"
              type="link"
              link="/chat"
              leftIcon={<MessageCircle size={"15px"} />}
            >
              چت
            </Button> */}
            <Button size="small" variant="textonly" type="link" link="/support">
              پشتیبانی
            </Button>
            {!isAuthenticated ? (
              <MuiButton
                sx={{ paddingY: "0.7rem" }}
                variant="contained"
                onClick={() => setShowModal(true)}
              >
                ثبت آگهی
              </MuiButton>
            ) : (
              <Link to={"/new"}>
                <MuiButton sx={{ paddingY: "0.7rem" }} variant="contained">
                  ثبت آگهی
                </MuiButton>
              </Link>
            )}
            <AuthModal
              open={showModal}
              closeModal={() => setShowModal(false)}
            />
          </div>
        </MainContainer>
      </AppBar>
    </>
  );
};
export default Navbar;
