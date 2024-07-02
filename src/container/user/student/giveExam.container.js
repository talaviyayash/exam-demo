import { useEffect, useState } from "react";
import {
  GET,
  GET_EXAM_PAPER_URL,
  GIVE_EXAM_PAPER_URL,
  POST,
} from "../../../description/api.description";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addAllAnswer,
  addAnswer,
  addQuestion,
  resetGiveExamState,
  whereToAddUpdate,
} from "../../../redux/slice/giveExamSlice";
import {
  ANSWER_ERROR_MSG,
  EMPTY_STRING,
} from "../../../description/globel.description";
import {
  API_STATE,
  GIVE_EXAM,
  SHOW_EXAM_FOR_STUDENT,
} from "../../../utils/constants";
import {
  GET_EXAM_LOADING,
  SUBMITTING_EXAM_LOADING,
} from "../../../description/student/giveExam.description";
import { toastError } from "../../../utils/toastFunction";
import { lSGetItem, lSSetItem } from "../../../utils/lSFunction";
import useAllHook from "../../../hook/useAllHook";

const GiveExamContainer = () => {
  const { id, subject } = useParams();
  const [decodedSubject] = useState(atob(subject));
  const { isLoading = true } =
    useSelector((state) => state?.[API_STATE]?.[GET_EXAM_LOADING]) ?? {};
  const { isLoading: isSubmittingExam = false } =
    useSelector((state) => state?.[API_STATE]?.[SUBMITTING_EXAM_LOADING]) ?? {};
  const [currentAnswer, setCurrentAnswer] = useState(EMPTY_STRING);
  const { apiCaller, navigate, dispatch } = useAllHook();

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
      toastError(ANSWER_ERROR_MSG);
    }
  };

  const handelPrev = () => {
    // dispatch(
    //   addAnswer({ question: currentQuestion._id, answer: currentAnswer })
    // );
    dispatch(whereToAddUpdate({ whereToAdd: whereToAdd - 1 }));
  };

  const handelSubmit = async () => {
    if (currentAnswer === EMPTY_STRING) return toastError(ANSWER_ERROR_MSG);
    const answerObj = {
      question: currentQuestion._id,
      answer: currentAnswer,
    };
    const apiSendData = [...answerOfQuestion];
    apiSendData[questions.length - 1] = answerObj;
    const axiosConfig = {
      url: GIVE_EXAM_PAPER_URL,
      method: POST,
      data: apiSendData,
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
    const localStorageData = lSGetItem(GIVE_EXAM) ?? {};
    const getExamDetail = async () => {
      const axiosConfig = {
        url: GET_EXAM_PAPER_URL,
        method: GET,
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
              whereToAddUpdate({
                whereToAdd: localStorageData.whereToAdd ?? 0,
              })
            );
            if (localStorageData?.answer.length > 0)
              setCurrentAnswer(localStorageData.answer[whereToAdd].answer);
          } else {
            lSSetItem(GIVE_EXAM, { id: id, answer: [] });
          }
        }
      };
      const errorFunction = () => navigate(SHOW_EXAM_FOR_STUDENT);
      await apiCaller({
        axiosConfig,
        loadingStatuesName: GET_EXAM_LOADING,
        apiHasToCancel: true,
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
    const localStorageData = lSGetItem(GIVE_EXAM) ?? {};
    lSSetItem(GIVE_EXAM, {
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
    isSubmittingExam,
  };
};

export default GiveExamContainer;
