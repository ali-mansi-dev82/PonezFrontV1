import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_POST_URL } from "../../config";

export const FindPostbySlugFn = async (slug) => {
  try {
    const token = (await getAccessTokenCookies()) || "";
    const data = await axios.get(`${API_POST_URL}/${slug ?? ``}`, {
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
