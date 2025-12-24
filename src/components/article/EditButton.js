// EditButton.js
import React from "react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const actionButtonStyle = {
  backgroundColor: "background.buttonOverlay",
  color: "text.primary",
  width: "50px",
  height: "40px",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "background.buttonOverlay",
  },
};

export default function EditButton({ onEditClick }) {
  return (
    <IconButton
      sx={actionButtonStyle}
      onClick={onEditClick}
      aria-label="Edit article"
    >
      <Edit
        sx={{
          color: "inherit", 
          transition: "color 0.3s ease",
          "&:hover": {
            color: "primary.main",
          },
        }}
      />
    </IconButton>
  );
}
