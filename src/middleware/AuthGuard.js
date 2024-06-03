import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import MainContainer from "../shared/components/container";
import AuthModal from "../modules/auth/components/modal";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ component }) => {
  const { isAuthenticated } = useAuth();
  const [auth, setAuth] = useState("loading");
  useEffect(() => {
    if (isAuthenticated === false) setAuth(false);
    if (isAuthenticated === true) setAuth(true);
  }, [isAuthenticated]);

  return (
    <>
      {auth === "loading" && (
        <MainContainer
          className={`w-full flex justify-center  py-44 gap-5`}
        >
          <CircularProgress />
        </MainContainer>
      )}
      {auth === true && component}
      {auth === false && <AuthModal open={true} />}
    </>
  );
};

export default AuthGuard;
