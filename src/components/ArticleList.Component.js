"use client";

import { useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ listName, articles, categorySlug }) {
  const router = useRouter();
  const isListFeatured = listName === "Featured";
  const isListNewest = listName === "Newest";
  const isListCategory = !isListFeatured && !isListNewest; // True for category lists

  const handleArticleClick = (categorySlug, slug) => {
    if (!categorySlug) {
      console.warn("Category slug is missing, defaulting to 'general'");
    }
    router.push(`/blog/${categorySlug || "general"}/${slug}`);
  };

  const handleCategoryClick = () => {
    if (isListCategory && categorySlug) {
      router.push(`/blog/${categorySlug}`);
    }
  };

  return (
    <section>
      <Typography
        variant="h4"
        component="h3"
        fontWeight="bold"
        mb={1}
        sx={isListCategory ? { cursor: "pointer" } : {}}
        onClick={isListCategory ? handleCategoryClick : undefined}
      >
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
              key={article._id || index}
              article={article}
              isListFeatured={isListFeatured}
              onArticleClick={() =>
                handleArticleClick(
                  categorySlug || article.category?.slug,
                  article.slug
                )
              }
            />
          ))}
        </Box>
      )}
    </section>
  );
}
