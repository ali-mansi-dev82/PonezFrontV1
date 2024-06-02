import axios from "axios";

import { API_STATE_URL } from "../../config";

export const FindStateFn = async () => {
  return await axios.get(`${API_STATE_URL}/`);
};
export const FindStatebyIdFn = async (id) => {
  return await axios.get(`${API_STATE_URL}/${id ?? ``}`);
};
export const SearchStateFn = async (query) => {
  return await axios.get(`${API_STATE_URL}/search/${query ?? ``}`);
};
