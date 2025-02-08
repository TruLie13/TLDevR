"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"; // Get params from Next.js
import { fetchArticle } from "@/lib/api"; // Import the fetchArticle function
import Footer from "@/components/Footer.js";

export default function Article() {
  const { slug } = useParams(); // Get slug from URL parameters

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug], // Use slug as part of the queryKey to cache per article
    queryFn: () => fetchArticle(slug), // Fetch article using the slug
    enabled: !!slug, // Only enable the query if slug is available
  });

  if (!slug) return <div>Loading...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      <p>{article.content}</p>
      <Footer />
    </div>
  );
}
