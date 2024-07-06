import { connect } from "react-redux";
import { AppBar } from "@mui/material";
import React, { useEffect } from "react";

import { useResponsive } from "../../../../context/ResponsiveContext";
import MainContainer from "../../../../shared/components/container";
import NavbarDektop from "./desktop";
import NavbarMobile from "./mobile";

const Navbar = ({ navbar, bottomNavigation, searchText, auth }) => {
  const { isMobile } = useResponsive();
  useEffect(() => {
    console.log(auth);
  }, [auth]);
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
            isAuthenticated={auth?.isAuthed}
            userData={auth?.authuserInfo}
            searchText={searchText}
          />
        )}
      </MainContainer>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Navbar);
