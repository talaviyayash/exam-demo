import { nameRegex, noConsecutiveSpaces } from "../../utils/regex";

export const EDIT_PROFILE_FORM_NAME = "EditProfile";

export const EDIT_PROFILE_FORM_HEADER = "Edit Profile";

export const EDIT_PROFILE_SUBMIT_NAME = "Update Profile";

export const SUBMIT_PROFILE_LOADING = "editProfile";

export const PROFILE_UPDATE_MSG = "Profile Updated Successfully.";

export const nameElement = {
  name: "name",
  type: "text",
  required: {
    isRequired: true,
    defaultMsg: "Please enter Name.",
  },
  attributes: {
    name: "Name",
    id: "Name",
  },
  labelName: "Name",
  patterns: [
    {
      regex: nameRegex,
      error: "Please enter a valid  Name with letters and spaces.",
    },
    {
      regex: noConsecutiveSpaces,
      error: "Please enter a Name without consecutive spaces.",
    },
  ],
};
