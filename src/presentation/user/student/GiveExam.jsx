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
    isGivingExam,
  } = GiveExamContainer();
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="give-exam-container">
        <h1 style={{ textAlign: "center" }}>
          Subject Name :- {decodedSubject}
        </h1>
        <div>Question No :- {whereToAdd + 1}</div>
        <div className="question-container">
          <div>Question : {currentQuestion?.question}</div>
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
          {whereToAdd < totalQuestion - 1 && (
            <EDLoading
              {...ATTRIBUTE_NEXT_BUTTON}
              loading={isGivingExam}
              onClick={handelNext}
            />
          )}
          {whereToAdd === totalQuestion - 1 && (
            <EDLoading
              {...ATTRIBUTE_SUBMIT_BUTTON}
              loading={isGivingExam}
              onClick={handelSubmit}
            />
          )}
          {whereToAdd !== 0 && (
            <EDLoading
              {...ATTRIBUTE_PREV_BUTTON}
              loading={isGivingExam}
              onClick={handelPrev}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GiveExam;
