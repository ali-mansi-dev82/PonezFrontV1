import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import React from "react";

import { ReactComponent as Logo } from "../../../../../svgs/Logo.svg";
import useToggle from "../../../../../hooks/useToggle";
import UserDropDown from "./user_drop_down";
import SelectCity from "../select_city";
import Categories from "./categories";
import AuthModal from "../../modal";
import Search from "./search";

const NavbarDektop = () => {
  const [showAuthModal, toggleShowAuthModal] = useToggle(false);
  const [isCityOpen, toggleIsCityOpen] = useToggle(false);
  const [isSearchOpen, toggleIsSearchOpen] = useToggle(false);

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
          onOpen={toggleIsSearchOpen}
          onClose={toggleIsSearchOpen}
          openCity={toggleIsCityOpen}
        />
      </div>
      <div className="flex items-center gap-10 w-max">
        <UserDropDown loginFn={toggleShowAuthModal} />
        <Link to={`/new`}>
          <Button startIcon={<Plus size={20} />} variant="contained">
            ثبت آگهی
          </Button>
        </Link>
        {showAuthModal && (
          <AuthModal open={showAuthModal} onClose={toggleShowAuthModal} />
        )}
        {isCityOpen && (
          <SelectCity onClose={toggleIsCityOpen} isMobile={false} />
        )}
      </div>
    </>
  );
};
export default NavbarDektop;
