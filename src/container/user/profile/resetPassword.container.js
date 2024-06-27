import DDFormContainer from "../../form/ddform.container";
import callApi from "../../../utils/callApi";
import { RESET_PASSWORD_URL } from "../../../description/api.description";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../../../redux/slice/formSlice";
import {
  RESET_PASSWORD_FORM_NAME as formName,
  resetPasswordForm as configArray,
} from "../../../description/form/resetPassword.description";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { PROFILE_PATH, SIGN_IN_PATH } from "../../../utils/constants";
import { EMPTY_STRING } from "../../../description/globel.description";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import lSClear from "../../../hook/lSClear";

const ChangePasswordContainer = () => {
  const { token } = useSelector((state) => state.userInformation.userInfo);

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
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      setIsLoading(true);
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
        if (response.statusCode === 401) {
          navigate(SIGN_IN_PATH);
          dispatch(logOutSuccess());
          lSClear();
        }
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
