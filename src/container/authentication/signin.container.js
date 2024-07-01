import {
  SGININ_FORM_NAME,
  SIGNIN_STATE_LOADING,
  signInForm as configArray,
} from "../../description/form/signin.description";
import DDFormContainer from "../form/ddform.container";
import { SIGNIN_URL } from "../../description/api.description";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slice/userInfoSlice";
import { PROFILE_PATH } from "../../utils/constants";
import { lSSetItem } from "../../utils/lSFunction";
import useAllHook from "../../hook/useAllHook";

const SignInContainer = () => {
  const { apiCaller, navigate, dispatch } = useAllHook();
  const { isLoading: isSigningIn } =
    useSelector((state) => state?.apiState?.[SIGNIN_STATE_LOADING]) ?? {};

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
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const axiosConfig = {
        url: SIGNIN_URL,
        method: "post",
        data: state,
      };
      const successFunction = (response) => {
        navigate(PROFILE_PATH);
        dispatch(loginSuccess({ userInfo: response.data }));
        lSSetItem("userInfo", response.data);
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SIGNIN_STATE_LOADING,
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
    isSigningIn,
  };
};

export default SignInContainer;
