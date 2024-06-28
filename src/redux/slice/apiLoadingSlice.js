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
    addDataState: (state, action) => {
      const { name, data } = action.payload;
      state[name].data = data;
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

export const { addErrorState, addSuccessState, addLoadingState, addDataState } =
  apiLoadingSlice.actions;

export default apiLoadingSlice.reducer;
