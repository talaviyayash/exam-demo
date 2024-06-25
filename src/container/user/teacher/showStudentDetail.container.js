import { useEffect, useState } from "react";
import lSGetItem from "../../../hook/lSGetItem";
import callApi from "../../../utils/callApi";
import { STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useNavigate } from "react-router-dom";

const ShowStudentDetailContainer = () => {
  const [allStudent, setAllStudent] = useState([]);
  const userInfo = lSGetItem("userInfo");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const navigateToStudentInDetail = (id) => {
    navigate(`/student-detail/${id}`);
  };
  const getAllStudentData = async () => {
    setIsLoading(true);
    const response = await callApi({
      url: STUDENT_DETAIL_URL,
      method: "get",
      headers: {
        "access-token": userInfo.token,
      },
    });
    setIsLoading(false);

    setAllStudent(response.data);
  };

  useEffect(() => {
    getAllStudentData();
  }, [userInfo.token]);
  return {
    isLoading,
    allStudent,
    navigateToStudentInDetail,
    getAllStudentData,
  };
};

export default ShowStudentDetailContainer;
