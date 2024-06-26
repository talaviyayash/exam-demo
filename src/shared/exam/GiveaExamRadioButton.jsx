import { Radio } from "@mui/material";
import React from "react";

const GiveExamRadioButton = ({ value, attributes = {}, ...props }) => {
  return (
    <>
      <div>
        <Radio
          name="radio-buttons"
          checked={value == attributes.value}
          {...attributes}
          {...props}
          id={attributes.value}
        />
        <label htmlFor={attributes.value}>{attributes.labelname}</label>
      </div>
    </>
  );
};

export default GiveExamRadioButton;
