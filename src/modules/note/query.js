import axios from "axios";
import { API_NOTE_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

export const getNoteFn = async (id) => {
  const token = await getAccessTokenCookies();
  const data = await axios.get(`${API_NOTE_URL}/${id ?? "root"}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
