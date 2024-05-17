import React from "react";
import MainContainer from "../../shared/components/container";
import { AppBar } from "@mui/material";
import { ReactComponent as Logo } from "../../svgs/Logo.svg";

const InitialLayoutDesktop = ({ children, searchText, filter = [] }) => {
  return (
    <>
      <AppBar
        className="!bg-white !shadow-none border-b border-gray-300 h-[65px] justify-center"
        position="fixed"
      >
        <MainContainer className={`flex flex-row justify-center items-center`}>
          <Logo />
        </MainContainer>
      </AppBar>
      <main className={`mt-[65px]`}>
        <MainContainer
          className={`w-full flex flex-col justify-center items-center gap-8 py-8`}
        >
          {children}
        </MainContainer>
      </main>
    </>
  );
};

export default InitialLayoutDesktop;
