import axios from "axios";
import { API_POST_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

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
