import { createSlice } from "@reduxjs/toolkit";

import { removeAccessTokenCookies } from "../../shared/util/accessTokenCookie";

const initialState = {
  isAuthed: false,
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    log_in: (state, action) => {
      state.isAuthed = true;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
    },
    fetch_data: (state) => {
      state.loading = true;
    },
    log_out: (state) => {
      state.isAuthed = false;
      state.userInfo = {};
      state.userToken = null;
      removeAccessTokenCookies();
    },
  },
});
export const { fetch_data, log_in, log_out } = authSlice.actions;
export default authSlice.reducer;
