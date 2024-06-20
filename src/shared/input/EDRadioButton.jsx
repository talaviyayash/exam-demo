import { Radio } from "@mui/material";
import React from "react";

const EDRadioButton = ({ value, element = {}, handelChange }) => {
  const { patterns = [], name, required, attributes, labelName } = element;
  return (
    <>
      <Radio
        name="radio-buttons"
        checked={value == attributes.value}
        onChange={(e) => handelChange({ e, patterns, name, required })}
        {...attributes}
      />
      <label htmlFor={attributes.id}>{labelName}</label>
    </>
  );
};

export default EDRadioButton;
