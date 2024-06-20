import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routingArray } from "../description/routing.description";
import GetItem from "../hook/GetItem";
import { useJwt } from "react-jwt";
import { loginSuccess } from "../redux/slice/userInfoSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Routing = () => {
  const router = createBrowserRouter(routingArray);
  const userInfo = GetItem("userInfo") ?? {};
  console.log(userInfo);
  const dispatch = useDispatch();
  const { isExpired } = useJwt(userInfo?.token);

  useEffect(() => {
    if (!isExpired && userInfo?.token) {
      dispatch(loginSuccess({ userInfo }));
    }
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routing;
