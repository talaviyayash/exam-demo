import {
  oneDigitCaseLetter,
  oneLowerCaseLetter,
  oneUpperCaseLetter,
} from "../../utils/regex";

export const NEW_PASSWORD_FORM_NAME = "newPasswordForm";

export const NEW_PASSWORD_SUBMIT_NAME = "Create Password";

export const NEW_PASSWORD_FORM_HEADER = "Create Password";

export const ATTRIBUTE_SUBMIT_BUTTON = {
  sx: {
    width: "200px",
    margin: "15px 0 0 0",
  },
};

export const newPasswordForm = [
  {
    name: "Password",
    type: "password",
    required: {
      isRequired: true,
      defaultMsg: "Please enter Password.",
    },
    attributes: {
      name: "Password",
      id: "Password",
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
    ],
  },
  {
    name: "ConfirmPassword",
    type: "password",
    required: {
      isRequired: true,
      defaultMsg: "Please enter ConfirmPassword.",
    },
    attributes: {
      name: "ConfirmPassword",
      id: "ConfirmPassword",
      placeholder: "Confirm Password",
    },
    labelName: "Confirm Password",
    patterns: [
      {
        regex: oneLowerCaseLetter,
        error: "Confirm Password must include lower case alphabet.",
      },
      {
        regex: oneUpperCaseLetter,
        error: "Confirm Password must include upper case alphabet.",
      },
      {
        regex: oneDigitCaseLetter,
        error: "Confirm Password must include digit.",
      },
    ],
  },
];
