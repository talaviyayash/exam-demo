import DDFormContainer from "../../form/ddform.container";
import {
  CREATE_EXAM_FORM_NAME,
  CREATE_EXAM_SUBMIT_STATE,
  createExamForm as configArray,
  totalOption,
} from "../../../description/form/createExam.description";
import { useSelector } from "react-redux";
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
  ANSWER_ERROR_MSG,
  EMPTY_STRING,
  EXAM_FORM_STATE,
  EXAM_STATE,
  OPTION_CUSTOM_ERROR_MSG,
  QUESTION_CUSTOM_ERROR_MSG,
} from "../../../description/globel.description";
import { CREATE_EXAM_URL, POST } from "../../../description/api.description";
import { API_STATE, PROFILE_PATH } from "../../../utils/constants";
import { useEffect } from "react";
import { toastError } from "../../../utils/toastFunction";
import { lSGetItem, lSRemoveItem, lSSetItem } from "../../../utils/lSFunction";
import useAllHook from "../../../hook/useAllHook";

const CreateExamContainer = () => {
  const { apiCaller, navigate, dispatch } = useAllHook();
  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;
  const { isLoading } =
    useSelector((state) => state?.[API_STATE]?.[CREATE_EXAM_SUBMIT_STATE]) ??
    {};

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

    return questionIsSame ? QUESTION_CUSTOM_ERROR_MSG : EMPTY_STRING;
  };

  const validateAllOption = (allValue, name) => {
    const allOptionValue = [];
    for (var i = 1; i <= totalOption; i++) {
      allOptionValue.push(allValue?.[`options${i}`]);
    }

    const optionErrorMsg = OPTION_CUSTOM_ERROR_MSG;

    const isAnySame = (compareOptionsValue) =>
      allOptionValue.filter((val) => {
        return val === compareOptionsValue;
      }).length > 1
        ? optionErrorMsg
        : EMPTY_STRING;

    const optionError = allOptionValue.reduce((total, val, index) => {
      return { ...total, [`options${index + 1}`]: val ? isAnySame(val) : "" };
    }, {});

    dispatch(
      addError({
        name: CREATE_EXAM_FORM_NAME,
        error: optionError,
      })
    );

    return optionError[name];
  };

  const validateAnswer = (allValue) => {
    if (!allValue.answer) {
      toastError(ANSWER_ERROR_MSG);
      return ANSWER_ERROR_MSG;
    }
    return EMPTY_STRING;
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
      // answer: validateAnswer,
    },
  });

  const handelNext = () => {
    const allValidate = validateAllField();
    if (allValidate && whereToAdd + 1 <= 14) {
      if (!state.answer) {
        validateAnswer(state);
        return null;
      }
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
      if (!state.answer) {
        validateAnswer(state);
        return null;
      }
      const { subject, ...newQuestion } = state;
      const allNewQuestion = [...allQuestion, newQuestion];
      let apiFormateData = allNewQuestion.reduce(
        (formateQuestion, element) => {
          const { note, answer, question, ...options } = element;
          if (note?.trim()) formateQuestion.notes.push(note);
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
      const axiosConfig = {
        url: CREATE_EXAM_URL,
        method: POST,
        data: apiFormateData,
      };
      const successFunction = () => {
        navigate(PROFILE_PATH);
        lSRemoveItem(EXAM_FORM_STATE);
        lSRemoveItem(EXAM_STATE);
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: CREATE_EXAM_SUBMIT_STATE,
        showToast: true,
        apiHasToCancel: true,
        successFunction,
      });
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
    isLoading,
  };
};

export default CreateExamContainer;
