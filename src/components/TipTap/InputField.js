import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Reusable InputField component
const InputField = ({
  label,
  value,
  onChange,
  type,
  options = [],
  disabled,
  ...rest
}) => {
  if (type === "text") {
    return (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={{
          mb: 2,
          input: { color: "white" },
          label: { color: "white" },
          fieldset: { borderColor: "#1976d2" },
          "&:hover fieldset": { borderColor: "#1976d2 !important" }, // Prevents color change on hover
        }}
        {...rest}
      />
    );
  }

  if (type === "dropdown") {
    return (
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "white" }}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)} // Directly passing the selected value
          label={label}
          sx={{
            color: "white", // Ensure the selected text is white
            ".MuiSelect-select": { color: "white" }, // Selected text
            "&.MuiOutlinedInput-root": {
              fieldset: { borderColor: "#1976d2" },
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "rgb(21, 18, 43)", // Matches card background
                color: "white", // Text inside dropdown menu
              },
            },
          }}
          {...rest}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgb(8, 4, 31)" },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return null;
};

export default InputField;
