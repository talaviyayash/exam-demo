import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import callApi from "../../../utils/callApi";
import { EDIT_GET_EXAM_URL } from "../../../description/api.description";
import lSClear from "../../../hook/lSClear";
import { toast } from "react-toastify";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";

const ViewExamInDetailContainer = () => {
  const { id, subject } = useParams();
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const [examDetail, setExamDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getExamDetail = async () => {
      setIsLoading(true);
      const response = await callApi({
        url: EDIT_GET_EXAM_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      });
      if (response.statusCode === 200) {
        setExamDetail(response.data.questions);
        setCurrentIndex(0);
      } else {
        if (response.statusCode === 401) {
          lSClear();
          dispatch(logOutSuccess());
        }
        toast.error(response.message);
      }
      setIsLoading(false);
    };
    getExamDetail();
  }, []);

  const nextButtonClickHandel = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  const prevButtonClickHandel = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return {
    examDetail,
    id,
    subject,
    currentIndex,
    nextButtonClickHandel,
    prevButtonClickHandel,
    isLoading,
  };
};

export default ViewExamInDetailContainer;
