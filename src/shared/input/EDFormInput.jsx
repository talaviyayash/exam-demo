import { TextField } from "@mui/material";
import { memo } from "react";

const DDFormInput = ({ value, element = {}, handelChange }) => {
  const {
    patterns = [],
    name,
    required,
    labelName,
    attributes,
    type,
  } = element;
  const { isRequired } = required;

  return (
    <>
      <TextField
        required={isRequired}
        sx={{
          width: "100%",
        }}
        id="outlined-required"
        label={labelName}
        value={value}
        type={type}
        {...attributes}
        onChange={(e) => handelChange({ e, patterns, name, required })}
      />
    </>
  );
};

export default memo(DDFormInput);
