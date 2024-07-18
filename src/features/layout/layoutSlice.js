import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthModalOpen: false,
  isDropOpen: false,
  isSearchOpen: false,
  isSelectCityOpen: false,
  isCategoryOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggle_auth_modal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      state.isDropOpen = false;
      state.isSearchOpen = false;
      state.isSelectCityOpen = false;
      state.isCategoryOpen = false;
    },
    toggle_drop_down: (state) => {
      state.isAuthModalOpen = false;
      state.isDropOpen = !state.isDropOpen;
      state.isSearchOpen = false;
      state.isSelectCityOpen = false;
      state.isCategoryOpen = false;
    },
    toggle_search: (state) => {
      state.isAuthModalOpen = false;
      state.isDropOpen = false;
      state.isSearchOpen = !state.isSearchOpen;
      state.isSelectCityOpen = false;
      state.isCategoryOpen = false;
    },
    toggle_select_city: (state) => {
      state.isAuthModalOpen = false;
      state.isDropOpen = false;
      state.isSearchOpen = false;
      state.isSelectCityOpen = !state.isSelectCityOpen;
      state.isCategoryOpen = false;
    },
    toggle_category: (state) => {
      state.isAuthModalOpen = false;
      state.isDropOpen = false;
      state.isSearchOpen = false;
      state.isSelectCityOpen = false;
      state.isCategoryOpen = !state.isCategoryOpen;
    },
  },
});
export const {
  toggle_auth_modal,
  toggle_drop_down,
  toggle_category,
  toggle_search,
  toggle_select_city,
} = layoutSlice.actions;
export default layoutSlice.reducer;
