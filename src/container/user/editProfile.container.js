import { useDispatch, useSelector } from "react-redux";
import {
  EDIT_PROFILE_FORM_NAME,
  nameElement,
} from "../../description/form/editProfile.description";
import DDFormContainer from "../form/ddform.container";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { UPDATE_PROFILE_URL } from "../../description/api.description";
import { addUserInfo } from "../../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../description/routing.description";
import { useEffect } from "react";

const EditProfileContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInformation?.userInfo);
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
  });

  const handelSubmit = async (e) => {
    const allFieldValid = validateAllField();
    if (allFieldValid) {
      const response = await axios({
        url: UPDATE_PROFILE_URL,
        method: "put",
        data: state,
        headers: {
          "access-token": userInfo.token,
        },
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        dispatch(addUserInfo(response.data));
        navigate(PROFILE_PATH);
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
  };
};

export default EditProfileContainer;
