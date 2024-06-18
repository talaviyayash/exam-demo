import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createForm: (state, action) => {
      const { name } = action.payload;
      state.form = {
        ...state.form,
        [name]: {
          value: {},
          error: {},
        },
      };
    },
    addValue: (state, action) => {
      const { payload = {} } = action;
      const { value = {}, name } = payload;
      state.form[name].value = { ...state.form?.[name]?.value, ...value };
    },
    addError: (state, action) => {
      const { payload = {} } = action;
      const { error = {}, name } = payload;
      state.form[name].error = { ...state.form?.[name]?.error, ...error };
    },
    clearForm: (state, action) => {
      state.form[action.payload.name] = { value: {}, error: {} };
    },
  },
});

export const { addValue, addError, createForm, clearForm } = formSlice.actions;

export default formSlice.reducer;
