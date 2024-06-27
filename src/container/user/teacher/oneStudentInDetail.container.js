import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../../utils/callApi";
import { ONE_STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import lSClear from "../../../hook/lSClear";
import { toast } from "react-toastify";

const OneStudentInDetailContainer = () => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const [studentInfo, setStudentInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
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
      } else {
        if (response.statusCode === 401) {
          lSClear();
          dispatch(logOutSuccess());
        }
        toast.error(response.message);
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
