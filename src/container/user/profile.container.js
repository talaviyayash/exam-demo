import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EDIT_PROFILE_PATH } from "../../description/routing.description";

const ProfileContainer = () => {
  const { token, ...userInfo } = useSelector(
    (state) => state?.userInformation?.userInfo
  );
  const navigate = useNavigate();
  const redirectToEditPage = () => navigate(EDIT_PROFILE_PATH);
  const { role } = useSelector((state) => state?.userInformation?.userInfo);
  return {
    userInfo: userInfo,
    redirectToEditPage,
    role,
  };
};

export default ProfileContainer;
