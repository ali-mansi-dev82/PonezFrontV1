import axios from "axios";
import { API_OPTION_URL } from "../../config";

export const FindOptionFn = async () => {
  return await axios.get(`${API_OPTION_URL}/`);
};
export const FindOptionbyCategoryIdFn = async (id) => {
  return await axios.get(`${API_OPTION_URL}/by-category-id/${id ?? ""}`);
};
export const FindOptionbyCategorySlugFn = async (slug) => {
  return await axios.get(`${API_OPTION_URL}/by-category-slug/${slug ?? ""}`);
};
export const FindChildrenCategorybySlugFn = async (slug) => {
  return await axios.get(
    `${API_OPTION_URL}/get-children-by-slug/${slug ?? ""}`
  );
};
export const SearchCategoryFn = async (query) => {
  return await axios.get(`${API_OPTION_URL}/search/${query ?? ""}`);
};
