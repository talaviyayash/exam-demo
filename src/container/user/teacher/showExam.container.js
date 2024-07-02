import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  DELETE_EXAM_URL,
  GET,
  SHOW_EXAM_URL,
} from "../../../description/api.description";
import {
  DELETE_EXAM_STATE,
  SHOW_EXAM_STATE,
} from "../../../description/teacher/showExam.description";
import { API_STATE } from "../../../utils/constants";
import { toastSuccess } from "../../../utils/toastFunction";
import useAllHook from "../../../hook/useAllHook";
import {
  DELETE_EXAM_MSG,
  DELETE_EXAM_SUCCESS_MSG,
} from "../../../description/globel.description";

const ShowExamContainer = () => {
  const { isLoading, data: allExam } =
    useSelector((state) => state?.[API_STATE]?.[SHOW_EXAM_STATE]) ?? {};
  const { isLoading: deleteIsLoading } =
    useSelector((state) => state?.[API_STATE]?.[DELETE_EXAM_STATE]) ?? {};
  const { apiCaller, navigate } = useAllHook();

  const allExamApi = async () => {
    const axiosConfig = {
      url: SHOW_EXAM_URL,
      method: GET,
    };
    await apiCaller({
      axiosConfig,
      loadingStatuesName: SHOW_EXAM_STATE,
      showToast: false,
      apiHasToCancel: true,
    });
  };

  const editExamNavigate = (subject, id) =>
    navigate(`/edit-exam/${subject}/${id}`);

  const viewExamNavigate = (subject, id) =>
    navigate(`/view-in-detail/${subject}/${id}`);

  const deleteExam = async (id) => {
    const isApproved = window.confirm(DELETE_EXAM_MSG);
    if (!isApproved) return null;
    const axiosConfig = {
      url: DELETE_EXAM_URL,
      method: "delete",
      params: {
        id,
      },
    };
    const successFunction = () => toastSuccess(DELETE_EXAM_SUCCESS_MSG);
    await apiCaller({
      axiosConfig,
      loadingStatuesName: DELETE_EXAM_STATE,
      apiHasToCancel: true,
      successFunction,
    });
    await allExamApi();
  };

  useEffect(() => {
    allExamApi();
  }, []);

  return {
    allExam,
    editExamNavigate,
    isLoading,
    deleteExam,
    viewExamNavigate,
    deleteIsLoading,
  };
};

export default ShowExamContainer;
