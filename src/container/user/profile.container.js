import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET_PASSWORD_PATH,
  EDIT_PROFILE_PATH,
  SIGN_IN_PATH,
} from "../../utils/constants";
import { logOutSuccess } from "../../redux/slice/userInfoSlice";
import { toastSuccess } from "../../utils/toastFunction";

const ProfileContainer = () => {
  const { token, role, ...userInfo } = useSelector(
    (state) => state.userInformation.userInfo
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToEditPage = () => navigate(EDIT_PROFILE_PATH);
  const redirectToChangePassword = () => navigate(RESET_PASSWORD_PATH);

  const logOut = () => {
    dispatch(logOutSuccess());
    navigate(SIGN_IN_PATH);
    toastSuccess("You Logout Successfully");
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
