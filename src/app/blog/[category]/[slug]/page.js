import { fetchArticle } from "@/lib/api"; // Adjust path as needed
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { fallback_image } from "@/utils/imageUtils.js";
import Script from "next/script";

// Ensure base URL is consistent
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://yourdomain.com";

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const canonicalUrl = `${baseUrl}/blog/${params.category}/${params.slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: article.title,
    description: article.metaDescription || "Read this article on our blog.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription || "Read this article on our blog.",
      url: canonicalUrl,
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
  const ArticleContent = dynamic(
    () => import("@/components/article/ArticleContent.js"),
    {
      ssr: false,
    }
  );

  if (!article) {
    notFound(); // Handle case where the article is not found
  }

  // JSON-LD Structured Data for Articles
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || "Read this article on our blog.",
    image: article.image || fallback_image,
    author: {
      "@type": "Person",
      name: article.author || "Unknown",
    },
    publisher: {
      "@type": "Organization",
      name: "TLDevR",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    datePublished: article.publishedAt || "",
    dateModified: article.updatedAt || "",
    url: `${baseUrl}/blog/${params.category}/${params.slug}`,
  };

  return (
    <div className="mt-1">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleContent article={article} />
    </div>
  );
}
