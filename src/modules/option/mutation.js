import axios from "axios";
import { API_OPTION_URL } from "../../config";

export const CreateOptionFn = async (data) => {
  return await axios.post(`${API_OPTION_URL}/create`, data);
};
export const UpdateOptionFn = async (id) => {
  return await axios.put(`${API_OPTION_URL}/update/${id ?? ""}`);
};
