import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  DELETE_EXAM_URL,
  SHOW_EXAM_URL,
} from "../../../description/api.description";
import {
  DELETE_EXAM_STATE,
  SHOW_EXAM_STATE,
} from "../../../description/teacher/showExam.description";
import { API_STATE } from "../../../utils/constants";
import { toastSuccess } from "../../../utils/toastFunction";
import useAllHook from "../../../hook/useAllHook";
import { addDataState } from "../../../redux/slice/apiLoadingSlice";
import { lSSetItem } from "../../../utils/lSFunction";

const ShowExamContainer = () => {
  const { isLoading, data: allExam } =
    useSelector((state) => state?.[API_STATE]?.[SHOW_EXAM_STATE]) ?? {};
  const { isLoading: deleteIsLoading } =
    useSelector((state) => state?.[API_STATE]?.[DELETE_EXAM_STATE]) ?? {};
  const { apiCaller, navigate, dispatch } = useAllHook();

  const allExamApi = async () => {
    const axiosConfig = {
      url: SHOW_EXAM_URL,
      method: "get",
    };
    await apiCaller({
      axiosConfig,
      loadingStatuesName: SHOW_EXAM_STATE,
      showToast: false,
      apiHasToCancel: true,
    });
  };

  const editExamNavigate = ({ subjectName, _id, notes }) => {
    navigate(`/edit-exam/${subjectName}/${_id}`);
    lSSetItem("notes", { _id, notes });
  };
  const viewExamNavigate = ({ subjectName, _id }) =>
    navigate(`/view-in-detail/${subjectName}/${_id}`);

  const deleteExam = async ({ _id: id }, index) => {
    const isApproved = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!isApproved) return null;
    const axiosConfig = {
      url: DELETE_EXAM_URL,
      method: "delete",
      params: {
        id,
      },
    };
    const successFunction = () => {
      toastSuccess(`Delete exam successfully`);
      const data = allExam.toSpliced(parseInt(index), 1);
      dispatch(addDataState({ name: SHOW_EXAM_STATE, data }));
    };
    await apiCaller({
      axiosConfig,
      loadingStatuesName: DELETE_EXAM_STATE,
      apiHasToCancel: true,
      successFunction,
    });
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
