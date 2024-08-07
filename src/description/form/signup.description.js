import {
  allRegexForPassword,
  emailRegex,
  nameRegex,
  noConsecutiveSpaces,
} from "../../utils/regex";

export const SIGNUP_FORM_HEADER = "Sign Up";

export const SIGNUP_FORM_NAME = "signupForm";

export const SIGNUP_SUBMIT_NAME = "Sign UP";

export const SIGNUP_STATE_LOADING = "signUp";

export const VERIFICATION_MSG =
  "Please , Check your mail box for verification.";

export const ATTRIBUTE_SUBMIT_BUTTON = {
  sx: {
    width: "200px",
    margin: "15px 0 0 0 ",
  },
};

export const signUpForm = [
  {
    name: "name",
    type: "text",
    required: {
      isRequired: true,
      defaultMsg: "Please enter Name.",
    },
    attributes: {
      name: "Name",
      id: "Name",
    },
    labelName: "Name",
    wrapElement: {},
    patterns: [
      {
        regex: nameRegex,
        error: "Please enter a valid  Name with letters and spaces.",
      },
      {
        regex: noConsecutiveSpaces,
        error: "Please enter a Name without consecutive spaces.",
      },
    ],
  },
  {
    name: "email",
    type: "email",
    required: {
      isRequired: true,
      defaultMsg: "Please enter Email.",
    },
    attributes: {
      name: "email",
      id: "email",
    },
    labelName: "Email",
    wrapElement: {},
    patterns: [
      {
        regex: emailRegex,
        error:
          "This email is invalid. Make sure it’s written like example@email.com",
      },
    ],
  },
  {
    name: "password",
    type: "password",
    required: {
      isRequired: true,
      defaultMsg: "Please enter Password.",
    },
    attributes: {
      name: "password",
      id: "password",

      placeholder: "Password",
    },
    labelName: "Password",
    patterns: allRegexForPassword("Password"),
  },
  {
    name: "role",
    type: "select",
    required: {
      isRequired: true,
      defaultMsg: "Please select role.",
    },
    attributes: {
      name: "role",
      id: "role",
    },
    labelName: "Role",
    children: [
      {
        value: "student",
        innerText: "Student",
      },
      {
        value: "teacher",
        innerText: "Teacher",
      },
    ],
  },
];
