import React from "react";
import Navbar from "../../modules/auth/components/navbar/navbar";
import { useAuth } from "../../context/AuthContext";
import MainContainer from "../../shared/components/container";

const BasicLayoutDesktop = ({ children, containerClass, searchText = "" }) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar
        userData={user}
        isAuthenticated={isAuthenticated}
        searchText={searchText}
      />
      <main className="py-[64px]">
        <MainContainer
          className={`w-full flex justify-center gap-5 py-12 ${containerClass}`}
        >
          {children}
        </MainContainer>
      </main>
    </>
  );
};

export default BasicLayoutDesktop;