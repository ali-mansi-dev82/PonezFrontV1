import React from "react";
import MainContainer from "../../../../shared/components/container";
import { AppBar } from "@mui/material";
import NavbarMobile from "./mobile";
import NavbarDektop from "./desktop";
import { useResponsive } from "../../../../context/ResponsiveContext";

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
