import { useEffect } from "react";
import { STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useSelector } from "react-redux";
import { GET_STUDENT_LOADING_NAME } from "../../../description/teacher/showStudentDetail.description";
import useAllHook from "../../../hook/useAllHook";

const ShowStudentDetailContainer = () => {
  const {
    isLoading,
    isError,
    data: allStudent = [],
  } = useSelector((state) => state?.apiState?.[GET_STUDENT_LOADING_NAME]) ?? {};
  const { apiCaller, navigate } = useAllHook();

  const navigateToStudentInDetail = ({ _id }) =>
    navigate(`/student-detail/${_id}`);

  useEffect(() => {
    const getAllStudentData = async () => {
      const axiosConfig = {
        url: STUDENT_DETAIL_URL,
        method: "get",
      };

      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_STUDENT_LOADING_NAME,
        showToast: false,
        apiHasToCancel: true,
      });
    };
    if (allStudent.length === 0) getAllStudentData();
  }, []);

  return {
    allStudent,
    isLoading,
    navigateToStudentInDetail,
    isError,
  };
};

export default ShowStudentDetailContainer;
