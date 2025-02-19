import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";

const InputField = ({
  label,
  value,
  onChange,
  type,
  options = [],
  disabled,
  maxCount,
  ...rest
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxCount && newValue.length <= maxCount) {
      onChange(newValue);
    } else if (!maxCount) {
      onChange(newValue);
    }
  };

  const renderCounter = () => {
    if (maxCount) {
      const lengthIsMax = value.length >= maxCount;
      return (
        <Typography
          variant="caption"
          sx={{ color: lengthIsMax ? "red" : "white" }}
        >
          {value.length}/{maxCount}
        </Typography>
      );
    }
    return null;
  };

  if (type === "text") {
    return (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        sx={{
          mb: 1,
          input: { color: "white" },
          label: { color: "white" },
          fieldset: { borderColor: "#1976d2" },
          "&:hover fieldset": { borderColor: "#1976d2 !important" },
          marginBottom: "1rem",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{renderCounter()}</InputAdornment>
          ),
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
          onChange={(e) => onChange(e.target.value)}
          label={label}
          sx={{
            color: "white",
            ".MuiSelect-select": { color: "white" },
            "&.MuiOutlinedInput-root": {
              fieldset: { borderColor: "#1976d2" },
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            ".MuiSelect-icon": { color: "grey" }, // Add this line to change the icon color to white
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "rgb(21, 18, 43)",
                color: "white",
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
