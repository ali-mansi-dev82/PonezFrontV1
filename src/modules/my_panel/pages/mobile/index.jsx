import React from "react";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import SidePanel from "../side_panel";
import MainContainer from "../../../../shared/components/container";

const MyPanelMobile = () => {
  return (
    <SingleLayoutMobile title="پنل من">
      <MainContainer
        className={`w-full flex flex-col justify-between gap-10 py-8 px-6`}
      >
        <SidePanel />
      </MainContainer>
    </SingleLayoutMobile>
  );
};
export default MyPanelMobile;
