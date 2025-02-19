import { fetchArticle } from "@/lib/api"; // Adjust path as needed
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.metaDescription || "Read this article on our blog.",
    openGraph: {
      title: article.title,
      description: article.metaDescription || "Read this article on our blog.",
      url: `https://yourdomain.com/articles/${params.slug}`,
      type: "article",
      images: article.image ? [{ url: article.image, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription || "Read this article on our blog.",
      images: article.image ? [article.image] : [],
    },
  };
}

// Article Page Component
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
