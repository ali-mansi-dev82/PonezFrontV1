import { setCookies, getCookies, removeCookies } from "./cookie";

export const setCityCookie = (city) => {
  return setCookies(process.env.REACT_APP_CITY, city, 7);
};
export const getCityCookie = async () => {
  return await getCookies(process.env.REACT_APP_CITY);
};
export const removeCityCookie = async () => {
  return await removeCookies(process.env.REACT_APP_CITY);
};
