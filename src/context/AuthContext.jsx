import React, { createContext, useState, useContext, useEffect } from "react";
import Navbar from "../modules/auth/components/navbar/index";
import { useMutation } from "@tanstack/react-query";
import {
  getAccessTokenCookies,
  removeAccessTokenCookies,
} from "../shared/util/accessTokenCookie";
import { UserInfoFn } from "../modules/user/query";
import { LogoutFn } from "../modules/auth/mutations";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState(false);

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
      const token = await getAccessTokenCookies();
      if (token === undefined || token === null) setIsAuthenticated(false);
      else userInfoQuery.mutateAsync(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfoQuery?.data?.statusCode === 201) {
      setIsAuthenticated(true);
      setUser(userInfoQuery?.data?.user);
    }
    if (userInfoQuery?.data?.statusCode === 401) {
      setIsAuthenticated(false);
    }
  }, [userInfoQuery?.data]);

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
      <>
        <Navbar userData={user} isAuthenticated={isAuthenticated} />
        {/* {children} */}
      </>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
