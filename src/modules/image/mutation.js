import axios from "axios";
import { API_IMAGE_URL } from "../../config";

export const uploadImageFn = async ({data, onUploadProgressFn = (e) => e}) => {
  try {
    return await axios.post(`${API_IMAGE_URL}/upload`, data, {
      onUploadProgress: (progressEvent) =>
        onUploadProgressFn(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        ),
    });
  } catch (error) {
    console.error(error);
  }
};
export const DeleteImageFn = async (id) => {
  return await axios.delete(`${API_IMAGE_URL}/delete/${id ?? ""}`);
};
