import React from "react";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  SGININ_FORM_HEADER,
  SGININ_FORM_NAME,
  SGININ_SUBMIT_NAME,
} from "../../description/form/signin.description";
import DDForm from "../../shared/DDForm/EDForm";
import { NavLink } from "react-router-dom";

import SignInContainer from "../../container/authentication/signin.container";
import EDLoading from "../../shared/button/EDLoading";
import { FORGET_PASSWORD_PATH } from "../../utils/constants";

const SignIn = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelSubmit,
    handelChangeCheckBox,
    configArray,
    isSigningIn,
  } = SignInContainer();

  return (
    <>
      <div className="container">
        <div className="style-form simple-style-form">
          <h1 className="form-header">{SGININ_FORM_HEADER}</h1>
          <DDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={SGININ_FORM_NAME}
          />
          <div className="text-end">
            <NavLink to={FORGET_PASSWORD_PATH} className="font-color">
              Forgot your password?
            </NavLink>
          </div>
          <EDLoading
            onClick={handelSubmit}
            {...ATTRIBUTE_SUBMIT_BUTTON}
            loading={isSigningIn}
          >
            {SGININ_SUBMIT_NAME}
          </EDLoading>
        </div>
      </div>
    </>
  );
};

export default SignIn;
