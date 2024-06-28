import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EDIT_GET_EXAM_URL } from "../../../description/api.description";
import useApi from "../../../hook/useApi";
import { EXAM_DETAIL_LOADING_STATE } from "../../../description/teacher/viewExamInDetail.description";
import { addSuccessState } from "../../../redux/slice/apiLoadingSlice";

const ViewExamInDetailContainer = () => {
  const { id, subject } = useParams();
  const userInfo = useSelector((state) => state.userInformation.userInfo);

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const apiCaller = useApi();
  const {
    isLoading,
    isError,
    data: examDetail = [],
  } = useSelector((state) => state?.apiState?.[EXAM_DETAIL_LOADING_STATE]) ??
  {};

  useEffect(() => {
    const getExamDetail = async () => {
      const axiosConfig = {
        url: EDIT_GET_EXAM_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
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
        toastMsg: "",
        errorToastMsg: "",
        apiHasToCancel: true,
        successFunction,
      });
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
