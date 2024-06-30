import { useDispatch, useSelector } from "react-redux";
import {
  EDIT_PROFILE_FORM_NAME,
  SUBMIT_PROFILE_LOADING,
  nameElement,
} from "../../../description/form/editProfile.description";
import DDFormContainer from "../../form/ddform.container";
import { UPDATE_PROFILE_URL } from "../../../description/api.description";
import { addUserInfo } from "../../../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../utils/constants";
import { useEffect } from "react";
import lSSetItem from "../../../hook/lSSetItem";
import useApi from "../../../hook/useApi";

const EditProfileContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const apiCaller = useApi();
  const { isLoading } =
    useSelector((state) => state?.apiState?.[SUBMIT_PROFILE_LOADING]) ?? {};

  let configArray = nameElement;
  useEffect(() => {
    configArray.value = userInfo.name;
  }, []);
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray: [configArray],
    formName: EDIT_PROFILE_FORM_NAME,
    customValidation: {},
  });

  const handelSubmit = async (e) => {
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const axiosConfig = {
        url: UPDATE_PROFILE_URL,
        method: "put",
        data: state,
        headers: {
          "access-token": userInfo.token,
        },
      };
      const successFunction = (response) => {
        dispatch(addUserInfo(response.data));
        lSSetItem("userInfo", { ...userInfo, ...response.data });
        navigate(PROFILE_PATH);
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SUBMIT_PROFILE_LOADING,
        apiHasToCancel: true,
        showToast: true,
        successFunction,
      });
    }
  };

  return {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    configArray: [configArray],
    handelSubmit,
    isLoading,
  };
};

export default EditProfileContainer;
