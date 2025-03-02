// File: /components/article/ArticleContent.js (updated)
"use client";

import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import SnackbarComponent from "@/components/Snackbar.js";
import ArticleHeader from "./ArticleHeader";
import ArticleImageCard from "./ArticleImageCard";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import CustomStyles from "./CustomStyles";
import { highlightCode } from "@/utils/highlightCode";

export default function ArticleContent({ article }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const articleCategoryName = article?.category?.name || "general";
  const articleCategorySlug = article?.category?.slug || "general";
  const articleContent = article?.content || "Article content goes here.";

  const handleShareClick = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setOpenSnackbar(true);
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const highlightedContent = highlightCode(articleContent);

  return (
    <div>
      <CustomStyles />

      <Breadcrumbs
        categoryName={articleCategoryName}
        categorySlug={articleCategorySlug}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <article style={{ width: "100%" }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <ArticleImageCard article={article} />
            <ArticleActions onShareClick={handleShareClick} />
          </Box>

          <ArticleHeader article={article} />
          <ArticleBody content={highlightedContent} />
        </article>

        <SnackbarComponent
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={"Share link copied to your clipboard."}
          severity={"success"}
        />
      </Box>
    </div>
  );
}
