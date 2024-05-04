import React from "react";
import { useResponsive } from "../../../context/ResponsiveContext";
import MyPanelDesktop from "./desktop";
import MyPanelMobile from "./mobile";

const MyPanel = () => {
  const { isTabletOrMobile } = useResponsive();
  return isTabletOrMobile ? <MyPanelMobile /> : <MyPanelDesktop />;
};
export default MyPanel;
