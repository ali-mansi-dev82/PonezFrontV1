import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CATEGORY_URL } from "../config";

export const categoryApi = createApi({
  reducerPath: "category/all",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CATEGORY_URL,
  }),
  endpoints: (builder) => ({
    getCategorys: builder.query({
      query: (slug) => `/get-children-by-slug/${slug ?? `root`}`,
    }),
  }),
});
export const { useGetCategorysQuery } = categoryApi;
