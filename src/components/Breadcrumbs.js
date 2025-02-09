import React from "react";
import { useRouter } from "next/navigation";
import { Card, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Breadcrumbs = () => {
  const router = useRouter();

  // Get the current path to extract the category
  const path = window.location.pathname; // e.g., '/blog/react/whatever%20react'
  const category = path.split("/")[2]; // Extracts 'react' from the path

  const handleHomeClick = () => {
    router.push("/");
  };
  const Divider = () => (
    <Typography
      variant="body2"
      className=""
      sx={{
        color: "white",
        margin: "1rem 1rem",
        marginBottom: "1rem",
        paddingBottom: ".2rem",
      }}
    >
      &gt;
    </Typography>
  );
  const handleCategoryClick = () => {
    router.push(`/blog/${category}`);
  };

  return (
    <Card
      className=""
      sx={{
        left: "1rem",
        backgroundColor: "rgba(19, 13, 48, 0)",
        padding: "0.5rem 1rem",
        paddingBottom: "0",
        display: "flex",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <IconButton
        sx={{
          color: "white",
          padding: "0",
          // marginRight: "10px",
        }}
        onClick={handleHomeClick}
      >
        <HomeIcon />
      </IconButton>
      <Divider />
      <Typography variant="body1" sx={{ color: "white" }}>
        <span style={{ cursor: "pointer" }} onClick={handleCategoryClick}>
          {category.toUpperCase()}
        </span>
      </Typography>
    </Card>
  );
};

export default Breadcrumbs;
