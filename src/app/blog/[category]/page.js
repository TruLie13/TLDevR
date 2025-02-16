import { notFound } from "next/navigation";

// List of valid categories
const validCategories = ["react", "nextjs", "javascript", "tech"];

// Mock data for articles (can be fetched from a database)
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

// Generate static params for valid categories
export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}
