import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const EDLoading = ({ children, innerText, ...attribute }) => {
  return (
    <LoadingButton
      // loading

      variant="contained"
      {...attribute}
    >
      {children ?? innerText}
    </LoadingButton>
  );
};

export default EDLoading;
