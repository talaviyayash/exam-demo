import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { TEACHER } from "../description/globel.description";
import { PROFILE_PATH } from "../description/routing.description";
import GetItem from "../hook/GetItem";

const TeacherRoute = () => {
  const { role } = GetItem("userInfo") ?? {};
  const navigate = useNavigate();

  // if (role !== TEACHER) {
  //   navigate(PROFILE_PATH);
  // }
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
