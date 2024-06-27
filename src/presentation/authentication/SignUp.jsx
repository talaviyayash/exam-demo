import React from "react";

import {
  ATTRIBUTE_SUBMIT_BUTTON,
  SIGNUP_FORM_HEADER,
  SIGNUP_FORM_NAME,
  SIGNUP_SUBMIT_NAME,
} from "../../description/form/signup.description";
import DDForm from "../../shared/DDForm/EDForm";
import { NavLink } from "react-router-dom";
import SignUpContainer from "../../container/authentication/signup.container";
import EDLoading from "../../shared/button/EDLoading";
import { SIGN_IN_PATH } from "../../utils/constants";

const SignUp = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    handelSubmit,
    configArray,
    isSigningUp,
  } = SignUpContainer();
  return (
    <>
      <div className="container">
        <div className="style-form simple-style-form">
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
            <NavLink to={SIGN_IN_PATH} className="font-color">
              Already have account ?
            </NavLink>
          </div>
          <EDLoading
            innerText={SIGNUP_SUBMIT_NAME}
            onClick={handelSubmit}
            {...ATTRIBUTE_SUBMIT_BUTTON}
            loading={isSigningUp}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
