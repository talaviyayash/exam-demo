import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SIGN_IN_PATH } from "../description/routing.description";
import GetItem from "../hook/GetItem";
import { useJwt } from "react-jwt";

const ProtectedRoute = () => {
  const { token } = GetItem("userInfo");
  const { isExpired } = useJwt(token);
  console.log("token,isExpired", token);
  // if (token || !isExpired) return <Navigate to={SIGN_IN_PATH} replace={true} />;
  console.log("isExpired", isExpired);
  return (
    <>
      {token ? (
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
