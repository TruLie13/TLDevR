"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "5rem", // h-20
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden", // Ensure circles don't overflow
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: (theme) => `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
          opacity: 0.8,
          zIndex: 10,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          textAlign: "center",
          zIndex: 20,
          color: "text.primary",
          fontWeight: 300, // font-light
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // text-sm sm:text-base md:text-lg
        }}
      >
        <Typography component="span" sx={{ color: "inherit", fontSize: "inherit" }}>
          <Link
            href="https://pi-que.com"
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Created by{" "}
            <Box
              component="span"
              sx={{
                color: "text.primary",
                transition: "color 300ms",
                "&:hover": { color: "primary.main" }, // text-red-500
              }}
            >
              pi.que llc
            </Box>{" "}
            © 2025.
          </Link>
        </Typography>
        <Typography component="span" sx={{ whiteSpace: "nowrap", fontSize: "inherit" }}>
          All rights reserved
        </Typography>
      </Box>

      {/* Subtle Geometric Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* Circle 1 */}
        <Box
          sx={{
            position: "absolute",
            width: "5rem", // w-20
            height: "5rem", // h-20
            borderRadius: "50%",
            backgroundColor: "text.primary",
            opacity: 0.1,
            left: "25%",
            bottom: 0,
          }}
        />
        {/* Circle 2 */}
        <Box
          sx={{
            position: "absolute",
            width: "4rem", // w-16
            height: "4rem", // h-16
            borderRadius: "50%",
            backgroundColor: "text.primary",
            opacity: 0.1,
            left: "75%",
            bottom: 0,
          }}
        />
      </Box>
    </Box>
  );
}
