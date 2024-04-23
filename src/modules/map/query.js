import axios from "axios";
import { API_STATE_URL, MAP_SEARCH_API_URL } from "../../config";
import { getMapToken } from "../../util/tokens";

const searchState = async (query) => {
  const response = await axios.get(`${API_STATE_URL}/search/${query ?? ""}`);
  return response?.data;
};

const findStates = async (query) => {
  const response = await axios.get(`${API_STATE_URL}/`);
  return response?.data;
};

const findStateCordinate = async (query) => {
  const response = await axios.get(
    `${MAP_SEARCH_API_URL}/autoComplete?text=${query}`,
    {
      headers: {
        "x-api-key": getMapToken(),
      },
    }
  );
  return await response?.data;
};

export { searchState, findStates, findStateCordinate };
