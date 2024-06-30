import { useEffect, useState } from "react";
import {
  GET_EXAM_PAPER_URL,
  GIVE_EXAM_PAPER_URL,
} from "../../../description/api.description";
import lSGetItem from "../../../hook/lSGetItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllAnswer,
  addAnswer,
  addQuestion,
  resetGiveExamState,
  whereToAddUpdate,
} from "../../../redux/slice/giveExamSlice";
import { EMPTY_STRING } from "../../../description/globel.description";
import { toast } from "react-toastify";
import { SHOW_EXAM_FOR_STUDENT } from "../../../utils/constants";
import lSSetItem from "../../../hook/lSSetItem";
import useApi from "../../../hook/useApi";
import {
  GET_EXAM_LOADING,
  SUBMITTING_EXAM_LOADING,
} from "../../../description/student/giveExam.description";
import { toastError } from "../../../utils/toastFunction";

const GiveExamContainer = () => {
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const { id, subject } = useParams();
  const [decodedSubject] = useState(atob(subject));
  const { isLoading = true } =
    useSelector((state) => state?.apiState?.[GET_EXAM_LOADING]) ?? {};
  const { isLoading: isSubmittingExma = false } =
    useSelector((state) => state?.apiState?.[SUBMITTING_EXAM_LOADING]) ?? {};
  const navigate = useNavigate();
  const [currentAnswer, setCurrentAnswer] = useState(EMPTY_STRING);
  const dispatch = useDispatch();
  const apiCaller = useApi();
  const { questions, whereToAdd, answerOfQuestion } = useSelector(
    (state) => state.giveExam
  );
  const [currentQuestion, setCurrentQuestion] = useState({});

  const handelOption = (e) => setCurrentAnswer(e.target.value);

  const handelNext = () => {
    if (currentAnswer !== EMPTY_STRING) {
      dispatch(
        addAnswer({ question: currentQuestion._id, answer: currentAnswer })
      );
      setCurrentAnswer(EMPTY_STRING);
      dispatch(whereToAddUpdate({ whereToAdd: whereToAdd + 1 }));
    } else {
      toastError("Please select answer.");
    }
  };

  const handelPrev = () => {
    // dispatch(
    //   addAnswer({ question: currentQuestion._id, answer: currentAnswer })
    // );
    dispatch(whereToAddUpdate({ whereToAdd: whereToAdd - 1 }));
  };

  const handelSubmit = async () => {
    if (currentAnswer === EMPTY_STRING)
      return toastError("Please select answer.");
    const answerObj = {
      question: currentQuestion._id,
      answer: currentAnswer,
    };
    const apiSendData = [...answerOfQuestion];
    apiSendData[questions.length - 1] = answerObj;
    const axiosConfig = {
      url: GIVE_EXAM_PAPER_URL,
      method: "post",
      data: apiSendData,
      headers: {
        "access-token": userInfo.token,
      },
      params: {
        id,
      },
    };
    const successFunction = () => navigate(SHOW_EXAM_FOR_STUDENT);
    await apiCaller({
      axiosConfig,
      loadingStatuesName: SUBMITTING_EXAM_LOADING,
      apiHasToCancel: true,
      showToast: true,
      successFunction,
    });
  };

  useEffect(() => {
    dispatch(resetGiveExamState());
    const localStorageData = lSGetItem("giveExam") ?? {};
    const getExamDetail = async () => {
      const axiosConfig = {
        url: GET_EXAM_PAPER_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      };
      const successFunction = (response) => {
        if (response.statusCode === 200) {
          dispatch(addQuestion({ questions: response.data }));
          setCurrentQuestion(response.data[0]);
          if (id === localStorageData.id) {
            dispatch(addAllAnswer({ answer: localStorageData.answer }));
            dispatch(
              whereToAddUpdate({ whereToAdd: localStorageData.whereToAdd ?? 0 })
            );
          } else {
            lSSetItem("giveExam", { id: id, answer: [] });
          }
        }
      };
      const errorFunction = () => navigate(SHOW_EXAM_FOR_STUDENT);
      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_EXAM_LOADING,
        apiHasToCancel: true,
        showToast: true,
        successFunction,
        errorFunction,
      });
    };
    getExamDetail();
  }, []);

  useEffect(() => {
    setCurrentQuestion(questions[whereToAdd]);
    setCurrentAnswer(answerOfQuestion[whereToAdd]?.answer ?? EMPTY_STRING);
  }, [whereToAdd]);

  useEffect(() => {
    const localStorageData = lSGetItem("giveExam") ?? {};
    lSSetItem("giveExam", {
      id,
      answer:
        answerOfQuestion.length === 0
          ? localStorageData?.answer
          : answerOfQuestion,
      whereToAdd: whereToAdd,
    });
  }, [answerOfQuestion, whereToAdd]);

  return {
    decodedSubject,
    isLoading,
    questions,
    whereToAdd,
    answerOfQuestion,
    currentQuestion,
    currentAnswer,
    handelOption,
    handelNext,
    handelPrev,
    totalQuestion: questions.length,
    handelSubmit,
    isSubmittingExma,
  };
};

export default GiveExamContainer;
