// ShareButton.js
import React from "react";
import { IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";

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

export default function ShareButton({ onShareClick }) {
  return (
    <IconButton
      sx={actionButtonStyle}
      onClick={onShareClick}
      aria-label="Copy link to share article"
    >
      <Share
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
