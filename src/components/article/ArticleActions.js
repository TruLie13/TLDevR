// ArticleActions.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { fetchArticleLikeStatus, updateArticleLikeStatus } from "../../lib/api";
import { getAuthToken } from "../../lib/auth";
import EditButton from "./EditButton";

export default function ArticleActions({
  onEditClick,
  onShareClick,
  articleLikeCount,
  articleSlug,
}) {
  const [likeCount, setLikeCount] = useState(articleLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);
  // Fetch initial like status and count from server when component mounts
  useEffect(() => {
    const loadLikeStatus = async () => {
      if (!articleSlug) return;

      try {
        // Fetch article data from API service
        const article = await fetchArticleLikeStatus(articleSlug);

        if (article) {
          setLikeCount(article.likeCount);
        }

        // Check if this article is liked by the current user
        const likedArticles = JSON.parse(
          localStorage.getItem("likedArticles") || "[]"
        );
        setIsLiked(likedArticles.includes(articleSlug));
      } catch (error) {
        console.error("Error loading like status:", error);
      }
    };

    loadLikeStatus();
  }, [articleSlug]);

  const handleLikeClick = async () => {
    if (isLoading || !articleSlug) return;

    // Use a local variable to prevent multiple renders
    const newLikedStatus = !isLiked;
    const action = newLikedStatus ? "like" : "unlike";

    try {
      setIsLoading(true);

      // Use the API service to update like status
      const data = await updateArticleLikeStatus(articleSlug, action);

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
      {isLoggedIn && <EditButton onEditClick={onEditClick} />}
      <ShareButton onShareClick={onShareClick} />
      <LikeButton
        isLiked={isLiked}
        isLoading={isLoading}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
      />
    </Box>
  );
}
