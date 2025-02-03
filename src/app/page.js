"use client";
import React, { useState, useEffect } from "react";
import { fetchFeaturedArticles, fetchNewestArticles } from "../lib/api";

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [newestArticles, setNewestArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedFeaturedArticles = await fetchFeaturedArticles();
        const fetchedNewestArticles = await fetchNewestArticles();
        setFeaturedArticles(fetchedFeaturedArticles);
        setNewestArticles(fetchedNewestArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    loadArticles();
  }, []);

  return (
    <main>
      <section>
        <h1>Featured Articles</h1>
        <ul>
          {featuredArticles.map((article, index) => (
            <li key={article.id || index}>{article.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h1>Newest Articles</h1>
        <ul>
          {newestArticles.map((article, index) => (
            <li key={article.id || index}>{article.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
