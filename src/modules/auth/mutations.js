import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_AUTH_URL } from "../../config";

export const SendOtpFn = async (data) => {
  return await axios.post(`${API_AUTH_URL}/send-otp/`, data);
};
export const CheckOtpFn = async (data) => {
  return await axios.post(`${API_AUTH_URL}/check-otp/`, data);
};
export const LogoutFn = async (tokenParams = "") => {
  const token = await getAccessTokenCookies();
  return (
    await axios.post(`${API_AUTH_URL}/logout/`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
