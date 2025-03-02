// File: /components/article/ArticleActions.js
import React from "react";
import { Box, IconButton } from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

const actionButtonStyle = {
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
};

export default function ArticleActions({ onShareClick }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "-25px",
        right: "5%",
        display: "flex",
        gap: "10px",
        zIndex: 10,
      }}
    >
      <IconButton
        sx={actionButtonStyle}
        onClick={onShareClick}
        aria-label="Copy link to share article"
      >
        <Share />
      </IconButton>

      <IconButton sx={actionButtonStyle} aria-label="Favorite article">
        <Favorite />
      </IconButton>
    </Box>
  );
}
