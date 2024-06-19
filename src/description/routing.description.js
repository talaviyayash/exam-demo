import ForgetPassWord from "../presentation/authentication/ForgetPassWord";
import SignIn from "../presentation/authentication/SignIn";
import SignUp from "../presentation/authentication/SignUp";
import EditProfile from "../presentation/user/profile/EditProfile";
import Profile from "../presentation/user/profile/Profile";
import Authentication from "../router/Authentication";
import ProtectedRoute from "../router/ProtectedRoute";
import StudentRoute from "../router/StudentRoute";
import TeacherRoute from "../router/TeacherRoute";
import Navbar from "../shared/Navbar";

export const SIGN_IN_PATH = "/signin";
export const SIGN_UP_PATH = "/signup";
export const FORGET_PASSWORD_PATH = "/forget-password";
export const PROFILE_PATH = "/profile";
export const EDIT_PROFILE_PATH = "/edit-profile";

export const routingArray = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        element: <Authentication />,
        children: [
          {
            path: SIGN_IN_PATH,
            element: <SignIn />,
          },
          {
            path: SIGN_UP_PATH,
            element: <SignUp />,
          },
          {
            path: FORGET_PASSWORD_PATH,
            element: <ForgetPassWord />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <StudentRoute />,
            children: [],
          },
          {
            element: <TeacherRoute />,
          },
          {
            path: PROFILE_PATH,
            element: <Profile />,
          },
          {
            path: EDIT_PROFILE_PATH,
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
];
