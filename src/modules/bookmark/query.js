import authorizedAxios from "../../api/authrized_axios";
import { API_BOOKMARK_URL } from "../../config";

export const CheckPostisBookmark = async (id) => {
  const data = await authorizedAxios.get(`${API_BOOKMARK_URL}/${id ?? "root"}`);
  return data.data;
};
