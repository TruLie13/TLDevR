import { notFound } from "next/navigation";
import { fetchAllCategories } from "@/lib/api.js";

// Mock data for articles (replace later with database fetch)
const articles = [
  {
    id: 1,
    category: "react",
    slug: "react-basics",
    title: "Getting Started with React",
  },
  {
    id: 2,
    category: "nextjs",
    slug: "nextjs-introduction",
    title: "Introduction to Next.js",
  },
  {
    id: 3,
    category: "javascript",
    slug: "javascript-tips",
    title: "Top 10 JavaScript Tips",
  },
];

export default async function Category({ params }) {
  const { category } = params;

  // Fetch valid categories from the API
  const categories = await fetchAllCategories();
  const validCategories = categories.map((cat) => cat.slug);

  // Check if the category is valid
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Filter articles by category
  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <div>
      <h1>{category} Articles</h1>
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <a href={`/blog/${category}/${article.slug}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Generate static params dynamically from the API
export async function generateStaticParams() {
  const categories = await fetchAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}
