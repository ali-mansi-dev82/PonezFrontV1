import Cookies from "js-cookie";

export const setCookies = (name, value, expires) => {
  return Cookies.set(name, value, { expires });
};
export const getCookies = async (name) => {
  return Cookies.get(name);
};
export const removeCookies = async (name) => {
  return Cookies.remove(name);
};
