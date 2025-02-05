// src/lib/api.js
// src/app/page.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("apiUrl", apiUrl);

function shouldFetch() {
  const lastFetched = localStorage.getItem("lastFetched");
  const now = Date.now();

  // If it's the first time or the last fetch was more than 6 hours ago
  return !lastFetched || now - lastFetched > 6 * 60 * 60 * 1000; // 6 hours in ms
}

export async function fetchFeaturedArticles() {
  if (!shouldFetch()) {
    return JSON.parse(localStorage.getItem("featuredArticlesCache")) || [];
  }
  const res = await fetch(`${apiUrl}/articleList/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured articles");

  const data = await res.json();
  localStorage.setItem("lastFetched", Date.now().toString());
  localStorage.setItem("featuredArticlesCache", JSON.stringify(data));

  return Array.isArray(data) ? data : []; // Ensure an array is returned
}

export async function fetchNewestArticles() {
  const res = await fetch(`${apiUrl}/articleList/recent`);
  if (!res.ok) throw new Error("Failed to fetch featured articles");
  return res.json();
}

export const fetchArticle = async (slug) => {
  const res = await fetch(`${apiUrl}/articles/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
};
