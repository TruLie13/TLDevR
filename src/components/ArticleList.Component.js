"use client";

import { useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ listName, articles }) {
  const router = useRouter();
  const isListFeatured = listName === "Featured Articles";

  const handleArticleClick = (category, slug) => {
    console.log("Article clicked:", category, slug);
    router.push(`/blog/${category}/${slug}`);
  };

  return (
    <section>
      <Typography variant="h4" component="h3" fontWeight="bold" mb={1}>
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
              isListFeatured={isListFeatured}
              onArticleClick={handleArticleClick}
            />
          ))}
        </Box>
      )}
    </section>
  );
}
