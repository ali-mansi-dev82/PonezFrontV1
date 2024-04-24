import React, { useState } from "react";
import MainContainer from "../../../../shared/components/container";
import logo from "./logo.svg";
import AuthModal from "../modal/index";
import { MessageCircle, MapPinIcon, MenuIcon, TrashIcon } from "lucide-react";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import SelectCity from "./select_city";
import Categories from "./categories";
import Button from "../../../../shared/components/button";
import { useCity } from "../../../../context/CityContext";
import MuiButton from "@mui/material/Button";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

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
              styleVariant="textonly"
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
            <AuthModal open={showModal} closeModal={() => setShowModal(false)} />
            {/* {showModal && } */}
            {!isAuthenticated ? (
              <MuiButton variant="contained" onClick={() => setShowModal(true)}>
                ثبت آگهی
              </MuiButton>
            ) : (
              <Link to={"/new"}>
                <MuiButton variant="contained">ثبت آگهی</MuiButton>
              </Link>
            )}
          </div>
        </MainContainer>
        {/* <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar> */}
      </AppBar>
      {/* <div className="navbar bg-white shadow-md sticky h-[64px] top-0 z-[9999]">
        <MainContainer
          className={`flex flex-row justify-between items-center h-[64px]`}
        >
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
            { }
            {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
            
            {!isAuthenticated ? (
              <MuiButton
                variant="contained"
                size="small"
                onClick={() => setShowModal(true)}
              >
                ثبت آگهی
              </MuiButton>
            ) : (
              <Link to={"/new"}>
                <MuiButton variant="contained">ثبت آگهی</MuiButton>
              </Link>
            )}
          </div>
        </MainContainer>
      </div> */}
    </>
  );
};
export default Navbar;
