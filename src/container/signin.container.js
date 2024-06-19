import {
  SGININ_FORM_NAME,
  signInForm,
} from "../description/form/signin.description";
import DDFormContainer from "./form/ddform.container";
import axios from "../utils/axios";

const SignInContainer = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray: signInForm,
    formName: SGININ_FORM_NAME,
  });

  const handelSubmit = async (e) => {
    const allFelidValid = validateAllField();
    console.log(allFelidValid, state.email);
    if (allFelidValid) {
      const response = await axios({
        url: "/users/Login",
        method: "post",
        data: state,
      });
      console.log(response);
    }
  };

  return {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray: signInForm,
  };
};

export default SignInContainer;
