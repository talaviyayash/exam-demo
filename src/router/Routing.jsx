import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routingArray } from "../description/routing.description";
import { loginSuccess } from "../redux/slice/userInfoSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import decodeToken from "../hook/decodeToken";
import lSGetItem from "../hook/lSGetItem";

const Routing = () => {
  const router = createBrowserRouter(routingArray);
  const userInfo = lSGetItem("userInfo");
  const dispatch = useDispatch();
  const [isRenderRoute, setIsRenderRoute] = useState(false);

  useEffect(() => {
    if (userInfo?.token) {
      const isExpire = decodeToken(userInfo?.token);
      if (!isExpire) dispatch(loginSuccess({ userInfo }));
    }
    setIsRenderRoute(true);
    window.addEventListener("storage", storageEventHandler, false);
    function storageEventHandler(evt) {
      if (evt.key === "userInfo" && evt.newValue === null) {
        const userInfo = evt.oldValue;
        localStorage.setItem("userInfo", userInfo);
      }
    }
  }, []);
  return <>{isRenderRoute && <RouterProvider router={router} />}</>;
};

export default Routing;
