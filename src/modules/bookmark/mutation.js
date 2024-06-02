import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_BOOKMARK_URL } from "../../config";

export const SavePostBookmark = async (id) => {
  const token = await getAccessTokenCookies();
  return (
    await axios.post(`${API_BOOKMARK_URL}/save/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
