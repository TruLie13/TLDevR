"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchArticle } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Article() {
  const params = useParams(); // Get params from Next.js
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
  }, [params]);

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug, // Only run query when slug is available
  });

  if (!slug) return <div>Loading...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      <p>{article.content}</p>
    </div>
  );
}
