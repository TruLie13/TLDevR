const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("apiUrl", apiUrl);

function shouldFetch() {
  const lastFetched = localStorage.getItem("lastFetched");
  const now = Date.now();
  return !lastFetched || now - lastFetched > 6 * 60 * 60 * 1000; // 6 hours
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

  return Array.isArray(data) ? data : [];
}

export async function fetchNewestArticles() {
  const res = await fetch(`${apiUrl}/articleList/recent`);
  if (!res.ok) throw new Error("Failed to fetch newest articles");
  return res.json();
}

export async function fetchArticle(slug) {
  const res = await fetch(`${apiUrl}/articles/${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch article: ${slug}`);
  return res.json();
}

// ✅ Properly implemented postArticle function
export async function postArticle(articleData) {
  try {
    const res = await fetch(`${apiUrl}/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!res.ok) {
      throw new Error("Failed to create article");
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
}
