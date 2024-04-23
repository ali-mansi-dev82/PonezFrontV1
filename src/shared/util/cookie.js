import Cookies from "js-cookie";

export const setCookies = (name, value, expires) => {
  return Cookies.set(name, value, { expires });
};
export const getCookies = async (name) => {
  return await Cookies.get(name);
};
export const removeCookies = async (name) => {
  return await Cookies.remove(name);
};
