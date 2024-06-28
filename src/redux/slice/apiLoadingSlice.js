import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const apiLoadingSlice = createSlice({
  name: "apiState",
  initialState: initialState,
  reducers: {
    addLoadingState: (state, action) => {
      const { name } = action.payload;
      state[name] = {
        isLoading: true,
        isError: false,
      };
    },
    addSuccessState: (state, action) => {
      const { name, data } = action.payload;
      state[name] = {
        isLoading: false,
        isError: false,
        data: data,
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

export const { addErrorState, addSuccessState, addLoadingState } =
  apiLoadingSlice.actions;

export default apiLoadingSlice.reducer;
