import axios from "axios";
import { API_CATEGORY_URL } from "../../config";

export const FindCategoryFn = async () => {
  const data = await axios.get(`${API_CATEGORY_URL}/`);
  return data.data;
};
export const FindCategorybySlugFn = async (slug) => {
  const data = await axios.get(
    `${API_CATEGORY_URL}/get-by-slug/${slug ?? "root"}`
  );
  return data.data;
};
export const FindChildrenCategorybySlugFn = async (slug) => {
  const data = await axios.get(
    `${API_CATEGORY_URL}/get-children-by-slug/${slug ?? "root"}`
  );
  return data.data;
};
export const SearchCategoryFn = async (query) => {
  const trimedQuery = query.trim();
  return (
    await axios.get(
      `${API_CATEGORY_URL}/search/${trimedQuery.length ? trimedQuery : "no"}`
    )
  ).data;
};
