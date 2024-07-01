import React from "react";
import ExamForm from "../../../shared/DDForm/ExamForm";

import CreateExamContainer from "../../../container/user/teacher/createExam.container";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
  ATTRIBUTE_SUBMIT_BUTTON,
  CREATE_EXAM_FORM_NAME,
  CREATE_EXAM_HEADER_NAME,
} from "../../../description/form/createExam.description";
import EDButton from "../../../shared/button/EDButton";
import { TOTAL_NUMBER_OF_QUESTION } from "../../../utils/constants";
import EDLoading from "../../../shared/button/EDLoading";
const CreateExam = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    configArray,
    handelNext,
    handelPrev,
    whereToAdd,
    handelSubmit,
    isLoading,
  } = CreateExamContainer();
  return (
    <>
      <div className="container">
        <h1 className="form-header">{CREATE_EXAM_HEADER_NAME}</h1>
        <h2 className="form-header">Question No :-{whereToAdd + 1}</h2>
        <div className="exam-form">
          <ExamForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={CREATE_EXAM_FORM_NAME}
          />
        </div>
        {whereToAdd !== 0 && (
          <EDButton
            {...ATTRIBUTE_PREV_BUTTON}
            onClick={handelPrev}
            disabled={isLoading}
          />
        )}
        {whereToAdd + 1 === TOTAL_NUMBER_OF_QUESTION && (
          <EDLoading
            {...ATTRIBUTE_SUBMIT_BUTTON}
            onClick={handelSubmit}
            loading={isLoading}
          />
        )}
        {whereToAdd + 1 < TOTAL_NUMBER_OF_QUESTION && (
          <EDButton
            {...ATTRIBUTE_NEXT_BUTTON}
            onClick={handelNext}
            disabled={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default CreateExam;
