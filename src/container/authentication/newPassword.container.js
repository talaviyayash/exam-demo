import DDFormContainer from "../form/ddform.container";
import {
  CREATE_NEW_PASSWORD_URL,
  GET,
  NEW_PASSWORD_VERIFY_URL,
  POST,
} from "../../description/api.description";
import { useSelector } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import {
  NEW_PASSWORD_FORM_NAME as formName,
  newPasswordForm as configArray,
  VERIFYING_TOKEN_STATE,
  SUBMITTING_PASSWORD_STATE,
} from "../../description/form/newPassword.description";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EMPTY_STRING } from "../../description/globel.description";
import {
  ACCESS_TOKEN,
  API_STATE,
  CONFIRM_PASSWORD_MSG,
  FORGET_PASSWORD_PATH,
  SIGN_IN_PATH,
} from "../../utils/constants";
import useAllHook from "../../hook/useAllHook";

const NewPasswordContainer = () => {
  const [searchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"));
  const { apiCaller, navigate, dispatch } = useAllHook();

  const { isLoading: isTokenVerifying = true } =
    useSelector((state) => state?.[API_STATE]?.[VERIFYING_TOKEN_STATE]) ?? {};
  const { isLoading: isCreatingNewPassword } =
    useSelector((state) => state?.[API_STATE]?.[SUBMITTING_PASSWORD_STATE]) ??
    {};

  const ConfirmPassword = (allValue) => {
    const PasswordValue = allValue?.Password;
    const confirmPasswordValue = allValue?.ConfirmPassword;
    return confirmPasswordValue === PasswordValue
      ? EMPTY_STRING
      : CONFIRM_PASSWORD_MSG;
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
      const axiosConfig = {
        url: CREATE_NEW_PASSWORD_URL,
        method: POST,
        data: state,
        params: {
          token,
        },
      };
      const successFunction = () => {
        dispatch(clearForm({ name: formName }));
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SUBMITTING_PASSWORD_STATE,
        apiHasToCancel: true,
        successFunction,
        showToast: true,
      });
      navigate(SIGN_IN_PATH);
    }
  };

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        console.log(token);
        const axiosConfig = {
          url: NEW_PASSWORD_VERIFY_URL,
          method: GET,
          headers: {
            ACCESS_TOKEN: token,
          },
        };
        const errorFunction = () => navigate(FORGET_PASSWORD_PATH);
        await apiCaller({
          axiosConfig,
          loadingStatuesName: VERIFYING_TOKEN_STATE,
          apiHasToCancel: true,
          errorFunction,
          addAccessToken: false,
        });
      };
      verifyToken();
    } else {
      navigate(FORGET_PASSWORD_PATH);
    }
  }, [navigate, token]);
  return {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isTokenVerifying,
    isCreatingNewPassword,
  };
};

export default NewPasswordContainer;
