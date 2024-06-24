import React, { memo } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { STUDENT } from "../description/globel.description";
import { PROFILE_PATH } from "../utils/constants";
import lSGetItem from "../hook/lSGetItem";

const StudentRoute = () => {
  const { role } = lSGetItem("userInfo") ?? {};

  return (
    <>
      {role === STUDENT ? (
        <Outlet />
      ) : (
        <Navigate to={PROFILE_PATH} replace={true} />
      )}
    </>
  );
};

export default memo(StudentRoute);
