import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/userInfoSlice";
import formSlice from "./slice/formSlice";
import examSlice from "./slice/examSlice";
import apiLoadingSlice from "./slice/apiLoadingSlice";
import giveExamSlice from "./slice/giveExamSlice";
import { API_STATE, USER_INFORMATION } from "../utils/constants";

export const store = configureStore({
  reducer: {
    [USER_INFORMATION]: userInfoSlice,
    form: formSlice,
    exam: examSlice,
    [API_STATE]: apiLoadingSlice,
    giveExam: giveExamSlice,
  },
});
