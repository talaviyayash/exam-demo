import React from "react";
import "./profile.css";
import {
  EDIT_PROFILE_FORM_HEADER,
  EDIT_PROFILE_FORM_NAME,
  EDIT_PROFILE_SUBMIT_NAME,
} from "../../../description/form/editProfile.description";
import EditProfileContainer from "../../../container/user/editProfile.container";
import EDForm from "../../../shared/DDForm/EDForm";
import EDButton from "../../../shared/button/EDButton";
import EDLoading from "../../../shared/button/EDLoading";

const EditProfile = () => {
  const {
    handelChangeType,
    state,
    validateAllField,
    error,
    handelChangeCheckBox,
    configArray,
    handelSubmit,
    isLoading,
  } = EditProfileContainer();
  return (
    <>
      <div className="container">
        <div className="style-form">
          <h1 className="form-header">{EDIT_PROFILE_FORM_HEADER}</h1>
          <EDForm
            handelChangeType={handelChangeType}
            state={state}
            validateAllField={validateAllField}
            error={error}
            handelChangeCheckBox={handelChangeCheckBox}
            configArray={configArray}
            formName={EDIT_PROFILE_FORM_NAME}
          />

          <EDLoading
            innerText={EDIT_PROFILE_SUBMIT_NAME}
            onClick={handelSubmit}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
