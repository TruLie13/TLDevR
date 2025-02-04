"use client";

import { useQuery } from "@tanstack/react-query";

const fetchFeaturedArticles = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/articleList/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured articles");
  return res.json();
};

export default function FeaturedArticles() {
  const {
    data: featuredArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredArticles"],
    queryFn: fetchFeaturedArticles,
  });

  if (isLoading) return <div>Loading featured articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <h1>Featured Articles</h1>
      <ul>
        {featuredArticles?.map((article, index) => (
          <li key={article.id || index}>{article.title}</li>
        ))}
      </ul>
    </section>
  );
}
