import React, { memo } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { STUDENT } from "../description/globel.description";
import { PROFILE_PATH } from "../utils/constants";
import { useSelector } from "react-redux";

const StudentRoute = () => {
  const { isLogin, userInfo } = useSelector((state) => state.userInformation);
  const { role } = userInfo;

  return (
    <>
      {isLogin && role === STUDENT ? (
        <Outlet />
      ) : (
        <Navigate to={PROFILE_PATH} replace={true} />
      )}
    </>
  );
};

export default memo(StudentRoute);
