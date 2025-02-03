// src/lib/api.js
// src/app/page.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("apiUrl", apiUrl);

export async function fetchFeaturedArticles() {
  const res = await fetch(`${apiUrl}/articleList/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured articles");
  return res.json();
}

export async function fetchNewestArticles() {
  const res = await fetch(`${apiUrl}/articleList/recent`);
  if (!res.ok) throw new Error("Failed to fetch featured articles");
  return res.json();
}
