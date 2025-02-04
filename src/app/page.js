"use client";

import FeaturedArticles from "../components/FeaturedArticles.js";
import NewestArticles from "../components/NewestArticles.js";

export default function HomePage() {
  return (
    <main>
      <FeaturedArticles />
      <NewestArticles />
    </main>
  );
}
