import { useEffect, useState } from "react";

import lSGetItem from "../../../hook/lSGetItem";
import callApi from "../../../utils/callApi";
import { GET_ALL_EXAM_FOR_STUDENT } from "../../../description/api.description";
import { useDispatch } from "react-redux";
import lSClear from "../../../hook/lSClear";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import { useNavigate, useParams } from "react-router-dom";

const ShowAllExamContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allExam, setAllExam] = useState([]);
  const [showResult, setShowResult] = useState({ show: false });
  const userInfo = lSGetItem("userInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectToGiveExam = (subject, id) => {
    const encodedSubjectName = btoa(subject);
    navigate(`/give-exam/${encodedSubjectName}/${id}`);
  };

  const showResultHandel = (result) => setShowResult({ show: true, result });

  useEffect(() => {
    const getAllExamForStudent = async () => {
      setIsLoading(true);
      const response = await callApi({
        url: GET_ALL_EXAM_FOR_STUDENT,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
      });
      setIsLoading(false);
      if (response.statusCode === 200) {
        setAllExam(response.data);
      } else if (response.statusCode === 401) {
        lSClear();
        dispatch(logOutSuccess());
      } else {
        setAllExam(response.data);
      }
    };
    getAllExamForStudent();
  }, []);

  return {
    isLoading,
    allExam,
    redirectToGiveExam,
    showResult,
    showResultHandel,
    setShowResult,
  };
};

export default ShowAllExamContainer;
