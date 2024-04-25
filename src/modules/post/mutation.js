import axios from "axios";
import { API_POST_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

export const FindPostFn = async (slug, city) => {
  return (await axios.post(`${API_POST_URL}/`, { slug, city })).data;
};
export const CreatePostFn = async (data) => {
  const token = await getAccessTokenCookies();
  const result = await axios.post(`${API_POST_URL}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};
export const DeletePostFn = async (id) => {
  const token = await getAccessTokenCookies();
  const result = await axios.delete(`${API_POST_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};
export const UpdatePostFn = async ({ id, body }) => {
  const token = await getAccessTokenCookies();
  const result = await axios.put(`${API_POST_URL}/update/${id ?? ``}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result?.data;
};
