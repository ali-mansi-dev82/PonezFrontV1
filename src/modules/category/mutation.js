import axios from "axios";

import { API_CATEGORY_URL } from "../../config";

export const CreateCategoryFn = async (data) => {
  return await axios.post(`${API_CATEGORY_URL}/create`, data);
};
export const UpdateCategoryFn = async (id) => {
  return await axios.put(`${API_CATEGORY_URL}/update/${id ?? ""}`);
};
