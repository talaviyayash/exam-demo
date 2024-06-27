import DDFormContainer from "../../form/ddform.container";
import {
  CREATE_EXAM_FORM_NAME,
  createExamForm as configArray,
  totalOption,
} from "../../../description/form/createExam.description";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllState,
  addQuestion,
  whereToAddUpdate,
} from "../../../redux/slice/examSlice";
import {
  addError,
  addValue,
  clearError,
  clearForm,
} from "../../../redux/slice/formSlice";
import {
  EMPTY_STRING,
  EXAM_FORM_STATE,
  EXAM_STATE,
} from "../../../description/globel.description";
import callApi from "../../../utils/callApi";
import { CREATE_EXAM_URL } from "../../../description/api.description";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../utils/constants";
import { useEffect, useState } from "react";
import lSSetItem from "../../../hook/lSSetItem";
import lSGetItem from "../../../hook/lSGetItem";
import lSRemoveItem from "../../../hook/lSRemoveItem";
import lSClear from "../../../hook/lSClear";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";

const CreateExamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;

  const userInfo = useSelector((state) => state.userInformation.userInfo);

  const sameQuestionValidation = (allValue) => {
    const { question: currentQuestion } = allValue;
    let indexOfArray = [];

    const filterQuestion = allQuestion.filter((value, index) => {
      const questionIsSame = value.question === currentQuestion;
      if (questionIsSame) indexOfArray.push(index);
      return questionIsSame;
    });

    const questionIsSame =
      (whereToAdd === allQuestion.length && filterQuestion.length > 0) ||
      (indexOfArray.includes(whereToAdd) && filterQuestion.length > 1) ||
      (!indexOfArray.includes(whereToAdd) && filterQuestion.length > 0);

    return questionIsSame ? "Question cannot be same." : EMPTY_STRING;
  };

  const validateAllOption = (allValue, name) => {
    const allOptionValue = [];
    for (var i = 1; i <= totalOption; i++) {
      allOptionValue.push(allValue?.[`options${i}`]);
    }

    const optionErrorMsg = "All options must be different";

    const isAnySame = (compareOptionsValue) =>
      allOptionValue.filter((val) => {
        return val === compareOptionsValue;
      }).length > 1
        ? optionErrorMsg
        : EMPTY_STRING;

    const optionError = allOptionValue.reduce((total, val, index) => {
      const optionName = `options${index + 1}`;
      return { ...total, [optionName]: isAnySame(val) };
    }, {});

    dispatch(
      addError({
        name: CREATE_EXAM_FORM_NAME,
        error: optionError,
      })
    );

    return optionError[name];
  };

  const allOptionValidationInObj = () => {
    const validationObj = {};
    for (var i = 1; i <= totalOption; i++) {
      validationObj[`options${i}`] = validateAllOption;
    }
    return validationObj;
  };

  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray,
    formName: CREATE_EXAM_FORM_NAME,
    customValidation: {
      question: sameQuestionValidation,
      ...allOptionValidationInObj(),
    },
  });

  const handelNext = () => {
    const allValidate = validateAllField();
    if (allValidate && whereToAdd + 1 <= 14) {
      dispatch(addQuestion({ question: state }));
      if (allQuestion[whereToAdd + 1]) {
        dispatch(clearError({ name: CREATE_EXAM_FORM_NAME }));
        dispatch(
          addValue({
            name: CREATE_EXAM_FORM_NAME,
            value: { ...allQuestion[whereToAdd + 1] },
          })
        );
      } else {
        dispatch(
          clearForm({
            name: CREATE_EXAM_FORM_NAME,
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
          name: CREATE_EXAM_FORM_NAME,
          value: { ...allQuestion[whereToAdd - 1], subject: subjectName },
        })
      );
      dispatch(
        clearError({
          name: CREATE_EXAM_FORM_NAME,
        })
      );
      dispatch(whereToAddUpdate({ whereToAdd: whereToAdd - 1 }));
    }
  };

  const handelSubmit = async () => {
    const allValidate = validateAllField();
    if (allValidate) {
      const { subject, ...newQuestion } = state;
      const allNewQuestion = [...allQuestion, newQuestion];
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
      apiFormateData = { subjectName: state.subject, ...apiFormateData };
      setIsSubmitting(true);
      const response = await callApi({
        url: CREATE_EXAM_URL,
        method: "post",
        data: apiFormateData,
        headers: {
          "access-token": userInfo.token,
        },
      });
      setIsSubmitting(false);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate(PROFILE_PATH);
        lSRemoveItem("examFormState");
        lSRemoveItem("examState");
      } else {
        if (response.statusCode === 401) {
          lSClear();
          dispatch(logOutSuccess());
        }
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    const localStorageSate = lSGetItem(EXAM_STATE);
    const localStorageFormSate = lSGetItem(EXAM_FORM_STATE);
    if (localStorageSate) {
      dispatch(addAllState(localStorageSate));
      // dispatch(
      //   addValue({
      //     value: {
      //       subject: localStorageSate.subjectName,
      //       ...localStorageSate.questions[localStorageSate.whereToAdd],
      //     },
      //     name: CREATE_EXAM_FORM_NAME,
      //   })
      // );
      dispatch(
        addValue({
          value: localStorageFormSate,
          name: CREATE_EXAM_FORM_NAME,
        })
      );
    }
  }, []);

  useEffect(() => {
    lSSetItem(EXAM_STATE, examState);
  }, [allQuestion, whereToAdd, subjectName]);

  useEffect(() => {
    lSSetItem(EXAM_FORM_STATE, state);
  }, [state]);

  return {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    configArray,
    handelNext,
    allQuestion,
    handelPrev,
    whereToAdd,
    handelSubmit,
    isSubmitting,
  };
};

export default CreateExamContainer;
