import { useSelector } from "react-redux";
import {
  RESET_PASSWORD_PATH,
  EDIT_PROFILE_PATH,
  SIGN_IN_PATH,
  USER_INFORMATION,
  USER_INFO,
} from "../../utils/constants";
import { logOutSuccess } from "../../redux/slice/userInfoSlice";
import { toastSuccess } from "../../utils/toastFunction";
import useAllHook from "../../hook/useAllHook";
import { LOGOUT_MSG } from "../../description/globel.description";

const ProfileContainer = () => {
  const { token, role, ...userInfo } = useSelector(
    (state) => state[USER_INFORMATION][USER_INFO]
  );
  const { dispatch, navigate } = useAllHook();
  const redirectToEditPage = () => navigate(EDIT_PROFILE_PATH);
  const redirectToChangePassword = () => navigate(RESET_PASSWORD_PATH);

  const logOut = () => {
    dispatch(logOutSuccess());
    navigate(SIGN_IN_PATH);
    toastSuccess(LOGOUT_MSG);
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
