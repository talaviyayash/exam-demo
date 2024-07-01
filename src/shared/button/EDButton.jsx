import * as React from "react";
import Button from "@mui/material/Button";

const EDButton = ({ innerText, style, ...attribute }) => {
  return (
    <Button variant="contained" disableElevation {...attribute} style={style}>
      {innerText}
    </Button>
  );
};

export default EDButton;
