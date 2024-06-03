import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowRight } from "lucide-react";
import React from "react";

import useToggle from "../../../../../hooks/useToggle";
import SelectCity from "../select_city";
import Search from "./search";

const NavbarMobile = ({ searchText }) => {
  const location = useLocation();
  let navigate = useNavigate();

  const [isCityOpen, toggleIsCityOpen] = useToggle(false);
  return (
    <>
      <div className="flex flex-row gap-2 w-full py-3">
        {location.pathname !== "/s/" && (
          <IconButton onClick={navigate.bind(this, -1)}>
            <ArrowRight size={16} />
          </IconButton>
        )}
        <Search openCity={toggleIsCityOpen} searchText={searchText} />
      </div>
      {isCityOpen && <SelectCity onClose={toggleIsCityOpen} isMobile={true} />}
    </>
  );
};
export default NavbarMobile;
