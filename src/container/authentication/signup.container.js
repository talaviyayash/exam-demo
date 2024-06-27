import DDFormContainer from "../form/ddform.container";
import callApi from "../../utils/callApi";
import {
  SIGNUP_FORM_NAME,
  VERIFICATION_MSG,
  signUpForm as configArray,
} from "../../description/form/signup.description";
import { SIGNUP_URL } from "../../description/api.description";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import { useState } from "react";
import lSClear from "../../hook/lSClear";

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName: SIGNUP_FORM_NAME,
  });

  const handelSubmit = async (e) => {
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      setIsSigningUp(true);
      const response = await callApi({
        url: SIGNUP_URL,
        method: "post",
        data: state,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        toast.info(VERIFICATION_MSG);
        dispatch(clearForm({ name: SIGNUP_FORM_NAME }));
      } else {
        if (response.statusCode === 401) {
          lSClear();
        }
        toast.error(response.message);
      }
      setIsSigningUp(false);
    }
  };

  return {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isSigningUp,
  };
};

export default SignUpContainer;
