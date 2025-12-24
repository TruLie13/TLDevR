// ShareButton.js
import React from "react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { background } from "@/lib/themeTokens";

const actionButtonStyle = {
  backgroundColor: background.buttonOverlay,
  color: "white",
  width: "50px",
  height: "40px",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: background.buttonOverlay,
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
          color: "white", // Default color
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#00BFFF", // Light blue color on hover
          },
        }}
      />
    </IconButton>
  );
}
