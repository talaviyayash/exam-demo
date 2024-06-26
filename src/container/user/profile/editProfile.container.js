import { useDispatch, useSelector } from "react-redux";
import {
  EDIT_PROFILE_FORM_NAME,
  nameElement,
} from "../../../description/form/editProfile.description";
import DDFormContainer from "../../form/ddform.container";
import { toast } from "react-toastify";
import callApi from "../../../utils/callApi";
import { UPDATE_PROFILE_URL } from "../../../description/api.description";
import { addUserInfo, logOutSuccess } from "../../../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../utils/constants";
import { useEffect, useState } from "react";
import lSClear from "../../../hook/lSClear";
import lSSetItem from "../../../hook/lSSetItem";

const EditProfileContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInformation?.userInfo);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await callApi({
        url: UPDATE_PROFILE_URL,
        method: "put",
        data: state,
        headers: {
          "access-token": userInfo.token,
        },
      });
      setIsLoading(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(addUserInfo(response.data));
        lSSetItem("userInfo", { ...userInfo, ...response.data });
        navigate(PROFILE_PATH);
      } else {
        lSClear();
        dispatch(logOutSuccess());
      }
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
