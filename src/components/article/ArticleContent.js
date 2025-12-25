"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSnackbar } from "@/context/SnackbarContext";
import ArticleHeader from "./ArticleHeader";
import ArticleImageCard from "./ArticleImageCard";
import ArticleBody from "./ArticleBody";
import ArticleActions from "./ArticleActions";
import CustomStyles from "./CustomStyles";
import { highlightCode } from "@/utils/highlightCode";
import AuthorCard from "./AuthorCard.js";

export default function ArticleContent({ article }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const articleCategoryName = article?.category?.name || "general";
  const articleCategorySlug = article?.category?.slug || "general";
  const articleContent = article?.content || "Article content goes here.";

  const handleShareClick = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showSnackbar("Share link copied to your clipboard.", "success");
    });
  }, [showSnackbar]);

  const handleEditClick = useCallback(() => {
    router.push(`/edit/${article?.slug}`);
  }, [router, article?.slug]);

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
            <ArticleActions
              onEditClick={handleEditClick}
              onShareClick={handleShareClick}
              articleLikeCount={article.likeCount}
              articleSlug={article.slug}
            />
          </Box>

          <ArticleHeader article={article} />
          <ArticleBody content={highlightedContent} />
        </article>

        <AuthorCard />
      </Box>
    </div>
  );
}
