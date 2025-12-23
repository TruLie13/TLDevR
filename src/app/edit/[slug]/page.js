"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArticleForm from "@/components/ArticleForm.js";
import { fetchArticle, updateArticle } from "@/lib/api.js";

export default function EditArticle({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const fetchedArticle = await fetchArticle(params.slug);
        if (!fetchedArticle) {
          router.push("/");
          return;
        }
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [params.slug, router]);

  const handleUpdate = async (articleData) => {
    await updateArticle(params.slug, articleData);
  };

  if (loading) {
    return (
      <div className="p-2 ml-5 mr-5 flex justify-center items-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <ArticleForm
      initialData={article}
      onSubmit={handleUpdate}
      submitLabel="Save Changes"
      title="Edit Article"
      isEditMode={true}
    />
  );
}
