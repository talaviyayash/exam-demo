import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const EDLoading = ({ innerText, ...attribute }) => {
  return (
    <LoadingButton
      // loading
      variant="contained"
      {...attribute}
    >
      {innerText}
    </LoadingButton>
  );
};

export default EDLoading;
