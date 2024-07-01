import { useEffect, useState } from "react";
import { GET_ALL_EXAM_FOR_STUDENT } from "../../../description/api.description";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hook/useApi";
import { GET_EXAM_LOADING } from "../../../description/student/showAllExam.description";

const ShowAllExamContainer = () => {
  const [showResult, setShowResult] = useState({ show: false });
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const navigate = useNavigate();
  const apiCaller = useApi();
  const { isLoading = true, data: allExam } =
    useSelector((state) => state?.apiState?.[GET_EXAM_LOADING]) ?? {};

  const redirectToGiveExam = (subject, id) => {
    const encodedSubjectName = btoa(subject);
    navigate(`/give-exam/${encodedSubjectName}/${id}`);
  };

  const showResultHandel = (result) => setShowResult({ show: true, result });

  useEffect(() => {
    const getAllExamForStudent = async () => {
      const axiosConfig = {
        url: GET_ALL_EXAM_FOR_STUDENT,
        method: "get",
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_EXAM_LOADING,
        apiHasToCancel: true,
        showToast: true,
        addAccessToken: true,
      });
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
