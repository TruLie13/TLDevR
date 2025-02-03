import React from "react";

// Mock Data for Articles
const articles = [
  {
    id: 1,
    category: "react",
    slug: "react-basics",
    title: "Getting Started with React",
  },
  {
    id: 2,
    category: "nextjs",
    slug: "nextjs-introduction",
    title: "Introduction to Next.js",
  },
  {
    id: 3,
    category: "javascript",
    slug: "javascript-tips",
    title: "Top 10 JavaScript Tips",
  },
];

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a href={`/blog/${article.category}`}>{article.category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
