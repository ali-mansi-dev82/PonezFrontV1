import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ReactComponent as Logo } from "../../../../../svgs/Logo.svg";
import UserDropDown from "./user_drop_down";
import SelectCity from "../select_city";
import Categories from "./categories";
import AuthModal from "../../modal";
import Search from "./search";
import {
  toggle_category,
  toggle_drop_down,
  toggle_select_city,
  toggle_search,
  toggle_auth_modal,
} from "../../../../../features/layout/layoutSlice";

function NavbarDektop({
  toggle_category,
  toggle_drop_down,
  toggle_select_city,
  toggle_search,
  toggle_auth_modal,
  isAuthModalOpen,
  isDropOpen,
  isSearchOpen,
  isSelectCityOpen,
  isCategoryOpen,
}) {
  return (
    <>
      <div className="flex items-center gap-6 w-max">
        <div className="w-max ml-8">
          <Link to={`/s/`}>
            <Logo />
          </Link>
        </div>
        <Categories
          isCategoryOpen={isCategoryOpen}
          toggle_category={toggle_category}
        />
        <Search
          open={isSearchOpen}
          onOpen={toggle_search}
          onClose={toggle_search}
          openCity={toggle_select_city}
        />
      </div>
      <div className="flex items-center gap-10 w-max">
        <UserDropDown
          loginFn={toggle_auth_modal}
          toggle_drop_down={toggle_drop_down}
          isDropOpen={isDropOpen}
        />
        <Link to={`/new`}>
          <Button startIcon={<Plus size={20} />} variant="contained">
            ثبت آگهی
          </Button>
        </Link>
        {isAuthModalOpen && (
          <AuthModal open={isAuthModalOpen} onClose={toggle_auth_modal} />
        )}
        {isSelectCityOpen && (
          <SelectCity onClose={toggle_select_city} isMobile={false} />
        )}
      </div>
    </>
  );
}

const mapStateToProps = ({ layout }) => ({
  isAuthModalOpen: layout.isAuthModalOpen,
  isDropOpen: layout.isDropOpen,
  isSearchOpen: layout.isSearchOpen,
  isSelectCityOpen: layout.isSelectCityOpen,
  isCategoryOpen: layout.isCategoryOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggle_category,
      toggle_drop_down,
      toggle_select_city,
      toggle_search,
      toggle_auth_modal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NavbarDektop);
