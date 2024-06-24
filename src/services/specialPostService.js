import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_SPECIAL_URL } from "../config";

export const specialPostApi = createApi({
  reducerPath: "posts/special",
  baseQuery: fetchBaseQuery({
    baseUrl: API_SPECIAL_URL,
  }),
  endpoints: (builder) => ({
    getSpecialsPosts: builder.query({
      query: () => `/`,
    }),
  }),
});
export const { useGetSpecialsPostsQuery } = specialPostApi;
