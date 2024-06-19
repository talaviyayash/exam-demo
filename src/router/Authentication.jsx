import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Authentication = () => {
  const { isLogin } = useSelector((state) => state.userInformation);

  return (
    <>
      {isLogin ? (
        <>
          <Navigate to="/profile" replace={true} />
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
