import React from "react";
import ResetPasswordContainer from "../../../container/user/profile/resetPassword.container";
import EDForm from "../../../shared/DDForm/EDForm";

import EDLoading from "../../../shared/button/EDLoading";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  RESET_PASSWORD_FORM_HEADER,
  RESET_PASSWORD_FORM_NAME,
  RESET_PASSWORD_SUBMIT_NAME,
} from "../../../description/form/resetPassword.description";

const ResetPassword = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isLoading,
  } = ResetPasswordContainer();
  return (
    <>
      <div className="container">
        <div className="style-form simple-style-form">
          <h1 className="form-header">{RESET_PASSWORD_FORM_HEADER}</h1>
          <EDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={RESET_PASSWORD_FORM_NAME}
          />

          <EDLoading
            onClick={handelSubmit}
            innerText={RESET_PASSWORD_SUBMIT_NAME}
            {...ATTRIBUTE_SUBMIT_BUTTON}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
