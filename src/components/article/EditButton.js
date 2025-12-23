// ShareButton.js
import React from "react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const actionButtonStyle = {
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  width: "50px",
  height: "40px",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.7)",
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
