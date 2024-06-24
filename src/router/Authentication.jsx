import React, { memo } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { PROFILE_PATH } from "../utils/constants";
import lSGetItem from "../hook/lSGetItem";

const Authentication = () => {
  const { token } = lSGetItem("userInfo") ?? {};

  return (
    <>{token ? <Navigate to={PROFILE_PATH} replace={true} /> : <Outlet />}</>
  );
};

export default memo(Authentication);
