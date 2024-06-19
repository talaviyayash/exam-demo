import React, { memo } from "react";
import ProfileContainer from "../../../container/user/profile.container";
import "./profile.css";
import EDButton from "../../../shared/EDButton";
const Profile = () => {
  const { userInfo, redirectToEditPage } = ProfileContainer();

  return (
    <>
      <div className="profile-container">
        <div className="profile-item">
          <span>Name </span>
          <span>{userInfo.name}</span>
          <EDButton
            className="EditButton"
            innerText="Edit"
            onClick={redirectToEditPage}
          ></EDButton>
        </div>
        <div className="profile-item">
          <span>Email </span>
          <span>{userInfo.email}</span>
        </div>
      </div>
    </>
  );
};

export default memo(Profile);
