import { allRegexForPassword } from "../../utils/regex";

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
    patterns: allRegexForPassword("Password"),
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
    patterns: allRegexForPassword("Confirm Password"),
  },
];
