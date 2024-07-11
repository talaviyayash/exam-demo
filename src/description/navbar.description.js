import {
  CREATE_EXAM_PATH,
  HOME_PATH,
  PROFILE_PATH,
  SHOW_EXAM_FOR_STUDENT,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  STUDENT_DETAIL_PATH,
  VIEW_EXAM_PATH,
} from "../utils/constants";

export const notLoginShowArray = {
  leftSide: [
    // {
    //   name: "Home",
    //   routingPath: HOME_PATH,
    // },
  ],
  rightSide: [
    {
      name: "Sign In",
      routingPath: SIGN_IN_PATH,
    },
    {
      name: "Sign Up",
      routingPath: SIGN_UP_PATH,
    },
  ],
};

export const forTeacherShowArray = {
  leftSide: [
    {
      name: "Home",
      routingPath: HOME_PATH,
    },
    {
      name: "Create Exam",
      routingPath: CREATE_EXAM_PATH,
    },
    {
      name: "Show Exam",
      routingPath: VIEW_EXAM_PATH,
    },
    {
      name: "Student Detail",
      routingPath: STUDENT_DETAIL_PATH,
    },
  ],
  rightSide: [
    {
      name: "Profile",
      routingPath: PROFILE_PATH,
    },
  ],
};

export const forStudentShowArray = {
  leftSide: [
    // {
    //   name: "Home",
    //   routingPath: HOME_PATH,
    // },
    {
      name: "Show All Exam",
      routingPath: SHOW_EXAM_FOR_STUDENT,
    },
  ],
  rightSide: [
    {
      name: "Profile",
      routingPath: PROFILE_PATH,
    },
  ],
};
