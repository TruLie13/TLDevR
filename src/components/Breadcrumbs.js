import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Box, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Breadcrumbs = () => {
  const router = useRouter();

  // Get the current path to extract the category
  const path = window.location.pathname; // e.g., '/blog/react/whatever%20react'
  const category = path.split("/")[2]; // Extracts 'react' from the path

  const handleHomeClick = () => {
    router.push("/"); // Navigate to home page
  };

  const handleCategoryClick = () => {
    router.push(`/blog/${category}`);
  };

  return (
    <Card
      sx={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "rgba(0,0,0,0.6)", // Semi-transparent background
        borderRadius: "1.5rem",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        zIndex: 10, // Ensure it appears on top of the image
      }}
    >
      <IconButton
        sx={{
          color: "white",
          padding: "0",
          marginRight: "10px",
        }}
        onClick={handleHomeClick}
      >
        <HomeIcon />
      </IconButton>
      <Typography variant="body1" sx={{ color: "white" }}>
        <span style={{ cursor: "pointer" }} onClick={handleCategoryClick}>
          {category}
        </span>
      </Typography>
    </Card>
  );
};

export default Breadcrumbs;
