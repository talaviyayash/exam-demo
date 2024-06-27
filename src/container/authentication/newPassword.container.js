import DDFormContainer from "../form/ddform.container";
import callApi from "../../utils/callApi";
import {
  CREATE_NEW_PASSWORD_URL,
  NEW_PASSWORD_VERIFY_URL,
} from "../../description/api.description";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import {
  NEW_PASSWORD_FORM_NAME as formName,
  newPasswordForm as configArray,
} from "../../description/form/newPassword.description";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EMPTY_STRING } from "../../description/globel.description";
import { FORGET_PASSWORD_PATH, SIGN_IN_PATH } from "../../utils/constants";
import lSClear from "../../hook/lSClear";

const NewPasswordContainer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token] = useState(searchParams.get("token"));
  const dispatch = useDispatch();
  const [isTokenVerifying, setIsTokenVerifying] = useState(true);
  const [isCreatingNewPassword, setIsCreatingNewPassword] = useState(false);

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
    setIsCreatingNewPassword(true);
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const response = await callApi({
        url: CREATE_NEW_PASSWORD_URL,
        method: "post",
        data: state,
        params: {
          token,
        },
      });
      setIsCreatingNewPassword(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(clearForm({ name: formName }));
        navigate(SIGN_IN_PATH);
      } else {
        if (response.statusCode === 401) {
          lSClear();
        }
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        const response = await callApi({
          url: NEW_PASSWORD_VERIFY_URL,
          method: "get",
          headers: {
            "access-token": token,
          },
        });
        setIsTokenVerifying(false);
        if (response.statusCode !== 200) {
          toast.error(response.message);
          navigate(FORGET_PASSWORD_PATH);
        }
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
