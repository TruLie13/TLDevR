"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchFeaturedArticles } from "@/lib/api"; // Import the API function

export default function FeaturedArticles() {
  const router = useRouter();

  const {
    data: featuredArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredArticles"],
    queryFn: fetchFeaturedArticles, // Use the imported function
  });

  if (isLoading) return <div>Loading featured articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <h1>Featured Articles</h1>
      <ul>
        {featuredArticles?.map((article, index) => (
          <li
            key={article.id || index}
            onClick={() =>
              router.push(`/blog/${article.category}/${article.slug}`)
            }
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
