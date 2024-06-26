import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { memo } from "react";
import { EMPTY_STRING } from "../../description/globel.description";

const EDSelectOption = ({ value, element, handelChange }) => {
  const { patterns, name, required, labelName, children } = element;
  const { isRequired } = required;
  const labelNameWithRequired = labelName + (isRequired ? "*" : EMPTY_STRING);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {labelNameWithRequired}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={labelNameWithRequired}
          onChange={(e) => handelChange({ e, patterns, name, required })}
        >
          {children.map(({ value, innerText }, index) => {
            return (
              <MenuItem key={index} value={value}>
                {innerText}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(EDSelectOption);
