import DDFormContainer from "../form/ddform.container";
import axios from "../../utils/axios";
import { FORGET_PASSWORD_URL } from "../../description/api.description";
import { toast } from "react-toastify";
import {
  FORGET_PASSWORD_FORM_NAME as formName,
  forgetPasswordForm as configArray,
} from "../../description/form/forgetPassword.description";
import { useDispatch } from "react-redux";
import { clearForm } from "../../redux/slice/formSlice";

const ForgetPasswordContainer = () => {
  const dispatch = useDispatch();
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
      const response = await axios({
        url: FORGET_PASSWORD_URL,
        method: "post",
        data: state,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(clearForm({ name: formName }));
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

export default ForgetPasswordContainer;
