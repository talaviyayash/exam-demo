import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../description/routing.description";
import GetItem from "../hook/GetItem";
import { useJwt } from "react-jwt";

const Authentication = () => {
  const { token } = GetItem("userInfo") ?? {};
  const { isExpired } = useJwt(token);
  const navigate = useNavigate();

  // if (token && !isExpired) {
  //   navigate(PROFILE_PATH);
  // }

  return (
    <>
      {token && !isExpired ? (
        <>
          <Navigate to={PROFILE_PATH} replace={true} />
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default memo(Authentication);
