import DDFormContainer from "../form/ddform.container";
import axios from "../../utils/axios";
import {
  SIGNUP_FORM_NAME,
  VERIFICATION_MSG,
  signUpForm as configArray,
} from "../../description/form/signup.description";
import { SIGNUP_URL } from "../../description/api.description";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";

const SignUpContainer = () => {
  const dispatch = useDispatch();
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
      const response = await axios({
        url: SIGNUP_URL,
        method: "post",
        data: state,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        toast.info(VERIFICATION_MSG);
        dispatch(clearForm({ name: SIGNUP_FORM_NAME }));
      }
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
  };
};

export default SignUpContainer;
