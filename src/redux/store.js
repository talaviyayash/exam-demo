import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/userInfoSlice";
import formSlice from "./slice/formSlice";

export const store = configureStore({
  reducer: {
    userInformation: userInfoSlice,
    form: formSlice,
  },
});
