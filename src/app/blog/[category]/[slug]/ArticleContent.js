"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getValidImageUrl, fallback_image } from "@/utils/imageUtils";
import SnackbarComponent from "@/components/Snackbar.js";
import { highlightCode } from "@/utils/highlightCode";

const MemoizedImage = React.memo(function MemoizedImage({ src, alt, onError }) {
  return (
    <Image
      width={800}
      height={600}
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
      loading="lazy"
      onError={onError}
    />
  );
});

export default function ArticleContent({ article }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isError, setIsError] = useState(false);

  const articleTitle = article?.title || "Article Title";
  const articleCategoryName = article?.category?.name || "general";
  const articleCategorySlug = article?.category?.slug || "general";
  const articleSlug = article?.slug || "article-slug";
  // const articleUrl = `/blog/${articleCategory}/${articleSlug}`;
  const articleImage = article?.image || fallback_image;
  const articleContent = article?.content || "Article content goes here.";
  const articleDate = article?.publishedAt || "2023-01-01";

  useEffect(() => {
    if (articleImage) {
      setImageSrc(getValidImageUrl(articleImage));
      setIsError(false);
    }
  }, [articleImage]);

  const handleShareClick = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setOpenSnackbar(true);
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const handleImageError = useCallback(() => {
    console.log("Error loading image:", imageSrc);
    setIsError(true);
    setImageSrc(fallback_image);
  }, [imageSrc]);

  const highlightedContent = highlightCode(articleContent);

  const customCodeBlockStyles = `
    pre {
      background-color:rgb(239, 10, 10);
      border-radius: 6px;
      padding: 1rem;
      margin: 1rem 0;
      overflow-x: auto;
      width: 100%;
      box-sizing: border-box;
    }
    pre code {
      font-family: 'Fira Code', 'Courier New', monospace;
      display: block;
      white-space: pre;
    }
    .tiptap-content {
      width: 100%;
    }
  `;

  const validImageUrl = imageSrc || getValidImageUrl(articleImage);

  const formattedDate = new Date(articleDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <style>{customCodeBlockStyles}</style>

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
            <Card
              sx={{
                width: "100%",
                height: { xs: "35vh", sm: "35vh" },
                borderRadius: "1.5rem",
                overflow: "hidden",
                backgroundColor: "rgb(8, 4, 31)",
              }}
            >
              {validImageUrl && (
                <MemoizedImage
                  src={validImageUrl}
                  alt={`Image for article: ${articleTitle}`}
                  onError={handleImageError}
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
              )}
            </Card>
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
                sx={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
                }}
                onClick={handleShareClick}
                aria-label="Copy link to share article"
              >
                <Share />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
                }}
                aria-label="Favorite article"
              >
                <Favorite />
              </IconButton>
            </Box>
          </Box>

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

            <Box
              className="tiptap-content"
              sx={{
                color: "rgba(255,255,255,0.8)",
                textAlign: "justify",
                width: "100%",
                "& a": {
                  color: "#3498db",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#2980b9",
                  },
                },
                "& a[target='_blank']": {
                  color: "white",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "#2980b9",
                  },
                  "&::after": {
                    textDecoration: "none !important",
                    content: `" ↗"`,
                    fontSize: "0.9em",
                    display: "inline",
                  },
                },

                "& p": {
                  marginBottom: "16px",
                  fontFamily: "georgia",
                  color: "white",
                },
                "& p:empty": {
                  margin: "16px 0" /* Adjust to your desired space */,
                  padding: "1px" /* Optional: Set padding if needed */,
                },
                "& strong": { fontWeight: "bold", fontFamily: "Arial" },

                "& em": { fontStyle: "italic" },
                "& u": { textDecoration: "underline" },
                // Styling for number lists
                "& ol": {
                  listStyleType: "decimal", // Display ordered (numbered) list
                  marginLeft: "5px", // Add space on the left
                  paddingLeft: "10px", // Optional padding for spacing
                },
                "& li": {
                  marginBottom: "2.5rem !important", // Space between list items
                  margin: 0,
                },
                // Styling for bullet lists
                "& ul": {
                  listStyleType: "disc", // Display unordered (bullet) list
                  marginLeft: "5px", // Add space on the left
                  paddingLeft: "10px", // Optional padding for spacing
                },
                "& ol li p strong": {
                  // fontWeight: "bold",
                  fontFamily: "Arial",
                  color: "white",
                  marginBottom: "0px",
                },

                // Styling for quote blocks
                "& blockquote": {
                  borderLeft: "4px solid #3498db", // Blue left border for quotes
                  paddingLeft: "16px", // Space between border and text
                  fontStyle: "italic", // Italic text for blockquotes
                  margin: "16px 0", // Space above and below the quote block
                  color: "rgba(255, 255, 255, 0.8)", // Optional: same color as text
                },
              }}
            >
              {highlightedContent}
            </Box>
          </CardContent>
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
