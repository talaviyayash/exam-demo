import * as React from "react";
import Button from "@mui/material/Button";

const EDButton = ({ children, innerText, style, ...attribute }) => {
  return (
    <Button variant="contained" disableElevation {...attribute} style={style}>
      {children ?? innerText}
    </Button>
  );
};

export default EDButton;
