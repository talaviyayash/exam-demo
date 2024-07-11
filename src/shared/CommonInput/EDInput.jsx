import { TextField } from "@mui/material";
import { memo } from "react";

const EDInput = (props) => {
  return (
    <>
      <TextField id="outlined-required" {...props} />
    </>
  );
};

export default memo(EDInput);
