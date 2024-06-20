import DDFormContainer from "../../form/ddform.container";
import {
  CREATE_EXAM_FORM_NAME,
  createExamForm as configArray,
} from "../../../description/form/createExam.description";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, whereToAddUpdate } from "../../../redux/slice/examSlice";
import {
  addError,
  addValue,
  clearError,
  clearForm,
} from "../../../redux/slice/formSlice";
import { EMPTY_STRING } from "../../../description/globel.description";

const CreateExamContainer = () => {
  const dispatch = useDispatch();
  const { questions: allQuestion, whereToAdd } = useSelector(
    (state) => state.exam
  );
  const allValue = useSelector(
    (state) => state.form.form?.[CREATE_EXAM_FORM_NAME]?.value
  );

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
    if (validateAllField() && whereToAdd + 1 <= 14) {
      dispatch(addQuestion({ question: state }));
      if (allQuestion[whereToAdd + 1]) {
        dispatch(clearError({ name: CREATE_EXAM_FORM_NAME }));
        dispatch(
          addValue({
            name: CREATE_EXAM_FORM_NAME,
            value: allQuestion[whereToAdd + 1],
          })
        );
      } else {
        dispatch(clearForm({ name: CREATE_EXAM_FORM_NAME }));
      }
    }
  };

  const handelPrev = () => {
    if (whereToAdd > 0) {
      console.log(allQuestion[whereToAdd - 1]);
      dispatch(
        addValue({
          name: CREATE_EXAM_FORM_NAME,
          value: allQuestion[whereToAdd - 1],
        })
      );
      dispatch(clearError({ name: CREATE_EXAM_FORM_NAME }));
      dispatch(whereToAddUpdate({ whereToAdd: whereToAdd - 1 }));
    }
  };

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
  };
};

export default CreateExamContainer;
