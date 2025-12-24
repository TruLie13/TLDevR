import { Box, Card, Typography } from "@mui/material";
import Image from "next/image.js";
import { useState, useEffect } from "react";
import { getValidImageUrl } from "@/utils/imageUtils.js";
import { fallback_image } from "@/utils/imageUtils";


export default function ArticleCard({
  article,
  isListFeatured,
  onArticleClick,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isError, setIsError] = useState(false);

  const articleTitle = article?.title || "Article Title";
  const articleCategory = article?.category?.slug || "Category"; //refactor to accomadate 'misc' after categories created so clicking has a fallbakc page instead of 404.
  const articleSlug = article?.slug || "article-slug";
  const articleImage = article?.image || fallback_image;

  useEffect(() => {
    // Set initial image source
    setImageSrc(getValidImageUrl(articleImage));
    setIsError(false);
    setImageLoaded(false);
  }, [articleImage]);

  const handleImageError = () => {
    console.log("Error loading image:", imageSrc);
    setIsError(true);
    setImageSrc(fallback_image);
    // Don't set imageLoaded here as it will trigger another load attempt
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card
      className="card-container"
      sx={{
        width: isListFeatured ? "14rem" : "11rem",
        minHeight: isListFeatured ? "25rem" : "16rem", //for card before imgs load
        flexShrink: 0,
        cursor: "pointer",
        borderRadius: "1.5rem",
        position: "relative",
        overflow: "hidden",
        border: "none",
        backgroundColor: "background.default",
      }}
      onClick={() => onArticleClick(articleCategory, articleSlug)}
    >
      <div
        style={{
          opacity: imageLoaded ? 1 : 0,
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`Image for article about ${articleTitle}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            width={224}
            height={400}
            sizes={isListFeatured ? "224px" : "176px"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
            priority
            className="zoom-image"
          />
        )}
      </div>

      {/* Loading state or error state placeholder */}
      {!imageLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "background.paper",
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "text.primary",
          padding: "0.5rem",
          textAlign: "center",
          backgroundColor: "background.overlay",
          zIndex: 1,
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          {articleTitle}
        </Typography>
      </Box>
    </Card>
  );
}
