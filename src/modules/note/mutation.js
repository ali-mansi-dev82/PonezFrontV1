import authorizedAxios from "../../api/authrized_axios";
import { API_NOTE_URL } from "../../config";

export const SaveNoteFn = async ({ id, content }) => {
  return (await authorizedAxios.post(`${API_NOTE_URL}/save/${id}`, { content }))
    .data;
};

export const DeleteNoteFn = async (id) => {
  return (await authorizedAxios.delete(`${API_NOTE_URL}/delete/${id}`)).data;
};
