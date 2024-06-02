import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_SPECIAL_URL } from "../../config";

export const FindSpecailFn = async () => {
  const data = await axios.get(`${API_SPECIAL_URL}/`);
  return data.data;
};
export const FindMySpecailFn = async () => {
  const token = await getAccessTokenCookies();
  const data = await axios.get(`${API_SPECIAL_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
