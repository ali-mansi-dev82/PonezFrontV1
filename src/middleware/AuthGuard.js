import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import MainContainer from "../shared/components/container";
import AuthModal from "../modules/auth/components/modal";

const AuthGuard = ({ component }) => {
  const { isAuthed } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState("loading");
  useEffect(() => {
    if (isAuthed === false) setAuth(false);
    if (isAuthed === true) setAuth(true);
  }, [isAuthed]);

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
