// app/articles/[slug]/page.js
import { fetchArticle } from "@/lib/api"; // Adjust path as needed
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

export default async function Article({ params }) {
  // Fetch Article on the Server
  const article = await fetchArticle(params.slug);
  const ArticleContent = dynamic(() => import("./ArticleContent"), {
    ssr: false,
  });

  if (!article) {
    notFound(); // Handle case where the article is not found
  }

  return (
    <div>
      <ArticleContent article={article} />
    </div>
  );
}
