import DDFormContainer from "../form/ddform.container";
import { FORGET_PASSWORD_URL } from "../../description/api.description";
import {
  FORGET_PASSWORD_FORM_NAME as formName,
  forgetPasswordForm as configArray,
  STATE_FOR_FORGET_PASSWORD,
} from "../../description/form/forgetPassword.description";
import { useSelector } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";
import useAllHook from "../../hook/useAllHook";

const ForgetPasswordContainer = () => {
  const { apiCaller, dispatch } = useAllHook();
  const { isLoading = false } =
    useSelector((state) => state?.apiState?.[STATE_FOR_FORGET_PASSWORD]) ?? {};

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
      const successFunction = () => dispatch(clearForm({ name: formName }));
      const axiosConfig = {
        url: FORGET_PASSWORD_URL,
        method: "post",
        data: state,
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: STATE_FOR_FORGET_PASSWORD,
        apiHasToCancel: true,
        showToast: true,
        successFunction,
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
    isLoading,
  };
};

export default ForgetPasswordContainer;
