"use client";

import ArticleForm from "@/components/ArticleForm.js";
import { postArticle } from "@/lib/api.js";

export default function CreateArticle() {
  const handleCreate = async (articleData) => {
    await postArticle(articleData);
  };

  return (
    <ArticleForm
      onSubmit={handleCreate}
      submitLabel="Submit Article"
      title="Create Article"
    />
  );
}
