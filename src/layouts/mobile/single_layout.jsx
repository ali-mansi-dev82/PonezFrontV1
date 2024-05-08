import React from "react";
import ButtonNavigation from "../../modules/auth/components/button_navigation/button_navigaton";
import { AppBar, IconButton } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../shared/components/container";

const SingleLayoutMobile = ({
  children,
  title = "",
  navbarActions,
  buttonNavigation,
  container,
  buttonNavigationSelected,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <AppBar
        className="!bg-white !shadow-md h-[65px] justify-center"
        position="fixed"
      >
        <MainContainer
          className={`w-full flex justify-between gap-5 py-4 px-6`}
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <IconButton onClick={navigate.bind(this, -1)}>
              <ArrowRight size={16} />
            </IconButton>
            <span>{title}</span>
          </div>
          <div className="text-base font-bold">{navbarActions}</div>
        </MainContainer>
      </AppBar>
      <main
        className={`pt-[64px] ${buttonNavigation !== "off" && `pb-[100px]`}`}
      >
        {container === "off" ? (
          children
        ) : (
          <MainContainer
            className={`w-full flex justify-center gap-5 py-8 px-6`}
          >
            {children}
          </MainContainer>
        )}
      </main>
      {buttonNavigation !== "off" && (
        <ButtonNavigation
          buttonNavigation={buttonNavigation}
          selected={buttonNavigationSelected}
        />
      )}
    </>
  );
};

export default SingleLayoutMobile;
