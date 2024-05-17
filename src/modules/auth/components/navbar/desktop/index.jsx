import React, { useState } from "react";
import AuthModal from "../../modal";
import Search from "./search";
import UserDropDown from "./user_drop_down";
import { Link } from "react-router-dom";
import Categories from "./categories";
import SelectCity from "../select_city";
import Button from "@mui/material/Button";
import { Plus } from "lucide-react";
import { ReactComponent as Logo } from "../../../../../svgs/Logo.svg";

const NavbarDektop = ({ isAuthenticated, userData, searchText }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
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
      <div className="flex items-center gap-6 w-max">
        <div className="w-max ml-8">
          <Link to={`/s/`}>
            <Logo />
          </Link>
        </div>
        <Categories />
        <Search
          open={isSearchOpen}
          onOpen={openSearch}
          onClose={closeSearch}
          openCity={openCity}
        />
      </div>
      <div className="flex items-center gap-10 w-max">
        <UserDropDown
          isAuth={isAuthenticated}
          mobile={userData?.mobile}
          loginFn={setShowAuthModal.bind(this, true)}
        />
        <Button
          startIcon={<Plus size={20} />}
          href={`/new`}
          variant="contained"
        >
          ثبت آگهی
        </Button>
        {showAuthModal && (
          <AuthModal
            open={showAuthModal}
            onClose={setShowAuthModal.bind(this, false)}
          />
        )}

        {isCityOpen && <SelectCity onClose={closeCity} isMobile={false} />}
      </div>
    </>
  );
};
export default NavbarDektop;
