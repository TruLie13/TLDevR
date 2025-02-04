"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNewestArticles } from "../lib/api";

export default function NewestArticles() {
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

  return (
    <section>
      <h1>Newest Articles</h1>
      <ul>
        {newestArticles?.map((article, index) => (
          <li key={article.id || index}>{article.title}</li>
        ))}
      </ul>
    </section>
  );
}
