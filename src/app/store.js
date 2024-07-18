import { configureStore } from "@reduxjs/toolkit";

import { specialPostApi } from "../services/specialPostService";
import { categoryApi } from "../services/categoryService";
import authReducer from "../features/auth/authSlice";
import { postsApi } from "../services/postService";
import { authApi } from "../services/authService";
import layoutSlice from "../features/layout/layoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutSlice,
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [specialPostApi.reducerPath]: specialPostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(specialPostApi.middleware),
});
export default store;
