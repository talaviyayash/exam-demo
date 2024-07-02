import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SIGN_IN_PATH, USER_INFORMATION } from "../utils/constants";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isLogin = useSelector((state) => state[USER_INFORMATION].isLogin);
  return (
    <>{isLogin ? <Outlet /> : <Navigate to={SIGN_IN_PATH} replace={true} />}</>
  );
};

export default memo(ProtectedRoute);
