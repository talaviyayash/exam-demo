import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EDIT_GET_EXAM_URL, GET } from "../../../description/api.description";
import { EXAM_DETAIL_LOADING_STATE } from "../../../description/teacher/viewExamInDetail.description";
import { addSuccessState } from "../../../redux/slice/apiLoadingSlice";
import useAllHook from "../../../hook/useAllHook";
import { API_STATE } from "../../../utils/constants";

const ViewExamInDetailContainer = () => {
  const { id, subject } = useParams();
  const { apiCaller, dispatch } = useAllHook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading, data: examDetail = [] } =
    useSelector((state) => state?.[API_STATE]?.[EXAM_DETAIL_LOADING_STATE]) ??
    {};

  useEffect(() => {
    const getExamDetail = async () => {
      const axiosConfig = {
        url: EDIT_GET_EXAM_URL,
        method: GET,
        params: {
          id,
        },
      };

      const successFunction = (response) =>
        dispatch(
          addSuccessState({
            name: EXAM_DETAIL_LOADING_STATE,
            data: response.data.questions,
          })
        );
      await apiCaller({
        axiosConfig,
        loadingStatuesName: EXAM_DETAIL_LOADING_STATE,
        showToast: false,
        apiHasToCancel: true,
        successFunction,
      });
    };
    getExamDetail();
  }, []);

  const nextButtonClickHandel = () => setCurrentIndex((prev) => prev + 1);

  const prevButtonClickHandel = () => setCurrentIndex((prev) => prev - 1);

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
