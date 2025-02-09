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

// Fetch all article slugs (for SSG paths)
export async function fetchAllSlugs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articleList/slugs`
  );
  const data = await res.json();
  return data; // Example: ['slug1', 'slug2', 'slug3']
}

// Fetch article by slug
export async function fetchArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`
  );
  const data = await res.json();
  return data; // Example: { title: 'Article Title', author: 'Author Name', content: 'Article content' }
}
