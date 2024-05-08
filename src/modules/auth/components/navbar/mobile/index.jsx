import React, { useState } from "react";
import Search from "./search";
import SelectCity from "../select_city";
import { IconButton } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonNavigation from "../../button_navigation/button_navigaton";

const NavbarMobile = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const [isCityOpen, setIsCityOpen] = useState(false);
  // City
  const openCity = setIsCityOpen.bind(this, true);
  const closeCity = setIsCityOpen.bind(this, false);
  return (
    <>
      <div className="flex flex-row gap-2 w-full py-3">
        {location.pathname !== "/s/" && (
          <IconButton onClick={navigate.bind(this, -1)}>
            <ArrowRight size={16} />
          </IconButton>
        )}
        <Search openCity={openCity} />
      </div>
      {isCityOpen && <SelectCity onClose={closeCity} isMobile={true} />}
      <ButtonNavigation />
    </>
  );
};
export default NavbarMobile;
