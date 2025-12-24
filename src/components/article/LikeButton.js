// LikeButton.js
import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { background } from "@/lib/themeTokens";

const favoriteButtonStyle = {
  backgroundColor: background.buttonOverlay,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 10px",
  borderRadius: "25px",
  minWidth: "70px",
  height: "40px",
  // Ensure disabled state looks identical (otherwise flashes)
  "&.Mui-disabled": {
    backgroundColor: background.buttonOverlay,
    color: "white",
    opacity: 1,
  },
};

export default function LikeButton({
  isLiked,
  isLoading,
  likeCount,
  onLikeClick,
}) {
  return (
    <IconButton
      sx={favoriteButtonStyle}
      onClick={onLikeClick}
      disabled={isLoading}
      disableRipple={true}
      aria-label={isLiked ? "Remove favorite from article" : "Favorite article"}
    >
      {isLiked ? (
        <Favorite
          sx={{
            animation: "heartPulse 0.8s forwards",
            color: "red",
            "@keyframes heartPulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.3)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        />
      ) : (
        <FavoriteBorder
          sx={{
            transition: "none",
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{ marginLeft: 1, fontWeight: "bold", fontSize: "1rem" }}
      >
        {likeCount}
      </Typography>
    </IconButton>
  );
}
