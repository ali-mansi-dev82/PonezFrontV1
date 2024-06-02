import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_BOOKMARK_URL } from "../../config";

export const CheckPostisBookmark = async (id) => {
  const token = await getAccessTokenCookies();
  const data = await axios.get(`${API_BOOKMARK_URL}/${id ?? "root"}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
