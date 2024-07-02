import DDFormContainer from "../../form/ddform.container";
import { POST, RESET_PASSWORD_URL } from "../../../description/api.description";
import { clearForm } from "../../../redux/slice/formSlice";
import {
  RESET_PASSWORD_FORM_NAME as formName,
  resetPasswordForm as configArray,
  SUBMIT_PASSWORD_LOADING,
} from "../../../description/form/resetPassword.description";
import {
  API_STATE,
  CONFIRM_PASSWORD_MSG,
  PROFILE_PATH,
  SIGN_IN_PATH,
} from "../../../utils/constants";
import { EMPTY_STRING } from "../../../description/globel.description";
import { useSelector } from "react-redux";
import useAllHook from "../../../hook/useAllHook";

const ChangePasswordContainer = () => {
  const { apiCaller, navigate, dispatch } = useAllHook();
  const { isLoading = false } =
    useSelector((state) => state?.[API_STATE]?.[SUBMIT_PASSWORD_LOADING]) ?? {};

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

  const handelSubmit = async () => {
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const axiosConfig = {
        url: RESET_PASSWORD_URL,
        method: POST,
        data: state,
      };
      const successFunction = () => {
        dispatch(clearForm({ name: formName }));
        navigate(PROFILE_PATH);
      };
      const errorFunction = () => navigate(SIGN_IN_PATH);
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SUBMIT_PASSWORD_LOADING,
        apiHasToCancel: true,
        showToast: true,
        successFunction,
        errorFunction,
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
    isLoading,
  };
};

export default ChangePasswordContainer;
