import React, { Fragment, memo } from "react";
import DDFormSwitch from "./EDFormSwitch";

import DDFormError from "../input/EDFormError";
import { checkbox } from "../../description/form/ddform.description";

const ExamForm = ({
  configArray,
  handelChangeType,
  state,
  error,
  handelChangeCheckBox,
}) => {
  return (
    <>
      {configArray.map((element, index) => {
        const { type, name, wrapElement } = element;
        return (
          <Fragment key={index}>
            <div
              className={`wrapper ${type === "radio" && "wrapper-radio"}`}
              {...wrapElement}
            >
              <DDFormSwitch
                value={state?.[name]}
                handelChange={
                  type === checkbox ? handelChangeCheckBox : handelChangeType
                }
                element={element}
              />
              {type !== "radio" && <DDFormError error={error?.[name]} />}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default memo(ExamForm);
