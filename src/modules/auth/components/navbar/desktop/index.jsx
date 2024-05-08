import React, { useState } from "react";
import logo from "./logo.svg";
import AuthModal from "../../modal";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import Categories from "./categories";
import SelectCity from "../select_city";
import Button from "@mui/material/Button";

const NavbarDektop = ({ isAuthenticated, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Search
  const openSearch = setIsSearchOpen.bind(this, true);
  const closeSearch = setIsSearchOpen.bind(this, false);
  // City
  const openCity = setIsCityOpen.bind(this, true);
  const closeCity = setIsCityOpen.bind(this, false);
  return (
    <>
      <div className="flex items-center gap-4 w-max">
        <div className="w-[44px]">
          <Link to={`/s/`}>
            <img src={logo} alt="" className="w-[44px]" loading="lazy" />
          </Link>
        </div>
        <div className="flex w-[3px] h-[30px] border-r border-r-gray-300"></div>
        <Categories />
        <Search
          open={isSearchOpen}
          onOpen={openSearch}
          onClose={closeSearch}
          openCity={openCity}
        />
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
          <Button href={`/new`} variant="contained">
            ثبت آگهی
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setShowModal(true)}>
            ثبت آگهی
          </Button>
        )}
        <AuthModal open={showModal} onClose={() => setShowModal(false)} />
        {isCityOpen && <SelectCity onClose={closeCity} isMobile={false} />}
      </div>
    </>
  );
};
export default NavbarDektop;
