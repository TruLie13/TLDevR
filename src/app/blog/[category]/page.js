import { notFound } from "next/navigation";
import { fetchAllCategories, fetchArticlesByCategory } from "@/lib/api.js";

export default async function Category({ params }) {
  const { category: categorySlug } = params;

  console.log("categorySlug", categorySlug);

  // Fetch valid categories from the API
  const categories = await fetchAllCategories();

  // Find category by slug
  const category = categories.find((cat) => cat.slug === categorySlug);

  // If category doesn't exist, show 404
  if (!category) {
    notFound();
  }

  // Fetch articles dynamically based on categorySlug
  const articles = await fetchArticlesByCategory(categorySlug);

  return (
    <div>
      <h1>{category.name} Articles</h1>{" "}
      {/* Use category.name instead of slug */}
      <ul>
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id}>
              <a href={`/blog/${categorySlug}/${article.slug}`}>
                {article.title}
              </a>
            </li>
          ))
        ) : (
          <li>No articles found in this category.</li>
        )}
      </ul>
    </div>
  );
}

// Generate static params dynamically from the API
export async function generateStaticParams() {
  const categories = await fetchAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}
