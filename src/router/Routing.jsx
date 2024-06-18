import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routingArray } from "../description/routing.description";

const Routing = () => {
  const router = createBrowserRouter(routingArray);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routing;
