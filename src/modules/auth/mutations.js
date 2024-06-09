import axios from "axios";

import authorizedAxios from "../../api/authrized_axios";
import { API_AUTH_URL } from "../../config";

export const SendOtpFn = async (data) => {
  return await axios.post(`${API_AUTH_URL}/send-otp/`, data);
};
export const CheckOtpFn = async (data) => {
  return await axios.post(`${API_AUTH_URL}/check-otp/`, data);
};
export const LogoutFn = async (tokenParams = "") => {
  return (await authorizedAxios.post(`${API_AUTH_URL}/logout/`, null)).data;
};
