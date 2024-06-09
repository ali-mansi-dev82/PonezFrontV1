import axios from "axios";

import authorizedAxios from "../../api/authrized_axios";
import { API_SPECIAL_URL } from "../../config";

export const FindSpecailFn = async () => {
  const data = await axios.get(`${API_SPECIAL_URL}/`);
  return data.data;
};
export const FindMySpecailFn = async () => {
  const data = await authorizedAxios.get(`${API_SPECIAL_URL}/my`);
  return data.data;
};
