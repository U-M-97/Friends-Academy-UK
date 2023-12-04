import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: null,
  },
  reducers: {
    bannerState: (state, action) => {
      state.banner = action.payload;
    },
  },
});

export const { bannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
