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
import EDButton from "../../../shared/button/EDButton";
import { TOTAL_NUMBER_OF_QUESTION } from "../../../utils/constants";
import Loading from "../../../shared/Loading";
import EDLoading from "../../../shared/button/EDLoading";

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
    isLoading,
    isSubmitting,
  } = EditExamContainer();
  if (isLoading) return <Loading />;
  return (
    <>
      <>
        <div className="container">
          <h1 className="form-header">{EDIT_EXAM_HEADER_NAME}</h1>
          <h2 className="form-header">Question No :-{whereToAdd + 1}</h2>
          <div className="exam-form">
            <EDForm
              handelChangeType={handelChangeType}
              state={state}
              validateAllField={validateAllField}
              error={error}
              handelChangeCheckBox={handelChangeCheckBox}
              configArray={configArray}
              formName={EDIT_EXAM_FORM_NAME}
            />
          </div>
          <div className="btn-container">
            <EDButton
              {...ATTRIBUTE_PREV_BUTTON}
              onClick={handelPrev}
              disabled={isSubmitting || whereToAdd === 0}
            />

            <EDLoading
              {...ATTRIBUTE_SUBMIT_BUTTON}
              onClick={handelSubmit}
              loading={isSubmitting}
            />

            <EDButton
              {...ATTRIBUTE_NEXT_BUTTON}
              onClick={handelNext}
              disabled={
                isSubmitting || !(whereToAdd + 1 < TOTAL_NUMBER_OF_QUESTION)
              }
            />
          </div>
        </div>
      </>
    </>
  );
};

export default EditExam;
