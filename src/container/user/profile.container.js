import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET_PASSWORD_PATH,
  EDIT_PROFILE_PATH,
  SIGN_IN_PATH,
} from "../../utils/constants";
import lSClear from "../../hook/lSClear";
import { logOutSuccess } from "../../redux/slice/userInfoSlice";

const ProfileContainer = () => {
  const { token, ...userInfo } = useSelector(
    (state) => state?.userInformation?.userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToEditPage = () => navigate(EDIT_PROFILE_PATH);
  const redirectToChangePassword = () => navigate(RESET_PASSWORD_PATH);
  const { role } = useSelector((state) => state?.userInformation?.userInfo);

  const logOut = () => {
    dispatch(logOutSuccess());
    navigate(SIGN_IN_PATH);
  };

  return {
    userInfo: userInfo,
    redirectToEditPage,
    role,
    redirectToChangePassword,
    logOut,
  };
};

export default ProfileContainer;
