import { emailRegex } from "../../utils/regex";

export const FORGET_PASSWORD_FORM_HEADER = "Forget Password";

export const FORGET_PASSWORD_FORM_NAME = "forgetPasswordForm";

export const STATE_FOR_FORGET_PASSWORD = "forgetPassword";

export const FORGET_PASSWORD_SUBMIT_NAME = "Sent Email";

export const ATTRIBUTE_SUBMIT_BUTTON = {
  sx: {
    width: "200px",
    margin: "15px 0 0 0 ",
  },
};

export const forgetPasswordForm = [
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
];
