import { useEffect, useState } from "react";
import callApi from "../../../utils/callApi";
import {
  GET_EXAM_PAPER_URL,
  GIVE_EXAM_PAPER_URL,
} from "../../../description/api.description";
import lSGetItem from "../../../hook/lSGetItem";
import { useNavigate, useParams } from "react-router-dom";
import lSClear from "../../../hook/lSClear";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
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

const GiveExamContainer = () => {
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const { id, subject } = useParams();
  const [decodedSubject] = useState(atob(subject));
  const [isLoading, setIsLoading] = useState(true);
  const [isGivingExam, setIsGivingExam] = useState(false);
  const navigate = useNavigate();
  const [currentAnswer, setCurrentAnswer] = useState(EMPTY_STRING);
  const dispatch = useDispatch();
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
      toast.error("Please select answer.");
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
      return toast.error("Please select answer.");
    setIsGivingExam(true);
    const answerObj = {
      question: currentQuestion._id,
      answer: currentAnswer,
    };
    const apiSendData = [...answerOfQuestion];
    apiSendData[questions.length - 1] = answerObj;
    const response = await callApi({
      url: GIVE_EXAM_PAPER_URL,
      method: "post",
      data: apiSendData,
      headers: {
        "access-token": userInfo.token,
      },
      params: {
        id,
      },
    });
    setIsGivingExam(false);
    if (response.statusCode === 200) {
      toast.success(response.message);
      navigate(SHOW_EXAM_FOR_STUDENT);
    } else {
      if (response.statusCode === 401) {
        lSClear();
        dispatch(logOutSuccess());
      }
      toast.error(response.message);
    }
  };

  useEffect(() => {
    dispatch(resetGiveExamState());
    const localStorageData = lSGetItem("giveExam") ?? {};
    const getExamDetail = async () => {
      setIsLoading(true);
      const response = await callApi({
        url: GET_EXAM_PAPER_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      });
      setIsLoading(false);
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
      } else {
        if (response.statusCode === 401) {
          lSClear();
          dispatch(logOutSuccess());
        } else {
          navigate(SHOW_EXAM_FOR_STUDENT);
        }
        toast.error(response.message);
      }
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
    isGivingExam,
  };
};

export default GiveExamContainer;
