import { useEffect, useState } from "react";

import { STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi from "../../../hook/useApi";
import { GET_STUDENT_LOADING_NAME } from "../../../description/teacher/showStudentDetail.description";

const ShowStudentDetailContainer = () => {
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const { isLoading, isError } =
    useSelector((state) => state?.apiState?.[GET_STUDENT_LOADING_NAME]) ?? {};
  const [allStudent, setData] = useState([]);
  const navigate = useNavigate();
  const apiCaller = useApi();
  const navigateToStudentInDetail = (id) => navigate(`/student-detail/${id}`);
  console.log(isLoading, allStudent);

  useEffect(() => {
    const getAllStudentData = async () => {
      const axiosConfig = {
        url: STUDENT_DETAIL_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
      };

      const successFunction = (response) => setData(response.data);

      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_STUDENT_LOADING_NAME,
        showToast: false,
        toastMsg: "",
        errorToastMsg: "",
        apiHasToCancel: true,
        successFunction,
      });
    };
    getAllStudentData();
  }, []);

  return {
    allStudent,
    isLoading,
    navigateToStudentInDetail,
    isError,
  };
};

export default ShowStudentDetailContainer;
