import React from "react";
import NewPasswordContainer from "../../container/authentication/newPassword.container";
import EDForm from "../../shared/DDForm/EDForm";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  NEW_PASSWORD_FORM_HEADER,
  NEW_PASSWORD_FORM_NAME,
  NEW_PASSWORD_SUBMIT_NAME,
} from "../../description/form/newPassword.description";
import EDButton from "../../shared/button/EDButton";
import EDLoading from "../../shared/button/EDLoading";
import Loading from "../../shared/Loading";

const NewPassword = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isTokenVerifying,
    isCreatingNewPassword,
  } = NewPasswordContainer();
  if (isTokenVerifying) return <Loading />;
  return (
    <>
      <div className="container">
        <div className="style-form">
          <h1 className="form-header">{NEW_PASSWORD_FORM_HEADER}</h1>
          <EDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={NEW_PASSWORD_FORM_NAME}
          />

          <EDLoading
            onClick={handelSubmit}
            innerText={NEW_PASSWORD_SUBMIT_NAME}
            {...ATTRIBUTE_SUBMIT_BUTTON}
            loading={isCreatingNewPassword}
          />
        </div>
      </div>
    </>
  );
};

export default NewPassword;
