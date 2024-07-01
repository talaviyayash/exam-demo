import DDFormContainer from "../form/ddform.container";
import {
  SIGNUP_FORM_NAME,
  SIGNUP_STATE_LOADING,
  VERIFICATION_MSG,
  signUpForm as configArray,
} from "../../description/form/signup.description";
import { SIGNUP_URL } from "../../description/api.description";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import useApi from "../../hook/useApi";

const SignUpContainer = () => {
  const dispatch = useDispatch();

  const { isLoading: isSigningUp } =
    useSelector((state) => state?.apiState?.[SIGNUP_STATE_LOADING]) ?? {};
  const apiCaller = useApi();
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
      const axiosConfig = {
        url: SIGNUP_URL,
        method: "post",
        data: state,
      };
      const successFunction = () => {
        toast.info(VERIFICATION_MSG);
        dispatch(clearForm({ name: SIGNUP_FORM_NAME }));
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SIGNUP_STATE_LOADING,
        apiHasToCancel: true,
        successFunction,
        showToast: true,
        addAccessToken: false,
      });
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
