import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/userInfoSlice";
import formSlice from "./slice/formSlice";
import examSlice from "./slice/examSlice";
import apiLoadingSlice from "./slice/apiLoadingSlice";

export const store = configureStore({
  reducer: {
    userInformation: userInfoSlice,
    form: formSlice,
    exam: examSlice,
    apiState: apiLoadingSlice,
  },
});
