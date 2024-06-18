import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export const { loginSuccess, logOutSuccess } = userInfoSlice.actions;
export default userInfoSlice.reducer;
