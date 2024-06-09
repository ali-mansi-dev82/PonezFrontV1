import authorizedAxios from "../../api/authrized_axios";
import { API_SPECIAL_URL } from "../../config";

export const CreateSpecialFn = async (data) => {
  
  return await authorizedAxios.post(`${API_SPECIAL_URL}/create`, data);
};
export const DeleteSpecialFn = async (id) => {
  
  return await authorizedAxios.delete(`${API_SPECIAL_URL}/delete/${id ?? ""}`);
};
