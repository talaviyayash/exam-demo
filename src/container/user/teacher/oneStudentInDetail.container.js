import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ONE_STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useSelector } from "react-redux";
import useApi from "../../../hook/useApi";
import { LOADING_STATE_OF_STUDENT } from "../../../description/teacher/oneStudentInDetail.description";

const OneStudentInDetailContainer = () => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const apiCaller = useApi();
  const { isLoading, data: studentInfo = [] } =
    useSelector((state) => state?.apiState?.[LOADING_STATE_OF_STUDENT]) ?? {};

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const axiosConfig = {
        url: ONE_STUDENT_DETAIL_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: LOADING_STATE_OF_STUDENT,
        showToast: false,
        apiHasToCancel: true,
      });
    };

    fetchStudentDetails();
  }, []);
  return {
    studentInfo,
    isLoading,
  };
};

export default OneStudentInDetailContainer;
