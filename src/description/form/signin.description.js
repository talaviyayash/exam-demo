import {
  emailRegex,
  oneDigitCaseLetter,
  oneLowerCaseLetter,
  oneSpecialCharacter,
  oneUpperCaseLetter,
} from "../../utils/regex";

export const SGININ_FORM_HEADER = "Sign In";

export const SGININ_FORM_NAME = "signInForm";

export const SGININ_SUBMIT_NAME = "Sign Ip";

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
    patterns: [
      {
        regex: oneLowerCaseLetter,
        error: "Password must include lower case alphabet.",
      },
      {
        regex: oneUpperCaseLetter,
        error: "Password must include upper case alphabet.",
      },
      {
        regex: oneDigitCaseLetter,
        error: "Password must include digit.",
      },
      {
        regex: oneSpecialCharacter,
        error: "Password must include one special character.",
      },
    ],
  },
];
