import React, { createContext, useContext } from "react";
import Navbar from "../modules/auth/components/navbar/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider>
      <>
        <Navbar />
        {children}
      </>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
