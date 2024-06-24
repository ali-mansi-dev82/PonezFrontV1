import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { log_in, fetch_data, log_out } from "../features/auth/authSlice";
import { useGetUserDetailsQuery } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { data } = useGetUserDetailsQuery();

  useEffect(() => {
    dispatch(fetch_data());

    if (data?.statusCode === 201) {
      dispatch(
        log_in({
          userInfo: data?.user,
          userToken: data?.user?.accessToken,
        })
      );
    }
    if (data?.statusCode === 401) {
      dispatch(log_out());
    }
  }, [data, dispatch]);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
