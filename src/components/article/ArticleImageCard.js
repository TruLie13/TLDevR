// File: /components/article/ArticleImageCard.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card } from "@mui/material";
import { getValidImageUrl, fallback_image } from "@/utils/imageUtils";

const MemoizedImage = React.memo(function MemoizedImage({ src, alt, onError, sizes }) {
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
      priority
      sizes={sizes}
      onError={onError}
    />
  );
});

export default function ArticleImageCard({ article }) {
  const [imageSrc, setImageSrc] = useState("");
  const [isError, setIsError] = useState(false);

  const articleTitle = article?.title || "Article Title";
  const articleImage = article?.image || fallback_image;

  useEffect(() => {
    if (articleImage) {
      setImageSrc(getValidImageUrl(articleImage));
      setIsError(false);
    }
  }, [articleImage]);

  const handleImageError = useCallback(() => {
    console.log("Error loading image:", imageSrc);
    setIsError(true);
    setImageSrc(fallback_image);
  }, [imageSrc]);

  const validImageUrl = imageSrc || getValidImageUrl(articleImage);

  return (
    <Card
      sx={{
        width: "100%",
        height: { xs: "35vh", sm: "35vh" },
        borderRadius: "1.5rem",
        overflow: "hidden",
        backgroundColor: "background.default",
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
  );
}
