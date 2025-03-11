// ShareButton.js
import React from "react";
import { IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";

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

export default function ShareButton({ onShareClick }) {
  return (
    <IconButton
      sx={actionButtonStyle}
      onClick={onShareClick}
      aria-label="Copy link to share article"
    >
      <Share
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
