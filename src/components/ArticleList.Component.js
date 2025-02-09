"use client";

import { useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ listName, articles }) {
  const router = useRouter();
  const isListNewestArticle = listName === "Newest Articles";

  const handleArticleClick = (category, slug) => {
    router.push(`/blog/${category}/${slug}`);
  };

  return (
    <section>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {listName}
      </Typography>

      {articles && articles.length > 0 && (
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
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id || index}
              article={article}
              isListNewestArticle={isListNewestArticle}
              onArticleClick={handleArticleClick}
            />
          ))}
        </Box>
      )}
    </section>
  );
}
