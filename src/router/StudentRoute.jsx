import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { STUDENT } from "../description/globel.description";
import { PROFILE_PATH } from "../description/routing.description";
import GetItem from "../hook/GetItem";

const StudentRoute = () => {
  const { role } = GetItem("userInfo") ?? {};
  const navigate = useNavigate();
  // if (role !== STUDENT) {
  //   navigate(PROFILE_PATH);
  // }
  return (
    <>
      {role === STUDENT ? (
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

export default memo(StudentRoute);
