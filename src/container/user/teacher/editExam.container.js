import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DDFormContainer from "../../form/ddform.container";
import {
  EDIT_EXAM_FORM_NAME,
  editExamForm as configArray,
} from "../../../description/form/editExam.description";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { EMPTY_STRING } from "../../../description/globel.description";
import {
  addError,
  addValue,
  clearError,
  clearForm,
} from "../../../redux/slice/formSlice";
import {
  EDIT_EXAM_URL,
  EDIT_GET_EXAM_URL,
} from "../../../description/api.description";
import lSGetItem from "../../../hook/lSGetItem";
import { toast } from "react-toastify";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import {
  addAllState,
  addQuestion,
  whereToAddUpdate,
} from "../../../redux/slice/examSlice";
import { PROFILE_PATH, VIEW_EXAM_PATH } from "../../../utils/constants";

const EditExamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, subject } = useParams();
  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;

  const userInfo = lSGetItem("userInfo");

  const sameQuestionValidation = (allValue) => {
    const { question: currentQuestion } = allValue;
    let indexOfArray = [];
    const filterQuestion = allQuestion.filter((value, index) => {
      const questionIsSame = value.question === currentQuestion;
      if (questionIsSame) {
        indexOfArray.push(index);
      }
      return questionIsSame;
    });
    const questionIsSame =
      (whereToAdd === allQuestion.length && filterQuestion.length > 0) ||
      (indexOfArray.includes(whereToAdd) && filterQuestion.length > 1) ||
      (!indexOfArray.includes(whereToAdd) && filterQuestion.length > 0);

    if (questionIsSame) {
      return "Question cannot be same.";
    }
    return EMPTY_STRING;
  };

  const validateAllOption = (allValue, name) => {
    const options1 = allValue.options1;
    const options2 = allValue.options2;
    const options3 = allValue.options3;
    const options4 = allValue.options4;

    const optionError = {
      options1: "",
      options2: "",
      options3: "",
      options4: "",
    };

    const forOption1 =
      options1 === options2 || options1 === options3 || options1 === options4;

    const forOption2 =
      options2 === options1 || options2 === options3 || options2 === options4;

    const forOption3 =
      options3 === options2 || options3 === options1 || options3 === options4;

    const forOption4 =
      options4 === options2 || options4 === options1 || options4 === options3;

    if (forOption1) {
      optionError.options1 = "All options must be different";
    }

    if (forOption2) {
      optionError.options2 = "All options must be different";
    }

    if (forOption3) {
      optionError.options3 = "All options must be different";
    }

    if (forOption4) {
      optionError.options4 = "All options must be different";
    }

    dispatch(
      addError({
        name: EDIT_EXAM_FORM_NAME,
        error: optionError,
      })
    );
    if (
      (name === "options1" && forOption1) ||
      (name === "options2" && forOption2) ||
      (name === "options3" && forOption3) ||
      (name === "options4" && forOption4)
    ) {
      return "All options must be different";
    }
  };

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
        console.log(response.data);
        const { questions } = response.data;
        const formatArray = questions.map((value, index) => {
          const { options, answer } = value;
          let answerForOption;
          const formatOption = options.reduce((obj, element, index) => {
            const optionKey = `options${index + 1}`;
            if (answer === element) {
              answerForOption = optionKey;
            }
            return {
              ...obj,
              [optionKey]: element,
            };
          }, {});
          return {
            question: value.question,
            answer: answerForOption,
            ...formatOption,
          };
        });

        const objectToDispatch = {
          questions: formatArray,
          subjectName: subject,
          whereToAdd: 0,
        };
        dispatch(addAllState(objectToDispatch));
        const formValue = {
          subject: subject,
          ...formatArray[0],
        };
        dispatch(addValue({ value: formValue, name: EDIT_EXAM_FORM_NAME }));
      } else if (response.statusCode === 404) {
        toast.error(response.message);
        dispatch(logOutSuccess());
      } else {
        toast.info(response.message);
        navigate(VIEW_EXAM_PATH);
      }
    };
    getExamDetail();
  }, []);

  const handelNext = () => {
    const allValidate = validateAllField();
    if (allValidate && whereToAdd + 1 <= 14) {
      dispatch(addQuestion({ question: state }));
      if (allQuestion[whereToAdd + 1]) {
        dispatch(clearError({ name: EDIT_EXAM_FORM_NAME }));
        dispatch(
          addValue({
            name: EDIT_EXAM_FORM_NAME,
            value: { ...allQuestion[whereToAdd + 1] },
          })
        );
      } else {
        dispatch(
          clearForm({
            name: EDIT_EXAM_FORM_NAME,
            value: { subject: state.subject },
          })
        );
      }
    }
  };

  const handelPrev = () => {
    if (whereToAdd > 0) {
      dispatch(
        addValue({
          name: EDIT_EXAM_FORM_NAME,
          value: { ...allQuestion[whereToAdd - 1], subject: subjectName },
        })
      );
      dispatch(
        clearError({
          name: EDIT_EXAM_FORM_NAME,
        })
      );
      dispatch(whereToAddUpdate({ whereToAdd: whereToAdd - 1 }));
    }
  };

  const handelSubmit = async () => {
    const allValidate = validateAllField();
    if (allValidate) {
      const { subject, ...newQuestion } = state;
      const allNewQuestion = allQuestion.map((value, index) => {
        return index === whereToAdd ? newQuestion : value;
      });
      let apiFormateData = allNewQuestion.reduce(
        (formateQuestion, element) => {
          const { note, answer, question, ...options } = element;
          if (note?.trim()) {
            formateQuestion.notes.push(note);
          }
          const keyOfQuestion = Object.keys(options).sort();
          const allOption = keyOfQuestion.map((value) => {
            return options[value];
          });
          const questionsArray = {
            question: question,
            answer: options[answer],
            options: allOption,
          };
          formateQuestion.questions.push(questionsArray);
          return formateQuestion;
        },
        {
          questions: [],
          notes: [],
        }
      );
      if (apiFormateData.notes.length === 0) {
        return toast.error("Please at least add only one note");
      }
      apiFormateData = { subjectName: state.subject, ...apiFormateData };
      console.log(apiFormateData);
      const response = await axios({
        url: EDIT_EXAM_URL,
        method: "put",
        data: apiFormateData,
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate(PROFILE_PATH);
      } else if (response.statusCode === 401) {
        toast.error(response.message);
        dispatch(logOutSuccess());
      }
    }
  };

  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName: EDIT_EXAM_FORM_NAME,
    customValidation: {
      question: sameQuestionValidation,
      options1: validateAllOption,
      options2: validateAllOption,
      options3: validateAllOption,
      options4: validateAllOption,
    },
  });
  return {
    configArray,
    whereToAdd,
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelNext,
    handelPrev,
    handelSubmit,
  };
};

export default EditExamContainer;
