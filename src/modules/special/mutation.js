import axios from "axios";
import { API_SPECIAL_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

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
