import {
  CREATE_EXAM_PATH,
  HOME_PATH,
  SHOW_EXAM_FOR_STUDENT,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  STUDENT_DETAIL_PATH,
  VIEW_EXAM_PATH,
} from "../utils/constants";

export const notLoginShowArray = {
  leftSide: [
    {
      name: "Sign In",
      routingPath: SIGN_IN_PATH,
    },
    {
      name: "Sign Up",
      routingPath: SIGN_UP_PATH,
    },
  ],
  rightSide: [
    {
      name: "Home",
      routingPath: HOME_PATH,
    },
    // {
    //   name: "Create Exam",
    //   routingPath: CREATE_EXAM_PATH,
    // },
    // {
    //   name: "View  Exam",
    //   routingPath: VIEW_EXAM_PATH,
    // },
    // {
    //   name: "Show All Student",
    //   routingPath: STUDENT_DETAIL_PATH,
    // },
    {
      name: "Show All Exam",
      routingPath: SHOW_EXAM_FOR_STUDENT,
    },
  ],
};
