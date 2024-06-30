import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DDFormContainer from "../../form/ddform.container";
import {
  EDIT_EXAM_FORM_NAME,
  LOADING_EXAM_DATA,
  UPDATE_EXAM_STATE,
  editExamForm as configArray,
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
import { toast } from "react-toastify";
import {
  addAllState,
  addQuestion,
  whereToAddUpdate,
} from "../../../redux/slice/examSlice";
import { PROFILE_PATH } from "../../../utils/constants";
import { totalOption } from "../../../description/form/createExam.description";
import useApi from "../../../hook/useApi";
import { toastError } from "../../../utils/toastFunction";

const EditExamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, subject } = useParams();
  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;
  const apiCaller = useApi();
  const userInfo = useSelector((state) => state.userInformation.userInfo);
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
      return { ...total, [optionName]: isAnySame(val) };
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
      };
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
        return toastError("Please at least add only one note");
      }
      apiFormateData = { subjectName: state.subject, ...apiFormateData };
      const axiosConfig = {
        url: EDIT_EXAM_URL,
        method: "put",
        data: apiFormateData,
        headers: {
          "access-token": userInfo.token,
        },
        params: {
          id,
        },
      };
      const successFunction = () => navigate(PROFILE_PATH);
      await apiCaller({
        axiosConfig,
        loadingStatuesName: LOADING_EXAM_DATA,
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
