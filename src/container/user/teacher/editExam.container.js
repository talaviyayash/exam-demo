import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DDFormContainer from "../../form/ddform.container";
import {
  EDIT_EXAM_FORM_NAME,
  LOADING_EXAM_DATA,
  UPDATE_EXAM_STATE,
} from "../../../description/form/editExam.description";
import { useEffect } from "react";
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
import {
  addAllState,
  addQuestion,
  whereToAddUpdate,
} from "../../../redux/slice/examSlice";
import { VIEW_EXAM_PATH } from "../../../utils/constants";
import {
  createExamForm as configArray,
  totalOption,
} from "../../../description/form/createExam.description";
import { toastError } from "../../../utils/toastFunction";
import useAllHook from "../../../hook/useAllHook";
import { lSGetItem, lSRemoveItem } from "../../../utils/lSFunction";

const EditExamContainer = () => {
  const { apiCaller, navigate, dispatch } = useAllHook();
  const { id, subject } = useParams();
  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;
  const { isLoading } =
    useSelector((state) => state?.apiState?.[LOADING_EXAM_DATA]) ?? {};
  const { isLoading: isSubmitting } =
    useSelector((state) => state?.apiState?.[UPDATE_EXAM_STATE]) ?? {};

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
      return { ...total, [optionName]: val ? isAnySame(val) : "" };
    }, {});

    dispatch(
      addError({
        name: EDIT_EXAM_FORM_NAME,
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
  const validateAnswer = (allValue) => {
    const { answer } = allValue;
    if (!answer) {
      toastError("Please Select Answer.");
      return "Please Select Answer.";
    }
    return EMPTY_STRING;
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
      ...allOptionValidationInObj(),
    },
  });

  useEffect(() => {
    const getExamDetail = async () => {
      const successFunction = (response) => {
        const { questions } = response.data;
        let { _id, notes } = lSGetItem("notes") ?? [];
        if (id !== _id) notes = [];
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
            note: notes[index] ?? "",
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
      };
      const axiosConfig = {
        url: EDIT_GET_EXAM_URL,
        method: "get",
        params: {
          id,
        },
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: LOADING_EXAM_DATA,
        apiHasToCancel: true,
        successFunction,
      });
    };
    getExamDetail();
  }, []);

  const handelNext = () => {
    const allValidate = validateAllField();
    if (allValidate && whereToAdd + 1 <= 14) {
      if (!state.answer) {
        validateAnswer(state);
        return null;
      }
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
      if (!state.answer) {
        validateAnswer(state);
        return null;
      }
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
        return toastError("Please at least add one note");
      }
      apiFormateData = { subjectName: state.subject, ...apiFormateData };
      const axiosConfig = {
        url: EDIT_EXAM_URL,
        method: "put",
        data: apiFormateData,
        params: {
          id,
        },
      };
      const successFunction = () => {
        navigate(VIEW_EXAM_PATH);
        lSRemoveItem("notes");
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: UPDATE_EXAM_STATE,
        apiHasToCancel: true,
        successFunction,
        showToast: true,
      });
    }
  };

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
    isLoading,
    isSubmitting,
  };
};

export default EditExamContainer;
