import {
  SGININ_FORM_NAME,
  signInForm as configArray,
} from "../../description/form/signin.description";
import DDFormContainer from "../form/ddform.container";
import axios from "../../utils/axios";
import { SIGNIN_URL } from "../../description/api.description";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";

const SignInContainer = () => {
  const dispatch = useDispatch();
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
      const response = await axios({
        url: SIGNIN_URL,
        method: "post",
        data: state,
      });
      if (response.statusCode === 200) {
        dispatch(loginSuccess({ userInfo: response.data }));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.message);
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
  };
};

export default SignInContainer;
