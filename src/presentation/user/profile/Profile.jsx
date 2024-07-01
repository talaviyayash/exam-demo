import React, { memo } from "react";
import ProfileContainer from "../../../container/user/profile.container";
import "./profile.css";
import EDButton from "../../../shared/button/EDButton";
import { STUDENT, EMPTY_STRING } from "../../../description/globel.description";
const Profile = () => {
  const {
    userInfo,
    redirectToEditPage,
    redirectToChangePassword,
    role,
    logOut,
  } = ProfileContainer();

  return (
    <>
      <div className="profile-container">
        <div className="profile-item">
          <span>Name </span>
          <span>{userInfo.name}</span>
          {role === STUDENT ? (
            <EDButton className="EditButton" onClick={redirectToEditPage}>
              Edit
            </EDButton>
          ) : (
            EMPTY_STRING
          )}
        </div>
        <div className="profile-item">
          <span>Email </span>
          <span>{userInfo.email}</span>
        </div>
        <EDButton
          className="EditButton"
          innerText=""
          onClick={redirectToChangePassword}
        >
          Reset Password
        </EDButton>
        <EDButton className="EditButton" onClick={logOut}>
          Log Out
        </EDButton>
      </div>
    </>
  );
};

export default memo(Profile);
