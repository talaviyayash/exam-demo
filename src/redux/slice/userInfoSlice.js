import { createSlice } from "@reduxjs/toolkit";
import { lSClear } from "../../utils/lSFunction";
import { USER_INFO, USER_INFORMATION } from "../../utils/constants";

const initialState = {
  isLogin: false,
  [USER_INFO]: {},
};
const userInfoSlice = createSlice({
  name: [USER_INFORMATION],
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state[USER_INFO] = action.payload[USER_INFO];
    },
    logOutSuccess: (state) => {
      state.isLogin = false;
      state[USER_INFO] = {};
      lSClear();
    },
    addUserInfo: (state, action) => {
      state[USER_INFO] = { ...state[USER_INFO], ...action.payload };
    },
  },
});

export const { loginSuccess, logOutSuccess, addUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
