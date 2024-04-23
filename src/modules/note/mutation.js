import axios from "axios";
import { API_NOTE_URL } from "../../config";
import { getAccessTokenCookies } from "../../shared/util/accessTokenCookie";

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
