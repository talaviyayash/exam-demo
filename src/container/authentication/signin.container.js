import {
  SGININ_FORM_NAME,
  signInForm as configArray,
} from "../../description/form/signin.description";
import DDFormContainer from "../form/ddform.container";
import callApi from "../../utils/callApi";
import { SIGNIN_URL } from "../../description/api.description";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";
import lSSetItem from "../../hook/lSSetItem";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../utils/constants";
import { useState } from "react";
import lSClear from "../../hook/lSClear";

const SignInContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName: SGININ_FORM_NAME,
  });

  const handelSubmit = async (e) => {
    setIsSigningIn(true);
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const response = await callApi({
        url: SIGNIN_URL,
        method: "post",
        data: state,
      });
      if (response.statusCode === 200) {
        dispatch(loginSuccess({ userInfo: response.data }));
        lSSetItem("userInfo", response.data);
        toast.success(response.message);
        navigate(PROFILE_PATH);
      } else {
        if (response.statusCode === 401) {
          lSClear();
        }
        toast.error(response.message);
      }
      setIsSigningIn(false);
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
    isSigningIn,
  };
};

export default SignInContainer;