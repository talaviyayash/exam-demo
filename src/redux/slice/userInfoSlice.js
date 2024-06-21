import { createSlice } from "@reduxjs/toolkit";
import SetItem from "../../hook/SetItem";

const initialState = {
  isLogin: false,
  userInfo: {},
};
const userInfoSlice = createSlice({
  name: "userInformation",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
    },
    logOutSuccess: (state) => {
      state.isLogin = false;
      state.userInfo = {};
      SetItem("userInfo");
    },
    addUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { loginSuccess, logOutSuccess, addUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
