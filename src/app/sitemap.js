import { fetchAllArticles } from "@/lib/api";

// Set your base URL properly for production
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5001/tldevr-fc4df/us-central1";

export default async function sitemap() {
  // Current date for lastmod
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Get all articles
  const articles = await fetchAllArticles();

  // Extract unique categories from articles
  const uniqueCategories = new Set();
  articles.forEach((article) => {
    if (article.category && article.category.slug) {
      uniqueCategories.add(article.category.slug);
    }
  });

  // Create category routes
  const categoryRoutes = Array.from(uniqueCategories).map((categorySlug) => ({
    url: `${baseUrl}/blog/${categorySlug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Create article routes
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.category.slug}/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt || currentDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Combine all routes
  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
