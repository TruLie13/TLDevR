import React from "react";
import { Typography, Box } from "@mui/material";

export default function HomePageCover() {
  return (
    <Box sx={{ width: "100%", height: "13rem", bgcolor: "black", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to right, rgb(17, 24, 39), rgb(0, 0, 0), rgb(17, 24, 39))", opacity: 0.7, zIndex: 10 }}></Box>

      <Box sx={{ textAlign: "center", zIndex: 20 }}>
        {/* Main Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", letterSpacing: "-0.02562em" }}
        >
          TLDevR
        </Typography>
        {/* Subtext */}
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "light", marginTop: "0.5rem" }}
        >
          Quick Dev Articles
        </Typography>
      </Box>

      {/* Subtle Geometric Background (optional) */}
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Box sx={{ position: "absolute", width: "12rem", height: "12rem", borderRadius: "50%", bgcolor: "rgba(255,255,255,0.3)", left: "33%", top: "-3.75rem" }}></Box>
        <Box sx={{ position: "absolute", width: "10rem", height: "10rem", borderRadius: "50%", bgcolor: "rgba(255,255,255,0.2)", left: "75%", bottom: "-2.5rem" }}></Box>
      </Box>
    </Box>
  );
}
