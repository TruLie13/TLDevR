"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNewestArticles, fetchFeaturedArticles } from "@/lib/api";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function ArticleList({ listName, queryKey }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isListNewestArticle = queryKey[0] === "newestArticles";

  const fetchFunction = isListNewestArticle
    ? fetchNewestArticles
    : fetchFeaturedArticles;

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: fetchFunction,
  });

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

  if (isLoading) return <div>Loading {listName?.toLowerCase()}...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {listName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          paddingBottom: 2,
          borderColor: "rgb(8, 4, 31)",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {articles?.map((article, index) => (
          <Card
            key={article.id || index}
            sx={{
              width: isListNewestArticle ? "10rem" : "15rem",
              minHeight: isListNewestArticle ? "10rem" : "25rem",
              flexShrink: 0,
              cursor: "pointer",
              borderRadius: "1.5rem",
              position: "relative",
              overflow: "hidden",
              border: "none",
              backgroundColor: "rgb(8, 4, 31)",
            }}
            onClick={() => handleArticleClick(article.category, article.slug)}
          >
            {article.image && (
              <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                // background: "rgba(0, 0, 0, 0.6)",
                color: "white", //title font color
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              <Typography className="text-white font-bold text-lg">
                {article.title}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </section>
  );
}
