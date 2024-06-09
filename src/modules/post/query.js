import authorizedAxios from "../../api/authrized_axios";
import { API_POST_URL } from "../../config";

export const FindPostbySlugFn = async (slug) => {
  try {
    const data = await authorizedAxios.get(`${API_POST_URL}/${slug ?? ``}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
