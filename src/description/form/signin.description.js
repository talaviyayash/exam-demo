import { allRegexForPassword, emailRegex } from "../../utils/regex";

export const SGININ_FORM_HEADER = "Sign In";

export const SGININ_FORM_NAME = "signInForm";

export const SGININ_SUBMIT_NAME = "Sign In";

export const SIGNIN_STATE_LOADING = "sigIn";

export const ATTRIBUTE_SUBMIT_BUTTON = {
  sx: {
    width: "200px",
    margin: "15px 0 0 0",
  },
};

export const signInForm = [
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
      className: "signInInput",
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
      className: "signInInput",
      placeholder: "Password",
    },
    labelName: "Password",
  },
];
