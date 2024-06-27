import React, { memo } from "react";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  FORGET_PASSWORD_FORM_HEADER,
  FORGET_PASSWORD_FORM_NAME,
  FORGET_PASSWORD_SUBMIT_NAME,
} from "../../description/form/forgetPassword.description";
import DDForm from "../../shared/DDForm/EDForm";
import ForgetPasswordContainer from "../../container/authentication/forgetPassword.container";
import EDLoading from "../../shared/button/EDLoading";
const ForgetPassWord = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isLoading,
  } = ForgetPasswordContainer();
  return (
    <div className="container">
      <div className="style-form simple-style-form">
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

        <EDLoading
          innerText={FORGET_PASSWORD_SUBMIT_NAME}
          onClick={handelSubmit}
          {...ATTRIBUTE_SUBMIT_BUTTON}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default memo(ForgetPassWord);
