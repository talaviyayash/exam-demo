import DDFormContainer from "../../form/ddform.container";
import {
  CREATE_EXAM_FORM_NAME,
  createExamForm as configArray,
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
import axios from "../../../utils/axios";
import { CREATE_EXAM_URL } from "../../../description/api.description";
import { toast } from "react-toastify";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../description/routing.description";
import { useEffect } from "react";
import SetItem from "../../../hook/SetItem";
import GetItem from "../../../hook/GetItem";

const CreateExamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const examState = useSelector((state) => state.exam);
  const { questions: allQuestion, whereToAdd, subjectName } = examState;

  const userInfo = useSelector((state) => state?.userInformation?.userInfo);

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
        name: CREATE_EXAM_FORM_NAME,
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
      options1: validateAllOption,
      options2: validateAllOption,
      options3: validateAllOption,
      options4: validateAllOption,
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
          if (note) {
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
      const response = await axios({
        url: CREATE_EXAM_URL,
        method: "post",
        data: apiFormateData,
        headers: {
          "access-token": userInfo.token,
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

  useEffect(() => {
    const localStorageSate = GetItem(EXAM_STATE);
    const localStorageFormSate = GetItem(EXAM_FORM_STATE);
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
    SetItem(EXAM_STATE, examState);
  }, [allQuestion, whereToAdd, subjectName]);
  useEffect(() => {
    SetItem(EXAM_FORM_STATE, state);
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
  };
};

export default CreateExamContainer;
