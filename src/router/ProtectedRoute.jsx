import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { SIGN_IN_PATH } from "../description/routing.description";

const ProtectedRoute = () => {
  const { isLogin } = useSelector((state) => state.userInformation);

  return (
    <>
      {isLogin ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to={SIGN_IN_PATH} replace={true} />
        </>
      )}
    </>
  );
};

export default memo(ProtectedRoute);
