import ForgetPassWord from "../presentation/authentication/ForgetPassWord";
import NewPassword from "../presentation/authentication/NewPassword";
import SignIn from "../presentation/authentication/SignIn";
import SignUp from "../presentation/authentication/SignUp";
import EditProfile from "../presentation/user/profile/EditProfile";
import Profile from "../presentation/user/profile/Profile";
import CreateExam from "../presentation/user/teacher/CreateExam";
import EditExam from "../presentation/user/teacher/EditExam";
import CustomizedTables from "../presentation/user/teacher/ShowExam";
import ShowStudentDetail from "../presentation/user/teacher/ShowStudentDetail";
import ViewExamInDetail from "../presentation/user/teacher/ViewExamInDetail";
import Authentication from "../router/Authentication";
import ProtectedRoute from "../router/ProtectedRoute";
import StudentRoute from "../router/StudentRoute";
import TeacherRoute from "../router/TeacherRoute";
import Navbar from "../shared/Navbar";
import {
  CREATE_EXAM_PATH,
  EDIT_EXAM_PATH,
  EDIT_PROFILE_PATH,
  FORGET_PASSWORD_PATH,
  NEW_PASSWORD_PATH,
  PROFILE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  STUDENT_DETAIL_PATH,
  TOTAL_NUMBER_OF_QUESTION,
  VIEW_EXAM_PATH,
  VIEW_IN_DETAIL_PATH,
} from "../utils/constants";

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
          {
            path: NEW_PASSWORD_PATH,
            element: <NewPassword />,
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
            children: [
              {
                path: EDIT_PROFILE_PATH,
                element: <EditProfile />,
              },
              {
                path: CREATE_EXAM_PATH,
                element: <CreateExam />,
              },
              {
                path: VIEW_EXAM_PATH,
                element: <CustomizedTables />,
              },
              {
                path: EDIT_EXAM_PATH,
                element: <EditExam />,
              },
              {
                path: VIEW_IN_DETAIL_PATH,
                element: <ViewExamInDetail />,
              },
              {
                path: STUDENT_DETAIL_PATH,
                element: <ShowStudentDetail />,
              },
            ],
          },
          {
            path: PROFILE_PATH,
            element: <Profile />,
          },
        ],
      },
    ],
  },
];
