import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const apiLoadingSlice = createSlice({
  name: "apiState",
  initialState: initialState,
  reducers: {
    addState: (state, action) => {
      const { name } = action.payload;
      state[name] = {
        isLoading: true,
        isError: false,
      };
    },
    addSuccessState: (state, action) => {
      const { name } = action.payload;
      state[name] = {
        isLoading: false,
        isError: false,
      };
    },
    addErrorState: (state, action) => {
      const { name } = action.payload;
      state[name] = {
        isLoading: false,
        isError: true,
      };
    },
  },
});

export const { addErrorState, addSuccessState, addState } =
  apiLoadingSlice.actions;

export default apiLoadingSlice.reducer;
