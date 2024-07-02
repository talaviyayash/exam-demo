import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TEACHER } from "../description/globel.description";
import { PROFILE_PATH, USER_INFORMATION } from "../utils/constants";
import { useSelector } from "react-redux";

const TeacherRoute = () => {
  const { isLogin, userInfo } = useSelector((state) => state[USER_INFORMATION]);
  const { role } = userInfo;

  return (
    <>
      {isLogin && role === TEACHER ? (
        <Outlet />
      ) : (
        <Navigate to={PROFILE_PATH} replace={true} />
      )}
    </>
  );
};

export default memo(TeacherRoute);
