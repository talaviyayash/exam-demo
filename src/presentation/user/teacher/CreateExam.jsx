import React from "react";
import EDForm from "../../../shared/DDForm/EDForm";

import CreateExamContainer from "../../../container/user/teacher/createExam.container";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
  ATTRIBUTE_SUBMIT_BUTTON,
  CREATE_EXAM_FORM_NAME,
  CREATE_EXAM_HEADER_NAME,
} from "../../../description/form/createExam.description";
import EDButton from "../../../shared/EDButton";
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
  } = CreateExamContainer();
  return (
    <>
      <div className="container">
        <div className="style-form">
          <h1 className="form-header">{CREATE_EXAM_HEADER_NAME}</h1>
          <h2 className="form-header">Question No :-{whereToAdd + 1}</h2>
          <EDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={CREATE_EXAM_FORM_NAME}
          />

          {whereToAdd + 1 <= 15 && (
            <EDButton {...ATTRIBUTE_NEXT_BUTTON} onClick={handelNext} />
          )}
          {whereToAdd + 1 === 15 && <EDButton {...ATTRIBUTE_SUBMIT_BUTTON} />}
          {whereToAdd !== 0 && (
            <EDButton {...ATTRIBUTE_PREV_BUTTON} onClick={handelPrev} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateExam;
