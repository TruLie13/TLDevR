"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNewestArticles, fetchFeaturedArticles } from "@/lib/api";

export default function ArticleList({ listName, queryKey }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Determine which function to use based on queryKey
  const fetchFunction =
    queryKey[0] === "newestArticles"
      ? fetchNewestArticles
      : fetchFeaturedArticles;

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: fetchFunction,
  });

  const handleArticleClick = async (category, slug) => {
    const cachedArticle = queryClient.getQueryData(["article", slug]);

    if (!cachedArticle) {
      await queryClient.prefetchQuery({
        queryKey: ["article", slug],
        queryFn: fetchFunction,
      });
    }

    router.push(`/blog/${category}/${slug}`);
  };

  if (isLoading) return <div>Loading {listName.toLowerCase()}...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <h1>{listName}</h1>
      <ul>
        {articles?.map((article, index) => (
          <li
            key={article.id || index}
            onClick={() => handleArticleClick(article.category, article.slug)}
            style={{
              cursor: "pointer",
              // color: "blue",
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
