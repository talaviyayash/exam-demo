import React from "react";
import ViewExamInDetailContainer from "../../../container/user/teacher/viewExamInDetail.container";
import { Radio } from "@mui/material";
import EDButton from "../../../shared/EDButton";
import {
  ATTRIBUTE_NEXT_BUTTON,
  ATTRIBUTE_PREV_BUTTON,
} from "../../../description/teacher/viewExamInDetail.description";
import { TOTAL_NUMBER_OF_QUESTION } from "../../../utils/constants";

const ViewExamInDetail = () => {
  const {
    examDetail,
    id,
    subject,
    currentIndex,
    nextButtonClickHandel,
    prevButtonClickHandel,
  } = ViewExamInDetailContainer();
  return (
    <>
      <div className="view-exam-container">
        <h1 className="header">{subject}</h1>
        <div>{examDetail[currentIndex]?.question}</div>
        <div>
          {examDetail[currentIndex]?.options?.map((value, index) => {
            return (
              <div key={index}>
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
          {currentIndex === 0 || (
            <EDButton
              {...ATTRIBUTE_PREV_BUTTON}
              onClick={prevButtonClickHandel}
            />
          )}
          <br />
          <br />
          {currentIndex + 1 === TOTAL_NUMBER_OF_QUESTION || (
            <EDButton
              {...ATTRIBUTE_NEXT_BUTTON}
              onClick={nextButtonClickHandel}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewExamInDetail;
