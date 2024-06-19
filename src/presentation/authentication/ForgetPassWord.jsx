import React, { memo } from "react";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  FORGET_PASSWORD_FORM_HEADER,
  FORGET_PASSWORD_FORM_NAME,
  FORGET_PASSWORD_SUBMIT_NAME,
} from "../../description/form/forgetPassword.description";
import DDForm from "../../shared/DDForm/EDForm";
import EDButton from "../../shared/EDButton";
import ForgetPasswordContainer from "../../container/authentication/forgetPassword.container";
const ForgetPassWord = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
  } = ForgetPasswordContainer();
  return (
    <div className="container">
      <div className="style-form">
        <h1 className="form-header">{FORGET_PASSWORD_FORM_HEADER}</h1>
        <DDForm
          handelChangeType={handelChangeType}
          state={state}
          validateAllField={validateAllField}
          error={error}
          handelChangeCheckBox={handelChangeCheckBox}
          configArray={configArray}
          formName={FORGET_PASSWORD_FORM_NAME}
        />

        <EDButton
          innerText={FORGET_PASSWORD_SUBMIT_NAME}
          onClick={handelSubmit}
          {...ATTRIBUTE_SUBMIT_BUTTON}
        />
      </div>
    </div>
  );
};

export default memo(ForgetPassWord);
