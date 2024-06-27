import { allRegexForPassword } from "../../utils/regex";

export const RESET_PASSWORD_FORM_NAME = "changePasswordForm";

export const RESET_PASSWORD_SUBMIT_NAME = "Reset Password";

export const RESET_PASSWORD_FORM_HEADER = "Reset Password";

export const ATTRIBUTE_SUBMIT_BUTTON = {
  sx: {
    width: "200px",
    margin: "15px 0 0 0",
  },
};

export const resetPasswordForm = [
  {
    name: "oldPassword",
    type: "password",
    required: {
      isRequired: true,
      defaultMsg: "Please enter Old Password.",
    },
    attributes: {
      name: "oldPassword",
      id: "oldPassword",
      placeholder: "Old Password",
    },
    labelName: "Old Password",
    patterns: allRegexForPassword("Old Password"),
  },
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
