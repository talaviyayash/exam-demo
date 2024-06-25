import React from "react";
import ViewExamInDetailContainer from "../../../container/user/teacher/viewExamInDetail.container";
import { Radio } from "@mui/material";
import EDButton from "../../../shared/button/EDButton";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
} from "../../../description/teacher/viewExamInDetail.description";
import { TOTAL_NUMBER_OF_QUESTION } from "../../../utils/constants";
import Loading from "../../../shared/Loading";

const ViewExamInDetail = () => {
  const {
    examDetail,
    subject,
    currentIndex,
    nextButtonClickHandel,
    prevButtonClickHandel,
    isLoading,
  } = ViewExamInDetailContainer();

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="view-exam-container">
        <h1 className="header">Subject Name :- {subject}</h1>
        <div>Question No :- {currentIndex + 1}</div>
        <div>Question :- {examDetail[currentIndex]?.question}</div>
        {/* <div>Options :- </div> */}
        <div>
          {examDetail[currentIndex]?.options?.map((value, index) => {
            return (
              <div key={index}>
                {index + 1}.{" "}
                <Radio
                  checked={value === examDetail[currentIndex]?.answer}
                  disabled
                />
                <span>{value}</span>
              </div>
            );
          })}
        </div>
        <div>
          {currentIndex + 1 === TOTAL_NUMBER_OF_QUESTION || (
            <EDButton
              {...ATTRIBUTE_NEXT_BUTTON}
              onClick={nextButtonClickHandel}
            />
          )}
          {currentIndex === 0 || (
            <>
              <br />
              <br />
              <EDButton
                {...ATTRIBUTE_PREV_BUTTON}
                onClick={prevButtonClickHandel}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewExamInDetail;
