import React from "react";
import Navbar from "../../modules/auth/components/navbar/navbar";
import { useAuth } from "../../context/AuthContext";

const BasicLayoutDesktop = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar userData={user} isAuthenticated={isAuthenticated} />
      <main className="py-[64px]">{children}</main>
    </>
  );
};

export default BasicLayoutDesktop;
