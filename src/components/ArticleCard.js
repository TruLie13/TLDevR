// components/ArticleCard.js
"use client";

import { Box, Card, Typography } from "@mui/material";
import Image from "next/image.js";
import { useState } from "react";

export default function ArticleCard({
  article,
  isListNewestArticle,
  onArticleClick,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      sx={{
        width: isListNewestArticle ? "10rem" : "15rem",
        minHeight: isListNewestArticle ? "14rem" : "25rem",
        flexShrink: 0,
        cursor: "pointer",
        borderRadius: "1.5rem",
        position: "relative",
        overflow: "hidden",
        border: "none",
        backgroundColor: "rgb(8, 4, 31)",
      }}
      onClick={() => onArticleClick(article.category, article.slug)}
    >
      <div
        style={{
          opacity: imageLoaded ? 1 : 0,
          // transition: "opacity .1s ease-in-out",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {article.image && (
          <Image
            width={300}
            height={200}
            src={article.image}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
            priority
          />
        )}
      </div>

      {!imageLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(21, 18, 43)",
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "white",
          padding: "0.5rem",
          textAlign: "center",
          backgroundColor: "rgba(19, 13, 48, 0.2)",
          zIndex: 1,
        }}
      >
        <Typography className="text-white font-bold text-lg">
          {article.title}
        </Typography>
      </Box>
    </Card>
  );
}
