import React from "react";
import EditExamContainer from "../../../container/user/teacher/editExam.container";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
  EDIT_EXAM_FORM_NAME,
  EDIT_EXAM_HEADER_NAME,
} from "../../../description/form/editExam.description";
import EDForm from "../../../shared/DDForm/EDForm";
import { ATTRIBUTE_SUBMIT_BUTTON } from "../../../description/form/createExam.description";
import EDButton from "../../../shared/EDButton";
import { TOTAL_NUMBER_OF_QUESTION } from "../../../utils/constants";

const EditExam = () => {
  const {
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
  } = EditExamContainer();
  return (
    <>
      <>
        <div className="container">
          <div className="style-form">
            <h1 className="form-header">{EDIT_EXAM_HEADER_NAME}</h1>
            <h2 className="form-header">Question No :-{whereToAdd + 1}</h2>
            <EDForm
              handelChangeType={handelChangeType}
              state={state}
              validateAllField={validateAllField}
              error={error}
              handelChangeCheckBox={handelChangeCheckBox}
              configArray={configArray}
              formName={EDIT_EXAM_FORM_NAME}
            />
            {whereToAdd + 1 < TOTAL_NUMBER_OF_QUESTION && (
              <EDButton {...ATTRIBUTE_NEXT_BUTTON} onClick={handelNext} />
            )}

            <EDButton {...ATTRIBUTE_SUBMIT_BUTTON} onClick={handelSubmit} />

            {whereToAdd !== 0 && (
              <EDButton {...ATTRIBUTE_PREV_BUTTON} onClick={handelPrev} />
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default EditExam;
