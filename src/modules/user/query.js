import axios from "axios";
import { API_USER_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

export const UserInfoFn = async (tokenParams = "") => {
  try {
    const token = await getAccessTokenCookies();
    const response = await axios.get(`${API_USER_URL}/info`, {
      headers: { Authorization: `Bearer ${tokenParams || token || ""}` },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const UserPostsFn = async () => {
  try {
    const token = await getAccessTokenCookies();
    if (token) {
      const response = await axios.get(`${API_USER_URL}/my-post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const UserSavedFn = async () => {
  try {
    const token = await getAccessTokenCookies();
    if (token) {
      const response = await axios.get(`${API_USER_URL}/my-saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const UserNoteFn = async () => {
  try {
    const token = await getAccessTokenCookies();
    if (token) {
      const response = await axios.get(`${API_USER_URL}/my-note`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const UserSeenFn = async () => {
  try {
    const token = await getAccessTokenCookies();
    if (token) {
      const response = await axios.get(`${API_USER_URL}/my-seen`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data;
    }
  } catch (error) {
    console.error(error);
  }
};
