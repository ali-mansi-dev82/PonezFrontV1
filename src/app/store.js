import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../redux/reducers";

const store = configureStore({
  reducer: allReducers,
});
export default store;
