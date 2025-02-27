"use client";

import { useRouter } from "next/navigation";
import { Typography, Box, Link } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ listName, articles, categorySlug }) {
  const router = useRouter();
  const isListFeatured = listName === "Featured";
  const isListNewest = listName === "Newest";
  const isListCategory = !isListFeatured && !isListNewest;

  const cardWidth = isListFeatured ? 224 : 176; // 14rem = 224px, 11rem = 176px
  const totalWidth = articles.length * cardWidth + (articles.length - 1) * 16; // 16px gap between cards

  console.log("categorySlug", categorySlug);

  const handleNavigation = () => {
    router.push(`/blog/${categorySlug || "general"}`);
  };

  return (
    <section>
      {/* Header Row: Title & View All */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          width: "100%",
          maxWidth: { sm: "100%", md: totalWidth }, // Ensures "View All" aligns with last card
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          fontWeight="bold"
          sx={{ cursor: isListCategory ? "pointer" : "default" }}
          onClick={isListCategory ? handleNavigation : undefined}
        >
          {listName}
        </Typography>
        {isListCategory && (
          <Link
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onClick={handleNavigation}
          >
            View All
          </Link>
        )}
      </Box>

      {/* Articles Row */}
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
                handleNavigation(
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
