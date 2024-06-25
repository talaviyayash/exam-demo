import React from "react";
import {
  ATTRIBUTE_SUBMIT_BUTTON,
  SGININ_FORM_HEADER,
  SGININ_FORM_NAME,
  SGININ_SUBMIT_NAME,
} from "../../description/form/signin.description";
import DDForm from "../../shared/DDForm/EDForm";
import EDButton from "../../shared/button/EDButton";
import { NavLink } from "react-router-dom";

import SignInContainer from "../../container/authentication/signin.container";
import EDLoading from "../../shared/button/EDLoading";

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
        <div className="style-form">
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
            <NavLink to={"/forget-password"} className="font-color">
              Forgot your password?
            </NavLink>
          </div>
          <EDLoading
            onClick={handelSubmit}
            innerText={SGININ_SUBMIT_NAME}
            {...ATTRIBUTE_SUBMIT_BUTTON}
            loading={isSigningIn}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
