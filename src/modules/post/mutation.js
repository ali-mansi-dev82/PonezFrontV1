import axios from "axios";

import authorizedAxios from "../../api/authrized_axios";
import { API_POST_URL } from "../../config";

export const FindPostFn = async (slug, city) => {
  return (await axios.post(`${API_POST_URL}/`, { slug, city })).data;
};
export const CreatePostFn = async (data) => {
  const result = await authorizedAxios.post(`${API_POST_URL}/create`, data);
  return result.data;
};
export const DeletePostFn = async (id) => {
  const result = await authorizedAxios.delete(`${API_POST_URL}/${id}`);
  return result.data;
};
export const UpdatePostFn = async ({ id, body }) => {
  const result = await authorizedAxios.put(`${API_POST_URL}/update/${id ?? ``}`, body);
  return result?.data;
};
