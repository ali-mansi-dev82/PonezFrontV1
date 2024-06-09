import authorizedAxios from "../../api/authrized_axios";
import { API_NOTE_URL } from "../../config";

export const getNoteFn = async (id) => {
  const data = await authorizedAxios.get(`${API_NOTE_URL}/${id ?? "root"}`);
  return data.data;
};
