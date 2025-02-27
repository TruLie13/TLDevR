import { notFound } from "next/navigation";
import { fetchAllCategories, fetchArticlesByCategory } from "@/lib/api.js";
import { Box, Typography } from "@mui/material";
import CategoryArticleCard from "@/components/CategoryArticleCard";
import Link from "next/link.js";

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
        paddingLeft: { xs: "1rem", sm: "2rem", md: "18rem" },
        paddingRight: { xs: "1rem", sm: "2rem", md: "18rem" },
      }}
    >
      <Typography variant="h5" sx={{ color: "white", marginBottom: "1rem" }}>
        {category.name} Articles
      </Typography>
      <ArticleGrid
        articles={articles.slice(0, 2)}
        columns={2}
        height="300px"
        categorySlug={categorySlug}
      />
      <ArticleGrid
        articles={articles.slice(2, 5)}
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
      {articles.map((article) => (
        <li key={article.id}>
          <Link
            href={`/blog/${categorySlug}/${article.slug}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function generateStaticParams() {
  const categories = await fetchAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}
