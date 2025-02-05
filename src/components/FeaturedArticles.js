"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchFeaturedArticles, fetchArticle } from "@/lib/api"; // Import fetch functions

export default function FeaturedArticles() {
  const router = useRouter();
  const queryClient = useQueryClient(); // Access React Query cache

  const {
    data: featuredArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredArticles"],
    queryFn: fetchFeaturedArticles,
  });

  const handleArticleClick = async (category, slug) => {
    const cachedArticle = queryClient.getQueryData(["article", slug]);

    if (!cachedArticle) {
      await queryClient.prefetchQuery({
        queryKey: ["article", slug],
        queryFn: () => fetchArticle(slug),
      });
    }

    router.push(`/blog/${category}/${slug}`);
  };

  if (isLoading) return <div>Loading featured articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <h1>Featured Articles</h1>
      <ul>
        {featuredArticles?.map((article, index) => (
          <li
            key={article.id || index}
            onClick={() => handleArticleClick(article.category, article.slug)}
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
