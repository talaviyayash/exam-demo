import { Button } from "@mui/material";
import React from "react";

const ErrorButton = ({ children, innerText, ...attributes }) => {
  return (
    <>
      <Button variant="contained" color="error" {...attributes}>
        {children ?? innerText}
      </Button>
    </>
  );
};

export default ErrorButton;
