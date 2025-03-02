// File: /components/article/ArticleHeader.js
import React from "react";
import { Typography, CardContent } from "@mui/material";

export default function ArticleHeader({ article }) {
  const articleTitle = article?.title || "Article Title";
  const articleDate = article?.publishedAt || "2023-01-01";

  const formattedDate = new Date(articleDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <CardContent sx={{ textAlign: "left", width: "100%", mt: 2 }}>
      <header>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          {articleTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "2rem" }}
        >
          Published on {formattedDate}
        </Typography>
      </header>
    </CardContent>
  );
}
