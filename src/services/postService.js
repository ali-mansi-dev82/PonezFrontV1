import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_POST_URL } from "../config";

export const postsApi = createApi({
  reducerPath: "posts/all",
  baseQuery: fetchBaseQuery({
    baseUrl: API_POST_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ slug, city }) => ({
        url: `/`,
        method: "POST",
        body: { city, slug },
      }),
    }),
  }),
});
export const { useGetPostsQuery } = postsApi;
