import React from "react";
import SingleLayoutMobile from "../../../../layouts/mobile/single_layout";
import SidePanel from "../side_panel";

const MyPanelMobile = () => {
  return (
    <SingleLayoutMobile buttonNavigationSelected='my-panel' title="پنل من">
      <SidePanel />
    </SingleLayoutMobile>
  );
};
export default MyPanelMobile;
