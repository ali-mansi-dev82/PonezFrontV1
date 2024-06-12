import React, { createContext, useState, useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  removeAccessTokenCookies,
  getAccessTokenCookies,
} from "../shared/util/accessTokenCookie";
import { fetch_data, log_in } from "../redux/actions/auth";
import { LogoutFn } from "../modules/auth/mutations";
import { UserInfoFn } from "../modules/user/query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const userInfoQuery = useMutation({
    mutationKey: ["userInfo"],
    mutationFn: UserInfoFn,
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: LogoutFn,
  });

  useEffect(() => {
    initialStatus();
  }, []);

  const initialStatus = async () => {
    try {
      dispatch(fetch_data());
      const token = await getAccessTokenCookies();
      setToken(token);
      if (token === undefined || token === null) setIsAuthenticated(false);
      else userInfoQuery.mutateAsync(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfoQuery?.data?.statusCode === 201) {
      dispatch(
        log_in({
          userInfo: userInfoQuery?.data?.user,
          userToken: token,
        })
      );
    }
    if (userInfoQuery?.data?.statusCode === 401) {
      setIsAuthenticated(false);
    }
  }, [userInfoQuery?.data, dispatch, token]);

  const login = (token = "") => {
    userInfoQuery.mutateAsync(token);
  };

  const logout = () => {
    removeAccessTokenCookies();
    setIsAuthenticated(false);
    setUser({});
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
