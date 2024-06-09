import authrized_axios from "../../api/authrized_axios";
import { API_USER_URL } from "../../config";

export const UserInfoFn = async (tokenParams = "") => {
  try {
    const response = await authrized_axios.get(
      `${API_USER_URL}/info`,
      tokenParams && {
        headers: { Authorization: `Bearer ${tokenParams}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const UserPostsFn = async () => {
  try {
    const response = await authrized_axios.get(`${API_USER_URL}/my-post`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
export const UserSavedFn = async () => {
  try {
    const response = await authrized_axios.get(`${API_USER_URL}/my-saved`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
export const UserNoteFn = async () => {
  try {
    const response = await authrized_axios.get(`${API_USER_URL}/my-note`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
export const UserSeenFn = async () => {
  try {
    const response = await authrized_axios.get(`${API_USER_URL}/my-seen`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
