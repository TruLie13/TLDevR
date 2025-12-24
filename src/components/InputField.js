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
  maxTags = 6, // Default value of 6, can be overridden
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
      if (value.length < maxTags) {
        const newTags = [...value, inputValue.trim()];
        onChange(newTags);
        setInputValue("");
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = value.filter((tag) => tag !== tagToDelete);
    onChange(newTags);
  };

  const renderCounter = () => {
    if (type === "tags") {
      const tagsCount = value.length;
      const isMax = tagsCount >= maxTags;
      return (
        <Typography
          variant="caption"
          sx={{ color: isMax ? "error.main" : "text.secondary", marginRight: "4px" }}
        >
          {tagsCount}/{maxTags}
        </Typography>
      );
    }
    if (maxCount) {
      const lengthIsMax = value.length >= maxCount;
      return (
        <Typography
          variant="caption"
          sx={{ color: lengthIsMax ? "error.main" : "text.secondary" }}
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
          input: { color: "text.primary" },
          label: { color: "text.secondary" },
          fieldset: { borderColor: "divider" },
          "&:hover fieldset": { borderColor: "primary.main" },
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
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          mb: "1rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      >
        <InputLabel
          shrink={isFocused || value.length > 0}
          sx={{ color: "text.secondary", marginBottom: "1rem" }}
        >
          {label}
        </InputLabel>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            border: "1px solid",
            borderColor: isFocused ? "primary.main" : "divider",
            borderRadius: "4px",
            padding: "8px",
            minHeight: "56px",
            "&:hover": { borderColor: "primary.main" },
            backgroundColor: "transparent",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {value.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDelete(tag)}
              sx={{ margin: "2px", backgroundColor: "primary.main", color: "primary.contrastText" }}
            />
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{
              border: "none",
              outline: "none",
              flexGrow: 1,
              minWidth: "50px",
              background: "transparent",
              color: "inherit",
            }}
            disabled={value.length >= maxTags}
          />
          {renderCounter()}
        </Box>
      </FormControl>
    );
  }

  if (type === "dropdown") {
    return (
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "text.secondary" }}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={label}
          sx={{
            color: "text.primary",
            ".MuiSelect-select": { color: "text.primary" },
            "&.MuiOutlinedInput-root": {
              fieldset: { borderColor: "divider" },
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            ".MuiSelect-icon": { color: "action.active" },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "background.paper",
                color: "text.primary",
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
                color: "text.primary",
                "&:hover": { backgroundColor: "background.default" },
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
