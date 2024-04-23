import { setCookies, getCookies, removeCookies } from "./cookie";

export const setAccessTokenCookies = (token) => {
  return setCookies(process.env.REACT_APP_ACCESS_TOKEN, token, 7);
};
export const getAccessTokenCookies = async () => {
  return await getCookies(process.env.REACT_APP_ACCESS_TOKEN);
};
export const removeAccessTokenCookies = async () => {
  return await removeCookies(process.env.REACT_APP_ACCESS_TOKEN);
};
