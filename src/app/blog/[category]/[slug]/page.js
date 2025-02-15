// app/articles/[slug]/page.js
import { fetchArticle } from "@/lib/api"; // Adjust path as needed
import ArticleContent from "./ArticleContent"; // Client Component
import { notFound } from "next/navigation";

// async function getArticle(slug) {
//   const article = await fetchArticle(slug);
//   if (!article) notFound();
//   return article;
// }

export default async function Article({ params }) {
  // Fetch Article on the Server
  const article = await fetchArticle(params.slug);

  if (!article) {
    notFound(); // Handle case where the article is not found
  }

  return (
    <div>
      <ArticleContent article={article} />
    </div>
  );
}
