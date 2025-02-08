"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNewestArticles, fetchFeaturedArticles } from "@/lib/api";
import { Card, CardMedia, Typography, Box, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

export default function ArticleList({ listName, queryKey }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isListNewestArticle = queryKey[0] === "newestArticles";
  const fetchFunction = isListNewestArticle
    ? fetchNewestArticles
    : fetchFeaturedArticles;

  const { data: articles, isLoading } = useQuery({
    queryKey,
    queryFn: fetchFunction,
  });

  const [loadedImages, setLoadedImages] = useState(
    () => queryClient.getQueryData(["loadedImages"]) || {}
  );

  const handleImageLoad = (id) => {
    setTimeout(() => {
      setLoadedImages((prev) => {
        const newData = { ...prev, [id]: true };
        queryClient.setQueryData(["loadedImages"], newData); // Persist in cache
        return newData;
      });
    }, 250);
  };

  const handleArticleClick = async (category, slug) => {
    const cachedArticle = queryClient.getQueryData(["article", slug]);

    if (!cachedArticle) {
      await queryClient.prefetchQuery({
        queryKey: ["article", slug],
        queryFn: fetchFunction,
      });
    }

    router.push(`/blog/${category}/${slug}`);
  };

  // Ensure skeleton shows until the image is fully loaded
  useEffect(() => {
    if (articles) {
      const initialLoadedState = {};
      articles.forEach((article) => {
        initialLoadedState[article.id] = loadedImages[article.id] || false;
      });
      setLoadedImages(initialLoadedState);
    }
  }, [articles]);

  return (
    <section>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {listName}
      </Typography>

      {/* Ensure no unintended parent skeleton or empty-state render */}
      {isLoading || (articles && articles.length > 0) ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            paddingBottom: 2,
            borderColor: "rgb(8, 4, 31)",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    width: isListNewestArticle ? "10rem" : "15rem",
                    minHeight: isListNewestArticle ? "14rem" : "25rem",
                    flexShrink: 0,
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    backgroundColor: "rgb(8, 4, 31)",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation={false}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      transition: "opacity 0.5s ease-in-out",
                      border: "none",
                      backgroundColor: "rgb(8, 4, 31)",
                    }}
                  />
                </Card>
              ))
            : articles.map((article, index) => (
                <Card
                  key={article.id || index}
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
                  onClick={() =>
                    handleArticleClick(article.category, article.slug)
                  }
                >
                  {/* actual pre img load skelton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: loadedImages[article.id] ? 0 : 2,
                      opacity: loadedImages[article.id] ? 0 : 1,
                      transition: "opacity 0.5s ease-in-out",
                      borderRadius: "1.5rem",
                      border: "none",
                      backgroundColor: "rgb(21, 18, 43)",
                    }}
                  />

                  {article.image && (
                    <CardMedia
                      component="img"
                      image={article.image}
                      alt={article.title}
                      onLoad={() => handleImageLoad(article.id)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "rgb(21, 18, 43)",
                      }}
                    />
                  )}
                  {/* Text Box */}
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
                    }}
                  >
                    <Typography className="text-white font-bold text-lg">
                      {article.title}
                    </Typography>
                  </Box>
                </Card>
              ))}
        </Box>
      ) : null}
    </section>
  );
}
