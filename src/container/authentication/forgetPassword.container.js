import DDFormContainer from "../form/ddform.container";
import callApi from "../../utils/callApi";
import { FORGET_PASSWORD_URL } from "../../description/api.description";
import { toast } from "react-toastify";
import {
  FORGET_PASSWORD_FORM_NAME as formName,
  forgetPasswordForm as configArray,
} from "../../description/form/forgetPassword.description";
import { useDispatch } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import { useState } from "react";

const ForgetPasswordContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName,
  });

  const handelSubmit = async (e) => {
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      setIsLoading(true);
      const response = await callApi({
        url: FORGET_PASSWORD_URL,
        method: "post",
        data: state,
      });
      setIsLoading(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(clearForm({ name: formName }));
      } else {
        toast.error(response.message);
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
    isLoading,
  };
};

export default ForgetPasswordContainer;
