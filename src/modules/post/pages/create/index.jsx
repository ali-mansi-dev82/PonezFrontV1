import React from "react";

import CreatePostDesktop from "./desktop";
import CreatePostMobile from "./mobile";

const Index = ({isMobile}) => {
  return isMobile ? <CreatePostMobile /> : <CreatePostDesktop />;
};
export default Index;
