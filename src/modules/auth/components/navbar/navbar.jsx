import { AppBar } from "@mui/material";
import React from "react";

import { useResponsive } from "../../../../context/ResponsiveContext";
import MainContainer from "../../../../shared/components/container";
import NavbarDektop from "./desktop";
import NavbarMobile from "./mobile";

const Navbar = ({
  userData,
  isAuthenticated,
  navbar,
  bottomNavigation,
  searchText,
}) => {
  const { isMobile } = useResponsive();

  return (
    <AppBar
      className="!bg-white !shadow-none border-b border-gray-300 lg:h-[65px] justify-center"
      position="fixed"
    >
      <MainContainer className={`flex flex-row justify-between items-center`}>
        {isMobile ? (
          <NavbarMobile
            navbar={navbar}
            bottomNavigation={bottomNavigation}
            searchText={searchText}
          />
        ) : (
          <NavbarDektop
            isAuthenticated={isAuthenticated}
            userData={userData}
            searchText={searchText}
          />
        )}
      </MainContainer>
    </AppBar>
  );
};
export default Navbar;
