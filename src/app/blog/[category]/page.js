export const revalidate = 3600; // Revalidate every 1 hour

import CategoryArticleCard from "@/components/CategoryArticleCard";
import { fetchAllCategories, fetchArticlesByCategory } from "@/lib/api.js";
import { Box, Typography } from "@mui/material";
import Link from "next/link.js";
import { notFound } from "next/navigation";

// Generate SEO Metadata for category pages
export async function generateMetadata({ params }) {
  const categories = await fetchAllCategories();
  const category = categories.find((cat) => cat.slug === params.category);

  if (!category) {
    return {
      title: "Category Not Found | TLDevR",
      description: "This category does not exist.",
    };
  }

  return {
    title: `${category.name} Articles | TLDevR`,
    description: `Browse ${category.name.toLowerCase()} articles - quick dev reads for busy developers.`,
    openGraph: {
      title: `${category.name} Articles | TLDevR`,
      description: `Browse ${category.name.toLowerCase()} articles - quick dev reads for busy developers.`,
      type: "website",
    },
  };
}

export default async function Category({ params }) {
  const { category: categorySlug } = params;
  const categories = await fetchAllCategories();
  const category = categories.find((cat) => cat.slug === categorySlug);
  if (!category) notFound();
  const articles = await fetchArticlesByCategory(categorySlug);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: ".5rem", sm: "1rem", md: "1rem" },
        paddingLeft: { xs: "1rem", sm: "2rem", md: "10rem", lg: "18rem" },
        paddingRight: { xs: "1rem", sm: "2rem", md: "10rem", lg: "18rem" },
      }}
    >
      <Typography variant="h5" sx={{ color: "text.primary", marginBottom: "1rem" }}>
        {category.name} Articles
      </Typography>
      <ArticleGrid
        articles={articles.slice(0, 2)} // First 2 articles in grid
        columns={2}
        height="300px"
        categorySlug={categorySlug}
      />
      <ArticleGrid
        articles={articles.slice(2, 5)} // Next 3 articles in grid
        columns={3}
        height="250px"
        sx={{ marginTop: "1rem" }}
        categorySlug={categorySlug}
      />
      <ArticleList articles={articles.slice(5)} categorySlug={categorySlug} />
    </Box>
  );
}

function ArticleGrid({ articles, columns, height, sx = {}, categorySlug }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        justifyContent: "center",
        maxWidth: "1000px",
        width: "100%",
        ...sx,
      }}
    >
      {articles.map((article) => (
        <CategoryArticleCard
          key={article.id}
          article={article}
          height={height}
          categorySlug={categorySlug}
        />
      ))}
    </Box>
  );
}

function ArticleList({ articles, categorySlug }) {
  return (
    <ul
      style={{
        textAlign: "left",
        marginTop: "2rem",
        padding: 0,
        listStyle: "none",
      }}
    >
      {articles.map((article, index) => (
        <li key={article.id}>
          {index >= 0 ? (
            // For articles starting from the 6th one (index >= 0), display in a full-width card
            <Link
              href={`/blog/${categorySlug}/${article.slug}`}
              style={{
                display: "block", // Make the Link element block-level to cover the entire card
                textDecoration: "none", // Remove underline
              }}
            >
              <Box
                className="zoom-image"
                sx={{
                  width: "100%",
                  marginBottom: ".75rem",
                  backgroundColor: "background.listItem",
                  padding: ".5rem",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                  {article.title}
                </Typography>
              </Box>
            </Link>
          ) : (
            // Articles 1-5 are just listed without a card
            <Link
              href={`/blog/${categorySlug}/${article.slug}`}
              style={{
                color: "text.primary",
                textDecoration: "none",
                display: "block", // Make it a block to ensure it takes up space
                marginBottom: "1rem",
              }}
            >
              {article.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export async function generateStaticParams() {
  const categories = await fetchAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}
