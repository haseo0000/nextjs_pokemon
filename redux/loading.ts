import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BagState {
  loading: boolean;
}

const initialState: BagState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
