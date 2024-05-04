import React from "react";
import { useResponsive } from "../../../../context/ResponsiveContext";
import CreatePostDesktop from "./desktop";
import CreatePostMobile from "./mobile";

const Index = () => {
  const { isTabletOrMobile } = useResponsive();
  return isTabletOrMobile ? <CreatePostMobile /> : <CreatePostDesktop />;
};
export default Index;
