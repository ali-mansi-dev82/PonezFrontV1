import axios from "axios";
import { API_BOOKMARK_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

export const CheckPostisBookmark = async (id) => {
  // try {
  const token = await getAccessTokenCookies();
  const data = await axios.get(`${API_BOOKMARK_URL}/${id ?? "root"}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
  // } catch (error) {
  //   if (error?.message === "Network Error") {
  //     return console.log("Network Error");
  //   }
  //   console.error(error);
  // }
};
