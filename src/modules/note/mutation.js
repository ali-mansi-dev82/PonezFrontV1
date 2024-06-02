import axios from "axios";

import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";
import { API_NOTE_URL } from "../../config";

export const SaveNoteFn = async ({ id, content }) => {
  const token = await getAccessTokenCookies();
  return (
    await axios.post(
      `${API_NOTE_URL}/save/${id}`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  ).data;
};

export const DeleteNoteFn = async (id) => {
  const token = await getAccessTokenCookies();
  return (
    await axios.delete(`${API_NOTE_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
