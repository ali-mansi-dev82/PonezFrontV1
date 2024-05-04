import React from "react";
import Navbar from "../../modules/auth/components/navbar/navbar";
import { useAuth } from "../../context/AuthContext";
import ButtonNavigation from "../../modules/auth/components/button_navigation/button_navigaton";

const BasicLayoutMobile = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar userData={user} isAuthenticated={isAuthenticated} />
      <main className="py-[64px] ">{children}</main>
      <ButtonNavigation />
    </>
  );
};

export default BasicLayoutMobile;
