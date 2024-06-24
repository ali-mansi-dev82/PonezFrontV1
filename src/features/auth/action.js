import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_AUTH_URL } from "../../config";

export const send_otp = createAsyncThunk(
  "auth/send_otp",
  async ({ mobile }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_AUTH_URL}/send-otp/`,
        { mobile },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const check_otp = createAsyncThunk(
  "auth/check_otp",
  async ({ mobile, code }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_AUTH_URL}/check-otp/`,
        { mobile, code },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
