import ForgetPassWord from "../presentation/ForgetPassWord";
import SignIn from "../presentation/SignIn";
import SignUp from "../presentation/SignUp";
import Navbar from "../shared/Navbar";

export const routingArray = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassWord />,
      },
    ],
  },
];
