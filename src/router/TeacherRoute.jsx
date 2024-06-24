import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TEACHER } from "../description/globel.description";
import { PROFILE_PATH } from "../utils/constants";
import lSGetItem from "../hook/lSGetItem";

const TeacherRoute = () => {
  const { role } = lSGetItem("userInfo") ?? {};

  return (
    <>
      {role === TEACHER ? (
        <Outlet />
      ) : (
        <Navigate to={PROFILE_PATH} replace={true} />
      )}
    </>
  );
};

export default memo(TeacherRoute);
