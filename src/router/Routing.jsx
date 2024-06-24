import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routingArray } from "../description/routing.description";
import lSGetItem from "../hook/lSGetItem";
import { loginSuccess } from "../redux/slice/userInfoSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Routing = () => {
  const router = createBrowserRouter(routingArray);
  const userInfo = lSGetItem("userInfo") ?? {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.token) {
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
