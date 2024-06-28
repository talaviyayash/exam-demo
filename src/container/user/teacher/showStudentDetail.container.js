import { useEffect, useState } from "react";

import { STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi from "../../../hook/useApi";
import { GET_STUDENT_LOADING_NAME } from "../../../description/teacher/showStudentDetail.description";

const ShowStudentDetailContainer = () => {
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const {
    isLoading,
    isError,
    data: allStudent = [],
  } = useSelector((state) => state?.apiState?.[GET_STUDENT_LOADING_NAME]) ?? {};
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const apiCaller = useApi();
  const navigateToStudentInDetail = (id) => navigate(`/student-detail/${id}`);

  console.log(isLoading, data);

  useEffect(() => {
    const getAllStudentData = async () => {
      const axiosConfig = {
        url: STUDENT_DETAIL_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
      };

      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_STUDENT_LOADING_NAME,
        showToast: false,
        toastMsg: "",
        errorToastMsg: "",
        apiHasToCancel: true,
      });
    };
    getAllStudentData();
  }, []);

  return {
    allStudent,
    isLoading,
    navigateToStudentInDetail,
    isError,
    data,
  };
};

export default ShowStudentDetailContainer;
