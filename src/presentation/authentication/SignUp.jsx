import React from "react";

import {
  ATTRIBUTE_SUBMIT_BUTTON,
  SIGNUP_FORM_HEADER,
  SIGNUP_FORM_NAME,
  SIGNUP_SUBMIT_NAME,
} from "../../description/form/signup.description";
import DDForm from "../../shared/DDForm/EDForm";
import EDButton from "../../shared/EDButton";
import { NavLink } from "react-router-dom";
import SignUpContainer from "../../container/authentication/signup.container";

const SignUp = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
  } = SignUpContainer();
  return (
    <>
      <div className="container">
        <div className="style-form">
          <h1 className="form-header">{SIGNUP_FORM_HEADER}</h1>
          <DDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={SIGNUP_FORM_NAME}
          />
          <div className="text-end">
            <NavLink to={"/signin"} className="font-color">
              Already have account ?
            </NavLink>
          </div>
          <EDButton
            innerText={SIGNUP_SUBMIT_NAME}
            onClick={handelSubmit}
            {...ATTRIBUTE_SUBMIT_BUTTON}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
