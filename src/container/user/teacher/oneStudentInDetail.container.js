import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../../utils/callApi";
import { ONE_STUDENT_DETAIL_URL } from "../../../description/api.description";
import lSGetItem from "../../../hook/lSGetItem";
import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import lSClear from "../../../hook/lSClear";

const OneStudentInDetailContainer = () => {
  const { id } = useParams();
  const userInfo = lSGetItem("userInfo");
  const dispatch = useDispatch();
  const [studentInfo, setStudentInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const response = await callApi({
        url: ONE_STUDENT_DETAIL_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      });
      if (response.statusCode === 200) {
        setStudentInfo(response?.data[0]);
      } else if (response.statusCode === 401) {
        lSClear();
        dispatch(logOutSuccess());
      }
      setIsLoading(false);
    };
    fetchStudentDetails();
  }, []);
  return {
    studentInfo,
    isLoading,
  };
};

export default OneStudentInDetailContainer;
