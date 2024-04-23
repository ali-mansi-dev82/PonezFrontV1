import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../modules/auth/components/modal";

const AuthGuard = ({ component }) => {
  const { isAuthenticated, login } = useAuth();

  return (
    <>
      {isAuthenticated === false ? (
        <AuthModal
          closeModal={() => {
            login();
          }}
        />
      ) : (
        component
      )}
    </>
  );
};

export default AuthGuard;
