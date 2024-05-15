import React, { useState } from "react";
import Search from "./search";
import SelectCity from "../select_city";
import { IconButton } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarMobile = ({ searchText }) => {
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
        <Search openCity={openCity} searchText={searchText} />
      </div>
      {isCityOpen && <SelectCity onClose={closeCity} isMobile={true} />}
    </>
  );
};
export default NavbarMobile;
