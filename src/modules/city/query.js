import axios from "axios";

import { API_CITY_URL } from "../../config";

export const FindCityFn = async () => {
  return await axios.get(`${API_CITY_URL}/`);
};
export const FindCitybyIdFn = async (id) => {
  return await axios.get(`${API_CITY_URL}/${id ?? ""}`);
};
export const SearchCityFn = async (query) => {
  return await axios.get(`${API_CITY_URL}/search/${query ?? ""}`);
};
