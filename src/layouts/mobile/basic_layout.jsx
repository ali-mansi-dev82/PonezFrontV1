import React from "react";
import Navbar from "../../modules/auth/components/navbar/navbar";
import { useAuth } from "../../context/AuthContext";
import ButtonNavigation from "../../modules/auth/components/button_navigation/button_navigaton";
import MainContainer from "../../shared/components/container";

const BasicLayoutMobile = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar userData={user} isAuthenticated={isAuthenticated} />
      <main className="py-[64px] ">
        {" "}
        <MainContainer
          className={`w-full flex flex-col justify-center gap-5 py-12 px-6`}
        >
          {children}
        </MainContainer>
      </main>
      <ButtonNavigation />
    </>
  );
};

export default BasicLayoutMobile;
