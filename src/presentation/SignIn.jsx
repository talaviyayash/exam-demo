import React from "react";

import {
  ATTRIBUTE_SUBMIT_BUTTON,
  SGININ_FORM_HEADER,
  SGININ_FORM_NAME,
  SGININ_SUBMIT_NAME,
  signInForm,
} from "../description/form/signin.description";
import DDForm from "../shared/DDForm/EDForm";
import DDFormContainer from "../container/form/ddform.container";
import EDButton from "../shared/EDButton";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
  } = DDFormContainer({
    configArray: signInForm,
    formName: SGININ_FORM_NAME,
  });
  return (
    <>
      <div className="container">
        <div className="style-form">
          <h1 className="form-header">{SGININ_FORM_HEADER}</h1>
          <DDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={signInForm}
            formName={SGININ_FORM_NAME}
          />
          <div className="text-end">
            <NavLink to={"/forget-password"} className="font-color">
              Forgot your password?
            </NavLink>
          </div>

          <EDButton
            onClick={validateAllField}
            innerText={SGININ_SUBMIT_NAME}
            {...ATTRIBUTE_SUBMIT_BUTTON}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
