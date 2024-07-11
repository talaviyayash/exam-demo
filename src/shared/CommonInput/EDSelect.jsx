import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { memo } from "react";

const SelectOption = ({ handleChange, option, label, value }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {option.map((val, index) => (
            <MenuItem value={val} key={index}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(SelectOption);
