import React, { memo } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { PROFILE_PATH } from "../utils/constants";
import { useSelector } from "react-redux";

const Authentication = () => {
  const isLogin = useSelector((state) => state.userInformation.isLogin);

  return (
    <>{isLogin ? <Navigate to={PROFILE_PATH} replace={true} /> : <Outlet />}</>
  );
};

export default memo(Authentication);
