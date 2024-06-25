import * as React from "react";
import Button from "@mui/material/Button";

const EDButton = ({ innerText, ...attribute }) => {
  return (
    <Button variant="contained" disableElevation {...attribute}>
      {innerText}
    </Button>
  );
};

export default EDButton;
