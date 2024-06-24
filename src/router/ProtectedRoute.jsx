import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SIGN_IN_PATH } from "../utils/constants";
import lSGetItem from "../hook/lSGetItem";

const ProtectedRoute = () => {
  const { token } = lSGetItem("userInfo") ?? {};
  return (
    <>{token ? <Outlet /> : <Navigate to={SIGN_IN_PATH} replace={true} />}</>
  );
};

export default memo(ProtectedRoute);
