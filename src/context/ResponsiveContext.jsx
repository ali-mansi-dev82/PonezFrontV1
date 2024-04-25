import { useMediaQuery } from "@mui/material";
import React, { createContext, useContext } from "react";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

  return (
    <ResponsiveContext.Provider value={{ isTabletOrMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
export const useResponsive = () => useContext(ResponsiveContext);
