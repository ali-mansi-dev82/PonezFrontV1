import React, { useState } from "react";
import MainContainer from "../../../../shared/components/container";
import { AppBar } from "@mui/material";
import NavbarMobile from "./mobile";
import NavbarDektop from "./desktop";
import { useResponsive } from "../../../../context/ResponsiveContext";
import { useCity } from "../../../../context/CityContext";

const Navbar = ({ userData, isAuthenticated }) => {
  const { isTabletOrMobile } = useResponsive();
  const { city } = useCity();
  const [selectCity, setSelectCity] = useState(false);

  return (
    <>
      <AppBar className="!bg-white !shadow-md" position="sticky">
        <MainContainer className={`flex flex-row justify-between items-center`}>
          {isTabletOrMobile ? (
            <NavbarMobile
              city={city}
              selectCity={selectCity}
              setSelectCity={setSelectCity}
            />
          ) : (
            <NavbarDektop
              isAuthenticated={isAuthenticated}
              userData={userData}
              city={city}
              selectCity={selectCity}
              setSelectCity={setSelectCity}
            />
          )}
        </MainContainer>
      </AppBar>
    </>
  );
};
export default Navbar;
