import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAccessTokenCookies } from "../shared/util/accessTokenCookie";
import { API_USER_URL } from "../config";

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_USER_URL,
    prepareHeaders: async (headers) => {
      const token = await getAccessTokenCookies();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => `/info`,
    }),
  }),
});
export const { useGetUserDetailsQuery } = authApi;
