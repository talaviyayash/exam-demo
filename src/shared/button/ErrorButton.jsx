import { Button } from "@mui/material";
import React from "react";

const ErrorButton = ({ innerText, ...attributes }) => {
  return (
    <>
      <Button variant="contained" color="error" {...attributes}>
        {innerText}
      </Button>
    </>
  );
};

export default ErrorButton;
