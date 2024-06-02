import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_SPECIAL_URL } from "../../config";

export const CreateSpecialFn = async (data) => {
  const token = await getAccessTokenCookies();
  return await axios.post(`${API_SPECIAL_URL}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const DeleteSpecialFn = async (id) => {
  const token = await getAccessTokenCookies();
  return await axios.delete(`${API_SPECIAL_URL}/delete/${id ?? ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
