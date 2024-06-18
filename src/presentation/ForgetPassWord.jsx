import React from "react";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  FORGET_PASSWORD_FORM_HEADER,
  FORGET_PASSWORD_FORM_NAME,
  FORGET_PASSWORD_SUBMIT_NAME,
  forgetPasswordForm,
} from "../description/form/forgetPassword.description";
import DDForm from "../shared/DDForm/EDForm";
import DDFormContainer from "../container/form/ddform.container";
import EDButton from "../shared/EDButton";
import { NavLink } from "react-router-dom";
const ForgetPassWord = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray: forgetPasswordForm,
    formName: FORGET_PASSWORD_FORM_NAME,
  });
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
          configArray={forgetPasswordForm}
          formName={FORGET_PASSWORD_FORM_NAME}
        />

        <EDButton
          innerText={FORGET_PASSWORD_SUBMIT_NAME}
          onChange={() => validateAllField()}
          {...ATTRIBUTE_SUBMIT_BUTTON}
        />
      </div>
    </div>
  );
};

export default ForgetPassWord;
