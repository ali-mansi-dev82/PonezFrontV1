import React from "react";

import MyPanelDesktop from "./desktop";
import MyPanelMobile from "./mobile";

const MyPanel = ({ isMobile }) => {
  return isMobile ? <MyPanelMobile /> : <MyPanelDesktop />;
};
export default MyPanel;
