import React from "react";

import ChooseCityDesktop from "./desktop";
import ChooseCityMobile from "./mobile";

const ChooseCity = ({ isMobile }) => {
  return isMobile ? <ChooseCityMobile /> : <ChooseCityDesktop />;
};
export default ChooseCity;
