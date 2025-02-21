import React from "react";
import { Card, Typography, Box } from "@mui/material";

export default function HomePageCover() {
  return (
    <div className="w-full h-52 bg-black flex items-center justify-center relative">
      <Box className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-70 z-10"></Box>

      <div className="text-center z-20">
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
      </div>

      {/* Subtle Geometric Background (optional) */}
      <Box className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute w-48 h-48 rounded-full bg-opacity-30 bg-white left-2/6 -top-15"></div>
        <div className="absolute w-40 h-40 rounded-full bg-opacity-20 bg-white left-3/4 -bottom-10"></div>
      </Box>
    </div>
  );
}
