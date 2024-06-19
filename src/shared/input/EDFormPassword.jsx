import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { memo } from "react";

const DDFormPassword = ({ value, element, handelChange }) => {
  const { patterns, name, required, labelName, attributes } = element;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { isRequired } = required;
  const labelNameWithRequired = labelName + (isRequired ? "*" : "");
  return (
    <FormControl
      {...attributes}
      sx={{ m: "0px", width: "100%" }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">
        {labelNameWithRequired}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        label={labelNameWithRequired}
        value={value}
        onChange={(e) => handelChange({ e, patterns, name, required })}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default memo(DDFormPassword);
