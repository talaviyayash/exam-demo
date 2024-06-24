import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import lSGetItem from "../../../hook/lSGetItem";
import { EDIT_GET_EXAM_URL } from "../../../description/api.description";
import lSClear from "../../../hook/lSClear";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";

const ViewExamInDetailContainer = () => {
  const { id, subject } = useParams();
  const dispatch = useDispatch();
  const userInfo = lSGetItem("userInfo");
  const [examDetail, setExamDetail] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getExamDetail = async () => {
      const response = await axios({
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
      } else if (response.statusCode === 401) {
        lSClear();
        dispatch(logOutSuccess());
      }
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
  };
};

export default ViewExamInDetailContainer;
