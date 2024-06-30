import React from "react";
import GiveExamContainer from "../../../container/user/student/giveExam.container";
import Loading from "../../../shared/Loading";
import GiveExamRadioButton from "../../../shared/exam/GiveaExamRadioButton";
import EDLoading from "../../../shared/button/EDLoading";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
  ATTRIBUTE_SUBMIT_BUTTON,
} from "../../../description/student/giveExam.description";

const GiveExam = () => {
  const {
    decodedSubject,
    isLoading,
    whereToAdd,
    currentQuestion,
    currentAnswer,
    handelOption,
    handelNext,
    handelPrev,
    handelSubmit,
    totalQuestion,
    isSubmittingExma,
  } = GiveExamContainer();
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="give-exam-container">
        <h1 style={{ textAlign: "center" }}>
          Subject Name :- {decodedSubject}
        </h1>
        <div className="giveExam-question-name">
          Question : {currentQuestion?.question}
        </div>
        <div className="question-container">
          <div> No :- {whereToAdd + 1}</div>
          {currentQuestion?.options.map((value, index) => {
            return (
              <GiveExamRadioButton
                value={currentAnswer}
                key={index}
                attributes={{ value, labelname: value }}
                onChange={handelOption}
              />
            );
          })}
        </div>
        <div className="give-exam-button-container">
          {whereToAdd !== 0 && (
            <EDLoading
              {...ATTRIBUTE_PREV_BUTTON}
              disabled={isSubmittingExma}
              onClick={handelPrev}
            />
          )}
          {whereToAdd === totalQuestion - 1 && (
            <EDLoading
              {...ATTRIBUTE_SUBMIT_BUTTON}
              loading={isSubmittingExma}
              onClick={handelSubmit}
            />
          )}
          {whereToAdd < totalQuestion - 1 && (
            <EDLoading
              {...ATTRIBUTE_NEXT_BUTTON}
              loading={isSubmittingExma}
              onClick={handelNext}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GiveExam;
