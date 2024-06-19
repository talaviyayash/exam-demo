import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { TEACHER } from "../description/globel.description";
import { PROFILE_PATH } from "../description/routing.description";

const TeacherRoute = () => {
  const { role } = useSelector((state) => state?.userInformation?.userInfo);

  return (
    <>
      {role === TEACHER ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to={PROFILE_PATH} replace={true} />
        </>
      )}
    </>
  );
};

export default memo(TeacherRoute);
