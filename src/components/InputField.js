import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Chip,
  Box,
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
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (type === "tags") {
      setInputValue(newValue);
    } else if (maxCount && newValue.length <= maxCount) {
      onChange(newValue);
    } else if (!maxCount) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (type === "tags" && e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newTags = [...value, inputValue.trim()];
      onChange(newTags);
      setInputValue("");
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = value.filter((tag) => tag !== tagToDelete);
    onChange(newTags);
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

  if (type === "tags") {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          border: "1px solid #1976d2",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "1rem",
          minHeight: "56px",
          "&:hover": { borderColor: "#1976d2" },
        }}
      >
        {value.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            sx={{ margin: "2px", backgroundColor: "#1976d2", color: "white" }}
          />
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={label}
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            minWidth: "50px",
            background: "transparent",
            color: "white",
          }}
        />
        {renderCounter()}
      </Box>
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
            ".MuiSelect-icon": { color: "grey" },
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
