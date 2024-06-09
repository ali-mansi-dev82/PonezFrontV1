import authorizedAxios from "../../api/authrized_axios";
import { API_BOOKMARK_URL } from "../../config";

export const SavePostBookmark = async (id) => {
  return (await authorizedAxios.post(`${API_BOOKMARK_URL}/save/${id}`))
    .data;
};
