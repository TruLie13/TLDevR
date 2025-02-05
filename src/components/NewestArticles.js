"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { fetchNewestArticles, fetchArticle } from "../lib/api"; // Import the fetchArticle function

export default function NewestArticles() {
  const router = useRouter(); // Initialize the router
  const {
    data: newestArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newestArticles"],
    queryFn: fetchNewestArticles,
  });

  if (isLoading) return <div>Loading newest articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleArticleClick = (slug, category) => {
    router.push(`/blog/${category}/${slug}`);
  };

  return (
    <section>
      <h1>Newest Articles</h1>
      <ul>
        {newestArticles?.map((article, index) => (
          <li
            key={article.id || index}
            onClick={() => handleArticleClick(article.slug, article.category)}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {article.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
