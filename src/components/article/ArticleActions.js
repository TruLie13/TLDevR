import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";

const actionButtonStyle = {
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  width: "50px",
  height: "40px",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

const favoriteButtonStyle = {
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 10px",
  borderRadius: "25px",
  minWidth: "70px",
  height: "40px",
  // Ensure disabled state looks identical (otherwise flashes)
  "&.Mui-disabled": {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    opacity: 1,
  },
};

export default function ArticleActions({
  onShareClick,
  articleLikeCount,
  articleSlug,
}) {
  const [likeCount, setLikeCount] = useState(articleLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial like status and count from server when component mounts
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        // Get the API base URL
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Fetch current like count from server
        const response = await fetch(
          `${API_BASE_URL}/api/articles/${articleSlug}`
        );

        if (response.ok) {
          const data = await response.json();
          // Use the actual likeCount from the server, not likeRNG
          setLikeCount(data.article.likeCount);
        }

        // Check if this article is liked by the current user
        const likedArticles = JSON.parse(
          localStorage.getItem("likedArticles") || "[]"
        );
        setIsLiked(likedArticles.includes(articleSlug));
      } catch (error) {
        console.error("Error fetching article like status:", error);
      }
    };

    if (articleSlug) {
      fetchLikeStatus();
    }
  }, [articleSlug]);

  const handleLikeClick = async () => {
    if (isLoading || !articleSlug) return;

    // Use a local variable to prevent multiple renders
    const newLikedStatus = !isLiked;
    const action = newLikedStatus ? "like" : "unlike";
    const newCount =
      action === "like" ? likeCount + 1 : Math.max(0, likeCount - 1);

    try {
      setIsLoading(true);

      // Perform the API request without immediately updating UI
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_BASE_URL}/api/articles/like/${articleSlug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const data = await response.json();

      // Only update state once after the API call completes
      setIsLiked(newLikedStatus);
      setLikeCount(data.likeCount);

      // Store like status in localStorage
      const likedArticles = JSON.parse(
        localStorage.getItem("likedArticles") || "[]"
      );

      if (newLikedStatus && !likedArticles.includes(articleSlug)) {
        localStorage.setItem(
          "likedArticles",
          JSON.stringify([...likedArticles, articleSlug])
        );
      } else if (!newLikedStatus && likedArticles.includes(articleSlug)) {
        localStorage.setItem(
          "likedArticles",
          JSON.stringify(likedArticles.filter((slug) => slug !== articleSlug))
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "-20px",
        right: "5%",
        display: "flex",
        gap: "10px",
        zIndex: 10,
      }}
    >
      <IconButton
        sx={actionButtonStyle}
        onClick={onShareClick}
        aria-label="Copy link to share article"
      >
        <Share />
      </IconButton>

      <IconButton
        sx={favoriteButtonStyle}
        onClick={handleLikeClick}
        disabled={isLoading}
        disableRipple={true}
        aria-label={
          isLiked ? "Remove favorite from article" : "Favorite article"
        }
      >
        {isLiked ? (
          <Favorite
            sx={{
              animation: "heartPulse 0.8s forwards",
              color: "red",
              "@keyframes heartPulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.3)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          />
        ) : (
          <FavoriteBorder sx={{ transition: "none" }} />
        )}
        <Typography
          variant="body2"
          sx={{ marginLeft: 1, fontWeight: "bold", fontSize: "1rem" }}
        >
          {likeCount}
        </Typography>
      </IconButton>
    </Box>
  );
}
