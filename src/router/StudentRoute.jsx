import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { STUDENT } from "../description/globel.description";
import { PROFILE_PATH } from "../description/routing.description";

const StudentRoute = () => {
  const { role } = useSelector((state) => state?.userInformation?.userInfo);

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
