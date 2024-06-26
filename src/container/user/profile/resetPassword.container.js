import DDFormContainer from "../../form/ddform.container";
import callApi from "../../../utils/callApi";
import { RESET_PASSWORD_URL } from "../../../description/api.description";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearForm } from "../../../redux/slice/formSlice";
import {
  RESET_PASSWORD_FORM_NAME as formName,
  resetPasswordForm as configArray,
} from "../../../description/form/resetPassword.description";

import { useState } from "react";
import lSGetItem from "../../../hook/lSGetItem";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../utils/constants";

const ChangePasswordContainer = () => {
  const { token } = lSGetItem("userInfo");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const ConfirmPassword = (allValue) => {
    const PasswordValue = allValue?.Password;
    const confirmPasswordValue = allValue?.ConfirmPassword;
    return confirmPasswordValue === PasswordValue
      ? EMPTY_STRING
      : "Confirm Password doesn't match Password ";
  };

  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName,
    customValidation: {
      ConfirmPassword,
    },
  });

  const handelSubmit = async (e) => {
    setIsLoading(true);
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const response = await callApi({
        url: RESET_PASSWORD_URL,
        method: "post",
        data: state,
        headers: {
          "access-token": token,
        },
      });
      setIsLoading(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(clearForm({ name: formName }));
        navigate(PROFILE_PATH);
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

export default ChangePasswordContainer;
