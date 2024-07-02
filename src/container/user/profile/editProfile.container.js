import { useSelector } from "react-redux";
import {
  EDIT_PROFILE_FORM_NAME,
  PROFILE_UPDATE_MSG,
  SUBMIT_PROFILE_LOADING,
  nameElement,
} from "../../../description/form/editProfile.description";
import DDFormContainer from "../../form/ddform.container";
import { UPDATE_PROFILE_URL } from "../../../description/api.description";
import { addUserInfo } from "../../../redux/slice/userInfoSlice";
import {
  API_STATE,
  PROFILE_PATH,
  USER_INFO,
  USER_INFORMATION,
} from "../../../utils/constants";
import { useEffect } from "react";
import { lSSetItem } from "../../../utils/lSFunction";
import useAllHook from "../../../hook/useAllHook";

const EditProfileContainer = () => {
  const { apiCaller, navigate, dispatch } = useAllHook();
  const userInfo = useSelector((state) => state[USER_INFORMATION][USER_INFO]);
  const { isLoading } =
    useSelector((state) => state?.[API_STATE]?.[SUBMIT_PROFILE_LOADING]) ?? {};
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
      };
      const successFunction = (response) => {
        dispatch(addUserInfo(response.data));
        lSSetItem(USER_INFO, { ...userInfo, ...response.data });
        navigate(PROFILE_PATH);
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: SUBMIT_PROFILE_LOADING,
        apiHasToCancel: true,
        showToast: true,
        successFunction,
        toastMsg: PROFILE_UPDATE_MSG,
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
